import { NextResponse } from 'next/server';

export async function GET() {
  // প্রফেশনাল সাইবার সিকিউরিটি লগের জন্য ডাইনামিক ডেটা জেনারেশন
  const attackMethods = ["Brute Force", "SQL Injection", "XSS Attack", "DDoS Attempt", "SSH Login Fail"];
  const locations = ["Dhaka, BD", "Moscow, RU", "Beijing, CN", "London, UK", "New York, US", "Frankfurt, DE"];
  const severityLevels = ["High", "Medium", "Critical"];

  // ৫টি র্যান্ডম লগ জেনারেট করা
  const logs = Array.from({ length: 5 }, (_, i) => {
    const ipPrefix = Math.floor(Math.random() * 255);
    const ipSuffix = Math.floor(Math.random() * 255);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      ip: `${ipPrefix}.${Math.floor(Math.random() * 255)}.${ipSuffix}.${Math.floor(Math.random() * 255)}`,
      method: attackMethods[Math.floor(Math.random() * attackMethods.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
      time: new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }),
      status: "Blocked",
      timestamp: new Date().toISOString()
    };
  });

  // ডাটা পাঠানোর আগে সর্টিং (নতুনটা আগে থাকবে)
  return NextResponse.json(logs);
}