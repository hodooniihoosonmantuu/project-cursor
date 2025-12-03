import { useState } from 'react'
import { motion } from 'framer-motion'
import miningIcon from '../icons/mining.png'

function Sidebar() {
  const [activeItem, setActiveItem] = useState(0)

  const menuItems = [
    { label: 'Бидний тухай' },
    { label: 'Үйл ажиллагаа' },
    { label: 'Мэдээ, Мэдээлэл' },
    { label: 'Нийгмийн хариуцлага' },
    { label: 'Сургалт хөгжил' },
    { label: 'Ажилтны жагсаалт' },
    { label: 'Гарын авлага' },
    { label: 'Тусламж' }
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className={`sidebar-item ${activeItem === index ? 'active' : ''}`}
            onClick={() => setActiveItem(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active background indicator */}
            {activeItem === index && (
              <motion.div
                className="sidebar-active-bg"
                layoutId="activeBackground"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
            )}
            <img src={miningIcon} alt={item.label} className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </motion.div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
