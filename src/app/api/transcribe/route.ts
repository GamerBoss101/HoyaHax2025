import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import fs from "fs/promises";
import whisper from "openai-whisper";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parsing for file uploads
  },
};

// Whisper model (initialize once for efficiency)
const model = whisper.load_model("base");

// Utility to transcribe audio
async function transcribeAudio(filePath: string): Promise<string> {
  const transcription = await model.transcribe(filePath);
  return transcription.text;
}

async function parseMultipartForm(req: NextRequest): Promise<File> {
  return new Promise((resolve, reject) => {
    const multerMiddleware = upload.single("audio");
    multerMiddleware(req as any, {} as any, (error: any) => {
      if (error) return reject(error);
      resolve(req.file);
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming multipart form data
    const file = await parseMultipartForm(req);

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const filePath = file.path;

    // Transcribe the audio
    const transcription = await transcribeAudio(filePath);

    // Clean up the uploaded file
    await fs.unlink(filePath);

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("Error during transcription:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
