import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_INSCRIPTION_HOST || 'localhost',
  user: process.env.DB_INSCRIPTION_USER || 'u274793444_inscription',
  password: process.env.DB_INSCRIPTION_PASS || '~GDYp&p4K',
  database: process.env.DB_INSCRIPTION_NAME || 'u274793444_inscription',
}

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
    const { nom, prenom, date_naissance, email, whatsapp } = await request.json()

    // Validation
    const errors = []
    if (!nom) errors.push('Le nom est requis.')
    if (!prenom) errors.push('Le prénom est requis.')
    if (!date_naissance) errors.push('La date de naissance est requise.')
    if (!email) {
      errors.push('L\'email est requis.')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('L\'adresse e-mail n\'est pas valide.')
    }
    if (!whatsapp) errors.push('Le numéro Whatsapp est requis.')

    if (errors.length > 0) {
      return NextResponse.json(
        { status: 'error', message: errors.join(' ') },
        { status: 400 }
      )
    }

    let dbSuccess = false
    let emailSuccess = false

    // Enregistrement en base de données
    try {
      const connection = await mysql.createConnection(dbConfig)
      
      await connection.execute(
        'INSERT INTO demandes_essai (nom, prenom, date_naissance, email, whatsapp, demande_date) VALUES (?, ?, ?, ?, ?, NOW())',
        [nom, prenom, date_naissance, email, whatsapp]
      )
      
      await connection.end()
      dbSuccess = true
    } catch (dbError) {
      console.error('Erreur base de données (essai gratuit):', dbError)
    }

    // Envoi de l'email de notification
    if (dbSuccess) {
      try {
        const transporter = nodemailer.createTransporter(emailConfig)
        
        const mailOptions = {
          from: `"Voix du Monde Arabe - Essai Gratuit" <${emailConfig.auth.user}>`,
          to: process.env.ADMIN_EMAIL_INSCRIPTION || 'inscription@voixdumondearabe.fr',
          subject: `Nouvelle Demande de Cours d'Essai Gratuit - ${prenom} ${nom}`,
          html: `
            <h1>Nouvelle Demande de Cours d'Essai Gratuit</h1>
            <p>Une nouvelle demande pour un cours d'essai gratuit a été soumise :</p>
            <ul>
              <li><strong>Nom :</strong> ${nom}</li>
              <li><strong>Prénom :</strong> ${prenom}</li>
              <li><strong>Date de naissance :</strong> ${date_naissance}</li>
              <li><strong>Email :</strong> ${email}</li>
              <li><strong>Whatsapp :</strong> ${whatsapp}</li>
            </ul>
            <p>Veuillez contacter cette personne pour planifier son cours d'essai.</p>
          `,
          replyTo: `${prenom} ${nom} <${email}>`,
        }
        
        await transporter.sendMail(mailOptions)
        emailSuccess = true
      } catch (emailError) {
        console.error('Erreur email (essai gratuit):', emailError)
      }
    }

    // Réponse selon le succès des opérations
    if (dbSuccess && emailSuccess) {
      return NextResponse.json({
        status: 'success',
        message: 'Merci ! Votre demande de cours d\'essai gratuit a bien été envoyée. Nous vous contacterons prochainement.',
      })
    } else if (dbSuccess && !emailSuccess) {
      return NextResponse.json({
        status: 'partial_success',
        message: 'Votre demande a été enregistrée, mais la notification à l\'administration n\'a pas pu être envoyée. Nous vous contacterons manuellement.',
      })
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Erreur lors de la soumission de votre demande.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur générale (essai gratuit):', error)
    return NextResponse.json(
      { status: 'error', message: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}