import Image from 'next/image'
import { ChatBubbleLeftRightIcon, LightBulbIcon, MicrophoneIcon } from '@heroicons/react/24/outline'

export default function MethodSection() {
  const methods = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Immersion Totale",
      description: "Apprenez dans un environnement 100% arabe dès le premier jour pour une assimilation naturelle."
    },
    {
      icon: LightBulbIcon,
      title: "Répétition Espacée",
      description: "Notre système intelligent adapte les révisions en fonction de votre mémoire pour une rétention optimale."
    },
    {
      icon: MicrophoneIcon,
      title: "Pratique Orale",
      description: "Des sessions de conversation avec des locuteurs natifs pour développer votre fluidité et votre confiance."
    }
  ]

  return (
    <section id="methode" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Image
              src="/methode.jpg"
              alt="Méthode d'apprentissage"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Notre Méthode Unique
            </h2>
            <p className="text-gray-600 mb-6">
              Notre approche combine les meilleures pratiques pédagogiques avec
              les technologies modernes pour un apprentissage optimal de
              l'arabe.
            </p>
            <div className="space-y-6">
              {methods.map((method, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <method.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-1">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}