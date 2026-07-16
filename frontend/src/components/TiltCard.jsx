import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '', maxTilt = 8, ...props }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt
      setTilt({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt])

  return (
    <motion.div
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="relative" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}