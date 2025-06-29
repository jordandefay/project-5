'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setMessage(error.message)
      } else if (data.user) {
        setMessage('Compte créé avec succès ! Redirection...')
        router.push('/dashboard')
      }
    } catch (error) {
      setMessage('Une erreur est survenue lors de la création du compte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navigation />
      
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Créer un compte
            </h1>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 pr-10"
                    placeholder="Minimum 6 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 pr-10"
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-medium transition disabled:opacity-50"
              >
                {loading ? 'Création...' : 'Créer le compte'}
              </button>
            </form>
            
            {message && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                message.includes('succès') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link href="/auth/login" className="text-amber-600 hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}