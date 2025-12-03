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
        height: isExpanded ? 380 : 140,
      }}
      initial={{ opacity: 0, height: 140 }}
      whileInView={{ opacity: 1 }}
      transition={{ 
        height: { 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: { duration: 0.5 }
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
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

      {/* After image - simple full cover */}
      <motion.img 
        src={afterImg}
        alt="Banner expanded"
        className="banner-img banner-after"
        animate={{ 
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      />
    </motion.header>
  )
}

export default Header
