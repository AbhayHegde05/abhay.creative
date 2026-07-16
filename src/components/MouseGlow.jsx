import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MouseGlow({ className = '', children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isInside, setIsInside] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {isInside && (
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
          style={{
            width: '600px',
            height: '600px',
            left: mousePosition.x,
            top: mousePosition.y,
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 100%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
      {children}
    </div>
  )
}