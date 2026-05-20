import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email query parameter is required' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // সাইবার সিকিউরিটি ডেমো বা রিয়েল ব্রিচ কন্ডিশন ম্যাচিং
    const commonBreaches = [
      'LinkedIn (2021 Data Leak)',
      'Adobe Systems Breach (2013)',
      'Dropbox User Database (2012)',
      'MySpace Network Leak (2008)',
      'Canva Platform Breach (2019)',
    ];

    // ইউজার যদি 'test', 'example', 'demo' অথবা আপনার কাঙ্ক্ষিত কী-ওয়ার্ড দেয় তবে ডাটা লিক দেখাবে
    if (
      lowerEmail.includes('test') || 
      lowerEmail.includes('example') || 
      lowerEmail.includes('demo') ||
      lowerEmail.includes('breached')
    ) {
      // র্যান্ডমলি ২ থেকে ৪টি ব্রিচ ডেটা রিটার্ন করবে
      const count = Math.floor(2 + Math.random() * 3);
      const userBreaches = commonBreaches.slice(0, count);

      return NextResponse.json({
        found: true,
        email: lowerEmail,
        breachCount: userBreaches.length,
        breaches: userBreaches,
        severity: 'HIGH',
        timestamp: new Date().toISOString()
      }, { status: 200 });
    }

    // ইমেইল নিরাপদ হলে এই রেসপন্স যাবে
    return NextResponse.json({
      found: false,
      email: lowerEmail,
      breachCount: 0,
      breaches: [],
      severity: 'SAFE',
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Breach analysis failed', details: error.message },
      { status: 500 }
    );
  }
}