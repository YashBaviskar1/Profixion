
import auditRoutes from './routes/audit.js';
import paymentRoutes from "./routes/payment.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});
// Mount routes with their base paths. This is clear and unambiguous.
app.use('/api/audit', auditRoutes);
app.use('/api/payment', paymentRoutes);

// Default route for checking if the server is up
app.get('/', (req, res) => {
  res.send('Social Media Audit Engine Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Final server is running on http://localhost:${port}`);
});
