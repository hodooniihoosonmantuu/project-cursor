import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function QuickLinks() {
  const linksRef = useRef(null)

  useEffect(() => {
    if (linksRef.current) {
      gsap.from(linksRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })
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

