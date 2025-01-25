"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card, CardContent } from "@/components/ui/card"

export function MedicationTable({ medications }) {

    return (
        <Card className="rounded-md border">
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medications.map((medication) => (
                        <TableRow key={medication.id}>
                            <TableCell>{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}
