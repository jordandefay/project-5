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
      creneau,
      niveau_enseignement,
      type_groupe,
      support_pdf,
      totalPaye,
      devise
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
    if (!whatsapp) errors.push('Le numéro Whatsapp est requis.')
    if (!creneau) errors.push('Le créneau est requis.')
    if (!niveau_enseignement) errors.push('Le niveau d\'enseignement est requis.')
    if (!type_groupe) errors.push('Le type de groupe est requis.')

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
        'INSERT INTO session_ete (nom, prenom, date_naissance, email, whatsapp, creneau, niveau_enseignement, type_groupe, support_pdf, total_paye, devise, inscription_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [nom, prenom, date_naissance, email, whatsapp, creneau, niveau_enseignement, type_groupe, support_pdf ? 1 : 0, totalPaye, devise]
      )
      
      await connection.end()
      dbSuccess = true
    } catch (dbError) {
      console.error('Erreur base de données (session été):', dbError)
    }

    // Envoi de l'email de notification
    if (dbSuccess) {
      try {
        const transporter = nodemailer.createTransporter(emailConfig)
        
        const creneauLabels: { [key: string]: string } = {
          'creneau1': 'Créneau 1: 30 juin - 3 août',
          'creneau2': 'Créneau 2: 14 juillet - 17 août'
        }

        const niveauLabels: { [key: string]: string } = {
          'alphabétisation': 'Débutant (Alphabétisation)',
          'kitab-medine': 'Programme "Tomes de Médine"',
          'al-forqane': 'Programme "Al-Forqane"'
        }

        const typeGroupeLabels: { [key: string]: string } = {
          '73.90': 'SOLO (1 personne)',
          '68.90': 'DUO (2 personnes)',
          '63.90': 'TRIO (3 personnes)',
          '53.90': 'QUATRO (4 personnes)'
        }
        
        const mailOptions = {
          from: `"Voix du Monde Arabe - Session Été" <${emailConfig.auth.user}>`,
          to: process.env.ADMIN_EMAIL_INSCRIPTION || 'inscription@voixdumondearabe.fr',
          subject: `Nouvelle Inscription Session Été - ${prenom} ${nom}`,
          html: `
            <h1>Nouvelle Inscription Session Été</h1>
            <p>Une nouvelle inscription pour la session d'été a été enregistrée :</p>
            <ul>
              <li><strong>Nom :</strong> ${nom}</li>
              <li><strong>Prénom :</strong> ${prenom}</li>
              <li><strong>Date de naissance :</strong> ${date_naissance}</li>
              <li><strong>Email :</strong> ${email}</li>
              <li><strong>Whatsapp :</strong> ${whatsapp}</li>
              <li><strong>Créneau :</strong> ${creneauLabels[creneau] || creneau}</li>
              <li><strong>Niveau :</strong> ${niveauLabels[niveau_enseignement] || niveau_enseignement}</li>
              <li><strong>Type de groupe :</strong> ${typeGroupeLabels[type_groupe] || type_groupe}</li>
              <li><strong>Supports PDF :</strong> ${support_pdf ? 'Oui (+10€)' : 'Non'}</li>
              <li><strong>Total payé :</strong> ${totalPaye} ${devise}</li>
            </ul>
            <p>Veuillez contacter cette personne pour organiser sa participation à la session d'été.</p>
          `,
          replyTo: `${prenom} ${nom} <${email}>`,
        }
        
        await transporter.sendMail(mailOptions)
        emailSuccess = true
      } catch (emailError) {
        console.error('Erreur email (session été):', emailError)
      }
    }

    // Réponse selon le succès des opérations
    if (dbSuccess && emailSuccess) {
      return NextResponse.json({
        status: 'success',
        message: 'Merci ! Votre inscription pour la session d\'été a bien été enregistrée. Nous vous contacterons bientôt.',
      })
    } else if (dbSuccess && !emailSuccess) {
      return NextResponse.json({
        status: 'partial_success',
        message: 'Votre inscription a été enregistrée, mais la notification à l\'administration n\'a pas pu être envoyée. Nous vous contacterons manuellement.',
      })
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Erreur lors de l\'enregistrement de votre inscription.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur générale (session été):', error)
    return NextResponse.json(
      { status: 'error', message: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}