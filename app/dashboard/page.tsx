'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { products, getProductByPriceId } from '@/src/stripe-config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { 
  CreditCardIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ShoppingCartIcon,
  UserIcon
} from '@heroicons/react/24/outline'

interface UserSubscription {
  customer_id: string
  subscription_id: string | null
  subscription_status: string
  price_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  cancel_at_period_end: boolean
  payment_method_brand: string | null
  payment_method_last4: string | null
}

interface UserOrder {
  customer_id: string
  order_id: number
  checkout_session_id: string
  payment_intent_id: string
  amount_subtotal: number
  amount_total: number
  currency: string
  payment_status: string
  order_status: string
  order_date: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [orders, setOrders] = useState<UserOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      await fetchUserData()
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserData = async () => {
    try {
      // Fetch subscription data
      const { data: subscriptionData } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle()

      if (subscriptionData) {
        setSubscription(subscriptionData)
      }

      // Fetch orders data
      const { data: ordersData } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false })

      if (ordersData) {
        setOrders(ordersData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleCheckout = async (productId: string) => {
    setCheckoutLoading(productId)
    
    try {
      const product = products.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/dashboard`,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Erreur lors de la création de la session de paiement')
    } finally {
      setCheckoutLoading(null)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR')
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'canceled':
      case 'past_due':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Actif',
      'canceled': 'Annulé',
      'past_due': 'En retard',
      'incomplete': 'Incomplet',
      'trialing': 'Période d\'essai',
      'completed': 'Terminé',
      'pending': 'En attente',
      'not_started': 'Non démarré'
    }
    return statusMap[status] || status
  }

  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <UserIcon className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
              >
                Déconnexion
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subscription Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-amber-600" />
                Abonnement actuel
              </h2>
              
              {subscription && subscription.subscription_status !== 'not_started' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(subscription.subscription_status)}
                      <span className="font-medium">
                        {getStatusText(subscription.subscription_status)}
                      </span>
                    </div>
                  </div>
                  
                  {subscription.price_id && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium">
                        {getProductByPriceId(subscription.price_id)?.name || 'Plan inconnu'}
                      </span>
                    </div>
                  )}
                  
                  {subscription.current_period_end && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Prochaine facturation:</span>
                      <span className="font-medium">
                        {formatDate(subscription.current_period_end)}
                      </span>
                    </div>
                  )}
                  
                  {subscription.payment_method_brand && subscription.payment_method_last4 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Méthode de paiement:</span>
                      <span className="font-medium">
                        {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">Aucun abonnement actif</p>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <ShoppingCartIcon className="h-6 w-6 mr-2 text-amber-600" />
                Commandes récentes
              </h2>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.order_id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            {formatAmount(order.amount_total, order.currency)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.order_date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.order_status)}
                          <span className="text-sm font-medium">
                            {getStatusText(order.order_status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Aucune commande</p>
              )}
            </div>
          </div>

          {/* Available Products */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Nos cours disponibles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {product.mode === 'subscription' ? 'Abonnement' : 'Paiement unique'}
                    </span>
                    <button
                      onClick={() => handleCheckout(product.id)}
                      disabled={checkoutLoading === product.id}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm transition disabled:opacity-50"
                    >
                      {checkoutLoading === product.id ? 'Chargement...' : 'Acheter'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}