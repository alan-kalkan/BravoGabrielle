'use client'

import { useState, useEffect } from 'react'
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'
import { useSearchParams } from 'next/navigation'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isProcessing, setIsProcessing] = useState(false)
  const { clearCart } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if the URL indicates a successful payment
    if (searchParams.get('payment_intent_client_secret')) {
      stripe?.retrievePaymentIntent(searchParams.get('payment_intent_client_secret')!)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              clearCart()
              break
            case "processing":
              console.log("Your payment is processing.")
              break
            case "requires_payment_method":
              console.log("Your payment was not successful, please try again.")
              break
            default:
              console.log("Something went wrong.")
              break
          }
        })
    }
  }, [searchParams, stripe, clearCart])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      })

      if (error) {
        setErrorMessage(error.message)
      }
    } catch (error) {
      console.error('Payment failed:', error)
      setErrorMessage('Payment failed. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
          <AddressElement 
            options={{
              mode: 'shipping',
              allowedCountries: ['US', 'CA', 'GB', 'FR'],
            }}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Payment Method</h3>
          <PaymentElement 
            options={{
              layout: 'tabs',
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
            }}
          />
        </div>
      </div>

      <button
        disabled={!stripe || isProcessing}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium
                 hover:bg-red-700 transition-colors disabled:bg-gray-400 
                 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Pay now'}
      </button>

      {errorMessage && (
        <div className="text-red-600 mt-4 text-center">{errorMessage}</div>
      )}
    </form>
  )
} 