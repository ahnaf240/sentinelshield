import { NextResponse } from 'next/server';

export async function GET() {
  // কিছু ডামি থ্রেট ডাটা জেনারেট করা
  const attackTypes = ["DDoS", "SQL Injection", "Brute Force", "XSS", "Malware"];
  const countries = ["USA", "Russia", "China", "Germany", "Brazil", "Australia", "Bangladesh"];

  const generateAttack = () => ({
    id: Math.random().toString(36).substr(2, 9),
    source: countries[Math.floor(Math.random() * countries.length)],
    target: countries[Math.floor(Math.random() * countries.length)],
    type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
    timestamp: new Date().toLocaleTimeString(),
    severity: Math.random() > 0.7 ? "High" : "Medium"
  });

  // একসাথে ৩-৪টি অ্যাটাক পাঠানো
  const liveAttacks = Array.from({ length: 4 }, generateAttack);

  return NextResponse.json(liveAttacks);
}