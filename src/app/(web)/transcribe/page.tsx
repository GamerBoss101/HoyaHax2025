"use client";

import React, { useState } from "react";
import axios from "axios";

const AudioTranscriber: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [transcription, setTranscription] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleTranscription = async () => {
		if (!file) return alert("Please select an audio file to transcribe!");

		const formData = new FormData();
		formData.append("file", file);

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

	return (
		<div className="h-screen container mx-auto block items-center justify-center p-6">
			<h1>Audio Transcription: </h1>
			<input type="file" accept="audio/*" onChange={handleFileChange} />
			<button onClick={handleTranscription} disabled={loading}>
				{loading ? "Transcribing..." : "Transcribe"}
			</button>
			{transcription && (
				<div>
					<h2>Transcription:</h2>
					<p>{transcription}</p>
				</div>
			)}
		</div>
	);
};

export default AudioTranscriber;
