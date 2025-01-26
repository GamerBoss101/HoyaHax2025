"use client"
import { AlignLeft } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export function Facts() {
    return (
        <section className="mx-auto my-auto bg-white dark:bg-gray-900">
            <Card>
                <CardContent>
                    <h1>
                        OUR MISSION
                    </h1>
                    <AlignLeft> PostCare we want to ensure the health of those throughout the world.</AlignLeft>
                    <AlignLeft>Our goal is to make sure that our services can ensure clarity and accessibility</AlignLeft>
                    <AlignLeft>As well as a smooth experience</AlignLeft>
                </CardContent>
            </Card>
        </section>
    )
}