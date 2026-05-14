import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    // এখানে আমরা গুগল সেফ ব্রাউজিং বা ভাইরাস টোটাল এর মতো API ব্যবহার করতে পারি।
    // আপাতত আমরা একটি 'Mock' লজিক দিচ্ছি যা চেক করবে লিঙ্কটি সন্দেহজনক কি না।
    
    const suspiciousKeywords = ['bit.ly', 'click-here', 'win-prize', 'login-verify'];
    const isSuspicious = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));

    if (isSuspicious) {
      return NextResponse.json({ 
        status: 'DANGER', 
        message: 'This link is flagged as potentially harmful!' 
      });
    }

    return NextResponse.json({ 
      status: 'SAFE', 
      message: 'No immediate threats detected for this URL.' 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze URL' }, { status: 500 });
  }
}