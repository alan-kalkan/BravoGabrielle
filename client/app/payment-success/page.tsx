'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentSuccessPage() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const stripe = await stripePromise
      if (!stripe) return

      const clientSecret = searchParams.get('payment_intent_client_secret')
      if (clientSecret) {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
        if (paymentIntent?.status === 'succeeded') {
          clearCart()
        }
      }
    }

    checkPaymentStatus()
  }, [searchParams, clearCart])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
} 