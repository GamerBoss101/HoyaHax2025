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

export function PatientTable({ data }) {

    return (
        <Card className="rounded-md border">
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Last Visit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((patients) => (
                        <TableRow key={patients.id}>
                            <TableCell>{patients.name}</TableCell>
                            <TableCell>{patients.age}</TableCell>
                            <TableCell>{new Date(patients.lastVisit).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}
