'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const result = await response.json()
      
      if (result.status === 'success') {
        setMessage('Merci pour votre inscription !')
        setEmail('')
      } else {
        setMessage('Une erreur est survenue.')
      }
    } catch (error) {
      setMessage('Erreur de connexion.')
    }
    
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Image
              src="/logo1.png"
              alt="Logo de Mon Entreprise"
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm">
              Apprenez l'arabe en ligne avec des professeurs qualifiés et une
              méthode éprouvée.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#accueil" className="text-gray-400 hover:text-amber-400 transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/cours" className="text-gray-400 hover:text-amber-400 transition">
                  Nos Cours
                </Link>
              </li>
              <li>
                <Link href="/#guide-apprentissage" className="text-gray-400 hover:text-amber-400 transition">
                  Guide d'Apprentissage
                </Link>
              </li>
              <li>
                <Link href="/#methode" className="text-gray-400 hover:text-amber-400 transition">
                  Méthode
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-amber-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition">
                  Guide d'apprentissage
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-400 hover:text-amber-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Suivez-Nous</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=61576577410265"
                aria-label="Facebook"
                className="bg-gray-700 hover:bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://t.me/voixdumondearabe/"
                aria-label="Telegram"
                className="bg-gray-700 hover:bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/voixdumondearabe?igsh=cnpwcTZlcWZ6Ym12"
                aria-label="Instagram"
                className="bg-gray-700 hover:bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.897 1.387 2.048 1.387 3.345s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.897-.897-1.387-2.048-1.387-3.345s.49-2.448 1.297-3.323C10.328 8.198 11.479 7.708 12.776 7.708s2.448.49 3.323 1.297c.897.897 1.387 2.048 1.387 3.345s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@voixdumondearabe"
                aria-label="Youtube"
                className="bg-gray-700 hover:bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm">Abonnez-vous à notre newsletter</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-2 flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 px-3 py-2 rounded-r-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${message.includes('Merci') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://www.chamalhat.com"
              className="text-gray-400 hover:text-amber-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              ChamalHat
            </a>
            . Tous droits réservés.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              href="/mentions-legales"
              className="text-gray-400 hover:text-amber-400 transition"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-gray-400 hover:text-amber-400 transition"
            >
              Politique de Confidentialité
            </Link>
            <Link
              href="/cgv"
              className="text-gray-400 hover:text-amber-400 transition"
            >
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}