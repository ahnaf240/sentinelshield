import { NextResponse } from 'next/server';

export async function GET() {
  // বাস্তব প্রজেক্টে এই ডাটাগুলো ডাটাবেস বা সেশন থেকে আসে
  const sessionData = {
    user: {
      name: "Admin Operator",
      role: "Cybersecurity Analyst",
      id: "SENTINEL-01",
      avatar: "https://ui-avatars.com/api/?name=Admin+Operator&background=00d4ff&color=fff",
      notifications: 3
    },
    system: {
      version: "v2.4.1",
      status: "Operational",
      uptime: "99.98%",
      protocol: "AES-256-GCM"
    },
    lastLogin: new Date().toLocaleString()
  };

  return NextResponse.json(sessionData);
}