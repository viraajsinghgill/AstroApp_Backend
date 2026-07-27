const mongoose = require('mongoose');

const AstrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: [String],
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  hourlyRate: { type: Number, default: 0.99 },
  profilePic: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Astrologer', AstrologerSchema);