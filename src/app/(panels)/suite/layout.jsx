"use client"

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

import axios from "axios";

export default function RootLayout({
    children,
}) {
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
		console.log(userData);
		// make sure user only has access to one suite depending on their role 
		// if a user has a role of "caregiver" they should only have access to /suite/doctor/*
		
		if (userData.role === "patient" && !router.pathname.startsWith("/suite/patient")) {
			router.push("/suite/patient/dashboard");
		} else if (userData.role === "doctor" && !router.pathname.startsWith("/suite/doctor")) {
			router.push("/suite/doctor/dashboard");
		}

	} else {
		router.push("/");
	}

    return (
		<div>
			{children}
		</div>
	)
}
