import { NextResponse } from 'next/server';

export async function POST(request) {
  const { idToken } = await request.json();
  if (!idToken) return NextResponse.json({ error: 'No token' }, { status: 400 });

  const response = NextResponse.json({ success: true });
  response.cookies.set('idToken', idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax',
  });
  return response;
} 