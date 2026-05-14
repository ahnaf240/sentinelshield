import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phone } = await request.json();
    
    // ডামি স্প্যাম ডাটাবেজ
    const spamDatabase = {
      '01711223344': { name: 'Insurance Bot', risk: 85, status: 'SPAM' },
      '01999887766': { name: 'Delivery Man', risk: 5, status: 'SAFE' }
    };

    const info = spamDatabase[phone] || { name: 'Unknown Caller', risk: 40, status: 'UNVERIFIED' };

    return NextResponse.json({
      phone: phone,
      callerName: info.name,
      riskScore: info.risk,
      status: info.status
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to identify caller' }, { status: 500 });
  }
}