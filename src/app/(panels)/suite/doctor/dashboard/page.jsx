"use client"

import { PatientTable } from "./PatientTable"
import { AppointmentList } from "./AppList"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '@clerk/nextjs';

import React from "react";  


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
        if (userData.role != "caregiver") {
            router.push("/suite/patient/dashboard");
        }
    }

    const patients = [
        { id: 1, name: "John Doe", age: 30, lastVisit: "2024-10-01" },
        { id: 2, name: "Jane Smith", age: 25, lastVisit: "2024-09-15" },
        { id: 3, name: "Sam Johnson", age: 40, lastVisit: "2024-10-05" },
    ];


    const appointments = [
        { id: 1, patientId: 1, date: "2025-01-27T09:00:00", status: "Scheduled" },
        { id: 2, patientId: 2, date: "2025-01-27T10:30:00", status: "Scheduled" },
        { id: 3, patientId: 3, date: "2025-01-27T14:00:00", status: "Scheduled" },
        { id: 4, patientId: 4, date: "2025-01-28T11:00:00", status: "Scheduled" },
        { id: 5, patientId: 5, date: "2025-01-28T15:30:00", status: "Scheduled" },
    ]

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="h-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PatientTable data={patients} />
                <AppointmentList appointments={appointments} />
            </div>
        </div>
    )
}

