import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  organization: env.OPENAI_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET() {
  const response = await openai.listEngines();
  return NextResponse.json(response.data.data);
}
