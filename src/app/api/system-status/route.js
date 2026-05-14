import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "Secure", 
    uptime: "99.9%",
    firewall: "Active",
    threat_level: "Low"
  });
}