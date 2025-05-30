'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <div className="min-h-screen relative">
            <div 
              className="fixed inset-0 z-[-1] bg-black"
              style={{
                backgroundImage: 'url(/fond-rayon.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'screen'
              }}
            />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
