import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  return (
    <>
      {/* Placeholder to maintain layout space */}
      <div style={{ height: '140px', margin: '20px 20px 0 20px' }} />
      
      {/* Actual banner - always fixed/absolute positioned */}
      <motion.header 
        ref={containerRef}
        className="expandable-banner"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          height: isExpanded ? 420 : 140,
        }}
        transition={{ 
          height: { 
            type: "tween",
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          },
          opacity: { duration: 0.4 }
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Before image */}
        <motion.div 
          className="banner-before"
          animate={{ 
            opacity: isExpanded ? 0 : 1,
            scale: isExpanded ? 1.03 : 1,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <img src={beforeImg} alt="Banner" />
        </motion.div>

        {/* After image */}
        <motion.div 
          className="banner-after"
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 1.03,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <img src={afterImg} alt="Banner expanded" />
        </motion.div>
      </motion.header>
    </>
  )
}

export default Header
