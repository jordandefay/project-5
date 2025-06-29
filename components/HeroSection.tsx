import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="accueil" className="text-white py-20 md:py-32 relative">
      <video
        autoPlay
        playsInline
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/voixdumondearabe.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-10 md:mb-0 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Apprenez l'arabe en ligne avec Voix du Monde Arabe
          </h1>
          <p className="text-xl mb-8">
            Maîtrisez l'arabe moderne standard avec nos cours en ligne
            interactifs et personnalisés, adaptés à votre rythme
            d'apprentissage.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="#cours"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-center font-medium transition"
            >
              Commencer Maintenant
            </Link>
            <Link
              href="/cours"
              className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-center font-medium transition"
            >
              Voir les Cours
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center floating">
          <Image
            src="/logo1.png"
            alt="Logo de Voix du Monde Arabe flottant"
            width={400}
            height={400}
            className="w-full max-w-xs sm:max-w-md"
          />
        </div>
      </div>
    </section>
  )
}