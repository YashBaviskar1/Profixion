import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log("🔍 Environment check:");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ Set" : "❌ Missing");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "✅ Set" : "❌ Missing");

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Missing Razorpay credentials!");
  console.error("KEY_ID:", process.env.RAZORPAY_KEY_ID);
  console.error("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Set" : "Missing");
  throw new Error("Razorpay credentials not found in environment variables");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("✅ Razorpay initialized successfully");

// Create order endpoint
router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount) {
      return res.status(400).json({ 
        success: false, 
        error: "Amount is required" 
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order: order,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create order" 
    });
  }
});

// Verify payment endpoint
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing payment details" 
      });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret_placeholder")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ 
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: "Invalid signature" 
      });
    }
  } catch (error) {
    console.error("❌ Verification error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to verify payment" 
    });
  }
});

export default router;
// Create order endpoint
router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount) {
      return res.status(400).json({ 
        success: false, 
        error: "Amount is required" 
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order: order,
      keyId: process.env.RAZORPAY_KEY_ID   // 👈 send keyId to frontend
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create order" 
    });
  }
});
