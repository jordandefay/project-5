import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Marquer comme dynamique pour éviter l'erreur de génération statique
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      courseName: session.metadata?.courseName || 'Cours',
      amount: (session.amount_total! / 100).toFixed(2),
      currency: session.currency?.toUpperCase() || 'EUR',
      customerEmail: session.customer_email,
    })
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des détails' },
      { status: 500 }
    )
  }
}
