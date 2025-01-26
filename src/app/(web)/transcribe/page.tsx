"use client";

import React, { useState, useRef } from "react";
import axios from "axios";

const AudioTranscriber: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Send the file to the backend for transcription
  const handleTranscription = async (audioFile: File) => {
    const formData = new FormData();
    formData.append("file", audioFile);
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post("/api/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle missing transcription property in the response
      if (response.data && response.data.transcription) {
        setTranscription(response.data.transcription);
      } else {
        setError("No transcription available.");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });

        setFile(audioFile); // Save the recorded file
        await handleTranscription(audioFile); // Automatically transcribe
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording. Please check microphone permissions.");
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Audio Transcription Tool</h1>

      <div>
        <h2>Upload or Record Audio</h2>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button
          onClick={() => file && handleTranscription(file)}
          disabled={loading || !file}
        >
          {loading ? "Transcribing..." : "Transcribe"}
        </button>
      </div>

      <div>
        <h2>Record Audio</h2>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording} disabled={!recording}>
            Stop Recording
          </button>
        )}
      </div>

      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default AudioTranscriber;
