import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  BookOpenIcon, 
  SpeakerWaveIcon, 
  PencilIcon, 
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  LanguageIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const objectives = [
  {
    icon: BookOpenIcon,
    title: "Maîtrise de l'Alphabet et de la Phonétique",
    description: "Apprentissage systématique de l'alphabet arabe avec une attention particulière aux points d'articulation et à la prononciation correcte de chaque lettre."
  },
  {
    icon: SpeakerWaveIcon,
    title: "Développement de l'Expression Orale",
    description: "Acquisition progressive des compétences orales à travers des exercices de répétition, de dialogue et de conversation guidée."
  },
  {
    icon: PencilIcon,
    title: "Compétences en Écriture",
    description: "Apprentissage de l'écriture arabe, des règles de calligraphie de base et de la formation correcte des mots et des phrases."
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Compréhension et Expression",
    description: "Développement de la capacité à comprendre et à s'exprimer dans des situations de communication courantes et académiques."
  },
  {
    icon: AcademicCapIcon,
    title: "Fondements Grammaticaux",
    description: "Introduction progressive aux règles grammaticales essentielles de l'arabe moderne standard avec des applications pratiques."
  },
  {
    icon: GlobeAltIcon,
    title: "Contexte Culturel",
    description: "Intégration d'éléments culturels arabes et islamiques pour une compréhension plus profonde de la langue dans son contexte."
  },
  {
    icon: LanguageIcon,
    title: "Vocabulaire Thématique",
    description: "Enrichissement du vocabulaire à travers des thèmes variés : famille, société, religion, sciences, et vie quotidienne."
  },
  {
    icon: DocumentTextIcon,
    title: "Lecture de Textes Authentiques",
    description: "Progression vers la lecture et la compréhension de textes authentiques, incluant des extraits du Coran et de la littérature classique."
  }
]

export default function AlForqanePage() {
  return (
    <main>
      <Navigation />
      
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Programme Al Forqane
            </h1>
            <p className="text-xl text-green-600 font-semibold">
              Méthode Structurée d'Apprentissage de l'Arabe
            </p>
          </header>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-8 text-center md:text-left">
              La méthode Al Forqane propose une approche structurée et progressive 
              de l'apprentissage de l'arabe pour les non-arabophones. Cette méthode 
              vise à développer toutes les compétences linguistiques de manière 
              équilibrée. À travers ce programme, l'étudiant développera&nbsp;:
            </p>
            <ul className="space-y-6">
              {objectives.map((objective, index) => (
                <li 
                  key={index}
                  className="flex items-start objective-item"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <span className="flex-shrink-0 bg-green-100 text-green-600 p-3 rounded-full mr-4 mt-1">
                    <objective.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {objective.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {objective.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">Approche Pédagogique</h4>
              <p className="text-green-700 text-sm">
                La méthode Al Forqane se distingue par son approche équilibrée qui 
                intègre l'apprentissage de la langue dans son contexte culturel et 
                religieux, permettant aux étudiants de développer une compréhension 
                profonde et authentique de l'arabe.
              </p>
            </div>
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/inscription?courseId=al-forqane"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition ease-in-out duration-150 text-base"
            >
              S'inscrire au Programme Al Forqane
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Ou{' '}
              <Link href="/#guide-apprentissage" className="text-blue-600 hover:underline">
                retourner au Guide d'Apprentissage
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}