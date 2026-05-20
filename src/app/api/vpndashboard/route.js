import { NextResponse } from 'next/server';

export async function GET() {
  // সিকিউর টানেল নোড সার্ভার লিস্ট
  const secureNodes = [
    { name: 'Tokyo_V41',      flag: '🇯🇵', ping: 28,  load: 22, ip: '108.162.192.1',  status: 'OPTIMAL' },
    { name: 'Frankfurt_DE09', flag: '🇩🇪', ping: 12,  load: 34, ip: '194.233.12.88',  status: 'STABLE' },
    { name: 'NewYork_US03',   flag: '🇺🇸', ping: 98,  load: 67, ip: '172.64.155.209', status: 'HIGH_LOAD' },
    { name: 'London_GB02',    flag: '🇬🇧', ping: 25,  load: 55, ip: '104.21.45.77',   status: 'STABLE' },
    { name: 'Singapore_SG07', flag: '🇸🇬', ping: 130, load: 41, ip: '172.67.68.99',   status: 'OPTIMAL' },
  ];

  return NextResponse.json({
    nodes: secureNodes,
    encryptionProtocol: 'WireGuard v2 (ChaCha20-Poly1305)',
    firewallActive: true,
    dnsLeakProtection: 'ENABLED'
  }, { status: 200 });
}