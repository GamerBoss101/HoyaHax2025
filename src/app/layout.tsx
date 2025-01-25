import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { HTMLAttributes } from 'react';

export default function RootLayout({
  children,
  style
}: {
  children: React.ReactNode;
  style?: HTMLAttributes<HTMLDivElement>['style'];
}) {
  return (
    <ClerkProvider>
      <html lang="en" style={style}>
        <body className="centered-content">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
