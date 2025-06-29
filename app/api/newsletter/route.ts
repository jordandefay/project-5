import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u274793444_form2',
  password: process.env.DB_PASS || 'uO+MvCQ+7',
  database: process.env.DB_NAME || 'u274793444_form2',
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'L\'adresse e-mail ne peut pas être vide.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Veuillez fournir une adresse e-mail valide.' },
        { status: 400 }
      )
    }

    const connection = await mysql.createConnection(dbConfig)

    // Vérifier si l'email existe déjà
    const [existing] = await connection.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscriptions WHERE email = ?',
      [email]
    ) as any[]

    if (existing[0].count > 0) {
      await connection.end()
      return NextResponse.json({
        status: 'success',
        message: 'Vous êtes déjà inscrit à notre newsletter !',
      })
    }

    // Insérer le nouvel email
    await connection.execute(
      'INSERT INTO newsletter_subscriptions (email, subscription_date) VALUES (?, NOW())',
      [email]
    )

    await connection.end()

    return NextResponse.json({
      status: 'success',
      message: 'Merci pour votre inscription à la newsletter !',
    })
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return NextResponse.json(
      { status: 'error', message: 'Erreur de base de données. Veuillez réessayer plus tard.' },
      { status: 500 }
    )
  }
}