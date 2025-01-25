"use client"

import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<Navbar />
				<main suppressHydrationWarning>{children}</main>
			</ThemeProvider>
		</body>
	</html>
	)
}
