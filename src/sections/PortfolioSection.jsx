import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import Modal from '../components/Modal'
import ScrollReveal from '../components/ScrollReveal'
import { FiImage, FiYoutube, FiMaximize2, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi'

const categories = ['All', 'Posters', 'Thumbnails']

function filenameToTitle(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getCategoryDescription(category) {
  if (category === 'Posters') {
    return 'Professional poster and social media design crafted for maximum engagement and brand impact.'
  }
  if (category === 'Thumbnails') {
    return 'High-CTR YouTube thumbnail designed to capture attention and drive clicks.'
  }
  return 'Custom visual creative designed to elevate brand presence and drive results.'
}

const portfolioData = [
  ...[
    { src: '/Designs/Posters/Futuristic AI & Cybersecurity Summit Poster.png', category: 'Posters' },
    { src: '/Designs/Posters/Green&Black Dynamic Fitness Sale Instagram Post.png', category: 'Posters' },
    { src: '/Designs/Posters/Instagram Post - BURGER.png', category: 'Posters' },
    { src: '/Designs/Posters/Luxurious Brew & Bloom Grand Opening Poster.png', category: 'Posters' },
    { src: '/Designs/Posters/Urban Vogue Premium Fashion Sale Poster.png', category: 'Posters' },
    { src: '/Designs/Thumbnails/Designer (1).png', category: 'Thumbnails' },
    { src: '/Designs/Thumbnails/Designer.png', category: 'Thumbnails' },
    { src: '/Designs/Thumbnails/Exploring the Dark Web Darkened Secrets.png', category: 'Thumbnails' },
    { src: '/Designs/Thumbnails/From ₹0 to ₹1L Challenge.png', category: 'Thumbnails' },
    { src: '/Designs/Thumbnails/Job Displacement Alarm AI Invasion.png', category: 'Thumbnails' }
  ].map((item, index) => {
    const filename = item.src.split('/').pop()
    const category = item.category
    
    return {
      id: `${category.toLowerCase()}-${index}`, // Optimized: use unique IDs instead of filename-based IDs
      src: item.src,
      title: filenameToTitle(filename),
      category,
      description: getCategoryDescription(category)
    }
  })
]

function PostersAppSwitcher({ items, handleOpenItem, loadedImages, handleImageLoad }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const N = items.length

  return (
    <>
      {/* Desktop stacked app switcher */}
      <div className="hidden md:flex relative w-full h-[520px] items-center justify-center perspective-1000 overflow-visible py-8">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center preserve-3d">
          {items.map((item, index) => {
            const centerOffset = index - (N - 1) / 2
            let xVal = centerOffset * 105
            let zVal = (index - (N - 1)) * 35
            let rotateYVal = -15
            let scaleVal = 0.95
            let zIndexVal = index

            if (hoveredIndex !== null) {
              if (index === hoveredIndex) {
                zVal = 70
                rotateYVal = 0
                scaleVal = 1.08
                zIndexVal = 50
              } else if (index < hoveredIndex) {
                xVal = centerOffset * 105 - 60
                zVal = (index - (N - 1)) * 35 - 30
                rotateYVal = -28
                scaleVal = 0.88
              } else {
                xVal = centerOffset * 105 + 60
                zVal = (index - (N - 1)) * 35 - 15
                rotateYVal = -5
                scaleVal = 0.92
              }
            }

            return (
              <motion.div
                key={item.id}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: zIndexVal,
                }}
                animate={{
                  x: xVal,
                  z: zVal,
                  rotateY: rotateYVal,
                  scale: scaleVal,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  mass: 0.8,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleOpenItem(item)}
                className="absolute h-[420px] aspect-[3/4] p-3 glass rounded-2xl flex items-center justify-center cursor-pointer shadow-glass border border-white/10 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="relative w-full h-full flex items-center justify-center bg-card/40 rounded-xl overflow-hidden">
                  {!loadedImages.has(item.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <motion.div
                        className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}
                  <img
                    src={item.src}
                    alt={item.title}
                    onLoad={() => handleImageLoad(item.id)}
                    className={`max-h-full max-w-full object-contain rounded-lg transition-all duration-700 ease-out ${
                      loadedImages.has(item.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                  
                  {/* Hover Info Tag */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-3 left-3 right-3 p-3 glass-strong rounded-xl z-30 pointer-events-none"
                      >
                        <h4 className="font-semibold text-text text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-muted capitalize mt-0.5">{item.category}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile simple vertical layout */}
      <div className="flex flex-col gap-6 md:hidden px-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenItem(item)}
            className="glass rounded-2xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer shadow-lg animate-fade-in"
          >
            <div className="relative aspect-[3/4] max-h-[480px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-card/50">
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={item.src}
                alt={item.title}
                onLoad={() => handleImageLoad(item.id)}
                className={`max-h-full max-w-full object-contain rounded-lg transition-opacity duration-500 ${
                  loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-text text-sm line-clamp-1">{item.title}</h4>
                <p className="text-[10px] text-muted capitalize mt-0.5">Premium Poster</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-medium border border-primary/20">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ThumbnailsGrid({ items, handleOpenItem, loadedImages, handleImageLoad }) {
  return (
    <div className="relative mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenItem(item)}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-card border border-white/10 group-hover:border-secondary/30 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-[1.03] transform-gpu">
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10">
                  <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                onLoad={() => handleImageLoad(item.id)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  loadedImages.has(item.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-medium border border-secondary/20 backdrop-blur-glass">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="mt-3 px-1">
              <h4 className="font-semibold text-text text-sm line-clamp-1 group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-xs text-muted capitalize">YouTube Thumbnail</p>
                <div className="w-1 h-1 rounded-full bg-muted/40" />
                <div className="flex items-center gap-1">
                  <FiYoutube className="w-3 h-3 text-secondary" />
                  <span className="text-[10px] text-secondary/80 font-medium">High CTR</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return portfolioData
    return portfolioData.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const posterItems = useMemo(() => {
    return portfolioData.filter(item => item.category === 'Posters')
  }, [])

  const thumbnailItems = useMemo(() => {
    return portfolioData.filter(item => item.category === 'Thumbnails')
  }, [])

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set(prev).add(id))
  }

  const openModal = (item, index) => {
    setSelectedItem(item)
    setCurrentIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = ''
  }

  const navigateModal = (direction) => {
    const newIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length
    setCurrentIndex(newIndex)
    setSelectedItem(filteredItems[newIndex])
  }

  const handleOpenItem = (item) => {
    const idx = filteredItems.findIndex(p => p.id === item.id)
    if (idx !== -1) {
      openModal(item, idx)
    }
  }

  useEffect(() => {
    if (!selectedItem) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') navigateModal(-1)
      if (e.key === 'ArrowRight') navigateModal(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem, currentIndex, filteredItems])

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 overflow-hidden noise-overlay" aria-labelledby="portfolio-title">
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
            <FiImage className="w-4 h-4" aria-hidden="true" />
            <span>Selected Works</span>
          </motion.div>
          <motion.h2
            id="portfolio-title"
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Portfolio
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A curated collection of social media designs, YouTube thumbnails, and custom visual creatives crafted for diverse clients and industries.
          </motion.p>
        </ScrollReveal>

        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filter by category">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                aria-controls={`panel-${category}`}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-text shadow-glow-primary'
                    : 'glass text-muted hover:text-text hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Categories Display */}
        <div className="relative mt-12">
          {/* Posters Component (rendered when category is All or Posters) */}
          {(activeCategory === 'All' || activeCategory === 'Posters') && (
            <div className={activeCategory === 'All' ? 'mb-28' : 'mb-8'}>
              <ScrollReveal className="mb-10 text-center">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiImage className="w-4 h-4" aria-hidden="true" />
                  <span>Poster Designs</span>
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Premium Posters Collection
                </motion.h3>
              </ScrollReveal>
              
              <PostersAppSwitcher
                items={posterItems}
                handleOpenItem={handleOpenItem}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
              />
            </div>
          )}

          {/* Thumbnails Component (rendered when category is All or Thumbnails) */}
          {(activeCategory === 'All' || activeCategory === 'Thumbnails') && (
            <div className="mb-8">
              <ScrollReveal className="mb-10 text-center">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiYoutube className="w-4 h-4" aria-hidden="true" />
                  <span>Thumbnail Collection</span>
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  YouTube Thumbnails
                </motion.h3>
                <motion.p className="section-subtitle mx-auto mt-4 text-center">
                  High-CTR YouTube thumbnails designed to capture attention and drive clicks.
                </motion.p>
              </ScrollReveal>

              <ThumbnailsGrid
                items={thumbnailItems}
                handleOpenItem={handleOpenItem}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!selectedItem}
        onClose={closeModal}
        image={selectedItem?.src}
        title={selectedItem?.title}
        category={selectedItem?.category}
        description={selectedItem?.description}
      />

      <AnimatePresence>
        {selectedItem && filteredItems.length > 1 && (
          <>
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateModal(-1); }}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-50 glass p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              aria-label="Previous project"
            >
              <FiChevronLeft className="w-6 h-6" aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateModal(1); }}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-50 glass p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              aria-label="Next project"
            >
              <FiChevronRight className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}