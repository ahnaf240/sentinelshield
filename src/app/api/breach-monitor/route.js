import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // ডামি ব্রিচ ডাটাবেজ
    const compromisedEmails = {
      'test@example.com': { 
        found: true, 
        breaches: ['Adobe (2013)', 'LinkedIn (2016)'],
        risk: 'High' 
      },
      'rakib@cyber.com': { 
        found: false, 
        breaches: [],
        risk: 'None' 
      }
    };

    const result = compromisedEmails[email] || { 
      found: false, 
      breaches: [], 
      risk: 'Safe' 
    };

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to monitor breach' }, { status: 500 });
  }
}