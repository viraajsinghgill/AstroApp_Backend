const express = require('express');
const router = express.Router();
const { generateKundli, generateReport } = require('../utils/astrology');

router.post('/', (req, res) => {
  try {
    const birthData = req.body;
    
    // Validate required fields before calculation
    if (!birthData.day || !birthData.month || !birthData.year) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please send day, month, year, latitude, longitude, timezone.' 
      });
    }

    const chart = generateKundli(birthData);
    const report = generateReport(chart.rashi, chart.nakshatra);
    res.json({ chart, report });
    
  } catch (error) {
    // Send the actual error message back to the frontend
    console.error("API Error:", error.message);
    res.status(400).json({ 
      error: error.message,
      details: 'Check server logs for full stack trace' 
    });
  }
});

module.exports = router;