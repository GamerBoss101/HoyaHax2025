"use client";

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="centered-content">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
