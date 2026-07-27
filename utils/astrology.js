const { Kundali } = require('nava-astro-sdk');

function generateKundli(birthData) {
  const kundali = new Kundali({
    day: birthData.day,
    month: birthData.month,
    year: birthData.year,
    hour: birthData.hour,
    minute: birthData.minute,
    latitude: birthData.latitude,
    longitude: birthData.longitude,
    timezone: birthData.timezone
  });

  return {
    rashi: kundali.getRashi(),
    nakshatra: kundali.getNakshatra(),
    houses: kundali.getHouses(),
    dashas: kundali.getVimshottariDasha(),
    planets: kundali.getPlanetaryPositions(),
    // For matchmaking – we can implement later
  };
}

function generateReport(rashi, nakshatra) {
  // Simple template-based report – no AI API cost
  return {
    career: `Based on your ${rashi} Rashi, you have strong Mercury influence. Ideal careers: IT, writing, teaching.`,
    love: `Your Nakshatra ${nakshatra} indicates a romantic and loyal nature.`,
    health: `Focus on digestion and stress management.`
  };
}

module.exports = { generateKundli, generateReport };