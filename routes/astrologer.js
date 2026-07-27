const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');

// Get all astrologers
router.get('/', async (req, res) => {
  const astrologers = await Astrologer.find();
  res.json(astrologers);
});

// Onboard a new astrologer (POST)
router.post('/', async (req, res) => {
  const newAstrologer = new Astrologer(req.body);
  await newAstrologer.save();
  res.status(201).json(newAstrologer);
});

module.exports = router;