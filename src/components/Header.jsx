import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (isExpanded || !isExpanded) {
      // Trigger glitch effect on state change
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  return (
    <motion.header 
      className={`expandable-banner ${isGlitching ? 'glitching' : ''}`}
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
      {/* Glitch layers */}
      <div className="glitch-wrapper">
        {/* Before image with glitch layers */}
        <motion.div 
          className="banner-before"
          animate={{ 
            opacity: isExpanded ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="glitch-layers">
            <div className="glitch-layer glitch-r">
              <div className="banner-blur-bg"><img src={beforeImg} alt="" /></div>
              <img src={beforeImg} alt="" className="banner-main-img" />
            </div>
            <div className="glitch-layer glitch-g">
              <div className="banner-blur-bg"><img src={beforeImg} alt="" /></div>
              <img src={beforeImg} alt="" className="banner-main-img" />
            </div>
            <div className="glitch-layer glitch-b">
              <div className="banner-blur-bg"><img src={beforeImg} alt="" /></div>
              <img src={beforeImg} alt="Banner" className="banner-main-img" />
            </div>
          </div>
        </motion.div>

        {/* After image with glitch layers */}
        <motion.div 
          className="banner-after"
          animate={{ 
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="glitch-layers">
            <div className="glitch-layer glitch-r">
              <div className="banner-blur-bg"><img src={afterImg} alt="" /></div>
              <img src={afterImg} alt="" className="banner-main-img" />
            </div>
            <div className="glitch-layer glitch-g">
              <div className="banner-blur-bg"><img src={afterImg} alt="" /></div>
              <img src={afterImg} alt="" className="banner-main-img" />
            </div>
            <div className="glitch-layer glitch-b">
              <div className="banner-blur-bg"><img src={afterImg} alt="" /></div>
              <img src={afterImg} alt="Banner expanded" className="banner-main-img" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scan lines overlay */}
      <div className="scanlines"></div>
    </motion.header>
  )
}

export default Header
