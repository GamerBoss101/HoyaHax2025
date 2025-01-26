"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { useRouter } from 'next/navigation';

const AccountPage = () => {
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
        if (userData.role != "patient") {
            router.push("/suite/doctor/dashboard");
        }
	}

	if (!userData) return <div>Loading...</div>;
	
	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader>
					<h1 className="text-2xl font-bold">Account Page</h1>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Label>Name:</Label>
						<p>{userData.name}</p>
					</div>
					<div className="mb-4">
						<Label>Email:</Label>
						<p>{userData.email}</p>
					</div>
					<div className="mb-4">
						<Label>Role:</Label>
						<p>{userData.role}</p>
					</div>
					<Label>Medications:</Label>
					<br />
					{userData.medications.map((medication, index) => (
						<div key={index} className="mb-2 grid grid-cols-3 gap-2">
							<p>{medication.name}</p>
							<p>{medication.dosage}</p>
							<p>{medication.frequency}</p>
						</div>
					))}
					<div className="mb-4">
						<Label>Diagnoses:</Label>
						<p>{userData.diagnoses ? userData.diagnoses.join(', ') : ''}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;