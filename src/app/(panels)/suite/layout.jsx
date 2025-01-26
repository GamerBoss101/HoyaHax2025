"use client"

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import axios from "axios";

export default function RootLayout({
    children,
}) {
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
	} else {
        window.location.href = "/";
    }



    return (
		<div>
			{children}
		</div>
	)
}
