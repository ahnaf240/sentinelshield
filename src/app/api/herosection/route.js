import { NextResponse } from 'next/server';

export async function GET() {
  // ডাইনামিক ডেটা জেনারেশন (সিমুলেশন)
  const systemMetrics = {
    userName: "OPERATOR",
    securityScore: 98,
    activeNodes: 12,
    protocol: "v4.2.1-Sentinel",
    systemLog: [
      "Initializing secure handshake... [OK]",
      "Port 443 active",
      "Firewall rules updated",
      "Monitoring global threat map...",
      "Connection encrypted via AES-256-GCM"
    ],
    lastUpdate: new Date().toISOString()
  };

  return NextResponse.json(systemMetrics);
}