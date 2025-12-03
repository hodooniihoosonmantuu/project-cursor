import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const bannerRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(bannerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsExpanded(true)
    const banner = bannerRef.current

    // Simple, clean expand to half screen
    gsap.to(banner, {
      height: '45vh',
      duration: 0.4,
      ease: 'power2.out'
    })

    // Clean crossfade
    gsap.to('.banner-before', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    })

    gsap.to('.banner-after', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      const banner = bannerRef.current

      // Clean collapse
      gsap.to('.banner-after', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })

      gsap.to('.banner-before', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.to(banner, {
        height: '140px',
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.inOut',
        onComplete: () => setIsExpanded(false)
      })
    }, 100)
  }

  return (
    <header 
      className={`expandable-banner ${isExpanded ? 'expanded' : ''}`} 
      ref={bannerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Before image - collapsed state */}
      <div className="banner-before">
        <img src={beforeImg} alt="Banner" />
      </div>

      {/* After image - expanded state */}
      <div className="banner-after">
        <img src={afterImg} alt="Banner expanded" />
      </div>
    </header>
  )
}

export default Header
