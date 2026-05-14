import { NextResponse } from 'next/server';

export async function GET() {
  const user = {
    name: "Sentinel_Admin",
    role: "Lead Cybersecurity Specialist",
    lastLogin: "2026-05-13 14:20",
    rank: "Elite"
  };
  return NextResponse.json(user);
}