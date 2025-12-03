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
    gsap.from(sidebarRef.current.children, {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    })
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

