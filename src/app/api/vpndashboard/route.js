import { NextResponse } from 'next/server';

export async function GET() {
  const vpnStatus = {
    connected: true,
    activeServer: "Frankfurt, Germany",
    ipAddress: "185.245.87.120",
    protocol: "OpenVPN (UDP)",
    uptime: "02:45:12",
    servers: [
      { id: 1, city: "New York", country: "USA", ping: "120ms" },
      { id: 2, city: "Frankfurt", country: "Germany", ping: "45ms" },
      { id: 3, city: "Singapore", country: "Singapore", ping: "80ms" },
      { id: 4, city: "Tokyo", country: "Japan", ping: "110ms" }
    ]
  };
  return NextResponse.json(vpnStatus);
}