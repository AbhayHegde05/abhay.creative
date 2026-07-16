import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { FiMail, FiInstagram, FiLinkedin, FiGithub, FiMessageSquare, FiFacebook, FiMapPin, FiClock, FiArrowRight, FiSend, FiPhone, FiCheck, FiCheckCircle } from 'react-icons/fi'

const directContactInfo = [
  {
    id: 'email',
    icon: FiMail,
    title: 'Email',
    description: 'Best for project inquiries & quotes',
    action: 'abhayhegde643@gmail.com',
    href: 'mailto:abhayhegde643@gmail.com',
    color: 'from-primary to-secondary',
    gradient: 'bg-gradient-to-r from-primary to-secondary'
  },
  {
    id: 'phone',
    icon: FiPhone,
    title: 'WhatsApp',
    description: 'Direct chat for urgent projects',
    action: '+91 8792117628',
    href: 'https://wa.me/918792117628',
    target: '_blank',
    color: 'from-green-500 to-green-400',
    gradient: 'bg-gradient-to-r from-green-500 to-green-400'
  }
]

const socialLinks = [
  {
    id: 'instagram',
    icon: FiInstagram,
    title: 'Instagram',
    description: 'Follow for updates & creative work',
    action: '@abhay_p_hegde',
    href: 'https://www.instagram.com/abhay_p_hegde?igsh=aWFsNGtobG1icW9w',
    target: '_blank',
    color: 'from-pink-500 to-orange-500',
    gradient: 'bg-gradient-to-r from-pink-500 to-orange-500'
  },
  {
    id: 'linkedin',
    icon: FiLinkedin,
    title: 'LinkedIn',
    description: 'Professional connect & collaborations',
    action: 'Abhay Hegde',
    href: 'https://linkedin.com/in/abhay-hegde-6b2b26298',
    target: '_blank',
    color: 'from-blue-600 to-blue-400',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-400'
  },
  {
    id: 'github',
    icon: FiGithub,
    title: 'GitHub',
    description: 'Code samples & open source work',
    action: 'AbhayHegde05',
    href: 'https://github.com/AbhayHegde05',
    target: '_blank',
    color: 'from-gray-700 to-gray-500',
    gradient: 'bg-gradient-to-r from-gray-700 to-gray-500'
  },
  {
    id: 'facebook',
    icon: FiFacebook,
    title: 'Facebook',
    description: 'Follow for updates & creative work',
    action: 'Abhay Hegde',
    href: 'https://www.facebook.com/share/1KzMNZEQHD/',
    target: '_blank',
    color: 'from-blue-600 to-blue-500',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-500'
  }
]

const infoItems = [
  { icon: FiMapPin, title: 'Location', detail: 'Remote / Worldwide' },
  { icon: FiClock, title: 'Availability', detail: 'Mon-Fri, 9AM-6PM IST' },
  { icon: FiSend, title: 'Response Time', detail: 'Within 24 hours' }
]

