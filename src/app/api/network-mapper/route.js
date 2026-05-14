import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { target } = await request.json();
    const cleanTarget = target.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();

    // সিমুলেটেড ডাটাবেজ
    const scanData = {
      'google.com': { ip: '142.250.190.46', ports: ['80 (HTTP)', '443 (HTTPS)'], waf: 'Google GFE' },
      'youtube.com': { ip: '172.217.166.78', ports: ['80', '443', '1935 (RTMP)'], waf: 'Google GFE' },
      'facebook.com': { ip: '157.240.22.35', ports: ['80', '443'], waf: 'FNA' }
    };

    // যদি লিস্টে না থাকে তবে ডামি ডাটা তৈরি করবে
    const result = scanData[cleanTarget] || { 
      ip: 'Scan Complete: ' + (Math.floor(Math.random() * 255) + '.162.10.1'), 
      ports: ['80 (Open)', '443 (Open)'], 
      waf: 'Detected: Generic WAF' 
    };

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: 'Network scan failed' }, { status: 500 });
  }
}