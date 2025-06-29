import { AcademicCapIcon, ComputerDesktopIcon, UserIcon } from '@heroicons/react/24/outline'

export default function WhyChooseUs() {
  const features = [
    {
      icon: AcademicCapIcon,
      title: "Méthode Efficace et Sur Mesure",
      description: "Découvrez une pédagogie innovante, spécialement conçue pour s'adapter à votre niveau et vous garantir des résultats exceptionnels."
    },
    {
      icon: ComputerDesktopIcon,
      title: "Suivi de l'Évolution de l'Élève",
      description: "Bénéficiez d'un accompagnement personnalisé et d'outils interactifs pour maximiser votre progression et atteindre vos objectifs d'apprentissage."
    },
    {
      icon: UserIcon,
      title: "Contrôle et Devoirs Maisons",
      description: "Profitez de nos programmes renommés, incluant des évaluations régulières et des devoirs à remettre, conçus pour renforcer votre apprentissage."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
          Pourquoi Choisir Voix du Monde Arabe?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition"
            >
              <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}