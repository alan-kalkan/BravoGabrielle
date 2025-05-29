import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if STRIPE_SECRET_KEY is configured
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured in environment variables')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
})

interface CartItem {
  id: string
  price: number
  quantity: number
  title: string
}

export async function POST(req: Request) {
  try {
    // Verify stripe is properly initialized
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not properly configured' },
        { status: 500 }
      )
    }

    const { items } = await req.json() as { items: CartItem[] }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items provided' },
        { status: 400 }
      )
    }

    // Calculate the total amount
    const amount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid order amount' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        order_items: JSON.stringify(
          items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment Intent Error:', error)
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    )
  }
} 