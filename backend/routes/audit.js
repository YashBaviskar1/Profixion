import { Router } from "express";
import supabase from "../supabaseClient.js";
import { triggerBrightDataIngestion } from "../brightdataClient.js";
import { analyzeWithGemini } from "../geminiClient.js";
import { generateAuditPDF, parseAuditData } from "../utils/pdfGenerator.js";
import path from "path";

const router = Router();

/**
 * @route POST /api/audit/submit
 * Body: { profileUrl, authId }
 */
router.post("/submit", async (req, res) => {
  // ✅ FIX: Extract profileUrl and authId from the request body
  const { profileUrl, authId } = req.body;

  // You should also add validation here
  if (!profileUrl || !authId) {
    return res.status(400).json({ success: false, msg: "profileUrl and authId are required" });
  }

  try {
    // Note: You can add back your logic to check for existing audits if needed.

    // 2️⃣ Trigger Bright Data ingestion
    const brightDataResponse = await triggerBrightDataIngestion(profileUrl);
    console.log("BrightData trigger response:", brightDataResponse);

    // Ensure we got a snapshot_id
    if (!brightDataResponse?.snapshot_id) {
      throw new Error("Failed to get snapshot_id from BrightData");
    }

    const trackingId = `audit_${Date.now()}`;

    // 3️⃣ Insert new audit row with initial status
    const { data, error } = await supabase
      .from("audits")
      .insert([{
        tracking_id: trackingId,
        auth_id: authId,
        profile_url: profileUrl,
        status: "running",
        snapshot_id: brightDataResponse.snapshot_id,
        audit_report: ""
      }])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: "Audit started successfully",
      data: { trackingId }
    });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ success: false, msg: "Audit submission failed" });
  }
});
/**
 * @route POST /api/audit/webhook
 * Bright Data calls this when job is ready
 */
router.post("/webhook", async (req, res) => {
  try {
    const snapshotData = req.body;
    console.log("Webhook received with data.");

    // The payload is an array of scraped profiles; we'll process the first one.
    if (!Array.isArray(snapshotData) || snapshotData.length === 0) {
      console.log("⚠️ Webhook received empty or invalid data.");
      return res.status(400).json({ success: false, msg: "Invalid payload" });
    }
    const profileData = snapshotData[0];

    // 1️⃣ Extract the original profile URL from the payload to find our audit record.
    const profileUrl = profileData?.input?.url || profileData?.input_url;
    if (!profileUrl) {
      console.error("❌ Could not find profile URL in webhook payload.");
      return res.status(400).json({ success: false, msg: "Missing URL in payload" });
    }

    // 2️⃣ Find the 'running' audit for this URL in Supabase.
    const { data: audit, error: findError } = await supabase
      .from("audits")
      .select("id, tracking_id") // Select only what you need
      .eq("profile_url", profileUrl)
      .eq("status", "running")
      .order('created_at', { ascending: false }) // Get the most recent one
      .limit(1)
      .single();

    if (findError || !audit) {
      console.error(`⚠️ No running audit found for URL: ${profileUrl}. Ignoring webhook.`);
      // Return a 200 OK so BrightData doesn't retry sending the webhook.
      return res.json({ success: true, msg: "No matching running audit found." });
    }

    // 3️⃣ Analyze the received data with Gemini.
    console.log(`Analyzing data for audit tracking_id: ${audit.tracking_id}`);
    const report = await analyzeWithGemini(profileData);

    // 4️⃣ Update the audit record with the report and set status to 'ready'.
    const { error: updateError } = await supabase
      .from("audits")
      .update({
        status: "ready",
        audit_report: report
      })
      .eq("id", audit.id); // Update using the unique record ID.

    if (updateError) throw updateError;

    console.log(`✅ Audit for ${profileUrl} completed. Tracking ID: ${audit.tracking_id}`);
    res.json({ success: true });

  } catch (err) {
    console.error("Webhook processing error:", err.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});




// backend/routes/audit.js

// ... (existing imports and /submit, /webhook routes) ...

/**
 * @route GET /api/audit/status/:trackingId
 * Fetches the status and report of a specific audit
 */
router.get("/status/:trackingId", async (req, res) => {
  const { trackingId } = req.params;

  if (!trackingId) {
    return res.status(400).json({ success: false, msg: "Tracking ID is required" });
  }

  try {
    const { data: audit, error } = await supabase
      .from("audits")
      .select("status, audit_report, profile_url")
      .eq("tracking_id", trackingId)
      .single();

    if (error || !audit) {
      return res.status(404).json({ success: false, msg: "Audit not found" });
    }

    res.json({ success: true, data: audit });
  } catch (err) {
    console.error("Status fetch error:", err);
    res.status(500).json({ success: false, msg: "Failed to fetch audit status" });
  }
});

/**
 * @route POST /api/audit/generate-pdf
 * Generates a PDF report for a completed audit
 * Body: { trackingId }
 */
router.post("/generate-pdf", async (req, res) => {
  const { trackingId } = req.body;

  if (!trackingId) {
    return res.status(400).json({ success: false, msg: "Tracking ID is required" });
  }

  try {
    // 1️⃣ Fetch the audit data from Supabase
    const { data: audit, error } = await supabase
      .from("audits")
      .select("status, audit_report, profile_url, tracking_id")
      .eq("tracking_id", trackingId)
      .single();

    if (error || !audit) {
      return res.status(404).json({ success: false, msg: "Audit not found" });
    }

    if (audit.status !== "ready") {
      return res.status(400).json({ 
        success: false, 
        msg: "Audit is not ready yet. Please wait for the analysis to complete." 
      });
    }

    // 2️⃣ Parse the audit report into structured data
    const auditData = parseAuditData(audit.audit_report, audit.profile_url);
    
    // 3️⃣ Generate PDF filename
    const filename = `audit_report_${trackingId}_${Date.now()}`;
    
    // 4️⃣ Generate the PDF
    console.log(`📄 Generating PDF for audit: ${trackingId}`);
    const pdfPath = await generateAuditPDF(auditData, filename);
    
    // 5️⃣ Return the download URL
    const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3001';
    const downloadUrl = `${baseUrl}/api/audit/download-pdf/${filename}.pdf`;
    
    res.json({
      success: true,
      message: "PDF generated successfully",
      data: {
        downloadUrl,
        filename: `${filename}.pdf`,
        trackingId
      }
    });

  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ 
      success: false, 
      msg: "Failed to generate PDF report" 
    });
  }
});

/**
 * @route GET /api/audit/download-pdf/:filename
 * Serves the generated PDF file for download
 */
router.get("/download-pdf/:filename", async (req, res) => {
  const { filename } = req.params;
  
  if (!filename || !filename.endsWith('.pdf')) {
    return res.status(400).json({ success: false, msg: "Invalid filename" });
  }

  try {
    const pdfPath = path.join(process.cwd(), 'reports', filename);
    
    // Check if file exists
    const fs = await import('fs');
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ success: false, msg: "PDF file not found" });
    }

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send the file
    res.sendFile(pdfPath);

  } catch (err) {
    console.error("PDF download error:", err);
    res.status(500).json({ success: false, msg: "Failed to download PDF" });
  }
});

export default router;



