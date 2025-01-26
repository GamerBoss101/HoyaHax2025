/*

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

*/

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Mic } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className="h-6 w-6" />
                <h1 className="text-2xl font-bold">PostCare</h1>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="#" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-muted mt-8">
            <div className="container mx-auto px-4 py-6 text-center">
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

