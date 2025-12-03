import { motion } from 'framer-motion'
import afterImg from '../images/after.jpg'

function ExpandedBanner({ onMouseLeave }) {
  return (
    <motion.div
      className="expanded-banner-widget"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onMouseLeave={onMouseLeave}
    >
      <img 
        src={afterImg}
        alt="Banner expanded"
        className="expanded-banner-img"
      />
    </motion.div>
  )
}

export default ExpandedBanner