const portfolioLinks = [
  { title: 'Social Media Designs', href: '#portfolio' },
  { title: 'YouTube Thumbnails', href: '#portfolio' },
  { title: 'Event Posters', href: '#portfolio' }
]

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setPreviewUrl('')

    try {
      const WORKER_URL = "https://abhay-creative-backend.abhayhegde643.workers.dev"
      
      const response = await fetch(`${WORKER_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.project || 'General Inquiry',
          message: formState.message,
          phone: formState.phone,
          project: formState.project,
        })
      })

      // Check if the server responded successfully
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`)
      }

      // Parse the JSON only if the response was successful
      const data = await response.json()

      setStatus('success')
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl)
      }
      setFormState({ name: '', email: '', phone: '', project: '', message: '' })
    } catch (err) {
      console.error('Contact submit error:', err)
      setStatus('error')
      setErrorMsg('Could not connect to the server. Please verify the server is running.')
    }
  }

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="contact-title">
      <div className="absolute inset-0 gradient-orb" style={{
        width: '600px',
        height: '600px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)'
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
                <FiSend className="w-4 h-4" aria-hidden="true" />
                <span>Get In Touch</span>
              </motion.div>
              <motion.h2
                id="contact-title"
                className="section-title mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Direct Contact Details
              </motion.h2>
              <motion.p
                className="text-muted text-lg leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Connect with me directly through these channels. I'm available for freelance projects and collaborations.
              </motion.p>

              <motion.div
                className="space-y-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FiMail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-medium text-text">Email</div>
                    <div className="text-sm text-muted">abhayhegde643@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <FiMessageSquare className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-medium text-text">WhatsApp</div>
                    <div className="text-sm text-muted">+91 8792117628</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-all"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
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

            <div className="space-y-4">
              {directContactInfo.map((method, index) => (
                <ScrollReveal key={method.id} className="relative">
                  <motion.a
                    href={method.href}
                    target={method.target}
                    rel={method.target ? 'noopener noreferrer' : undefined}
                    className="group relative flex items-center gap-6 p-6 glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500"
                    whileHover={{ y: -4, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.5 }}
                  >
                    <motion.div
                      className={`relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden ${method.gradient}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <method.icon className="w-7 h-7 text-text" aria-hidden="true" />
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text group-hover:text-primary transition-colors">
                        {method.title}
                      </div>
                      <div className="text-sm text-muted">{method.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-sm text-text truncate max-w-[200px]">
                        {method.action}
                      </div>
                      <motion.div
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 mt-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiArrowRight className="w-5 h-5" aria-hidden="true" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-12">
              <motion.h3
                className="text-2xl font-bold text-center mb-8 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Social Networks
              </motion.h3>
              <div className="flex justify-center gap-6 flex-wrap items-center">
                {socialLinks.map((social, index) => (
                  <ScrollReveal key={social.id} className="relative">
                    <motion.a
                      href={social.href}
                      target={social.target}
                      rel={social.target ? 'noopener noreferrer' : undefined}
                      className="glass p-4 rounded-xl hover:bg-white/10 hover:text-primary transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      aria-label={social.title}
                    >
                      <social.icon className="w-8 h-8 text-text group-hover:text-primary transition-colors" aria-hidden="true" />
                    </motion.a>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 lg:mt-20" id="contact-form">
          <motion.div
            className="glass p-8 lg:p-12 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 gradient-text">
              Send a Message Directly
            </motion.h3>
            <motion.p className="text-muted text-center mb-10 max-w-xl mx-auto">
              Prefer email? Fill out the form below and I'll get back to you as soon as possible.
            </motion.p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto text-center py-10 space-y-6 glass p-8 rounded-2xl border border-white/10"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-text">Message Sent!</h4>
                <p className="text-muted leading-relaxed">
                  Thank you! Your message has been sent successfully. An email notification has been dispatched to abhay.creative and your details are recorded.
                </p>
                {previewUrl && (
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-left">
                    <p className="text-xs text-primary font-semibold mb-1">Development Mail Preview:</p>
                    <p className="text-xs text-muted mb-2">You can preview the sent SMTP email at Ethereal:</p>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:underline break-all inline-block font-mono"
                    >
                      {previewUrl}
                    </a>
                  </div>
                )}
                <div className="pt-4">
                  <button onClick={() => setStatus('idle')} className="btn-secondary py-2.5 px-6 text-sm">
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                className="max-w-xl mx-auto space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text placeholder:text-muted/50"
                      placeholder="Your Name"
                    />
                  </motion.div>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text placeholder:text-muted/50"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                    Phone / WhatsApp <span className="text-muted/50 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text placeholder:text-muted/50"
                    placeholder="+91 98765 43210"
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="project" className="block text-sm font-medium text-text mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formState.project}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="social-media">Social Media Designs</option>
                    <option value="thumbnails">YouTube Thumbnails</option>
                    <option value="posters">Event Posters</option>
                    <option value="marketing">Marketing Graphics</option>
                    <option value="presentation">Presentation Graphics</option>
                    <option value="branding">Branding Assets</option>
                    <option value="custom">Custom Graphic Design</option>
                  </select>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text placeholder:text-muted/50 resize-none"
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  />
                </motion.div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full sm:w-auto mx-auto sm:mx-0 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <motion.p className="text-center text-xs text-muted/60 mt-4">
                  By submitting, you agree to my privacy policy. No spam, ever.
                </motion.p>
              </form>
            )}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}