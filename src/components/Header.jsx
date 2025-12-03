import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function Header() {
  const bannerRef = useRef(null)
  const contentRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    gsap.from(bannerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  const toggleBanner = () => {
    const banner = bannerRef.current
    const content = contentRef.current

    if (!isExpanded) {
      // Expand
      gsap.to(banner, {
        height: '500px',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'power2.out'
      })
      gsap.to('.banner-text-after', {
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      })
      gsap.to('.banner-text-before', {
        opacity: 0,
        duration: 0.2
      })
    } else {
      // Collapse
      gsap.to(content, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      })
      gsap.to(banner, {
        height: '80px',
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.inOut'
      })
      gsap.to('.banner-text-after', {
        opacity: 0,
        duration: 0.2
      })
      gsap.to('.banner-text-before', {
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      })
    }

    setIsExpanded(!isExpanded)
  }

  return (
    <header 
      className={`expandable-banner ${isExpanded ? 'expanded' : ''}`} 
      ref={bannerRef}
      onClick={toggleBanner}
    >
      {/* Background layers */}
      <div className="banner-bg-collapsed"></div>
      <div className="banner-bg-expanded"></div>
      
      {/* Motorcycle image */}
      <div className="banner-motorcycle">
        <div className="motorcycle-glow"></div>
      </div>

      {/* Light trail effect */}
      <div className="light-trail"></div>

      {/* Collapsed state text */}
      <div className="banner-text-before">
        <span>Expandable banner before</span>
      </div>

      {/* Expanded state content */}
      <div className="banner-expanded-content" ref={contentRef}>
        <div className="banner-text-after">
          <span>Expandable banner after</span>
        </div>
      </div>

      {/* Click indicator */}
      <div className="banner-click-hint">
        {isExpanded ? '▲ Click to collapse' : '▼ Click to expand'}
      </div>
    </header>
  )
}

export default Header
