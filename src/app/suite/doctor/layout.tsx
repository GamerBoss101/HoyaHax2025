"use client"

import { AppSidebar } from "@/components/panel-ui/app-sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <AppSidebar />
            <main suppressHydrationWarning>{children}</main>
        </div>
    )
}
