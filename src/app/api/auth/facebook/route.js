import { NextResponse } from 'next/server';

export async function GET() {
  const appId       = process.env.FACEBOOK_APP_ID;
  const baseUrl     = process.env.NEXTAUTH_URL || 'https://sentinelshield-iota.vercel.app';
  const redirectUri = `${baseUrl}/api/auth/facebook/callback`;
  const scope       = 'public_profile,email';

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

  return NextResponse.redirect(fbAuthUrl);
}