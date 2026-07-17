import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCheckCircle } from 'react-icons/fi'

export default function HireModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    details: ''
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [previewEmailUrl, setPreviewEmailUrl] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setPreviewEmailUrl('')

    try {
      const WORKER_URL = "https://abhay-creative-backend.abhayhegde643.workers.dev"
      const response = await fetch(`${WORKER_URL}/api/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`)
      }

      const data = await response.json()

      setStatus('success')
      if (data.previewUrl) {
        setPreviewEmailUrl(data.previewUrl)
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        details: ''
      })
    } catch (err) {
      console.error('Hiring submission error:', err)
      setStatus('error')
      setErrorMsg('Failed to connect to the server. Please ensure the backend is running.')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    setErrorMsg('')
    setPreviewEmailUrl('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-glass p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hire-modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl glass p-6 sm:p-10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-card/90"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 glass p-2 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5 text-text" />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center"
                  >
                    <FiCheckCircle className="w-12 h-12" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-text">Inquiry Received!</h2>
                <p className="text-muted max-w-md mx-auto leading-relaxed">
                  Thank you for your interest! A hiring request has been registered.
                </p>

                {previewEmailUrl && (
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 max-w-md mx-auto text-left">
                    <p className="text-xs text-primary font-semibold mb-1">Development Mail Preview:</p>
                    <a
                      href={previewEmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:underline break-all inline-block font-mono"
                    >
                      {previewEmailUrl}
                    </a>
                  </div>
                )}

                <div className="pt-6">
                  <button onClick={handleClose} className="btn-primary">
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-3">
                    Freelance & Collaboration
                  </span>
                  <h2 id="hire-modal-title" className="text-2xl sm:text-3xl font-bold text-text">
                    Hire abhay.creative
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Form Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Name or Company" className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text text-sm" />
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text text-sm" />
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text text-sm" />
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select name="service" required value={formData.service} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-text text-sm">
                      <option value="">Select a service</option>
                      <option value="Posters">Premium Posters</option>
                      <option value="Custom Project">Custom Creatives</option>
                    </select>
                    <div className="w-full">
                      <input type="text" name="budget" required value={formData.budget} onChange={handleInputChange} placeholder="e.g. 5000" className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-text text-sm" />
                      <p className="text-xs text-muted mt-1.5">Enter the amount you'd like to pay (in Indian Rupees ₹).</p>
                    </div>
                  </div>
                  <textarea name="details" required rows={4} value={formData.details} onChange={handleInputChange} placeholder="Project Details..." className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-primary text-text text-sm" />

                  {status === 'error' && (
                    <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={handleClose} disabled={status === 'loading'} className="btn-secondary py-2.5 px-6">Cancel</button>
                    <button type="submit" disabled={status === 'loading'} className="btn-primary py-2.5 px-6">
                      {status === 'loading' ? 'Submitting...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
