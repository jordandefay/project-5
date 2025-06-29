import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import CoursesSection from '@/components/CoursesSection'
import LearningGuide from '@/components/LearningGuide'
import MethodSection from '@/components/MethodSection'
import CallToAction from '@/components/CallToAction'
import FAQ from '@/components/FAQ'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <WhyChooseUs />
      <CoursesSection />
      <LearningGuide />
      <MethodSection />
      <CallToAction />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  )
}