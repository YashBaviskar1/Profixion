import { Router } from "express";
import supabase from "../supabaseClient.js";
import { triggerBrightDataIngestion, fetchBrightDataSnapshot } from "../brightdataClient.js";
import { analyzeWithGemini } from "../geminiClient.js";

const router = Router();

/**
 * @route POST /api/audit/submit
 * Body: { profileUrl, authId }
 */
router.post("/submit", async (req, res) => {
  const { profileUrl, authId } = req.body;

  if (!profileUrl || !authId) {
    return res.status(400).json({ msg: "profileUrl and authId are required" });
  }

  try {
    // 1️⃣ Check if the same user already has this profile audited
    const { data: existing } = await supabase
      .from("audits")
      .select("*")
      .eq("auth_id", authId)
      .eq("profile_url", profileUrl)
      .single();

    if (existing) {
      return res.json({
        success: true,
        message: "Audit already exists for this profile",
        data: { trackingId: existing.tracking_id, status: existing.status }
      });
    }

    // 2️⃣ Trigger Bright Data ingestion
    const brightDataResponse = await triggerBrightDataIngestion(profileUrl);
    console.log("BrightData trigger response:", brightDataResponse);
    const trackingId = `audit_${Date.now()}`;

    // 3️⃣ Insert new audit row with initial status
    const { data, error } = await supabase
      .from("audits")
      .insert([{
        tracking_id: trackingId,
        auth_id: authId,
        profile_url: profileUrl,
        status: "running",
        snapshot_id: brightDataResponse?.snapshot_id || "", // ✅ save snapshot_id instead
        snapshot_id: "",
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
    const { snapshot_id, status } = req.body;
    console.log("Webhook received:", req.body);

    if (status !== "ready") {
      return res.json({ success: true, msg: "Ignored non-ready status" });
    }

    // Check if already processed
    const { data: existing } = await supabase
      .from("audits")
      .select("status")
      .eq("snapshot_id", snapshot_id) // ✅ match snapshot_id now
      .single();

    if (existing?.status === "ready") {
      console.log(`⚠️ Duplicate webhook for snapshot ${snapshot_id}, ignoring.`);
      return res.json({ success: true, msg: "Already processed" });
    }

    // Fetch snapshot
    const snapshot = await fetchBrightDataSnapshot(snapshot_id);

    // Analyze with Gemini
    const report = await analyzeWithGemini(snapshot);

    // Update audit record
    await supabase
      .from("audits")
      .update({
        status: "ready",
        snapshot_id,
        audit_report: report
      })
      .eq("snapshot_id", snapshot_id);

    console.log(`✅ Audit for snapshot ${snapshot_id} completed via webhook`);
    res.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ success: false });
  }
});

export default router;