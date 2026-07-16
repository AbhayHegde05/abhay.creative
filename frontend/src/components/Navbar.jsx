import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiMail, FiInstagram, FiLinkedin, FiGithub, FiMessageSquare, FiFacebook } from 'react-icons/fi'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

const socialLinks = [
  { href: 'mailto:abhayhegde643@gmail.com', icon: FiMail, label: 'Email' },
  { href: 'https://www.instagram.com/abhay_p_hegde?igsh=aWFsNGtobG1icW9w', icon: FiInstagram, label: 'Instagram', target: '_blank' },
  { href: 'https://linkedin.com/in/abhay-hegde-6b2b26298', icon: FiLinkedin, label: 'LinkedIn', target: '_blank' },
  { href: 'https://github.com/AbhayHegde05', icon: FiGithub, label: 'GitHub', target: '_blank' },
  { href: 'https://wa.me/918792117628', icon: FiMessageSquare, label: 'WhatsApp', target: '_blank' },
  { href: 'https://www.facebook.com/share/1KzMNZEQHD/', icon: FiFacebook, label: 'Facebook', target: '_blank' }
]

export default function Navbar({ onHireClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="section-container flex items-center justify-between" aria-label="Main navigation">
        <motion.a
          href="#home"
          className="text-2xl font-bold gradient-text tracking-tight flex items-center"
          aria-label="abhay.creative - Home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-primary">abhay.</span>creative
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-muted hover:text-text transition-colors duration-200 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary hover:after:w-full transition-all duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isScrolled && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2"
              >
                {socialLinks.slice(0, 3).map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.target}
                    rel={social.target ? 'noopener noreferrer' : undefined}
                    className="glass p-2 rounded-xl hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={onHireClick}
            className="btn-primary hidden sm:flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
          </motion.button>
        </div>

        <button
          className="md:hidden glass p-2 rounded-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="block text-lg font-medium text-muted hover:text-text transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.target}
                    rel={social.target ? 'noopener noreferrer' : undefined}
                    className="btn-secondary flex-1 min-w-[140px] justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <social.icon className="w-5 h-5" />
                    {social.label}
                  </motion.a>
                ))}
              </div>
              <motion.button
                onClick={(e) => { onHireClick(e); setIsMenuOpen(false); }}
                className="btn-primary w-full justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}