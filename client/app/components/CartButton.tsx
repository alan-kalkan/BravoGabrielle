'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Cart from './Cart'

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="relative text-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span>Cart ({itemCount})</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-red-500 shadow-lg rounded-md z-50">
          <Cart />
        </div>
      )}
    </div>
  )
} 