import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.header 
      className="expandable-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        height: isExpanded ? 380 : 140
      }}
      transition={{ 
        height: { type: "spring", stiffness: 200, damping: 30 },
        opacity: { duration: 0.5 },
        y: { duration: 0.5 }
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ position: isExpanded ? 'fixed' : 'relative' }}
    >
      {/* Water ripple effect */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="water-ripple"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 3 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Before image - collapsed state */}
      <motion.div 
        className="banner-before"
        animate={{ 
          opacity: isExpanded ? 0 : 1,
          scale: isExpanded ? 1.05 : 1,
          filter: isExpanded ? 'blur(12px)' : 'blur(0px)'
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <img src={beforeImg} alt="Banner" />
      </motion.div>

      {/* After image - expanded state */}
      <motion.div 
        className="banner-after"
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          scale: isExpanded ? 1 : 1.08,
          filter: isExpanded ? 'blur(0px)' : 'blur(15px)'
        }}
        transition={{ 
          duration: 0.7,
          ease: [0.4, 0, 0.2, 1],
          delay: isExpanded ? 0.1 : 0
        }}
      >
        <img src={afterImg} alt="Banner expanded" />
      </motion.div>

      {/* Subtle overlay gradient on hover */}
      <motion.div
        className="banner-overlay"
        animate={{
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  )
}

export default Header
