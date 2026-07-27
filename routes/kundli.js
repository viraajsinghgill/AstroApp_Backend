const express = require('express');
const router = express.Router();
const { generateKundli, generateReport } = require('../utils/astrology');

router.post('/', (req, res) => {
  try {
    const birthData = req.body;
    const chart = generateKundli(birthData);
    const report = generateReport(chart.rashi, chart.nakshatra);
    res.json({ chart, report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;