import { Sidebar } from "@/components/panel-ui/doctor/app-sidebar"
import { Navbar } from "@/components/panel-ui/doctor/app-navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">{children}</main>
            </div>
        </div>
    )
}

