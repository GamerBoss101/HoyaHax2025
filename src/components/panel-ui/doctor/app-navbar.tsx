import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs';

import { Menu } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { ModeToggle } from "@/components/theme-toggle"

export default function Navbar() {
    return (

        <nav className="bg-white dark:bg-neutral-800 dark:text-white">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <SidebarTrigger className="text-gray-200 focus:outline-none focus:text-gray-300 dark:focus:text-gray-700">
                            <Menu className="h-6 w-6" />
                        </SidebarTrigger>
                        <span className="ml-4 text-xl font-semibold">My Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center lg:order-2">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <ModeToggle />
                            <div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 rounded-md mx-2">
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

