import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function MentionsLegalesPage() {
  return (
    <main>
      <Navigation />
      
      <section className="text-gray-800 py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentions Légales</h1>
          <p className="text-xl mb-8">
            Informations légales concernant l'utilisation de notre site et de nos
            services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Éditeur du Site</h2>
          <p className="text-gray-600 mb-6">
            ChamalHat<br />
            SIRET : 889 836 102 00026<br />
            Adresse : 16 RUE POUCHELON 26100 ROMANS-SUR-ISERE<br />
            Email : contact@voixdumondearabe.fr<br />
            Téléphone : +33 07-56-99-96-34
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">Hébergeur du Site</h2>
          <p className="text-gray-600 mb-6">
            Hébergeur : HOSTINGER INTERNATIONAL LTD<br />
            Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
            Site web : https://www.hostinger.fr/contact
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Conditions Générales de Vente (CGV)
          </h2>
          <p className="text-gray-600 mb-6">
            Les présentes conditions générales de vente s'appliquent à toutes les
            ventes de cours en ligne proposées par Voix du Monde Arabe, géré par
            ChamalHat. En passant commande, l'utilisateur reconnaît avoir pris
            connaissance et accepter les présentes CGV.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Droit de Rétractation
          </h2>
          <p className="text-gray-600 mb-6">
            Conformément à la loi, l'utilisateur dispose d'un délai de 14 jours
            pour exercer son droit de rétractation à compter de la date de
            souscription au cours.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Propriété Intellectuelle
          </h2>
          <p className="text-gray-600 mb-6">
            Tous les contenus pédagogiques, vidéos, documents et supports de cours
            sont la propriété exclusive de Voix du Monde Arabe et sont protégés
            par les lois sur la propriété intellectuelle. Toute reproduction ou
            utilisation non autorisée est strictement interdite.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Protection des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Les données personnelles collectées sur ce site sont traitées
            conformément à la politique de confidentialité de Voix du Monde Arabe,
            en accord avec le Règlement Général sur la Protection des Données
            (RGPD).
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">Loi Applicable</h2>
          <p className="text-gray-600 mb-6">
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}