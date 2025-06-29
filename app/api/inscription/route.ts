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
    const { 
      nom, 
      prenom, 
      date_naissance, 
      email, 
      whatsapp, 
      courseId, 
      courseName, 
      amountPaid, 
      currency 
    } = await request.json()

    // Validation
    const errors = []
    if (!nom) errors.push('Le nom est requis.')
    if (!prenom) errors.push('Le prénom est requis.')
    if (!email) {
      errors.push('L\'email est requis.')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('L\'adresse e-mail n\'est pas valide.')
    }
    if (!date_naissance) errors.push('La date de naissance est requise.')

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
        'INSERT INTO inscriptions (nom, prenom, date_naissance, email, whatsapp, course_id, course_name, amount_paid, currency, inscription_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [nom, prenom, date_naissance, email, whatsapp, courseId, courseName, amountPaid, currency]
      )
      
      await connection.end()
      dbSuccess = true
    } catch (dbError) {
      console.error('Erreur base de données (inscription):', dbError)
    }

    // Envoi de l'email de notification
    if (dbSuccess) {
      try {
        const transporter = nodemailer.createTransport(emailConfig)
        
        const mailOptions = {
          from: `"Voix du Monde Arabe - Inscriptions" <${emailConfig.auth.user}>`,
          to: process.env.ADMIN_EMAIL_INSCRIPTION || 'inscription@voixdumondearabe.fr',
          subject: `Nouvelle Inscription: ${courseName} - ${prenom} ${nom}`,
          html: `
            <h1>Nouvelle Inscription au Cours</h1>
            <p>Une nouvelle inscription a été enregistrée :</p>
            <ul>
              <li><strong>Nom :</strong> ${nom}</li>
              <li><strong>Prénom :</strong> ${prenom}</li>
              <li><strong>Date de naissance :</strong> ${date_naissance}</li>
              <li><strong>Email :</strong> ${email}</li>
              <li><strong>Whatsapp :</strong> ${whatsapp}</li>
              <li><strong>Cours :</strong> ${courseName} (ID: ${courseId})</li>
              <li><strong>Montant Payé :</strong> ${amountPaid} ${currency}</li>
            </ul>
          `,
          replyTo: `${prenom} ${nom} <${email}>`,
        }
        
        await transporter.sendMail(mailOptions)
        emailSuccess = true
      } catch (emailError) {
        console.error('Erreur email (inscription):', emailError)
      }
    }

    // Réponse selon le succès des opérations
    if (dbSuccess && emailSuccess) {
      return NextResponse.json({
        status: 'success',
        message: 'Votre inscription a été enregistrée avec succès. Un email de notification a été envoyé à l\'administration.',
      })
    } else if (dbSuccess && !emailSuccess) {
      return NextResponse.json({
        status: 'partial_success',
        message: 'Votre inscription a été enregistrée, mais l\'email de notification à l\'administration n\'a pas pu être envoyé.',
      })
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Erreur lors de l\'enregistrement de l\'inscription.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur générale (inscription):', error)
    return NextResponse.json(
      { status: 'error', message: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}
