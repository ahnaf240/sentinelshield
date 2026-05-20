import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  if (error) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=access_denied`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=no_code`);
  }

  try {
    // Step 1: Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri:  `${baseUrl}/api/auth/github/callback`,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=token_failed`);
    }

    const accessToken = tokenData.access_token;

    // Step 2: Fetch GitHub user data
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const userData = await userRes.json();

    // Step 3: Fetch user emails
    const emailRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const emails = await emailRes.json();
    const primaryEmail = Array.isArray(emails)
      ? emails.find((e) => e.primary)?.email || emails[0]?.email
      : null;

    // Step 4: Build session cookie payload
    const sessionPayload = {
      provider:   'github',
      id:         userData.id,
      username:   userData.login,
      name:       userData.name || userData.login,
      email:      primaryEmail || userData.email,
      avatar:     userData.avatar_url,
      bio:        userData.bio || '',
      followers:  userData.followers,
      following:  userData.following,
      publicRepos: userData.public_repos,
      profileUrl:  userData.html_url,
      loggedIn:   true,
    };

    // Step 5: Set cookie and redirect to profile
    const response = NextResponse.redirect(`${baseUrl}/?page=profile&auth=success`);
    response.cookies.set('sentinel_user', JSON.stringify(sessionPayload), {
      httpOnly: false,
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   60 * 60 * 24 * 7, // 7 days
      path:     '/',
      sameSite: 'lax',
    });

    return response;

  } catch (err) {
    console.error('GitHub OAuth error:', err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=server_error`);
  }
}