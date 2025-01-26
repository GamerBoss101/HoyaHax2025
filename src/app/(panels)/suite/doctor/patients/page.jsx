
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PersonForm } from "./PatientForm";
import { Card } from "@/components/ui/card";

import { faker } from "@faker-js/faker";


export default function PatientsDOC() {

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

    if (userData) {
        if (userData && userData.role != "caregiver") {
            router.push("/suite/patient/dashboard");
        }
    }

    function generateFakePatients(count) {
        return Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 100 }),
            gender: faker.helpers.arrayElement(["male", "female", "other"]),
            bloodType: faker.helpers.arrayElement(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            lastCheckup: faker.date.recent({ days: 90 }),
            symptoms: faker.helpers.arrayElements(
                ["Fever", "Cough", "Fatigue", "Shortness of breath", "Headache", "Nausea", "Dizziness", "Chest pain"],
                { min: 0, max: 3 },
            ),
            vitalSigns: {
                temperature: faker.number.float({ min: 36.1, max: 37.5, precision: 0.1 }),
                heartRate: faker.number.int({ min: 60, max: 100 }),
                bloodPressure: `${faker.number.int({ min: 90, max: 140 })}/${faker.number.int({ min: 60, max: 90 })}`,
                respiratoryRate: faker.number.int({ min: 12, max: 20 }),
            },
        }))
    }

    let fakePatients = generateFakePatients(20);

    // add two arrays together
    let finalPatients = patients.concat(fakePatients);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Patients</h1>
            <div className="h-20 w-full">
                {userData && userData.role === 'caregiver' && (
                    <div className="space-y-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="mb-4">
                            {finalPatients.map(patient => (
                                <Collapsible key={patient.id}>
                                    <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-neutral-800 rounded-t-lg">
                                        <div>
                                            <h2 className="text-lg font-semibold">{patient.name}</h2>
                                            <p className="text-sm text-gray-500 dark:text-neutral-400">Age: {patient.age}</p>
                                            <p className="text-sm text-gray-500 dark:text-neutral-400">Last Checkup: {new Date(patient.lastCheckup).toLocaleDateString()}</p>
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}