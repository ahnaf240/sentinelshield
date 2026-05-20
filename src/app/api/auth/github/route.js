import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/github/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user,user:email`;
    return NextResponse.redirect(githubAuthUrl);
  }

  return NextResponse.json({ error: 'Use /api/auth/github/callback' }, { status: 400 });
}