"use client"

import * as React from "react"
import Link from "next/link"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs';

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
	const { setTheme } = useTheme()

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center mx-auto">
				<div className="mr-4 hidden md:flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="hidden font-bold sm:inline-block">MyApp</span>
					</Link>
					<nav className="flex items-center space-x-6 text-sm font-medium">
						<Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
							About
						</Link>
						<Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
							Products
						</Link>
						<Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
							Contact
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>
					<ClerkProvider>
						<div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md">
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</ClerkProvider>
				</div>
			</div>
		</header>
	)
}

