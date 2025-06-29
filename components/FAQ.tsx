'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Quelle est la différence entre l'arabe moderne standard et les dialectes?",
    answer: "L'arabe moderne standard (الفصحى) est la langue formelle utilisée dans les médias, la littérature et les documents officiels dans tout le monde arabe. Les dialectes varient selon les régions (marocain, égyptien, levantin, etc.) et sont utilisés dans la communication quotidienne. Nos cours couvrent uniquement l'arabe moderne standard (الفصحى) pour l'instant."
  },
  {
    question: "Combien de temps dois-je consacrer à l'apprentissage chaque jour?",
    answer: "Nous recommandons au moins 20-30 minutes par jour pour des progrès constants. Cependant, nos professeurs vous donnent des devoirs selon votre emploi du temps. N'hésitez pas à nous en faire part pour un suivi sur-mesure."
  },
  {
    question: "Est-ce que je recevrai un certificat à la fin du cours?",
    answer: "Oui, tous nos cours complets incluent un certificat de réussite que vous pourrez télécharger après avoir terminé le programme et réussi les évaluations finales. Ce certificat atteste de votre niveau selon le Cadre Européen Commun de Référence pour les Langues (CECRL)."
  },
  {
    question: "Quel matériel ai-je besoin pour suivre les cours?",
    answer: "Vous n'avez besoin que d'un ordinateur, tablette ou smartphone avec une connexion internet. Tous les matériels pédagogiques sont fournis numériquement. Nous recommandons cependant d'avoir un casque avec micro pour les sessions de conversation."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Questions Fréquentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 text-sm">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}