"use client"
import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

import '../globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ClerkProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Navbar />
						<main suppressHydrationWarning>{children}</main>
						<Footer />
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
