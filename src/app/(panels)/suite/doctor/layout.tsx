"use client"

import { AppSidebar } from "@/components/panel-ui/app-sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="w-full" suppressHydrationWarning>
            <AppSidebar />
            {children}
        </main>
    )
}
