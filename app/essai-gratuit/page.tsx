'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { GiftIcon } from '@heroicons/react/24/outline'

export default function EssaiGratuitPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    email: '',
    whatsapp: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/essai-gratuit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.status === 'success') {
        setMessage('Merci ! Votre demande de cours d\'essai gratuit a bien été envoyée. Nous vous contacterons prochainement.')
        setFormData({
          nom: '',
          prenom: '',
          date_naissance: '',
          email: '',
          whatsapp: ''
        })
      } else {
        setMessage('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch (error) {
      setMessage('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main>
      <Navigation />
      
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <GiftIcon className="h-20 w-20 text-amber-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Demandez Votre Cours d'Essai Gratuit !
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Découvrez notre méthode d'enseignement unique sans engagement.
              Remplissez simplement le formulaire ci-dessous et nous vous
              contacterons pour planifier votre session d'essai.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center border-b pb-4">
              Vos Informations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                  placeholder="Votre nom de famille"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700 mb-1">
                Date de naissance <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date_naissance"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-gray-700"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                placeholder="exemple@domaine.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro Whatsapp (avec indicatif) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="+33 XXXXXXXXX"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
              />
              <p className="mt-1 text-xs text-gray-500">
                Utilisé pour vous contacter concernant le cours d'essai.
              </p>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {isLoading ? 'Envoi...' : 'Envoyer ma Demande d\'Essai'}
              </button>
            </div>
          </form>
          
          {message && (
            <div className={`mt-6 text-center p-4 rounded-md ${
              message.includes('Merci') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}