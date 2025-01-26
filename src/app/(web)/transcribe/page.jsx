"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState, useRef } from "react";

import { AlertCircle } from "lucide-react"

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AudioTranscriber = () => {
	const [file, setFile] = useState(null);
	const [transcription, setTranscription] = useState(null);
	const [loading, setLoading] = useState(false);
	const [recording, setRecording] = useState(false);
	const [error, setError] = useState(null);
	const mediaRecorderRef = useRef(null);
	const audioChunksRef = useRef([]);
	const [audioBlob, setAudioBlob] = useState(null);

	// Handle file selection
	const handleFileChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
			console.log("File selected:", event.target.files[0].name);
		}
	};

	// Handle file transcription
	const handleTranscription = async () => {
		console.log(audioBlob, process.env.REACT_APP_GOOGLE_CLOUD_API_KEY)

		const formData = new FormData();
		formData.append('audio', new Blob(audioChunksRef.current, { type: "audio/mp3" }));

		try {
			const response = await axios.post(
				'https://speech.googleapis.com/v1/speech:recognize', // Replace with your actual endpoint
				formData,
				{
					headers: {
						'Access-Control-Allow-Origin': '*/*',
						'Authorization': `Bearer AIzaSyCgQ_pa8AbNBUViQkqf2sNJQ8zl-fIPQfs`, // Replace with your API key
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log(response.data.results[0].alternatives[0].transcript);

			setTranscription(response.data.results[0].alternatives[0].transcript);
		} catch (error) {
			console.error('Error transcribing audio:', error);
			setTranscription('Transcription failed.');
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
				console.log("Recording stopped. Blob created:", audioBlob);

				setAudioBlob(new Blob(audioChunksRef.current, { type: "audio/mp3" }));
				setTranscription("Processing transcription for recorded audio...");
				await handleTranscription(); // Automatically transcribe
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
		<section className="mx-auto my-auto bg-white dark:bg-neutral-950 h-screen w-1/2">
			<h1 className="text-4xl font-bold text-center mb-8">
				<center>
					Audio Transcription
				</center>
			</h1>
			<br />
			<div>
				<h2>Upload or Record Audio</h2>

				<Input type="file" accept="audio/*" onChange={handleFileChange} />
				<Button className="my-4" onClick={() => file && handleTranscription()} disabled={loading || !file}>
					{loading ? "Transcribing..." : "Transcribe"}
				</Button>
			</div>

			<div>
				<h2>Record Audio</h2>
				{!recording ? (
					<Button onClick={startRecording}>Start Recording</Button>
				) : (
					<Button onClick={stopRecording} disabled={!recording}>Stop Recording</Button>
				)}
			</div>

			<Card className="mt-4 bg-neutral-200 dark:bg-neutral-800">
				<CardHeader>
					<CardTitle>Transcription Result</CardTitle>
				</CardHeader>
				<CardContent>
					<CardContent>
						{loading
							? "Processing transcription..."
							: transcription
								? "Your transcription is ready"
								: "No transcription available yet"}
					</CardContent>
				</CardContent>
			</Card>

			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						<strong>Error:</strong> {error}
					</AlertDescription>
				</Alert>
			)}
		</section>
	);
};

export default AudioTranscriber;



/*
"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mic, Upload, StopCircle, FileAudio } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const AudioTranscriber: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	if (event.target.files && event.target.files.length > 0) {
	  setFile(event.target.files[0])
	  console.log("File selected:", event.target.files[0].name)
	}
  }

  const handleTranscription = async (audioFile: File) => {
	if (!audioFile) {
	  setError("No audio file to transcribe!")
	  return
	}

	console.log("Starting transcription for:", audioFile.name)

	const formData = new FormData()
	formData.append("file", audioFile)

	setLoading(true)
	setError(null)
	try {
	  const response = await axios.post("http://localhost:8000/transcribe", formData, {
		headers: {
		  "Content-Type": "multipart/form-data",
		},
	  })

	  console.log("Transcription response:", response.data)

	  if (response.data && response.data.transcription) {
		setTranscription(response.data.transcription)
	  } else {
		setError("Unexpected response format. Check backend API.")
		console.error("Invalid response format:", response.data)
	  }
	} catch (error) {
	  console.error("Error transcribing audio:", error)
	  setError("Failed to transcribe audio. Please try again.")
	} finally {
	  setLoading(false)
	}
  }

  const startRecording = async () => {
	try {
	  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
	  console.log("Microphone access granted.")

	  mediaRecorderRef.current = new MediaRecorder(stream)
	  audioChunksRef.current = []

	  mediaRecorderRef.current.ondataavailable = (event) => {
		if (event.data.size > 0) {
		  console.log("Audio chunk received:", event.data)
		  audioChunksRef.current.push(event.data)
		}
	  }

	  mediaRecorderRef.current.onstop = async () => {
		const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" })
		const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" })

		console.log("Recording stopped. Blob created:", audioBlob)

		setFile(audioFile)
		setTranscription("Processing transcription for recorded audio...")
		await handleTranscription(audioFile)
	  }

	  mediaRecorderRef.current.start()
	  console.log("Recording started.")
	  setRecording(true)
	} catch (error) {
	  console.error("Error starting recording:", error)
	  setError("Failed to start recording. Please check microphone permissions.")
	}
  }

  const stopRecording = () => {
	if (mediaRecorderRef.current) {
	  console.log("Stopping recording...")
	  mediaRecorderRef.current.stop()
	  setRecording(false)
	}
  }

  return (
	<div className="container mx-auto px-4 py-8">
	  <h1 className="text-4xl font-bold text-center mb-8">Audio Transcriber</h1>

	  <Card className="mb-8">
		<CardHeader>
		  <CardTitle>Transcribe Audio</CardTitle>
		  <CardDescription>Upload an audio file or record directly to transcribe</CardDescription>
		</CardHeader>
		<CardContent>
		  <Tabs defaultValue="upload" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
			  <TabsTrigger value="upload">Upload Audio</TabsTrigger>
			  <TabsTrigger value="record">Record Audio</TabsTrigger>
			</TabsList>
			<TabsContent value="upload">
			  <div className="space-y-4">
				<Label htmlFor="audio-file">Select an audio file</Label>
				<Input id="audio-file" type="file" accept="audio/*" onChange={handleFileChange} />
				<Button
				  onClick={() => file && handleTranscription(file)}
				  disabled={loading || !file}
				  className="w-full"
				>
				  {loading ? "Transcribing..." : "Transcribe"}
				  <Upload className="ml-2 h-4 w-4" />
				</Button>
			  </div>
			</TabsContent>
			<TabsContent value="record">
			  <div className="space-y-4">
				<Label>Record audio from your microphone</Label>
				{!recording ? (
				  <Button onClick={startRecording} className="w-full">
					Start Recording
					<Mic className="ml-2 h-4 w-4" />
				  </Button>
				) : (
				  <Button onClick={stopRecording} variant="destructive" className="w-full">
					Stop Recording
					<StopCircle className="ml-2 h-4 w-4" />
				  </Button>
				)}
			  </div>
			</TabsContent>
		  </Tabs>
		</CardContent>
	  </Card>

	  <Card>
		<CardHeader>
		  <CardTitle>Transcription Result</CardTitle>
		  <CardDescription>
			{loading
			  ? "Processing transcription..."
			  : transcription
				? "Your transcription is ready"
				: "No transcription available yet"}
		  </CardDescription>
		</CardHeader>
		<CardContent>
		  <Textarea
			value={transcription || ""}
			readOnly
			placeholder="Transcription will appear here"
			className="min-h-[200px]"
		  />
		</CardContent>
		{file && (
		  <CardFooter className="flex justify-between items-center">
			<div className="flex items-center">
			  <FileAudio className="mr-2 h-4 w-4" />
			  <span className="text-sm text-muted-foreground">{file.name}</span>
			</div>
			<Button variant="outline" onClick={() => setFile(null)}>
			  Clear
			</Button>
		  </CardFooter>
		)}
	  </Card>

	  {error && (
		<Alert variant="destructive" className="mt-4">
		  <AlertTitle>Error</AlertTitle>
		  <AlertDescription>{error}</AlertDescription>
		</Alert>
	  )}
	</div>
  )
}

export default AudioTranscriber
*/