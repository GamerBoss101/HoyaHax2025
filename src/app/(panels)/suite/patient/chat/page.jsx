"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/panel-ui/patient/app-chat";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const router = useRouter();
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([{type: 'bot', text: 'Hello! How can I help you today?'}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/user?userId=${user.id}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (userData && userData.role !== "patient") {
      router.push("/suite/doctor/dashboard");
    }
  }, [userData, router]);

  const handleSend = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/chat", { query: userQuery });

      const botResponse = response.data?.answer || "No response from the bot.";

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: userQuery },
        { type: "bot", text: botResponse },
      ]);

      setUserQuery("");
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: userQuery },
        { type: "bot", text: "An error occurred while processing your request." },
      ]);
    } finally {
      setLoading(false);
    }
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
                  sender={msg.type === "user" ? "You" : "Bot"}
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
                {loading ? "Loading..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
