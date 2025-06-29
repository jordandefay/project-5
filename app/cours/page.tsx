import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ClockIcon, VideoCameraIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const courses = [
  {
    id: "alphabétisation",
    title: "Programme Alphabétisation",
    level: "Pour débutant",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Exercices interactifs",
    description: "Apprenez les bases de l'arabe moderne standard avec notre méthode progressive et intuitive. Idéal pour commencer votre voyage linguistique.",
    colorClasses: {
      bg: "bg-amber-600",
      hover: "hover:bg-amber-700",
      text: "text-amber-600",
      textLight: "text-amber-100"
    },
 prices: [
      { label: "Classe en particulier:", value: "73.00€/Personne (soit seulement 7,30€/h)" },
      { label: "Classe 2 personnes:", value: "66.50€/Personne (soit seulement 6,65€/h)" },
      { label: "Classe 3 personnes:", value: "61.15€/Personne (soit seulement 6,15€/h)" },
      { label: "Classe 4 personnes:", value: "51.50€/Personne (soit seulement 5,15€/h)" }
    ]
  },
  {
    id: "kitab-medine",
    title: "Programme Kitab de Médine",
    level: "Tous niveaux",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Exercices + Conversations",
    description: "Approfondissez vos connaissances et développez votre fluidité dans des situations réelles en étudiant les célèbres Tomes de Médine.",
    colorClasses: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-blue-600",
      textLight: "text-blue-100"
    },
    prices: [
      { label: "Classe en particulier:", value: "73.00€/Personne (soit seulement 7,30€/h)" },
      { label: "Classe 2 personnes:", value: "66.50€/Personne (soit seulement 6,65€/h)" },
      { label: "Classe 3 personnes:", value: "61.15€/Personne (soit seulement 6,15€/h)" },
      { label: "Classe 4 personnes:", value: "51.50€/Personne (soit seulement 5,15€/h)" }
    ]
  },
  {
    id: "al-forqane",
    title: "Programme Al Forqane",
    level: "Tous niveaux",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Exercices + Littérature",
    description: "Maîtrisez l'arabe avec des cours sur la culture et la littérature arabes, basé sur la célèbre méthode Al Forqane.",
    colorClasses: {
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      text: "text-green-600",
      textLight: "text-green-100"
    },
    prices: [
      { label: "Classe en particulier:", value: "73.90€/Personne (soit seulement 7,39€/h)" },
      { label: "Classe 2 personnes:", value: "67.90€/Personne (soit seulement 6,79€/h)" },
      { label: "Classe 3 personnes:", value: "63.90€/Personne (soit seulement 6,39€/h)" },
      { label: "Classe 4 personnes:", value: "54.90€/Personne (soit seulement 5,49€/h)" }
    ]
  },
  {
    id: "coran",
    title: "Programme de Coran (femmes seulement)",
    level: "Tous niveaux",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Récitation et correction",
    description: "Apprenez le noble Coran et corrigez votre récitation par un(e) professeur(e) autorisé à enseigner.",
    colorClasses: {
      bg: "bg-purple-600",
      hover: "hover:bg-purple-700",
      text: "text-purple-600",
      textLight: "text-purple-100"
    },
    status: "soon",
    displayPrice: "Inscriptions fermées"
  },
  {
    id: "tajwid",
    title: "Programme Tajwid (femmes seulement)",
    level: "Tous niveaux",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Mise en situation pratique",
    description: "Comprenez et appliquez les règles de Tajwid pour une récitation parfaite du Noble Coran avec nos professeurs experts et certifiés.",
    colorClasses: {
      bg: "bg-teal-600",
      hover: "hover:bg-teal-700",
      text: "text-teal-600",
      textLight: "text-teal-100"
    },
    status: "soon",
    displayPrice: "Inscriptions fermées"
  },
  {
    id: "session-ete",
    title: "Session été",
    level: "Tous niveaux",
    duration: "Session de 1 mois (5 semaines)",
    lessons: "10 heures en classe virtuelle (2h/semaine)",
    features: "Etude de textes + dialogues",
    description: "Apprennez les bases de la langue arabe ou passez au niveau au-dessus avec le programme Al Forqane.",
    colorClasses: {
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
      text: "text-red-600",
      textLight: "text-red-100"
    },
    prices: [
      { label: "Classe en particulier:", value: "73.90€/Personne (soit seulement 7,39€/h)" },
      { label: "Classe 2 personnes:", value: "68.90€/Personne (soit seulement 6,89€/h)" },
      { label: "Classe 3 personnes:", value: "63.90€/Personne (soit seulement 6,39€/h)" },
      { label: "Classe 4 personnes:", value: "53.90€/Personne (soit seulement 5,39€/h)" }
    ]
  }
]

export default function CoursesPage() {
  return (
    <main>
      <Navigation />
      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Découvrez Tous Nos Cours d'Arabe
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Plongez dans notre catalogue complet de formations et trouvez le cours
            parfaitement adapté à vos objectifs d'apprentissage. Que vous soyez
            débutant ou avancé, nous avons un programme pour vous.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300"
              >
                <div className={`${course.colorClasses.bg} text-white py-4 px-6`}>
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className={course.colorClasses.textLight}>{course.level}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <ClockIcon className={`h-5 w-5 ${course.colorClasses.text} mr-2`} />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <VideoCameraIcon className={`h-5 w-5 ${course.colorClasses.text} mr-2`} />
                    <span className="text-sm">{course.lessons}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <BookOpenIcon className={`h-5 w-5 ${course.colorClasses.text} mr-2`} />
                    <span className="text-sm">{course.features}</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">
                    {course.description}
                  </p>
                  
                  <div className="text-center mb-4 min-h-[60px] flex flex-col items-center justify-center">
                    {course.status === 'soon' ? (
                      <p className="text-lg text-gray-500 italic py-4">
                        {course.displayPrice}
                      </p>
                    ) : course.prices ? (
                      course.prices.map((price, index) => (
                        <div key={index} className="mb-1 text-center">
                          <span className="text-gray-700 text-sm">{price.label}</span>{' '}
                          <span className="text-xl font-bold text-gray-800">{price.value}</span>
                        </div>
                      ))
                    ) : null}
                  </div>
                  
                  {course.status === 'soon' ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white text-center py-2 rounded-md opacity-75 cursor-not-allowed"
                    >
                      Bientôt disponible
                    </button>
                  ) : course.id === 'session-ete' ? (
                    <Link
                      href="/session-ete"
                      className={`block ${course.colorClasses.bg} ${course.colorClasses.hover} text-white text-center py-2 rounded-md transition`}
                    >
                      S'inscrire
                    </Link>
                  ) : (
                    <Link
                      href={`/inscription?courseId=${course.id}`}
                      className={`block ${course.colorClasses.bg} ${course.colorClasses.hover} text-white text-center py-2 rounded-md transition`}
                    >
                      S'inscrire
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-12">
            * Tous nos prix sont en euros et par personne.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}