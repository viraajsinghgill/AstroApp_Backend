// utils/astrology.js - No external dependencies, works instantly

function generateKundli(birthData) {
  // Parse input (safely)
  const day = parseInt(birthData.day);
  const month = parseInt(birthData.month);
  const year = parseInt(birthData.year);
  const hour = parseInt(birthData.hour) || 12;
  const minute = parseInt(birthData.minute) || 0;

  // Calculate Rashi (Sun sign) based on date (approximate Vedic)
  const rashi = getRashi(day, month);
  // Calculate Nakshatra (approximate)
  const nakshatra = getNakshatra(day, month, year);

  // Build a friendly response
  return {
    rashi: rashi,
    nakshatra: nakshatra,
    houses: generateHouses(rashi),
    dashas: { current: `Vimshottari Dasha of ${nakshatra}` },
    planets: {
      sun: { sign: rashi, degree: Math.floor(Math.random() * 30) },
      moon: { sign: getMoonSign(day, month), degree: Math.floor(Math.random() * 30) }
    }
  };
}

// ------------------ Helper functions ------------------

function getRashi(day, month) {
  // Approximate start dates for each Rashi (Vedic sidereal, simplified)
  const signs = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];
  const startDays = [14, 14, 15, 15, 15, 16, 17, 17, 16, 16, 15, 14]; // approx
  let index = month - 1;
  if (day < startDays[month - 1]) {
    index = (index + 11) % 12;
  }
  return signs[index];
}

function getNakshatra(day, month, year) {
  // Simple deterministic mapping based on date (not astronomically accurate, but consistent)
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra',
    'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula',
    'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  // Combine day, month, year to get a pseudo-random index
  const seed = (day * 31 + month * 17 + year * 7) % 27;
  return nakshatras[seed];
}

function getMoonSign(day, month) {
  // Dummy – just for demo
  const signs = ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'];
  return signs[(day + month) % 12];
}

function generateHouses(rashi) {
  // Placeholder – returns 12 houses with simple descriptions
  const houses = [];
  for (let i = 1; i <= 12; i++) {
    houses.push(`House ${i}: ${['Self', 'Wealth', 'Siblings', 'Home', 'Children', 'Health', 'Partner', 'Longevity', 'Fortune', 'Career', 'Gains', 'Losses'][i-1]}`);
  }
  return houses;
}

function generateReport(rashi, nakshatra) {
  return {
    career: `Based on your ${rashi} Rashi, you are naturally inclined toward leadership, communication, or creative arts. Your Nakshatra ${nakshatra} suggests you will find success in fields that require intuition and strategy.`,
    love: `Your Nakshatra ${nakshatra} indicates a romantic, loyal, and passionate nature. You value deep emotional connections.`,
    health: `Focus on maintaining a balanced diet and regular exercise. Your Rashi suggests you may be prone to digestive issues – include more fiber and water in your diet.`
  };
}

function calculateMatchmaking(birthData1, birthData2) {
  // Get Nakshatra indexes (simplified but deterministic)
  const n1 = getNakshatraIndex(birthData1.day, birthData1.month, birthData1.year);
  const n2 = getNakshatraIndex(birthData2.day, birthData2.month, birthData2.year);
  
  // Base score on Nakshatra difference (max 36 points)
  // In real astrology, this considers Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi
  // We'll simulate a realistic score between 18 and 36
  const diff = Math.abs(n1 - n2);
  const baseScore = 18 + (diff % 18); // Range: 18 to 36
  
  // Add some randomness based on Rashi to make it interesting
  const r1 = getRashiIndex(birthData1.day, birthData1.month);
  const r2 = getRashiIndex(birthData2.day, birthData2.month);
  const rashiBonus = (r1 === r2) ? 3 : (Math.abs(r1 - r2) % 3);
  
  let finalScore = Math.min(36, baseScore + rashiBonus);
  
  // Determine compatibility level
  let level = 'Average';
  if (finalScore >= 30) level = 'Excellent';
  else if (finalScore >= 24) level = 'Good';
  else if (finalScore >= 18) level = 'Average';
  else level = 'Needs Work';
  
  return {
    score: finalScore,
    maxScore: 36,
    level: level,
    details: {
      nakshatra1: getNakshatra(birthData1.day, birthData1.month, birthData1.year),
      nakshatra2: getNakshatra(birthData2.day, birthData2.month, birthData2.year),
      rashi1: getRashi(birthData1.day, birthData1.month),
      rashi2: getRashi(birthData2.day, birthData2.month)
    }
  };
}

// Helper: Get Nakshatra index (0-26)
function getNakshatraIndex(day, month, year) {
  return (day * 31 + month * 17 + year * 7) % 27;
}

// Helper: Get Rashi index (0-11)
function getRashiIndex(day, month) {
  const startDays = [14, 14, 15, 15, 15, 16, 17, 17, 16, 16, 15, 14];
  let index = month - 1;
  if (day < startDays[month - 1]) {
    index = (index + 11) % 12;
  }
  return index;
}

module.exports = { generateKundli, generateReport };