"use client";

import './globals.css';
import React from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <body className="centered-content">
          {children}
        </body>
      </html>
  );
}
