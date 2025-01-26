import fs, {unlinkSync, existsSync } from 'fs';
import path from 'path';
import { config } from 'dotenv';
import formidable from 'formidable';
import { AxiosError } from 'axios';
import OpenAI from 'openai';

// Load environment variables
config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is missing. Set OPENAI_API_KEY in your .env.local file.');
}

// Initialize OpenAI client
const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const apiconfig = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

// Helper to parse multipart form data
async function parseMultipartForm(req) {
  const form = formidable({
    multiples: false, // Single file upload
    uploadDir: '/tmp', // Temporary directory
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50 MB
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const file = files.file;
      if (!file) {
        reject(new Error('No file found in the upload.'));
        return;
      }

      resolve({
        filePath: file.filepath,
        originalFilename: file.originalFilename || 'unknown',
      });
    });
  });
}

// Main handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  let filePath = null;

  try {
    // Parse file upload
    const { filePath: tempFilePath, originalFilename } = await parseMultipartForm(req);
    filePath = tempFilePath;

    // Log file details
    console.log('Uploaded file path:', filePath);
    console.log('Original filename:', originalFilename);

    // Validate file extension
    const allowedExtensions = ['mp3', 'wav', 'm4a'];
    const fileExtension = path.extname(originalFilename).toLowerCase().replace('.', '');
    if (!allowedExtensions.includes(fileExtension)) {
      unlinkSync(filePath);
      return res.status(400).json({
        error: `Invalid file format. Only ${allowedExtensions.join(', ')} are supported.`,
      });
    }

    // Create file stream
    const audio_file = fs.createReadStream(filePath);

    // Step 2: Get transcription from OpenAI Whisper model
    console.log('Requesting transcription...');
    const transcription = await openaiClient.audio.transcriptions.create({
      file: audio_file,
      model: 'whisper-1',
      response_format: 'text',
    });

    // Clean up temporary file
    if (filePath && existsSync(filePath)) {
      unlinkSync(filePath);
    }

    // Send response back to client
    return res.status(200).json({ transcription: transcription.text });
  } catch (error) {
    console.error('Error during transcription:', error);

    if (error instanceof AxiosError) {
      console.error('OpenAI API error:', error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({
        error: error.response?.data?.error?.message || 'OpenAI API Error.',
      });
    }

    return res.status(500).json({
      error: 'An unexpected error occurred.',
    });
  } finally {
    if (filePath) {
      try {
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      } catch (err) {
        console.error('Failed to clean up temporary file:', err);
      }
    }
  }
}
