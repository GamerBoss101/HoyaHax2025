"use client"

import { useState } from "react"
import Sidebar from "@/components/panel-ui/doctor/app-sidebar"
import Navbar from "@/components/panel-ui/doctor/app-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen] = useState(true)
    
    return (
        <SidebarProvider defaultOpen={isSidebarOpen} >
            <Sidebar/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}