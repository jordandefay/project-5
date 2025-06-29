import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'

const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-tajawal'
})

export const metadata: Metadata = {
  title: 'Voix du Monde Arabe - Vos cours en direct',
  description: 'Apprenez l\'arabe en ligne avec des professeurs qualifiés et une méthode éprouvée.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${tajawal.variable} font-tajawal bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}