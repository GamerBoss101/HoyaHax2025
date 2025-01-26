
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import PersonForm from "@/components/PersonForm";
import { Card } from "@/components/ui/card";


export default function Dashboard() {

    const router = useRouter();
    const { user } = useUser();
	const [userData, setUserData] = useState(null);
	const [patients, setPatients] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`/api/user?userId=${user.id}`).then(response => {
                setUserData(response.data);
            });
        }
    }, [user]);

    if (userData) {
        if (userData.role != "caregiver") {
            router.push("/suite/patient/dashboard");
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Patients</h1>
            <div className="h-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardContent>
                        {userData.role === 'caregiver' && (
                            <div>
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
        </div>
    )
}