import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 bg-amber-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à Commencer Votre Voyage Linguistique?
        </h2>
        <p className="text-xl mb-8">
          Essayez votre premier cours gratuitement sans engagement.
        </p>
        <div className="flex justify-center">
          <Link
            href="/essai-gratuit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 rounded-md font-medium transition text-lg"
          >
            Essai Gratuit
          </Link>
        </div>
        <p className="mt-6 text-amber-100">
          Aucune carte de crédit requise. Annulez à tout moment.
        </p>
      </div>
    </section>
  )
}