import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import PortfolioSection from './sections/PortfolioSection'
import ServicesSection from './sections/ServicesSection'
import WhyChooseMeSection from './sections/WhyChooseMeSection'
import AboutSection from './sections/AboutSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'
import HireModal from './components/HireModal'

export default function App() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false)

  const openHireModal = (e) => {
    if (e) e.preventDefault()
    setIsHireModalOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-text"
    >
      <Navbar onHireClick={openHireModal} />

      <main className="pt-20">
        <HeroSection onHireClick={openHireModal} />
        <PortfolioSection />
        <ServicesSection />
        <WhyChooseMeSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      <HireModal isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />
    </motion.div>
  )
}