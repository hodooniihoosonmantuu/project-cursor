import { useState } from 'react'
import { motion } from 'framer-motion'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.header 
      className="expandable-banner"
      animate={{ 
        height: isExpanded ? 420 : 140,
      }}
      initial={{ opacity: 0, height: 140 }}
      whileInView={{ opacity: 1 }}
      transition={{ 
        height: { 
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.8
        },
        opacity: { duration: 0.5 }
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Before image with blurred background */}
      <motion.div 
        className="banner-before"
        animate={{ 
          opacity: isExpanded ? 0 : 1,
          filter: isExpanded ? 'blur(20px)' : 'blur(0px)',
          scale: isExpanded ? 1.05 : 1,
        }}
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {/* Blurred background layer */}
        <div className="banner-blur-bg">
          <img src={beforeImg} alt="" aria-hidden="true" />
        </div>
        {/* Main image */}
        <img src={beforeImg} alt="Banner" className="banner-main-img" />
      </motion.div>

      {/* After image with blurred background */}
      <motion.div 
        className="banner-after"
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          filter: isExpanded ? 'blur(0px)' : 'blur(20px)',
          scale: isExpanded ? 1 : 0.98,
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {/* Blurred background layer */}
        <div className="banner-blur-bg">
          <img src={afterImg} alt="" aria-hidden="true" />
        </div>
        {/* Main image */}
        <img src={afterImg} alt="Banner expanded" className="banner-main-img" />
      </motion.div>
    </motion.header>
  )
}

export default Header
