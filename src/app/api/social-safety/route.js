import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { platform, profileLink } = await req.json();
    
    // ডামি স্ক্যানিং রেজাল্ট
    const auditResult = {
      score: 85,
      threats: platform === "Facebook" ? ["2FA Not Active", "Public Post Exposure"] : [],
      status: "Secured"
    };

    return NextResponse.json(auditResult);
  } catch (error) {
    return NextResponse.json({ error: "Audit failed" }, { status: 500 });
  }
}