import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { courseId, courseName, amount, currency, customerData, sessionData } = await request.json()

    // Créer une session de checkout Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: courseName,
              description: `Inscription au cours: ${courseName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/inscription?courseId=${courseId}`,
      customer_email: customerData.email,
      metadata: {
        courseId,
        courseName,
        customerName: `${customerData.prenom} ${customerData.nom}`,
        customerEmail: customerData.email,
        customerPhone: customerData.whatsapp,
        customerBirthDate: customerData.date_naissance,
        ...(sessionData && {
          creneau: sessionData.creneau || '',
          niveau_enseignement: sessionData.niveau_enseignement || '',
          type_groupe: sessionData.type_groupe || '',
          support_pdf: sessionData.support_pdf ? 'true' : 'false'
        })
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Erreur lors de la création de la session Stripe:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}