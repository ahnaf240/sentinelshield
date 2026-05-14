// src/lib/api.js

/**
 * SentinelShield API Helper
 * This handles all the simulated and real data fetching logic.
 */

// Simulated delay for realistic scanning feel
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const securityAPI = {
  // Check if a URL or IP is malicious
  async scanThreat(target) {
    await delay(2000);
    // Simulate threat detection logic
    const isMalicious = Math.random() > 0.8; 
    return {
      success: true,
      target: target,
      status: isMalicious ? 'DANGER' : 'SECURE',
      riskScore: isMalicious ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 20),
      detectedAt: new Date().toISOString(),
    };
  },

  // Check for email breaches in dark web
  async checkEmailBreach(email) {
    await delay(1500);
    return {
      email: email,
      found: Math.random() > 0.5,
      sources: ['Pastebin', 'Adobe-Leak', 'Canva-2019'],
      lastBreach: '2024-02-15'
    };
  },

  // Log security events
  async logEvent(event) {
    console.log(`[Sentinel LOG]: ${event}`);
    return { status: 'logged' };
  }
};

export default securityAPI;