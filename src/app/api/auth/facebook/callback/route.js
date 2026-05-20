import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code  = searchParams.get('code');
  const error = searchParams.get('error');

  const baseUrl     = process.env.NEXTAUTH_URL || 'https://sentinelshield-iota.vercel.app';
  const redirectUri = `${baseUrl}/api/auth/facebook/callback`;

  if (error) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=fb_denied`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=fb_no_code`);
  }

  try {
    // Step 1: Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=fb_token_failed`);
    }

    const accessToken = tokenData.access_token;

    // Step 2: Fetch user profile
    const userRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.width(200).height(200)&access_token=${accessToken}`
    );
    const userData = await userRes.json();

    // Step 3: Build session payload
    const sessionPayload = {
      provider: 'facebook',
      id:       userData.id,
      name:     userData.name,
      email:    userData.email || '',
      avatar:   userData.picture?.data?.url || '',
      loggedIn: true,
    };

    // Step 4: Set cookie and redirect
    const response = NextResponse.redirect(`${baseUrl}/?page=profile&auth=success`);
    response.cookies.set('sentinel_user', JSON.stringify(sessionPayload), {
      httpOnly: false,
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   60 * 60 * 24 * 7,
      path:     '/',
      sameSite: 'lax',
    });

    return response;

  } catch (err) {
    console.error('Facebook OAuth error:', err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=fb_server_error`);
  }
}