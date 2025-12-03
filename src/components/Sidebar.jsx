import { useState } from 'react'
import { motion } from 'framer-motion'

function Sidebar() {
  const [activeItem, setActiveItem] = useState(0)

  const menuItems = [
    { icon: '🏠', label: 'Accueil' },
    { icon: '🌲', label: 'Le Parc' },
    { icon: '📰', label: 'Actualités' },
    { icon: '📁', label: 'Documents' },
    { icon: '📊', label: 'Rapports' },
    { icon: '📋', label: 'Projets' },
    { icon: '👥', label: 'Équipe' },
    { icon: '⚙️', label: 'Paramètres' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">OT</div>
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
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </motion.div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
