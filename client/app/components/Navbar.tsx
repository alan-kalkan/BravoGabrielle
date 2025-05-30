'use client'

import CartButton from "./CartButton"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const isShopPage = pathname?.includes('/shop')

  return (
    <header className="shadow-sm bg-white fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/home" className="relative group">
          <Image src='/puzzles/puzzle-6.svg' alt='puzzle' width={70} height={70} className="hover:scale-110 transition-all duration-300 cursor-pointer" />
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 font-medium">
            Retour
          </span>
        </Link>
        <Link href="/home" className="text-xl text-red-500 font-bold hover:text-red-600">
          Bravofoune
        </Link>
        {isShopPage && <CartButton />}
      </nav>
    </header>
  )
} 