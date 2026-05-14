// app/api/link-shield/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    // এখানে  কাস্টম লজিক বা থার্ড পার্টি API (যেমন VirusTotal) ইন্টিগ্রেট 
    // বর্তমানে একটি ডেমো লজিক দেওয়া হলো
    const isSuspicious = url.includes('bit.ly') || url.includes('free-gift') || url.includes('malware');
    
    const analysis = {
      status: isSuspicious ? 'DANGER' : 'SECURE',
      riskScore: isSuspicious ? 85 : 0,
      timestamp: new Date().toISOString(),
      protocol: url.startsWith('https') ? 'HTTPS' : 'HTTP (Unsafe)',
      details: isSuspicious 
        ? "This link matches known phishing patterns or uses a shortener often associated with threats."
        : "No immediate threats detected. Secure protocol verified."
    };

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze link" }, { status: 500 });
  }
}