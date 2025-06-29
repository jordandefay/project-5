import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  AcademicCapIcon, 
  SpeakerWaveIcon, 
  PencilIcon, 
  LinkIcon, 
  BookOpenIcon, 
  PencilSquareIcon, 
  BookmarkIcon, 
  CheckBadgeIcon 
} from '@heroicons/react/24/outline'

const objectives = [
  {
    icon: AcademicCapIcon,
    title: "Reconnaître et Nommer l'Alphabet Arabe",
    description: "Identifier et nommer chacune des 28 lettres de l'alphabet arabe."
  },
  {
    icon: SpeakerWaveIcon,
    title: "Maîtriser la Prononciation Correcte",
    description: "Apprendre les points d'articulation (makhārij) de chaque lettre pour une prononciation précise, en distinguant les sons spécifiques à l'arabe."
  },
  {
    icon: PencilIcon,
    title: "Connaître les Formes des Lettres",
    description: "Reconnaître et écrire les différentes formes que prend chaque lettre selon sa position dans un mot (initiale, médiale, finale, isolée)."
  },
  {
    icon: LinkIcon,
    title: "Appliquer les Règles de Liaison",
    description: "Comprendre et appliquer correctement les règles de connexion (liaison) entre les lettres pour former des mots lisibles."
  },
  {
    icon: BookOpenIcon,
    title: "Lire des Mots et Phrases Simples Vocalisés",
    description: "Être capable de lire des mots et des phrases courtes avec les voyelles brèves (harakat) et les autres signes diacritiques (tanwin, shadda, sukun)."
  },
  {
    icon: PencilSquareIcon,
    title: "S'initier à l'Écriture",
    description: "Commencer à écrire les lettres arabes individuellement et à former des mots simples en respectant les proportions et les liaisons."
  },
  {
    icon: BookmarkIcon,
    title: "Poser les Fondations pour la Lecture du Coran",
    description: "Acquérir les compétences de base nécessaires pour aborder la lecture du Coran et d'autres textes en arabe."
  },
  {
    icon: CheckBadgeIcon,
    title: "Distinguer les Sons Proches",
    description: "Développer une oreille attentive pour différencier les lettres arabes dont les sonorités peuvent paraître similaires à un non-natif."
  }
]

export default function AlphabetisationPage() {
  return (
    <main>
      <Navigation />
      
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Programme d'Alphabétisation en Arabe
            </h1>
            <p className="text-xl text-amber-600 font-semibold">
              Apprendre à Lire et Écrire l'Arabe pour Débutants
            </p>
          </header>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-8 text-center md:text-left">
              Le programme d'alphabétisation est la première étape essentielle
              pour quiconque souhaite apprendre la langue arabe. Il est conçu pour
              les débutants absolus et vise à fournir une base solide pour la
              lecture, l'écriture et la compréhension de l'arabe. À la fin de ce
              programme, l'élève devrait être capable de&nbsp;:
            </p>
            <ul className="space-y-6">
              {objectives.map((objective, index) => (
                <li 
                  key={index}
                  className="flex items-start objective-item"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <span className="flex-shrink-0 bg-amber-100 text-amber-600 p-3 rounded-full mr-4 mt-1">
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
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/inscription?courseId=alphabétisation"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-medium transition ease-in-out duration-150 text-base"
            >
              S'inscrire au Programme d'Alphabétisation
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