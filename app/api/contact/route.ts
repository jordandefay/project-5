import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Marquer comme dynamique pour éviter l'erreur de génération statique
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { nom, email, telephone, message } = await request.json()

    // Validation des données
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Configuration email
    const emailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }

    // Vérification de la configuration
    if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass) {
      console.error('Configuration SMTP manquante')
      return NextResponse.json(
        { error: 'Configuration email non disponible' },
        { status: 500 }
      )
    }

    // Envoi de l'email
    try {
      const transporter = nodemailer.createTransport(emailConfig)

      const mailOptions = {
        from: `"Voix du Monde Arabe" <${emailConfig.auth.user}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Nouveau message de contact - ${nom}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${nom}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${telephone || 'Non renseigné'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }

      await transporter.sendMail(mailOptions)

      return NextResponse.json(
        { message: 'Message envoyé avec succès' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
