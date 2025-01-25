"use client";

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import React from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
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
