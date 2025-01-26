"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

import { PersonForm } from './PatientForm';

import { useRouter } from 'next/navigation';

const AccountPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const [userData, setUserData] = useState(null);
	const [patients, setPatients] = useState([]);

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

	if (!userData) {
		router.push('/');
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
					<Button onClick={handleRoleChange} className="mb-4">
						Change role to {userData.role === 'patient' ? 'caregiver' : 'patient'}
					</Button>

					{userData.role === 'caregiver' && (
						<div>
							<h2 className="text-xl font-bold mb-4">Patients</h2>
							<ul className="mb-4">
								{patients.map(patient => (
									<Collapsible key={patient.id}>
										<div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-neutral-800 rounded-t-lg">
											<div>
												<h2 className="text-lg font-semibold">{patient.name}</h2>
												<p className="text-sm text-gray-400">{patient.role}</p>
											</div>
											<CollapsibleTrigger asChild>
												<Button variant="ghost" size="sm">
													<ChevronDown className="h-4 w-4" />
													<span className="sr-only">Toggle</span>
												</Button>
											</CollapsibleTrigger>
										</div>
										<CollapsibleContent className="p-4 border border-t-0 rounded-b-lg">
											<PersonForm person={patient} />
										</CollapsibleContent>
									</Collapsible>
								))}
							</ul>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;