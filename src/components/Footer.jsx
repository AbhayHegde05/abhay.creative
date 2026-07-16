import { motion } from 'framer-motion'
import { FiMail, FiInstagram, FiLinkedin, FiGithub, FiMessageSquare, FiFacebook, FiHeart } from 'react-icons/fi'

const socialLinks = [
  { href: 'mailto:abhayhegde643@gmail.com', icon: FiMail, label: 'Email' },
  { href: 'https://www.instagram.com/abhay_p_hegde?igsh=aWFsNGtobG1icW9w', icon: FiInstagram, label: 'Instagram' },
  { href: 'https://linkedin.com/in/abhay-hegde-6b2b26298', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/AbhayHegde05', icon: FiGithub, label: 'GitHub' },
  { href: 'https://wa.me/918792117628', icon: FiMessageSquare, label: 'WhatsApp' },
  { href: 'https://www.facebook.com/share/1KzMNZEQHD/', icon: FiFacebook, label: 'Facebook' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-card/50 backdrop-blur-glass">
      <div className="section-container py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="text-2xl font-bold gradient-text tracking-tight flex items-center justify-center md:justify-start mb-4">
              <span className="text-primary">abhay.</span>creative
            </div>
            <p className="text-muted text-sm max-w-xs mx-auto md:mx-0">
              Creating Visuals That Make Brands Stand Out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center md:justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.target}
                rel={social.target ? 'noopener noreferrer' : undefined}
                className="glass p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-muted text-sm">
              © {currentYear} abhay.creative. All rights reserved.
            </p>
            <p className="text-xs text-muted/60 mt-1 flex items-center justify-center md:justify-end gap-1">
              Made with
              <FiHeart className="w-3 h-3 text-primary" aria-hidden="true" />
              by Abhay Hegde
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}