import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CGVPage() {
  return (
    <main>
      <Navigation />
      
      <section className="text-gray-800 py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl mb-8">
            Informations sur les conditions générales de vente de nos services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            1. Objet
          </h2>
          <p className="text-gray-600 mb-6">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Voix du Monde Arabe, géré par ChamalHat, et ses clients pour la vente de cours en ligne.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            2. Acceptation des Conditions
          </h2>
          <p className="text-gray-600 mb-6">
            En passant commande sur notre site, vous reconnaissez avoir pris connaissance et accepter sans réserve les présentes CGV.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            3. Description des Services
          </h2>
          <p className="text-gray-600 mb-6">
            Voix du Monde Arabe propose des cours en ligne pour l'apprentissage de la langue arabe. Les services incluent l'accès à des cours en ligne, des ressources pédagogiques, et un accompagnement personnalisé.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            4. Commandes
          </h2>
          <div className="text-gray-600 mb-6">
            <ul className="list-disc pl-6 mb-4">
              <li>Passation de commande : Les commandes sont passées directement sur notre site web.</li>
              <li>Confirmation de commande : Une confirmation de commande sera envoyée par e-mail une fois la commande validée.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            5. Prix et Paiement
          </h2>
          <div className="text-gray-600 mb-6">
            <ul className="list-disc pl-6 mb-4">
              <li>Prix : Les prix de nos services sont indiqués en euros et sont valables au moment de la commande.</li>
              <li>Modalités de paiement : Le paiement s'effectue en ligne par carte bancaire ou par d'autres moyens de paiement électroniques proposés sur le site.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            6. Livraison
          </h2>
          <div className="text-gray-600 mb-6">
            <ul className="list-disc pl-6 mb-4">
              <li>Accès aux services : L'accès aux cours en ligne est accordé immédiatement après confirmation du paiement.</li>
              <li>Durée d'accès : L'accès aux cours est valable pour la durée spécifiée lors de l'achat.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            7. Droit de Rétractation
          </h2>
          <p className="text-gray-600 mb-6">
            Conformément à la loi, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation à compter de la date de souscription au cours. Pour exercer ce droit, vous devez nous informer de votre décision de rétractation par une déclaration non équivoque.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            8. Responsabilités
          </h2>
          <div className="text-gray-600 mb-6">
            <ul className="list-disc pl-6 mb-4">
              <li>Responsabilité de l'utilisateur : L'utilisateur est responsable de l'utilisation qu'il fait des services et de la confidentialité de ses identifiants de connexion.</li>
              <li>Responsabilité de Voix du Monde Arabe : Nous nous engageons à fournir des services de qualité et à respecter les engagements pris dans le cadre des présentes CGV.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            9. Propriété Intellectuelle
          </h2>
          <p className="text-gray-600 mb-6">
            Tous les contenus pédagogiques, vidéos, documents et supports de cours sont la propriété exclusive de Voix du Monde Arabe et sont protégés par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est strictement interdite.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            10. Protection des Données Personnelles
          </h2>
          <p className="text-gray-600 mb-6">
            Les données personnelles collectées sont traitées conformément à notre politique de confidentialité, en accord avec le Règlement Général sur la Protection des Données (RGPD).
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            11. Modifications des CGV
          </h2>
          <p className="text-gray-600 mb-6">
            Nous nous réservons le droit de modifier les présentes CGV à tout moment. Les modifications seront publiées sur cette page et seront applicables dès leur publication.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            12. Loi Applicable et Règlement des Litiges
          </h2>
          <p className="text-gray-600 mb-6">
            Les présentes CGV sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            13. Contact
          </h2>
          <p className="text-gray-600 mb-6">
            Pour toute question ou préoccupation concernant les présentes CGV, veuillez nous contacter à l'adresse suivante : contact@voixdumondearabe.fr.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}