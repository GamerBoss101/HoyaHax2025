"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Message } from "@/components/panel-ui/patient/app-chat"
import { Input } from "@/components/ui/input"

import { Card, CardContent } from "@/components/ui/card"

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
    const router = useRouter();
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'bot', text: string }>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get(`/api/user?userId=${user.id}`).then(response => {
                setUserData(response.data);
            });
        }
    }, [user]);

    if (userData) {
        if (userData.role !== "patient") {
            router.push("/suite/doctor/dashboard");
        }
    }

    const handleSend = async () => {
        if (!userQuery.trim()) return;

        setLoading(true);
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userQuery }),
        });

        const data = await response.json();

        setChatHistory([
            ...chatHistory,
            { type: 'user', text: userQuery },
            { type: 'bot', text: data.answer },
        ]);

        setUserQuery('');
        setLoading(false);
    };

    return (
        <div className="container mx-auto">
            <div className="grid gap-4">
                <Card>
                    <CardContent className="space-y-4 p-4">
                        <div className="block items-center">
                            {chatHistory.map((msg, idx) => (
                                <Message 
                                    key={idx} 
                                    avatarUrl="/vercel.svg" 
                                    message={msg.text} 
                                    sender={msg.type === 'user' ? "You" : "Bot"} 
                                />
                            ))}
                        </div>
                        <div className="flex items-center">
                            <Input 
                                id="message" 
                                placeholder="Ask a medical question" 
                                value={userQuery}
                                onChange={(e) => setUserQuery(e.target.value)}
                                className="flex-grow mx-0 rounded-none" 
                            />
                            <Button 
                                className="mx-0 rounded-none" 
                                onClick={handleSend} 
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Send'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
