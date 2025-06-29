import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import mysql from 'mysql2/promise'

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u274793444_form2',
  password: process.env.DB_PASS || 'uO+MvCQ+7',
  database: process.env.DB_NAME || 'u274793444_form2',
}

// Configuration de l'email
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
  try {
    const { contact_name, contact_email, contact_subject, contact_message } = await request.json()

    // Validation
    if (!contact_name || !contact_email || !contact_subject || !contact_message) {
      return NextResponse.json(
        { status: 'error', message: 'Tous les champs sont requis.' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contact_email)) {
      return NextResponse.json(
        { status: 'error', message: 'L\'adresse e-mail n\'est pas valide.' },
        { status: 400 }
      )
    }

    let dbSuccess = false
    let emailSuccess = false

    // Enregistrement en base de données
    try {
      const connection = await mysql.createConnection(dbConfig)
      
      const [result] = await connection.execute(
        'INSERT INTO contact_messages (name, email, subject, message, submission_date) VALUES (?, ?, ?, ?, NOW())',
        [contact_name, contact_email, contact_subject, contact_message]
      )
      
      await connection.end()
      dbSuccess = true
    } catch (dbError) {
      console.error('Erreur base de données:', dbError)
    }

    // Envoi de l'email
    try {
      const transporter = nodemailer.createTransporter(emailConfig)
      
      const mailOptions = {
        from: `"Voix du Monde Arabe" <${emailConfig.auth.user}>`,
        to: process.env.ADMIN_EMAIL || 'contact@voixdumondearabe.fr',
        subject: `Contact Formulaire: ${contact_subject}`,
        html: `
          <h1>Nouveau message via le formulaire de contact</h1>
          <p><strong>Nom:</strong> ${contact_name}</p>
          <p><strong>Email:</strong> ${contact_email}</p>
          <p><strong>Sujet:</strong> ${contact_subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contact_message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: contact_email,
      }
      
      await transporter.sendMail(mailOptions)
      emailSuccess = true
    } catch (emailError) {
      console.error('Erreur email:', emailError)
    }

    // Réponse selon le succès des opérations
    if (dbSuccess && emailSuccess) {
      return NextResponse.json({
        status: 'success',
        message: 'Merci ! Votre message a été envoyé et enregistré.',
      })
    } else if (dbSuccess || emailSuccess) {
      return NextResponse.json({
        status: 'partial_success',
        message: dbSuccess 
          ? 'Votre message a été enregistré, mais l\'email de notification n\'a pas pu être envoyé.'
          : 'Votre message a été envoyé par email, mais n\'a pas pu être enregistré dans la base de données.',
      })
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Une erreur est survenue lors du traitement de votre message.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur générale:', error)
    return NextResponse.json(
      { status: 'error', message: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}