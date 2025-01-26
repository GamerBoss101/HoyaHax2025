import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { faker } from "@faker-js/faker"


export function AgeChart() {

    const patients = generateFakePatients(100)

    const ageGroups = {
        "18-30": 0,
        "31-50": 0,
        "51-70": 0,
        "71+": 0,
    }

    patients.forEach((patient) => {
        if (patient.age <= 30) ageGroups["18-30"]++
        else if (patient.age <= 50) ageGroups["31-50"]++
        else if (patient.age <= 70) ageGroups["51-70"]++
        else ageGroups["71+"]++
    })

    const chartData = Object.entries(ageGroups).map(([range, count]) => ({ range, count }))

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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}


