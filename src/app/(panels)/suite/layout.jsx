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
		if (userData.role === "caregiver" && router.pathname.startsWith("/suite/patient/")) {
			router.push("/suite/doctor/dashboard");
		}
		if (userData.role === "patient" && router.pathname.startsWith("/suite/doctor/")) {
			router.push("/suite/patient/dashboard");
		}
	}


    return (
		<div>
			{children}
		</div>
	)
}
