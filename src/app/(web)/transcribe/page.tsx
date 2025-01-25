"use client";

import React, { useState, useRef } from "react";
import axios from "axios";

const AudioTranscriber: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file transcription
  const handleTranscription = async (audioFile: File) => {
    if (!audioFile) return alert("No audio file to transcribe!");

    const formData = new FormData();
    formData.append("file", audioFile);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      alert("Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = []; // Reset audio chunks
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });
        setFile(audioFile); // Save the recorded file

        // Transcribe the recorded audio
        setTranscription("Transcribing the recorded audio...");
        await handleTranscription(audioFile);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording. Please check microphone permissions.");
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
    </div>
  );
};

export default AudioTranscriber;
