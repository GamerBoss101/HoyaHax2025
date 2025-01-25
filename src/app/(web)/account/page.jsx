"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/card';


const AccountPage = () => {
	const { user } = useUser();
	const [userData, setUserData] = useState(null);
	const [patients, setPatients] = useState([]);
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [medications, setMedications] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);

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

	const handleRoleChange = async () => {
		const newRole = userData.role === 'patient' ? 'caregiver' : 'patient';
		await axios.put(`/api/user?userId=${user.id}`, { role: newRole });
		setUserData({ ...userData, role: newRole });
		if (newRole === 'caregiver') {
			axios.get('/api/patients').then(res => setPatients(res.data));
		} else {
			setPatients([]);
			setSelectedPatient(null);
		}
	};

	const handlePatientSelect = (patient) => {
		setSelectedPatient(patient);
		setMedications(patient.medications);
		setDiagnoses(patient.medicalConditions);
	};

	const handleMedicationsChange = (index, field, value) => {
		const updatedMedications = [...medications];
		updatedMedications[index][field] = value;
		setMedications(updatedMedications);
	};

	const handleDiagnosesChange = (e) => {
		setDiagnoses(e.target.value.split(','));
	};

	const handleSave = async () => {
		await axios.put(`/api/patients/${selectedPatient.email}`, {
			medications,
			medicalConditions: diagnoses,
		});
		alert('Patient data updated successfully');
	};

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
					<Button onClick={handleRoleChange} className="mb-4">
						Change role to {userData.role === 'patient' ? 'caregiver' : 'patient'}
					</Button>

					{userData.role === 'caregiver' && (
						<div>
							<h2 className="text-xl font-bold mb-4">Patients</h2>
							<ul className="mb-4">
								{patients.map(patient => (
									<li
										key={patient.email}
										onClick={() => handlePatientSelect(patient)}
										className="cursor-pointer hover:bg-gray-200 p-2"
									>
										{patient.name}
									</li>
								))}
							</ul>

							{selectedPatient && (
								<Card>
									<CardHeader>
										<h3 className="text-xl font-bold">Edit Patient: {selectedPatient.name}</h3>
									</CardHeader>
									<CardContent>
										<div className="mb-4">
											<Label>Medications:</Label>
											{medications.map((medication, index) => (
												<div key={index} className="mb-2">
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
									<CardFooter>
										<Button onClick={handleSave}>Save</Button>
									</CardFooter>
								</Card>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;