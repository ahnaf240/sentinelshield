import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build conversation history for Gemini
    const contents = [];

    // Add history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are FRIDAY — an advanced AI security assistant for SentinelShield cybersecurity platform. You are like Iron Man's FRIDAY: highly intelligent, professional, slightly futuristic in tone, and always helpful.

CRITICAL LANGUAGE RULE: Always detect the language the user is writing in and respond in that SAME language. If they write in Bengali, respond in Bengali. If they write in English, respond in English. If they mix languages, match their mix.

Your expertise includes:
- Cybersecurity threats, malware, phishing, and vulnerabilities
- Network security, VPN, encryption
- Privacy protection and digital safety
- Dark web monitoring and breach detection
- General knowledge and assistance

Keep responses concise but informative. Use a professional yet friendly tone. You may occasionally use cybersecurity terminology. Never break character.`
            }]
          },
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('Gemini error:', data);
      return NextResponse.json({ error: 'Gemini API error', details: data }, { status: 500 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    return NextResponse.json({ response: text });

  } catch (err) {
    console.error('FRIDAY API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}