const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');

// Get all astrologers
router.get('/', async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    // If empty, return an empty array (not an error)
    res.json(astrologers);
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    // Return empty array if DB fails, so frontend doesn't break
    res.json([]);
  }
});

// Onboard a new astrologer (POST)
router.post('/', async (req, res) => {
  try {
    const newAstrologer = new Astrologer(req.body);
    await newAstrologer.save();
    res.status(201).json(newAstrologer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;