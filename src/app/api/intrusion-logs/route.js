import { NextResponse } from "next/server";

export async function GET() {
  // আপাতত ডামি ডেটা পাঠানো হচ্ছে যাতে এরর না আসে
  const logs = [
    { id: 1, event: "Unauthorized Access Blocked", severity: "High", time: "14:20:05" },
    { id: 2, event: "SQL Injection Attempt", severity: "Critical", time: "14:21:10" }
  ];
  return NextResponse.json(logs);
}