import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  organization: env.OPENAI_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "what is the first online game to be played competitively?",
      },
    ],
  });

  if (response.ok) {
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  }

  return NextResponse.json(await response.json(), { status: 400 });
}
