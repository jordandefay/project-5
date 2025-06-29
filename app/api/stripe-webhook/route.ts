import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import mysql from 'mysql2/promise'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Configuration de la base de données d'inscription
const dbInscriptionConfig = {
  host: process.env.DB_INSCRIPTION_HOST || 'localhost',
  user: process.env.DB_INSCRIPTION_USER || 'u274793444_inscription',
  password: process.env.DB_INSCRIPTION_PASS || '~GDYp&p4K',
  database: process.env.DB_INSCRIPTION_NAME || 'u274793444_inscription',
}

// Configuration email
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'noreply@voixdumondearabe.fr',
    pass: process.env.SMTP_PASS || 'your-smtp-password',
  },
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Gérer l'événement
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(session)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const metadata = session.metadata!
    
    // Déterminer la table et les données selon le type de cours
    let tableName = 'inscriptions'
    let insertData: any = {
      nom: metadata.customerName?.split(' ').slice(1).join(' ') || '',
      prenom: metadata.customerName?.split(' ')[0] || '',
      date_naissance: metadata.customerBirthDate || '',
      email: metadata.customerEmail || '',
      whatsapp: metadata.customerPhone || '',
      course_id: metadata.courseId || '',
      course_name: metadata.courseName || '',
      amount_paid: (session.amount_total! / 100).toFixed(2),
      currency: session.currency?.toUpperCase() || 'EUR',
      stripe_session_id: session.id,
      inscription_date: new Date()
    }

    // Si c'est une session été, utiliser la table spécifique
    if (metadata.courseId === 'session-ete') {
      tableName = 'session_ete'
      insertData = {
        ...insertData,
        creneau: metadata.creneau || '',
        niveau_enseignement: metadata.niveau_enseignement || '',
        type_groupe: metadata.type_groupe || '',
        support_pdf: metadata.support_pdf === 'true' ? 1 : 0,
        total_paye: (session.amount_total! / 100).toFixed(2),
        devise: session.currency?.toUpperCase() || 'EUR'
      }
    }

    // Enregistrer en base de données
    const connection = await mysql.createConnection(dbInscriptionConfig)
    
    const columns = Object.keys(insertData).join(', ')
    const placeholders = Object.keys(insertData).map(() => '?').join(', ')
    const values = Object.values(insertData)
    
    await connection.execute(
      `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
      values
    )
    
    await connection.end()

    // Envoyer email de notification
    await sendNotificationEmail(metadata, session)
    
    console.log('Paiement traité avec succès:', session.id)
  } catch (error) {
    console.error('Erreur lors du traitement du paiement:', error)
  }
}

async function sendNotificationEmail(metadata: any, session: Stripe.Checkout.Session) {
  try {
    const transporter = nodemailer.createTransporter(emailConfig)
    
    const emailSubject = `Nouvelle Inscription: ${metadata.courseName} - ${metadata.customerName}`
    
    let emailBody = `
      <h1>Nouvelle Inscription au Cours</h1>
      <p>Une nouvelle inscription a été enregistrée via Stripe :</p>
      <ul>
        <li><strong>Nom :</strong> ${metadata.customerName}</li>
        <li><strong>Email :</strong> ${metadata.customerEmail}</li>
        <li><strong>Téléphone :</strong> ${metadata.customerPhone}</li>
        <li><strong>Date de naissance :</strong> ${metadata.customerBirthDate}</li>
        <li><strong>Cours :</strong> ${metadata.courseName}</li>
        <li><strong>Montant payé :</strong> ${(session.amount_total! / 100).toFixed(2)} ${session.currency?.toUpperCase()}</li>
        <li><strong>ID Session Stripe :</strong> ${session.id}</li>
      </ul>
    `
    
    // Ajouter les détails spécifiques à la session été
    if (metadata.courseId === 'session-ete') {
      emailBody += `
        <h3>Détails Session Été :</h3>
        <ul>
          <li><strong>Créneau :</strong> ${metadata.creneau}</li>
          <li><strong>Niveau :</strong> ${metadata.niveau_enseignement}</li>
          <li><strong>Type de groupe :</strong> ${metadata.type_groupe}</li>
          <li><strong>Supports PDF :</strong> ${metadata.support_pdf === 'true' ? 'Oui' : 'Non'}</li>
        </ul>
      `
    }
    
    const mailOptions = {
      from: `"Voix du Monde Arabe - Inscriptions" <${emailConfig.auth.user}>`,
      to: process.env.ADMIN_EMAIL_INSCRIPTION || 'inscription@voixdumondearabe.fr',
      subject: emailSubject,
      html: emailBody,
      replyTo: `${metadata.customerName} <${metadata.customerEmail}>`,
    }
    
    await transporter.sendMail(mailOptions)
    console.log('Email de notification envoyé')
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
  }
}