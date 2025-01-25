"use client"

import * as React from "react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main suppressHydrationWarning>
            {children}
        </main>
    )
}
