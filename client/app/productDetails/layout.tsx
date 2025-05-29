'use client'

import Navbar from "@/app/components/Navbar"

export default function ProductDetailsLayout({
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