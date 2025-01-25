"use client"

import { useState } from "react"
import axios from "axios"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function PersonForm({ person }: any) {

    const [medications, setMedications] = useState(person.medications || [])

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

    }

    const [diagnoses, setDiagnoses] = useState(person.diagnoses || [])

    const handleDiagnosesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setDiagnoses(value.split(','))
    }

    const handleAddMedication = () => {
        setMedications([...medications, { name: '', dosage: '', frequency: '' }])
    }

    const handleMedicationsChange = (index: number, field: string, value: string) => {
        const updatedMedications = [...medications]
        updatedMedications[index][field] = value
        setMedications(updatedMedications)
    }

    const handleSave = async () => {
        try {
            await axios.put(`/api/patients?email=${person.email}`, {
                medications,
                medicalConditions: diagnoses,
            });
            alert('Patient data updated successfully');
        } catch (error) {
            console.error('Error updating patient data:', error);
            alert('Failed to update patient data');
        }
    };


    return (
        <Card className="bg-neutral-100 dark:bg-neutral-950">
            <CardHeader>
                <h3 className="text-xl font-bold">Edit Patient: {person.name}</h3>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Label>Medications:</Label>
                    <br />
                    {medications.map((medication: any, index: number) => (
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
            <CardFooter>
                <Button className="mx-auto w-1/2" onClick={handleSave}>Save</Button>
            </CardFooter>
        </Card>
    )
}

