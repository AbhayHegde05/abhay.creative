import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
      <App />
    </MotionConfig>
  </React.StrictMode>
)