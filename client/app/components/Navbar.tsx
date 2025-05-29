'use client'

import CartButton from "./CartButton"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/shop" className="text-xl text-red-500 font-bold hover:text-red-600">
          Bravofoune
        </Link>
        <CartButton />
      </nav>
    </header>
  )
} 