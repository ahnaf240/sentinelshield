import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, model } = await req.json();

    let responseMessage = "";

    // মডেল অনুযায়ী রেসপন্স লজিক
    if (model === "SentinelAI") {
      responseMessage = `[Sentinel Custom AI]: Scanning your request... Analyzing security protocols for: "${message}"`;
    } else if (model === "Gemini") {
      responseMessage = `[Gemini AI]: Hello! As your integrated assistant, I can help you with the cybersecurity analysis of "${message}".`;
    } else if (model === "ChatGPT") {
      responseMessage = `[ChatGPT]: Processing your query through GPT-4. Security assessment for "${message}" is in progress.`;
    } else {
      responseMessage = "SentinelShield: Please select a valid AI model.";
    }

    return NextResponse.json({ reply: responseMessage });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to AI services" }, { status: 500 });
  }
}