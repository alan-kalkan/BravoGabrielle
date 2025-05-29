'use client'

import Navbar from "@/app/components/Navbar"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
} 