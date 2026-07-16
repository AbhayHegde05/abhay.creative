import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import {
  FiLayout,
  FiImage,
  FiYoutube,
  FiFileText,
  FiTarget,
  FiPenTool,
  FiZap,
  FiAward,
  FiEye,
  FiLayers
} from 'react-icons/fi'

const primaryServices = [
  {
    id: 'social-media',
    icon: FiLayout,
    title: 'Social Media Designs',
    description: 'Scroll-stopping social media graphics for Instagram, LinkedIn, Twitter, and Facebook. Carousel posts, single images, story templates, and ad creatives optimized for engagement and brand consistency.',
    features: ['Instagram Posts & Carousels', 'LinkedIn Professional Graphics', 'Story & Reel Templates', 'Social Media Ad Creatives'],
    gradient: 'from-primary to-secondary',
    iconBg: 'bg-primary/20'
  },
  {
    id: 'thumbnails',
    icon: FiYoutube,
    title: 'YouTube Thumbnails',
    description: 'High-CTR thumbnail designs that drive clicks and views. Strategic visual hierarchy, emotional triggers, consistent branding, and A/B testing variants optimized for the YouTube algorithm.',
    features: ['Custom Thumbnail Design', 'A/B Test Variants', 'Channel Branding Kit', 'Video Title Optimization'],
    gradient: 'from-secondary to-primary',
    iconBg: 'bg-secondary/20'
  }
]

const additionalServices = [
  {
    id: 'posters',
    icon: FiFileText,
    title: 'Event Posters',
    description: 'Eye-catching event posters for conferences, workshops, concerts, and corporate events. Print and digital formats with compelling visual storytelling.'
  },
  {
    id: 'marketing',
    icon: FiTarget,
    title: 'Marketing Graphics',
    description: 'Conversion-focused marketing assets including email headers, landing page graphics, banner ads, and promotional materials for campaigns.'
  },
  {
    id: 'presentation',
    icon: FiLayout,
    title: 'Presentation Graphics',
    description: 'Professional slide decks, pitch presentations, and keynote designs that communicate your message with visual impact and clarity.'
  },
  {
    id: 'branding',
    icon: FiPenTool,
    title: 'Branding Assets',
    description: 'Complete brand identity packages including logos, color palettes, typography systems, brand guidelines, and application mockups.'
  },
  {
    id: 'custom',
    icon: FiLayers,
    title: 'Custom Graphic Design',
    description: 'Tailored visual solutions for unique requirements — merchandise designs, packaging, digital illustrations, and specialized creative projects.'
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="services-title">
      <div className="absolute inset-0 gradient-orb" style={{
        width: '500px',
        height: '500px',
        bottom: '0',
        left: '0',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)'
      }} aria-hidden="true" />

      <div className="relative section-container">
        <ScrollReveal className="mb-16 lg:mb-20 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiZap className="w-4 h-4" aria-hidden="true" />
            <span>What I Do</span>
          </motion.div>
          <motion.h2
            id="services-title"
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Services
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Specialized in creating visual content that converts. From social media to YouTube, every design is crafted with strategy and purpose.
          </motion.p>
        </ScrollReveal>

        <div className="space-y-16 lg:space-y-20">
          <ScrollReveal>
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-center mb-10 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Primary Services
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
              {primaryServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="glass p-8 rounded-2xl h-full border border-white/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${service.gradient.replace('from-', '').replace('to-', '')})` }} aria-hidden="true" />
                    <div className="relative z-10 space-y-6">
                      <motion.div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.iconBg} text-primary`}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <service.icon className="w-7 h-7" aria-hidden="true" />
                      </motion.div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-muted leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <ul className="space-y-2 pt-4 border-t border-white/10">
                        {service.features.map((feature, featIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-muted group-hover:text-text transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + featIndex * 0.05 }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + featIndex * 0.05, type: 'spring', stiffness: 500 }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-center mb-10 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Additional Services
            </motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="glass p-6 rounded-2xl h-full border border-white/10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary"
                        whileHover={{ scale: 1.1 }}
                      >
                        <service.icon className="w-6 h-6" aria-hidden="true" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted leading-relaxed mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 lg:mt-20">
          <motion.div
            className="glass p-8 lg:p-12 rounded-2xl text-center border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <FiAward className="w-4 h-4" aria-hidden="true" />
              <span>Ready to Start Your Project?</span>
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Let's Create Something
              <br />
              <span className="gradient-text">Remarkable Together</span>
            </h3>
            <p className="text-muted max-w-xl mx-auto mb-8">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
            </p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
              <FiEye className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}