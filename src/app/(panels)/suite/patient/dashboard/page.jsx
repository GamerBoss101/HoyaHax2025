"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { IntenseChart } from "./IntensityChart"
import { MedicationTable } from "./MedicationTable"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

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

	// if (userData) {
    //     if (userData.role != "patient") {
    //         router.push("/suite/doctor/dashboard");
    //     }
	// }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <IntenseChart />
                <MedicationTable medications={userData ? userData.medications : []} />
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">How do you feel today?</h2>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder='Write how you feel?' className='w-full h-full' />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Doctor's Notes</h2>
                    </CardHeader>
                    <CardContent>
                        1. Excersise regularly<br />
                        2. Eat Less Red Meats and More Vegetables<br />
                        3. Get Plenty of Sleep<br />
                        4. Drink Plenty of Water<br />
                    </CardContent>
                </Card>
                <Card className='col-span-2'>
                    <CardHeader>
                        <h2 className="text-center text-lg font-semibold">Medical Summary</h2>
                    </CardHeader>
                    <CardContent>
                    Mr. Hoya is a 19-year-old male who presented on 01/16/2025 with hard cough. 
                    Their medical history includes [briefly list 1-2 significant conditions]. 
                    The physical examination revealed [briefly describe 1-2 key findings]. 
                    Relevant laboratory and imaging studies were performed, with results [briefly state key findings]. 
                    A differential diagnosis was considered, with [most likely diagnosis] being the primary consideration. 
                    The treatment plan includes [briefly describe 1-2 key treatment components], with scheduled follow-up appointments for ongoing monitoring.
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

