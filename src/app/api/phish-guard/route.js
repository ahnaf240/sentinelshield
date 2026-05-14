import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { content } = await request.json();

    // Phishing detection keywords
    const phishKeywords = ['verify your account', 'urgent action required', 'suspicious activity', 'click here to claim', 'password reset link'];
    
    const detectedKeywords = phishKeywords.filter(word => 
      content.toLowerCase().includes(word)
    );

    const isPhishing = detectedKeywords.length > 0;

    const analysis = {
      isSafe: !isPhishing,
      riskLevel: isPhishing ? 'HIGH' : 'LOW',
      findings: detectedKeywords,
      recommendation: isPhishing 
        ? "Caution: This message contains common phishing phrases. Do not click any links."
        : "No obvious phishing patterns detected. Still, always verify the sender."
    };

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze content" }, { status: 500 });
  }
}