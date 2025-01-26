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

	if (!userData) return <div>Loading...</div>;

	if (userData) {
        if (userData.role != "caregiver") {
            router.push("/suite/patient/dashboard");
        }
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
				</CardContent>
			</Card>
		</div>
	);
};

export default AccountPage;