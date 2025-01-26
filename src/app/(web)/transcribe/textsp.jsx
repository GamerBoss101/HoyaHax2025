import React, { useState, useRef } from 'react';
import axios from 'axios';

function SpeechToText() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [transcription, setTranscription] = useState('');
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    setAudioBlob(new Blob([event.data], { type: 'audio/webm' }));
                }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleTranscription = async () => {
        if (!audioBlob) {
            alert('No audio recorded.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');

        try {
            const response = await axios.post(
                'https://speech.googleapis.com', // Replace with your actual endpoint
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}`, // Replace with your API key
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setTranscription(response.data.results[0].alternatives[0].transcript);
        } catch (error) {
            console.error('Error transcribing audio:', error);
            setTranscription('Transcription failed.');
        }
    };

    return (
        <div>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <button onClick={handleTranscription} disabled={!audioBlob}>
                Transcribe
            </button>
            <p>Transcription: {transcription}</p>
        </div>
    );
}

export default SpeechToText;