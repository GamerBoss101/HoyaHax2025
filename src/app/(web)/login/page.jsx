"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useUser } from "@clerk/nextjs";

import {
	SignInButton,
	SignedOut,
} from '@clerk/nextjs';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {

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
		if (userData.role === "caregiver") {
			window.location.href = "suite/doctor/dashboard";
		}
		if (userData.role === "patient") {
			window.location.href = "suite/patient/dashboard";
		}
	}


	return (
		<div className="min-h-screen flex bg-gray-100">
			<Card className="h-1/4 w-1/4 mx-auto my-20">
				<CardHeader className="text-center">
					<CardTitle>Welcome</CardTitle>
					<CardDescription>Choose your login type</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<SignedOut>
						<Button className="w-full">
							<SignInButton>Patient Login</SignInButton>
						</Button>
						<Button asChild variant="outline" className="w-full">
							<SignInButton>Doctor Login</SignInButton>
						</Button>
					</SignedOut>
				</CardContent>
			</Card>
		</div>
	)
}

