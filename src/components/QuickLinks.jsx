import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function QuickLinks() {
  const linksRef = useRef(null)

  useEffect(() => {
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.quick-link')
      gsap.fromTo(links,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  const links = [
    { 
      title: 'Safety',
      desc: 'Maintenance tips & resources',
      icon: '🦺',
      variant: 'safety'
    },
    { 
      title: 'IT',
      desc: 'Онлайн хэлбэрийн үйлчилгээ',
      icon: '💻',
      variant: 'it'
    },
    { 
      title: 'Mining Site',
      desc: 'Уурхайн талбай',
      icon: '⛏️',
      variant: 'mining'
    },
    { 
      title: 'Environment',
      desc: 'Байгаль Орчин, Нөхөн Сэргээлт',
      icon: '🌿',
      variant: 'environment'
    }
  ]

  return (
    <div className="quick-links widget" ref={linksRef}>
      {links.map((link, index) => (
        <div key={index} className={`quick-link ${link.variant}`}>
          <div className="quick-link-icon">{link.icon}</div>
          <div className="quick-link-title">{link.title}</div>
          <div className="quick-link-desc">{link.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default QuickLinks
