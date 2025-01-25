from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import tempfile
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()
model = whisper.load_model("turbo")  # Load the model once for efficiency

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend origin (adjust as needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Authorization, Content-Type, etc.)
)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Check the file extension
    file_extension = file.filename.split('.')[-1].lower()
    if file_extension not in ["mp3", "wav", "flac", "m4a"]:
        raise HTTPException(status_code=400, detail="Invalid audio file format. Only mp3, wav, flac, or m4a are supported.")

    try:
        # Save the uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as temp_file:
            temp_file.write(await file.read())
            temp_path = temp_file.name

        logging.info(f"Audio file saved at: {temp_path}")

        # Transcribe the audio using Whisper
        result = model.transcribe(temp_path)
        transcription = result["text"]

        # Clean up temporary file
        os.remove(temp_path)
        logging.info(f"Temporary file {temp_path} removed after transcription.")

        return {"transcription": transcription}
    
    except Exception as e:
        logging.error(f"Error during transcription: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during transcription.")
