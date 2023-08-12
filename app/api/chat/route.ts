import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  organization: env.OPENAI_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "what is the first online game to be played competitively?",
      },
    ],
  });
  return NextResponse.json({ data: response.data });
}
