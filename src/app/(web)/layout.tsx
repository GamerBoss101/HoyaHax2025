"use client"

import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

import '../globals.css'

interface RootLayoutProps {
	children: React.ReactNode;
  }
  
export default function RootLayout({ children }: RootLayoutProps) {
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
