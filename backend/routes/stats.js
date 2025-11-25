// routes/stats.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const DATA_FILE = path.resolve('traffic.json');

// Helper function to get current count
const getCount = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // If file doesn't exist, create it with 0
      fs.writeFileSync(DATA_FILE, JSON.stringify({ visits: 0 }));
      return 0;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data).visits;
  } catch (error) {
    console.error("Error reading stats:", error);
    return 0;
  }
};

// 1. Endpoint to INCREMENT (called by AnalyticsTracker)
router.post('/visit', (req, res) => {
  try {
    const currentVisits = getCount();
    const newVisits = currentVisits + 1;
    
    // Save new count
    fs.writeFileSync(DATA_FILE, JSON.stringify({ visits: newVisits }));
    
    res.json({ success: true, visits: newVisits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

// 2. Endpoint to READ (called by Login page)
router.get('/', (req, res) => {
  const visits = getCount();
  res.json({ visits });
});

export default router;