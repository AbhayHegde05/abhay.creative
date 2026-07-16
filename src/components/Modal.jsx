import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload } from 'react-icons/fi'

export default function Modal({ isOpen, onClose, image, title, category, description }) {
  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-glass"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 glass p-2 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5 text-text" />
            </button>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <motion.img
                  src={image}
                  alt={title}
                  className="w-full rounded-2xl shadow-glass object-contain max-h-[70vh]"
                  loading="lazy"
                />
              </div>

              <div className="space-y-6 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    {category}
                  </span>
                  <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold text-text">
                    {title}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-muted text-lg leading-relaxed"
                >
                  <p>{description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4 pt-4 border-t border-white/10"
                >
                  <a
                    href={image}
                    download
                    className="btn-primary flex items-center gap-2"
                  >
                    <FiDownload className="w-5 h-5" />
                    Download
                  </a>
                  <button
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}