import { NextResponse } from 'next/server';

export async function GET() {
  const news = [
    { id: 1, title: "New Zero-Day vulnerability in Chrome", severity: "High" },
    { id: 2, title: "Major Ransomware attack on Banking sector", severity: "Critical" },
    { id: 3, title: "SentinelShield V3.0 is now live!", severity: "Info" }
  ];
  return NextResponse.json(news);
}