'use client'

import Link from 'next/link'
import { ClockIcon, VideoCameraIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const courses = [
  {
    id: "alphabétisation",
    title: "Programme Alphabétisation",
    level: "Pour débutant",
    duration: "Session de 3 mois (13 semaines)",
    lessons: "26 leçons en classe virtuelle",
    features: "Exercices interactifs",
    description: "Apprenez les bases de l'arabe moderne standard avec notre méthode progressive et intuitive.",
    colorClasses: {
      bg: "bg-amber-600",
      hover: "hover:bg-amber-700",
      text: "text-amber-600",
      textLight: "text-amber-100"
    },
     prices: [
      { label: "Classe en particulier:", value: "73.00€/Personne (soit seulement 7,30€/h)" },
      { label: "Classe 2 personnes:", value: "66.50€/Personne (soit seulement 6,65€/h)" },
      { label: "Classe 3 personnes:", value: "61.16€/Personne (soit seulement 6,15€/h)" },
      { label: "Classe 4 personnes:", value: "51.50€/Personne (soit seulement 5,15€/h)" }
    ]
  },
  {
    id: "kitab-medine",
    title: "Programme Kitab de Médine",
    level: "Tous niveaux",
    duration: "Session de 3 mois (13 semaines)",
    lessons: "26 leçons en classe virtuelle",
    features: "Exercices + Conversations",
    description: "Approfondissez vos connaissances et développez votre fluidité dans des situations réelles.",
    colorClasses: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-blue-600",
      textLight: "text-blue-100"
    },
     prices: [
      { label: "Classe en particulier:", value: "73.00€/Personne (soit seulement 7,30€/h)" },
      { label: "Classe 2 personnes:", value: "66.50€/Personne (soit seulement 6,65€/h)" },
      { label: "Classe 3 personnes:", value: "61.16€/Personne (soit seulement 6,15€/h)" },
      { label: "Classe 4 personnes:", value: "51.50€/Personne (soit seulement 5,15€/h)" }
    ]
  },
  {
    id: "al-forqane",
    title: "Programme Al Forqane",
    level: "Tous niveaux",
    duration: "Session de 3 mois (13 semaines)",
    lessons: "26 leçons en classe virtuelle",
    features: "Exercices + Littérature",
    description: "Maîtrisez l'arabe avec des cours sur la culture et la littérature arabes, basé sur la méthode Al Forqane.",
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
  }
]

export default function CoursesSection() {
  return (
    <section id="cours" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Nos Offres de Cours
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choisissez le programme qui correspond à vos besoins et commencez
          votre voyage dans l'apprentissage de l'arabe.
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
                  {course.prices.map((price, index) => (
                    <div key={index} className="mb-1 text-center">
                      <span className="text-gray-700 text-sm">{price.label}</span>{' '}
                      <span className="text-xl font-bold text-gray-800">{price.value}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/inscription?courseId=${course.id}`}
                  className={`block ${course.colorClasses.bg} ${course.colorClasses.hover} text-white text-center py-2 rounded-md transition`}
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/cours"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            Voir tous les cours
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}