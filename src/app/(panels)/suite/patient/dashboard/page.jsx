"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { IntenseChart } from "./IntensityChart"
import { MedicationTable } from "./MedicationTable"

export default function Dashboard() {

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
	}

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <IntenseChart />
                <MedicationTable medications={userData ? userData.medications : []} />
            </div>
        </div>
    )
}

