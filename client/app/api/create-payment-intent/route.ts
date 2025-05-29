import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
    const { items } = await req.json() as { items: CartItem[] }

    // Calculate the total amount
    const amount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    // Create a payment intent with Apple Pay enabled
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
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    )
  }
} 