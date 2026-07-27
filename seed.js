const mongoose = require('mongoose');
const Astrologer = require('./models/Astrologer');
require('dotenv').config();

const seedData = [
  { name: 'Acharya Raj', expertise: ['Vedic', 'Tarot'], rating: 4.8, isAvailable: true, hourlyRate: 0.99 },
  { name: 'Pandit Sharma', expertise: ['Kundli', 'Matchmaking'], rating: 4.5, isAvailable: true, hourlyRate: 1.50 },
  { name: 'Dr. Anjali', expertise: ['Numerology', 'Vastu'], rating: 4.9, isAvailable: true, hourlyRate: 2.00 }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Astrologer.deleteMany();
    await Astrologer.insertMany(seedData);
    console.log('Database seeded');
    process.exit();
  });