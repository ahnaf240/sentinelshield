import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { target } = await req.json();
    
    // ডামি থ্রেট অ্যানালাইসিস লজিক
    const scanResult = {
      threatsFound: target.includes("malware") ? 3 : 0,
      filesScanned: 124,
      riskLevel: target.includes("malware") ? "High" : "Low",
      status: "Scan Complete"
    };

    return NextResponse.json(scanResult);
  } catch (error) {
    return NextResponse.json({ error: "Scanner failed" }, { status: 500 });
  }
}