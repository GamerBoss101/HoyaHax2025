from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import tempfile

app = FastAPI()
model = whisper.load_model("base")  # Load the model once for efficiency

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin (adjust as needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Authorization, Content-Type, etc.)
)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Save the uploaded file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        temp_file.write(await file.read())
        temp_path = temp_file.name

    try:
        # Transcribe the audio
        result = model.transcribe("inputs/test.mp3")
        transcription = result["text"]
        print(transcription)
    finally:
        # Clean up temporary file
        os.remove(temp_path)

    return {"transcription": transcription}
