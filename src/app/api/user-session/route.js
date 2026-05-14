import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    authenticated: true,
    session_id: "SENTINEL-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    last_login: new Date().toLocaleString()
  });
}