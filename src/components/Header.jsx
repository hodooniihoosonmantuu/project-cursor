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
      {/* Before image */}
      <motion.div 
        className="banner-before"
        animate={{ 
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
      >
        <img src={beforeImg} alt="Banner" />
      </motion.div>

      {/* After image */}
      <motion.div 
        className="banner-after"
        animate={{ 
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
      >
        <img src={afterImg} alt="Banner expanded" />
      </motion.div>
    </motion.header>
  )
}

export default Header
