'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo1.png"
                alt="Logo de Voix du Monde Arabe"
                width={120}
                height={96}
                className="h-20 sm:h-24 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#accueil" className="text-gray-800 hover:text-amber-600 transition">
              Accueil
            </Link>
            <Link href="/cours" className="text-gray-800 hover:text-amber-600 transition">
              Nos Cours
            </Link>
            <Link href="/#guide-apprentissage" className="text-gray-800 hover:text-amber-600 transition">
              Guide d'Apprentissage
            </Link>
            <Link href="/#methode" className="text-gray-800 hover:text-amber-600 transition">
              Méthode
            </Link>
            <Link href="/#contact" className="text-gray-800 hover:text-amber-600 transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <Link
            href="/#accueil"
            className="block py-2 px-4 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            href="/cours"
            className="block py-2 px-4 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nos Cours
          </Link>
          <Link
            href="/#guide-apprentissage"
            className="block py-2 px-4 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Guide d'Apprentissage
          </Link>
          <Link
            href="/#methode"
            className="block py-2 px-4 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Méthode
          </Link>
          <Link
            href="/#contact"
            className="block py-2 px-4 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}