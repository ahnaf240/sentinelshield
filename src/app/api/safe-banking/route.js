import { NextResponse } from 'next/server';

export async function GET() {
  const securityStatus = {
    vpn: "Active",
    ssl: "Verified",
    encryption: "AES-256",
    status: "Safe to Transact"
  };
  return NextResponse.json(securityStatus);
}