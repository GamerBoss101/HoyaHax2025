"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const AccountPage = () => {
	const { user } = useUser();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			axios.get(`/api/user?userId=${user.id}`).then(response => {
				setUserData(response.data);
				if (response.data.role === 'caregiver') {
					axios.get('/api/patients').then(res => setPatients(res.data));
				}
			});
		}
	}, [user]);

	if (!userData) return <div>Loading...</div>;

	const [medications, setMedications] = useState([]);
	const handleMedicationsChange = (index, field, value) => {
		const newMedications = [...medications];
		newMedications[index][field] = value;
		setMedications(newMedications);
	}

	const handleAddMedication = () => {
		setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
	}

	const [diagnoses, setDiagnoses] = useState(userData.diagnoses || []);
	const handleDiagnosesChange = (e) => {
		setDiagnoses(e.target.value.split(','));
	}

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
					<div className="mb-4">
						<Label>Medications:</Label>
						<br/>
						{medications.map((medication, index) => (
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
						<div className="mb-2 grid grid-cols-4 gap-2">
							<Input
								type="text"
								placeholder="Name"
								className="mb-2"
							/>
							<Input
								type="text"
								placeholder="Dosage"
								className="mb-2"
							/>
							<Input
								type="text"
								placeholder="Frequency"
								className="mb-2"
							/>
							<Button onClick={handleAddMedication}>Add Medication</Button>
						</div>
					</div>
					<div className="mb-4">
						<Label>Diagnoses:</Label>
						<Input
							type="text"
							value={diagnoses.join(',')}
							onChange={handleDiagnosesChange}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;