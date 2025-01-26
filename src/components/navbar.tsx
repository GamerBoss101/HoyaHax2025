"use client"

import * as React from "react"
import Link from "next/link"

import {
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs';

import { ModeToggle } from "@/components/theme-toggle"

export function Navbar() {

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" suppressHydrationWarning={true}>
			<div className="container flex h-14 items-center mx-auto">
				<div className="mr-4 hidden md:flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="hidden font-bold sm:inline-block">PostCare</span>
					</Link>
					<nav className="flex items-center space-x-6 text-sm font-medium">
						<Link href="/transcribe" className="transition-colors hover:text-foreground/80 text-foreground/60">
							Transcribe
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<ModeToggle />
					<SignedOut>
						<Link
							href="/login"
							className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
						>
							Login
						</Link>
					</SignedOut>
					<SignedIn>
						<div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 rounded-md">
							<UserButton />
						</div>
					</SignedIn>
				</div>
			</div>
		</header>
	)
}

