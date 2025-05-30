'use client'

import { CartProvider } from "@/app/context/CartContext"
import { useState, useEffect } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CartProvider>
      <div className="min-h-screen relative">
        <div 
          className="fixed inset-0 z-[-1] bg-black opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage: 'url(/fond-rayon.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'screen',
            opacity: mounted ? 1 : 0
          }}
        />
        {children}
      </div>
    </CartProvider>
  )
} 