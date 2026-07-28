const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');

// Fallback data (used if DB fails)
const FALLBACK_ASTROLOGERS = [
  { name: 'Acharya Raj', expertise: ['Vedic', 'Tarot'], rating: 4.8, isAvailable: true, hourlyRate: 0.99 },
  { name: 'Pandit Sharma', expertise: ['Kundli', 'Matchmaking'], rating: 4.5, isAvailable: true, hourlyRate: 1.50 },
  { name: 'Dr. Anjali', expertise: ['Numerology', 'Vastu'], rating: 4.9, isAvailable: true, hourlyRate: 2.00 }
];

router.get('/', async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    // If DB returns empty, fallback to the hardcoded list
    if (astrologers.length === 0) {
      return res.json(FALLBACK_ASTROLOGERS);
    }
    res.json(astrologers);
  } catch (error) {
    console.error('Error fetching astrologers, using fallback:', error.message);
    // Return fallback list so frontend always has data
    res.json(FALLBACK_ASTROLOGERS);
  }
});


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