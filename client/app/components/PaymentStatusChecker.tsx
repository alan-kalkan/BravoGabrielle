'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentStatusChecker() {
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

  return null
} 