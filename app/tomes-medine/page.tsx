import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  CheckBadgeIcon, 
  BookOpenIcon, 
  PencilIcon, 
  ChatBubbleLeftRightIcon,
  EyeIcon,
  Cog6ToothIcon,
  ScaleIcon,
  PuzzlePieceIcon,
  StarIcon,
  WrenchScrewdriverIcon,
  EyeSlashIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const tome1Objectives = [
  {
    icon: CheckBadgeIcon,
    title: "Maîtriser l'alphabet arabe",
    description: "Reconnaître, lire et écrire les lettres arabes sous leurs différentes formes (initiale, médiale, finale, isolée)."
  },
  {
    icon: BookOpenIcon,
    title: "Comprendre et utiliser le vocabulaire de base",
    description: "Acquérir un vocabulaire courant relatif aux objets du quotidien, aux personnes et aux lieux."
  },
  {
    icon: PencilIcon,
    title: "Former des phrases simples",
    description: "Construire et comprendre des phrases simples en utilisant des structures de base."
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Poser et répondre à des questions simples",
    description: "Être capable de poser des questions élémentaires et d'y répondre."
  },
  {
    icon: EyeIcon,
    title: "Développer les compétences de lecture et d'écriture de base",
    description: "Lire et écrire des mots et des phrases courtes."
  },
  {
    icon: Cog6ToothIcon,
    title: "Acquérir une compréhension élémentaire de la grammaire arabe",
    description: "Identifier et utiliser les articles définis (\"al-\")."
  }
]

const tome3Objectives = [
  {
    icon: ScaleIcon,
    title: "Comprendre l'الإعراب (déclinaison) et البناء (non-déclinaison)",
    description: "Distinguer les noms déclinables (المُعْرَب) dont la terminaison change selon leur fonction, des noms non-déclinables (المَبْنِي) à terminaison fixe."
  },
  {
    icon: PuzzlePieceIcon,
    title: "Identifier les noms non-déclinables (الأسماء المبنية)",
    description: "Reconnaître les principales catégories de noms non-déclinables tels que les pronoms, noms démonstratifs, relatifs, interrogatifs, certains adverbes et nombres composés."
  },
  {
    icon: StarIcon,
    title: "Maîtriser les signes de déclinaison originaux (العلامات الأصلية)",
    description: "Appliquer correctement la Damma (nominatif), Fatha (accusatif) et Kasra (génitif) pour les noms standards."
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Appliquer les signes de déclinaison dérivés (العلامات الفرعية)",
    description: "Utiliser les signes spécifiques pour le duel, le pluriel masculin et féminin réguliers, les \"Cinq Noms\" (الأسماء الخمسة) et les diptotes (الممنوع من الصرف)."
  },
  {
    icon: EyeSlashIcon,
    title: "Comprendre la déclinaison estimée (الإعراب التقديري)",
    description: "Reconnaître les cas où les voyelles de déclinaison sont sous-entendues pour les noms Maqsour (finissant par Alif), Manqous (finissant par Ya), et les noms annexés à ياء المتكلم."
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Analyser et appliquer l'I'rab",
    description: "S'exercer à identifier les cas et les fonctions des mots dans les phrases et à appliquer les règles de déclinaison correspondantes."
  }
]

export default function TomesMedinePage() {
  return (
    <main>
      <Navigation />
      
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Objectifs Généraux du Tome 1
            </h1>
            <p className="text-xl text-blue-600 font-semibold">
              Méthode d'Arabe de l'Université de Médine
            </p>
          </header>
          
          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-8 text-center md:text-left">
              Ce premier tome d'une série pour l'apprentissage de l'arabe vise à
              établir les bases fondamentales de la langue. À la fin de ce volume,
              l'apprenant devrait être capable de&nbsp;:
            </p>
            <ul className="space-y-6">
              {tome1Objectives.map((objective, index) => (
                <li 
                  key={index}
                  className="flex items-start objective-item"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <span className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full mr-4 mt-1">
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

          <hr className="my-12 md:my-16 border-gray-300" />

          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Objectifs Généraux du Tome 3
            </h2>
            <p className="text-xl text-blue-600 font-semibold">
              Méthode d'Arabe de l'Université de Médine
            </p>
          </header>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-8 text-center md:text-left">
              Le Tome 3 approfondit l'étude de la grammaire arabe (الإعراب – la
              déclinaison) et introduit des concepts plus avancés. En progressant
              dans ce volume, l'étudiant visera à&nbsp;:
            </p>
            <ul className="space-y-6">
              {tome3Objectives.map((objective, index) => (
                <li 
                  key={index}
                  className="flex items-start objective-item"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <span className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full mr-4 mt-1">
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
            <p className="text-xs text-gray-500 mt-8">
              Remarque : Ces objectifs sont basés sur les concepts fondamentaux de
              l'I'rab introduits au début du Tome 3. Ce volume explore ces sujets
              et bien d'autres aspects de la grammaire arabe de manière beaucoup
              plus détaillée.
            </p>
          </div>
          
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/inscription?courseId=kitab-medine"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-medium transition ease-in-out duration-150 text-base"
            >
              Inscription aux Tomes de Médine
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