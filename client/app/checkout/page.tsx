'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../context/CartContext'
import CheckoutForm from '../components/CheckoutForm'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')
  const { items } = useCart()

  useEffect(() => {
    if (items.length === 0) return;
    
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error('Error:', error))
  }, [items])

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#dc2626',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  }

  return (
    <div className="min-h-screen bg-black text-red-500 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance,
              loader: 'auto',
            }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="border-b pb-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                      <span>{item.title} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg mb-8">
                  <span>Total</span>
                  <span>
                    ${items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <CheckoutForm />
              </div>
            </div>
          </Elements>
        )}
      </div>
    </div>
  )
} 