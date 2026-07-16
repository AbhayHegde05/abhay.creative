import { motion } from 'framer-motion'
import { FiArrowRight, FiMousePointer } from 'react-icons/fi'
import ScrollReveal from '../components/ScrollReveal'
import MouseGlow from '../components/MouseGlow'

export default function HeroSection({ onHireClick }) {
  const scrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay" aria-labelledby="hero-title">
      <MouseGlow className="absolute inset-0" />

      <div className="absolute inset-0 bg-grid-pattern" style={{ backgroundSize: '80px 80px' }} aria-hidden="true" />

      <div className="absolute inset-0 gradient-orb" style={{
        width: '600px',
        height: '600px',
        top: '10%',
        left: '-10%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)'
      }} aria-hidden="true" />

      <div className="absolute inset-0 gradient-orb" style={{
        width: '500px',
        height: '500px',
        bottom: '10%',
        right: '-10%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        animationDelay: '-3s'
      }} aria-hidden="true" />

      <div className="absolute inset-0 gradient-orb" style={{
        width: '400px',
        height: '400px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        animationDelay: '-1.5s'
      }} aria-hidden="true" />

      <div className="relative z-10 section-container py-20 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal className="mb-8">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for freelance projects
            </motion.span>
          </ScrollReveal>

          <ScrollReveal className="mb-8">
            <motion.h1
              id="hero-title"
              className="section-title text-balance leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Designs That Capture Attention{' '}
              <br />
              <span className="gradient-text">& Build Brands.</span>
            </motion.h1>
          </ScrollReveal>

          <ScrollReveal className="mb-12 max-w-3xl mx-auto">
            <motion.p
              className="section-subtitle text-balance text-lg sm:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              I create modern social media designs, YouTube thumbnails, and custom visual creatives for businesses, creators, startups, and organizations.
            </motion.p>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => scrollTo('#portfolio')}
              className="btn-primary group flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              View Portfolio
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <FiArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <motion.button
              onClick={onHireClick}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Hire Me
            </motion.button>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
            <motion.div
              className="flex items-center justify-center gap-8 text-muted text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span>Social Media Designs</span>
              </div>
              <div className="w-px h-6 bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.3s' }} aria-hidden="true" />
                <span>YouTube Thumbnails</span>
              </div>
              <div className="w-px h-6 bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.6s' }} aria-hidden="true" />
                <span>Custom Visuals</span>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal className="mt-12">
            <motion.button
              onClick={() => scrollTo('#portfolio')}
              className="flex items-center gap-2 text-muted hover:text-text transition-colors group"
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              aria-label="Scroll down to view portfolio"
            >
              <FiMousePointer className="w-5 h-5" aria-hidden="true" />
              <span>Explore Work</span>
              <motion.div
                className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors"
              >
                <motion.svg
                  className="w-4 h-4 text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </motion.svg>
              </motion.div>
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}