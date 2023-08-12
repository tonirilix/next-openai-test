import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  organization: env.OPENAI_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
  });
  return NextResponse.json({ data: response.data.data });
}
