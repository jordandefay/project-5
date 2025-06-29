'use client'

import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_subject: '',
    contact_message: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.status === 'success') {
        setMessage('Merci ! Votre message a été envoyé avec succès.')
        setFormData({
          contact_name: '',
          contact_email: '',
          contact_subject: '',
          contact_message: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Contactez-Nous
            </h2>
            <p className="text-gray-600 mb-8">
              Vous avez des questions sur nos cours ou notre méthode? Notre
              équipe est là pour vous aider.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <EnvelopeIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <a
                    href="mailto:contact@voixdumondearabe.fr"
                    className="text-amber-600 hover:underline"
                  >
                    contact@voixdumondearabe.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <PhoneIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Téléphone / Whatsapp</h4>
                  <a
                    href="https://wa.me/33780988830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:underline flex items-center"
                  >
                    +33 07 80 98 88 30
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <label htmlFor="contact_name" className="block text-gray-700 font-medium mb-2">
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="contact_email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="contact_subject" className="block text-gray-700 font-medium mb-2">
                  Sujet
                </label>
                <select
                  id="contact_subject"
                  name="contact_subject"
                  value={formData.contact_subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="course">Question sur les cours</option>
                  <option value="technical">Problème technique</option>
                  <option value="payment">Question de paiement</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="contact_message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact_message"
                  name="contact_message"
                  rows={4}
                  value={formData.contact_message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-medium transition disabled:opacity-50"
              >
                {isLoading ? 'Envoi...' : 'Envoyer le Message'}
              </button>
              {message && (
                <p className={`mt-4 text-center ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}