import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { FiMessageSquare, FiStar, FiArrowRight } from 'react-icons/fi'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="testimonials-title">
      <div className="absolute inset-0 gradient-orb" style={{
        width: '500px',
        height: '500px',
        top: '0',
        right: '0',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)'
      }} aria-hidden="true" />

      <div className="relative section-container">
        <ScrollReveal className="mb-16 lg:mb-20 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiMessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Client Feedback</span>
          </motion.div>
          <motion.h2
            id="testimonials-title"
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Testimonials
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Real feedback from clients I've had the pleasure of working with.
          </motion.p>
        </ScrollReveal>

        <ScrollReveal>
          <motion.div
            className="glass p-12 lg:p-16 rounded-2xl text-center border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '40px 40px' }} aria-hidden="true" />

            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-8"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FiMessageSquare className="w-12 h-12 text-primary" aria-hidden="true" />
              </motion.div>

              <motion.h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Testimonials Coming Soon
              </motion.h3>

              <motion.p className="text-muted max-w-xl mb-8 leading-relaxed">
                I'm currently collecting feedback from my amazing clients. Check back soon to see what they have to say about working together!
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-4 flex-wrap mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    className="text-primary"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + star * 0.1, type: 'spring', stiffness: 500 }}
                  >
                    <FiStar className="w-8 h-8 fill-current" aria-hidden="true" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p className="text-sm text-muted/70 mb-8">
                Based on <span className="font-medium text-text">20+</span> completed projects
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-card/50 rounded-xl border border-white/5 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">100%</div>
                  <div className="text-xs text-muted">Satisfaction Rate</div>
                </div>
                <div className="w-px h-10 bg-white/10 sm:w-10 sm:h-px" aria-hidden="true" />
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">24h</div>
                  <div className="text-xs text-muted">Avg. Response Time</div>
                </div>
                <div className="w-px h-10 bg-white/10 sm:w-10 sm:h-px" aria-hidden="true" />
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">∞</div>
                  <div className="text-xs text-muted">Revisions Included</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              aria-hidden="true"
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center">
          <motion.p
            className="text-muted mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Just worked with me? I'd love to hear your experience.
          </motion.p>
          <motion.a
            href="mailto:abhayhegde643@gmail.com?subject=Testimonial for abhay.creative"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Share Your Feedback
            <FiArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  )
}