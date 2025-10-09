import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load .env before using keys

const app = express();
app.use(cors());
app.use(express.json());

// Import payment routes
import paymentRoutes from "./routes/payment.js";
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));


