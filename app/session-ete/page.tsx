'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { 
  ClockIcon, 
  VideoCameraIcon, 
  BookOpenIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const creneaux = [
  { value: "creneau1", label: "Créneau 1: 30 juin - 3 août" },
  { value: "creneau2", label: "Créneau 2: 14 juillet - 17 août" }
]

const niveaux = [
  { value: "alphabétisation", label: "Débutant (Alphabétisation)" },
  { value: "kitab-medine", label: "Programme \"Tomes de Médine\"" },
  { value: "al-forqane", label: "Programme \"Al-Forqane\"" }
]

const typeGroupes = [
  { value: "73.90", label: "SOLO (1 personne)", display: "73.90€/mois" },
  { value: "68.90", label: "DUO (2 personnes)", display: "68.90€/mois" },
  { value: "63.90", label: "TRIO (3 personnes)", display: "63.90€/mois" },
  { value: "53.90", label: "QUATRO (4 personnes)", display: "53.90€/mois" }
]

export default function SessionEtePage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    email: '',
    whatsapp: '',
    creneau: '',
    niveau_enseignement: '',
    type_groupe: '',
    support_pdf: false
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Calcul automatique du total
    if (name === 'type_groupe' || name === 'niveau_enseignement' || name === 'support_pdf') {
      calculateTotal({
        ...formData,
        [name]: newValue
      })
    }
  }

  const calculateTotal = (data: typeof formData) => {
    let basePrice = parseFloat(data.type_groupe) || 0
    let pdfPrice = 0

    // Les supports PDF sont obligatoires pour Al-Forqane
    if (data.niveau_enseignement === 'al-forqane') {
      pdfPrice = 10
    } else if (data.support_pdf) {
      pdfPrice = 10
    }

    setTotalAmount(basePrice + pdfPrice)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Créer une session de paiement Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: 'session-ete',
          courseName: 'Session Été',
          amount: totalAmount * 100, // Stripe utilise les centimes
          currency: 'eur',
          customerData: formData,
          sessionData: {
            creneau: formData.creneau,
            niveau_enseignement: formData.niveau_enseignement,
            type_groupe: formData.type_groupe,
            support_pdf: formData.support_pdf
          }
        }),
      })
      
      const { sessionId } = await response.json()
      
      // Rediriger vers Stripe Checkout
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId
        })
        
        if (error) {
          setMessage('Erreur lors de la redirection vers le paiement.')
        }
      }
    } catch (error) {
      setMessage('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Navigation />
      
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <header className="mb-10 text-center">
            <Image
              src="/logo1.png"
              alt="Voix du Monde Arabe"
              width={96}
              height={96}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Inscription Session Été
            </h1>
            <p className="text-xl text-amber-600 font-semibold">
              Cours d'Arabe Adultes/Ados/Enfants (dès 7 ans)
            </p>
            <p className="text-gray-600 mt-2">
              Session intensive d'un mois (2h/semaine).
            </p>
          </header>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md mb-8 shadow">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  Les frais d'inscription sont{' '}
                  <strong className="font-semibold">GRATUITS</strong> ! <br />
                  Limite d'inscription :{' '}
                  <strong className="font-semibold">10 juillet</strong>. Places limitées (victime de son succès) !
                </p>
              </div>
            </div>
          </div>

          {/* Informations du cours */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Détails de la Session</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">Session de 1 mois (5 semaines)</span>
              </div>
              <div className="flex items-center">
                <VideoCameraIcon className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">10 heures en classe virtuelle (2h/semaine)</span>
              </div>
              <div className="flex items-center">
                <BookOpenIcon className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">Étude de textes + dialogues</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">
              Complétez votre inscription
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
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
                  placeholder="Votre nom"
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

            <div className="mb-5">
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
            </div>

            <div className="mb-5">
              <label htmlFor="creneau" className="block text-sm font-medium text-gray-700 mb-1">
                Choix du Créneau (5 semaines) <span className="text-red-500">*</span>
              </label>
              <select
                id="creneau"
                name="creneau"
                value={formData.creneau}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="">Sélectionnez un créneau</option>
                {creneaux.map((creneau) => (
                  <option key={creneau.value} value={creneau.value}>
                    {creneau.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="niveau_enseignement" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau d'Enseignement <span className="text-red-500">*</span>
              </label>
              <select
                id="niveau_enseignement"
                name="niveau_enseignement"
                value={formData.niveau_enseignement}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="">Sélectionnez un niveau</option>
                {niveaux.map((niveau) => (
                  <option key={niveau.value} value={niveau.value}>
                    {niveau.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="type_groupe" className="block text-sm font-medium text-gray-700 mb-1">
                Type de Groupe (Tarif/mois) <span className="text-red-500">*</span>
              </label>
              <select
                id="type_groupe"
                name="type_groupe"
                value={formData.type_groupe}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="">Sélectionnez un type de groupe</option>
                {typeGroupes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.display}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="support_pdf" className="flex items-center">
                <input
                  type="checkbox"
                  id="support_pdf"
                  name="support_pdf"
                  checked={formData.support_pdf || formData.niveau_enseignement === 'al-forqane'}
                  onChange={handleChange}
                  disabled={formData.niveau_enseignement === 'al-forqane'}
                  className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Ajouter les supports PDF Al-Forqane (+10€, paiement unique)
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                Les supports PDF sont obligatoires (et donc inclus) si vous choisissez le niveau "Programme Al-Forqane".
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Récapitulatif du Paiement
              </h3>
              <p className="text-gray-600">
                Tarif mensuel du groupe : <strong>{formData.type_groupe ? `${formData.type_groupe} €` : '-- €'}</strong>
              </p>
              <p className="text-gray-600">
                Supports PDF : <strong>{(formData.support_pdf || formData.niveau_enseignement === 'al-forqane') ? '10 €' : '0 €'}</strong>
              </p>
              <p className="text-xl font-bold text-amber-700 mt-1">
                Total pour le premier mois : <strong>{totalAmount.toFixed(2)} €</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Le tarif mensuel sera appliqué pour la durée de la session (1 mois).
              </p>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading || totalAmount <= 0}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isLoading ? 'Redirection vers le paiement...' : 'Procéder au paiement sécurisé'}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Paiement sécurisé par Stripe • Cartes acceptées : Visa, Mastercard, American Express
              </p>
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