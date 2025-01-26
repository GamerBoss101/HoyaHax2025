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

	useEffect(() => {
		if (user) {
			axios.get(`/api/user?userId=${user.id}`).then(response => {
				setUserData(response.data);
			});
		}
	}, [user]);

	if (userData) {
        if (userData.role !== "doctor") {
            router.push("/suite/patient/dashboard");
        }
	} else {
        router.push("/");
    }

    return (
        <div className="container mx-auto">
            <div className="grid gap-4">
                <Card>
                    <CardContent className="space-y-4 p-4">
                            <div className="block items-center">
                                <Message avatarUrl="/vercel.svg" message="Hello, how can I assist you today?" sender="Dr. Smith" />
                                <Message avatarUrl="/vercel.svg" message="I have some questions about my medication." sender="You" />
                            </div>
                            <div className="flex items-center">
                                <Input id="message" placeholder="Type your message here..." className="flex-grow mx-0 rounded-none" />
                                <Button className="mx-0 rounded-none">Send</Button>
                            </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}