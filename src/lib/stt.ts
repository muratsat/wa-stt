import { OpenAI } from "openai";
import { env } from "@/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export const speechToText = async (base64Audio: string, mimetype: string) => {
  const audioBytes = Buffer.from(base64Audio, "base64");
  const audioFile = new Blob([audioBytes], { type: mimetype });

  const transcription = await openai.audio.transcriptions.create({
    model: "gpt-4o-transcribe",
    file: audioFile
  });

  return transcription.text;
};
