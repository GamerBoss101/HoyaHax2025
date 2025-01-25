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
      console.log("File selected:", event.target.files[0].name);
    }
  };

  // Handle file transcription
  const handleTranscription = async (audioFile: File) => {
    if (!audioFile) {
      alert("No audio file to transcribe!");
      return;
    }

    console.log("Starting transcription for:", audioFile.name);

    const formData = new FormData();
    formData.append("file", audioFile);

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:8000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Transcription response:", response.data);

      if (response.data && response.data.transcription) {
        setTranscription(response.data.transcription);
      } else {
        setError("Unexpected response format. Check backend API.");
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted.");

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = []; // Reset audio chunks

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Audio chunk received:", event.data);
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });

        console.log("Recording stopped. Blob created:", audioBlob);

        setFile(audioFile); // Save the recorded file
        setTranscription("Processing transcription for recorded audio...");
        await handleTranscription(audioFile); // Automatically transcribe
      };

      mediaRecorderRef.current.start();
      console.log("Recording started.");
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording. Please check microphone permissions.");
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Audio Transcription</h1>
      <div>
        <h2>Upload or Record Audio</h2>
        {/* File Upload */}
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={() => file && handleTranscription(file)} disabled={loading || !file}>
          {loading ? "Transcribing..." : "Transcribe"}
        </button>
      </div>

      {/* Recording Controls */}
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

      {/* Transcription Result */}
      <div>
        <h2>Transcription:</h2>
        {loading ? (
          <p>Processing transcription...</p>
        ) : transcription ? (
          <p>{transcription}</p>
        ) : (
          <p>No transcription available yet.</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default AudioTranscriber;
