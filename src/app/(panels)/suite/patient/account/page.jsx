"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const AccountPage = () => {
	const { user } = useUser();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			axios.get(`/api/user?userId=${user.id}`).then(response => {
				setUserData(response.data);
			});
		}
	}, [user]);

	if (!userData) return <div>Loading...</div>;

	console.log(userData);

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
							<Input
								type="text"
								placeholder="Name"
								value={medication.name}
								onChange={(e) => handleMedicationsChange(index, 'name', e.target.value)}
								className="mb-2"
							/>
							<Input
								type="text"
								placeholder="Dosage"
								value={medication.dosage}
								onChange={(e) => handleMedicationsChange(index, 'dosage', e.target.value)}
								className="mb-2"
							/>
							<Input
								type="text"
								placeholder="Frequency"
								value={medication.frequency}
								onChange={(e) => handleMedicationsChange(index, 'frequency', e.target.value)}
								className="mb-2"
							/>
						</div>
					))}
					<div className="mb-4">
						<Label>Diagnoses:</Label>
						<p>{userData.diagnoses.join(', ')}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;