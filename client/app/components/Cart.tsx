'use client'

import { useCart } from '../context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-red-600 font-bold">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-4">
        <p className="text-xl font-bold text-right">
          Total: ${getCartTotal().toFixed(2)}
        </p>
        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
} 