import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const bannerRef = useRef(null)
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

    if (!isExpanded) {
      // Expand to full screen
      gsap.to(banner, {
        height: '100vh',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      gsap.to('.banner-before', {
        opacity: 0,
        duration: 0.3
      })
      gsap.to('.banner-after', {
        opacity: 1,
        duration: 0.4,
        delay: 0.2
      })
    } else {
      // Collapse to 166px
      gsap.to('.banner-after', {
        opacity: 0,
        duration: 0.3
      })
      gsap.to('.banner-before', {
        opacity: 1,
        duration: 0.4,
        delay: 0.2
      })
      gsap.to(banner, {
        height: '166px',
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.inOut'
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
      {/* Before image - collapsed state */}
      <div className="banner-before">
        <img src={beforeImg} alt="Banner collapsed" />
      </div>

      {/* After image - expanded state */}
      <div className="banner-after">
        <img src={afterImg} alt="Banner expanded" />
      </div>

      {/* Click indicator */}
      <div className="banner-click-hint">
        {isExpanded ? '▲ Click to collapse' : '▼ Click to expand'}
      </div>
    </header>
  )
}

export default Header
