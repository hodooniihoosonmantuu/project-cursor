import { useState } from 'react'
import { motion } from 'framer-motion'
import beforeImg from '../images/before.jpg'

function Header({ onExpandChange }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMouseEnter = () => {
    setIsExpanded(true)
    if (onExpandChange) onExpandChange(true)
  }

  const handleMouseLeave = () => {
    setIsExpanded(false)
    if (onExpandChange) onExpandChange(false)
  }

  return (
    <motion.header 
      className="expandable-banner"
      animate={{ 
        height: isExpanded ? 0 : 140,
        opacity: isExpanded ? 0 : 1,
      }}
      initial={{ opacity: 0, height: 140 }}
      whileInView={{ opacity: 1 }}
      transition={{ 
        height: { 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Before image with blurred sides */}
      <motion.div 
        className="banner-before"
        animate={{ 
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {/* Blurred background for empty sides */}
        <img src={beforeImg} alt="" className="banner-blur-bg" aria-hidden="true" />
        {/* Main image */}
        <img src={beforeImg} alt="Banner" className="banner-main" />
      </motion.div>
    </motion.header>
  )
}

export default Header
