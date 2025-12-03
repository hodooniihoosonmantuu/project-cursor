import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function Sidebar() {
  const sidebarRef = useRef(null)
  const [activeItem, setActiveItem] = useState(0)

  const menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '👤', label: 'Profile' },
    { icon: '📊', label: 'Analytics' },
    { icon: '📁', label: 'Files' },
    { icon: '📄', label: 'Documents' },
    { icon: '📈', label: 'Reports' },
    { icon: '📋', label: 'Projects' },
    { icon: '👥', label: 'Team' },
    { icon: '⚙️', label: 'Settings' }
  ]

  useEffect(() => {
    if (sidebarRef.current) {
      const items = sidebarRef.current.querySelectorAll('.sidebar-item')
      gsap.fromTo(items,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2
        }
      )
    }
  }, [])

  return (
    <aside className="sidebar" ref={sidebarRef}>
      <div className="sidebar-logo">OT</div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${activeItem === index ? 'active' : ''}`}
            onClick={() => setActiveItem(index)}
            title={item.label}
          >
            {item.icon}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
