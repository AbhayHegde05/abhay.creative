import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { FiCheckCircle, FiClock, FiStar, FiCpu, FiEye, FiTrendingUp } from 'react-icons/fi'

const reasons = [
  {
    id: 'fast-delivery',
    icon: FiClock,
    title: 'Fast Delivery',
    description: 'Streamlined workflow and efficient processes ensure your projects are delivered on time, every time — without compromising on quality.',
    stat: '24-48h',
    statLabel: 'Typical Turnaround'
  },
  {
    id: 'professional-designs',
    icon: FiStar,
    title: 'Professional Designs',
    description: 'Every design meets industry standards with pixel-perfect execution, proper typography, color theory, and platform-specific optimization.',
    stat: '100%',
    statLabel: 'Quality Guaranteed'
  },
  {
    id: 'creative-thinking',
    icon: FiCpu,
    title: 'Creative Thinking',
    description: 'Fresh perspectives and innovative approaches for every project. I don\'t just follow trends — I create designs that stand out and perform.',
    stat: '∞',
    statLabel: 'Creative Possibilities'
  },
  {
    id: 'attention-detail',
    icon: FiEye,
    title: 'Attention to Detail',
    description: 'Meticulous attention to every pixel, spacing, alignment, and interaction. The difference between good and great is in the details.',
    stat: 'Pixel',
    statLabel: 'Perfect Precision'
  },
  {
    id: 'modern-style',
    icon: FiTrendingUp,
    title: 'Modern Design Style',
    description: 'Contemporary aesthetics aligned with current design trends while maintaining timeless appeal. Your brand stays relevant and forward-thinking.',
    stat: '2024+',
    statLabel: 'Current Trends'
  }
]

export default function WhyChooseMeSection() {
  return (
    <section id="why-choose-me" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="why-choose-title">
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
            <FiStar className="w-4 h-4" aria-hidden="true" />
            <span>Why Choose Me</span>
          </motion.div>
          <motion.h2
            id="why-choose-title"
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Why Choose Me
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Five reasons why clients trust me with their visual identity and keep coming back for more.
          </motion.p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.id} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="glass p-8 rounded-2xl h-full border border-white/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <div className="relative z-10 space-y-6">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <reason.icon className="w-7 h-7" aria-hidden="true" />
                    </motion.div>

                    <div className="space-y-4">
                      <div className="flex items-baseline gap-3">
                        <motion.span
                          className="text-4xl font-bold gradient-text"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 500 }}
                        >
                          {reason.stat}
                        </motion.span>
                        <span className="text-muted text-sm">{reason.statLabel}</span>
                      </div>

                      <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                        {reason.title}
                      </h3>

                      <p className="text-muted leading-relaxed">
                        {reason.description}
                      </p>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <motion.div
                  className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                >
                  <FiCheckCircle className="w-full h-full text-primary/50" />
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 lg:mt-20">
          <motion.div
            className="glass p-8 lg:p-12 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '20+', label: 'Happy Clients' },
                { value: '5★', label: 'Average Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative"
                >
                  <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted">{stat.label}</div>
                  {index < 2 && (
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}