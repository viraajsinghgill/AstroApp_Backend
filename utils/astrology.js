const { Kundali } = require('nava-astro-sdk');

function generateKundli(birthData) {
  try {
    // Force all values to numbers to avoid type issues
    const day = parseInt(birthData.day);
    const month = parseInt(birthData.month);
    const year = parseInt(birthData.year);
    const hour = parseInt(birthData.hour) || 12;
    const minute = parseInt(birthData.minute) || 0;
    const latitude = parseFloat(birthData.latitude);
    const longitude = parseFloat(birthData.longitude);
    const timezone = parseFloat(birthData.timezone);

    // Validate required fields
    if (!day || !month || !year || isNaN(latitude) || isNaN(longitude) || isNaN(timezone)) {
      throw new Error(`Invalid birth data: day=${day}, month=${month}, year=${year}, lat=${latitude}, lon=${longitude}, tz=${timezone}`);
    }

    // nava-astro-sdk uses 'lat', 'lon', 'tz' - not 'latitude', 'longitude', 'timezone'
    const params = {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      lat: latitude,
      lon: longitude,
      tz: timezone
    };

    console.log("Generating Kundli with params:", params); // Logs to Render console

    const kundali = new Kundali(params);
    
    return {
      rashi: kundali.getRashi(),
      nakshatra: kundali.getNakshatra(),
      houses: kundali.getHouses(),
      dashas: kundali.getVimshottariDasha(),
      planets: kundali.getPlanetaryPositions()
    };
  } catch (error) {
    console.error("Kundli generation error:", error);
    throw new Error(`Astrology calculation failed: ${error.message}`);
  }
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