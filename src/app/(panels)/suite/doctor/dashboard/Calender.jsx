"use client"
import { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

import { Card, CardContent } from "@/components/ui/card"

export function ScheduleCalender() {

    const [date, setDate] = useState(new Date())

    return (
        <Card>
            <CardContent className="px-auto py-5">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md my-auto mx-auto w-fit"
                />
            </CardContent>
        </Card>
    )
}
