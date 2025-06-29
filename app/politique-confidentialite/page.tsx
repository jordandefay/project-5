import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PolitiqueConfidentialitePage() {
  return (
    <main>
      <Navigation />
      
      <section className="text-gray-800 py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Politique de Confidentialité
          </h1>
          <p className="text-xl mb-8">
            Informations sur la collecte, l'utilisation et la protection de vos données personnelles.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            1. Introduction
          </h2>
          <p className="text-gray-600 mb-6">
            Voix du Monde Arabe, géré par ChamalHat, s'engage à protéger la vie privée et les données personnelles de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            2. Collecte des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Nous pouvons collecter les types de données personnelles suivants :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Informations fournies par l'utilisateur : Nom, adresse e-mail, numéro de téléphone, et autres informations que vous choisissez de nous fournir lorsque vous remplissez des formulaires sur notre site.</li>
            <li>Informations collectées automatiquement : Adresse IP, type de navigateur, pages consultées, et autres données de navigation.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            3. Utilisation des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Les données personnelles que nous collectons peuvent être utilisées pour :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Fournir, maintenir et améliorer nos services.</li>
            <li>Répondre à vos demandes et questions.</li>
            <li>Vous envoyer des communications marketing et promotionnelles, sous réserve de votre consentement.</li>
            <li>Personnaliser votre expérience sur notre site.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            4. Partage des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations avec :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Des prestataires de services qui nous aident à exploiter notre site et à fournir nos services, sous réserve de contrats de confidentialité.</li>
            <li>Des autorités légales, si requis par la loi.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            5. Protection des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            6. Droits des Utilisateurs
          </h2>
          <p className="text-gray-600 mb-6">
            Conformément au RGPD, vous avez les droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Droit d'accès : Vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.</li>
            <li>Droit de rectification : Vous pouvez demander la correction de toute information personnelle inexacte ou incomplète.</li>
            <li>Droit à l'effacement : Vous pouvez demander la suppression de vos données personnelles, sous certaines conditions.</li>
            <li>Droit à la limitation du traitement : Vous pouvez demander la limitation du traitement de vos données personnelles, sous certaines conditions.</li>
            <li>Droit d'opposition : Vous pouvez vous opposer au traitement de vos données personnelles, sous certaines conditions.</li>
            <li>Droit à la portabilité des données : Vous pouvez demander à recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            7. Conservation des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et pour respecter nos obligations légales.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            8. Cookies
          </h2>
          <p className="text-gray-600 mb-6">
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter certaines fonctionnalités de notre site.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            9. Modifications de la Politique de Confidentialité
          </h2>
          <p className="text-gray-600 mb-6">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            10. Contact
          </h2>
          <p className="text-gray-600 mb-6">
            Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : contact@voixdumondearabe.fr.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}