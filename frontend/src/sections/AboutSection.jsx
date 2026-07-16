import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { FiUser, FiTarget, FiHeart, FiCoffee, FiMusic, FiBookOpen } from 'react-icons/fi'

export default function AboutSection() {
  const skills = [
    { name: 'Adobe Photoshop', level: 95 },
    { name: 'Adobe Illustrator', level: 90 },
    { name: 'Figma', level: 88 },
    { name: 'Adobe After Effects', level: 80 },
    { name: 'Typography', level: 92 },
    { name: 'Color Theory', level: 94 },
    { name: 'Brand Identity', level: 88 },
    { name: 'Social Media Strategy', level: 85 }
  ]

  const personalDetails = [
    { icon: FiTarget, title: 'Focus', detail: 'Specialized in social media & YouTube design' },
    { icon: FiHeart, title: 'Passion', detail: 'Obsessed with visual storytelling & aesthetics' },
    { icon: FiCoffee, title: 'Fuel', detail: 'Powered by specialty coffee & late nights' },
    { icon: FiMusic, title: 'Vibe', detail: 'Synthwave & lo-fi while designing' },
    { icon: FiBookOpen, title: 'Growth', detail: 'Constantly learning new techniques & trends' }
  ]

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="about-title">
      <div className="absolute inset-0 gradient-orb" style={{
        width: '500px',
        height: '500px',
        bottom: '0',
        left: '0',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)'
      }} aria-hidden="true" />

      <div className="relative section-container">
        <ScrollReveal className="mb-16 lg:mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <FiUser className="w-4 h-4" aria-hidden="true" />
                <span>About Me</span>
              </motion.div>
              <motion.h2
                id="about-title"
                className="section-title mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Hi, I'm Abhay Hegde
              </motion.h2>
              <motion.div
                className="space-y-4 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.p className="text-text">
                  I'm a freelance graphic designer specializing in creating high-impact social media designs and YouTube thumbnails that capture attention and drive engagement.
                </motion.p>
                <motion.p className="text-muted">
                  With a deep understanding of platform algorithms, visual psychology, and brand strategy, I craft designs that don't just look good — they perform. Every pixel serves a purpose.
                </motion.p>
                <motion.p className="text-muted">
                  My approach combines modern aesthetics with data-driven design decisions. Whether it's a carousel post that needs to stop the scroll or a thumbnail that demands a click, I deliver visuals that convert.
                </motion.p>
              </motion.div>

              <motion.div
                className="mt-10 grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {personalDetails.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3 p-4 glass rounded-xl hover:border-primary/30 transition-all"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-medium text-text">{item.title}</div>
                      <div className="text-sm text-muted">{item.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                className="relative aspect-square max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50 animate-pulse" aria-hidden="true" />
                <div className="relative glass rounded-3xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">50+</div>
                    <div className="text-muted">Projects Delivered</div>
                  </div>
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-30 blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-secondary to-primary opacity-30 blur-xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-center mb-10 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Technical Expertise
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl group"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-text">{skill.name}</span>
                  <span className="text-sm font-bold text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}