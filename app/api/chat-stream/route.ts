import { NextResponse } from "next/server";
import { env } from "@/env.mjs";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "what is the first online game to be played competitively?",
        },
      ],
      stream: true,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
  });

  const data = await response.json();
  return NextResponse.json({ data });
}
