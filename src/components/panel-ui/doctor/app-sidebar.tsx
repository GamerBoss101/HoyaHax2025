"use client"

import { Home, Settings, Users } from "lucide-react"
import Link from "next/link"

import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function Sidebar() {
	return (
		<ShadcnSidebar className="dark:bg-neutral-800">
			<SidebarHeader>
				<h2 className="text-xl font-bold p-4">Dashboard</h2>
			</SidebarHeader>
			<SidebarContent className="mx-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/suite/doctor/dashboard">
								<Home className="mr-2 h-4 w-4" />
								<span>Home</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/suite/doctor/patients">
								<Users className="mr-2 h-4 w-4" />
								<span>Patient</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/suite/doctor/account">
								<Settings className="mr-2 h-4 w-4" />
								<span>Account</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</ShadcnSidebar>
	)
}

