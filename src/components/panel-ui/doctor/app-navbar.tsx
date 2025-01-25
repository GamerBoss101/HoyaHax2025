import { Bell, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Menu } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { ModeToggle } from "@/components/theme-toggle"

export default function Navbar() {
    return (

        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <SidebarTrigger className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <Menu className="h-6 w-6" />
                        </SidebarTrigger>
                        <span className="ml-4 text-xl font-semibold text-gray-800">My Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center lg:order-2">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

