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

import { ModeToggle } from "@/components/theme-toggle"

export function Navbar() {
    return (
        <nav className="border-b border-gray-200 px-4 py-2.5 dark:bg-neutral-900 bg-neutral-100 dark:border-gray-700">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center justify-start">
                    <Button variant="ghost" className="text-xl font-semibold flex items-center">
                        Dashboard
                    </Button>
                </div>
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
        </nav>
    )
}

