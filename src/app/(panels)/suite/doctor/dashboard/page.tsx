"use client"

import { PatientTable } from "./PatientTable"


export default function Dashboard() {

    const patients = [
        { id: 1, name: "John Doe", age: 30, lastVisit: "2024-10-01" },
        { id: 2, name: "Jane Smith", age: 25, lastVisit: "2024-09-15" },
        { id: 3, name: "Sam Johnson", age: 40, lastVisit: "2024-10-05" },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PatientTable data={patients} />
            </div>
        </div>
    )
}

