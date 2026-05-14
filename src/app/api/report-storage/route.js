import { NextResponse } from 'next/server';

export async function GET() {
  const reports = [
    { date: "2026-05-10", scanType: "Full System", status: "Clean" },
    { date: "2026-05-12", scanType: "Network Scan", status: "Threats Found" }
  ];
  return NextResponse.json(reports);
}