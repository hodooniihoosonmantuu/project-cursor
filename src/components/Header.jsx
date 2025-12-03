import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import beforeImg from '../images/before.jpg'
import afterImg from '../images/after.jpg'

function Header() {
  const bannerRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    gsap.from(bannerRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  const handleMouseEnter = () => {
    // Clear any pending collapse
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsExpanded(true)
    const banner = bannerRef.current

    // Water ripple effect on expand
    gsap.to('.water-overlay', {
      scaleY: 1,
      duration: 0.8,
      ease: 'power2.out'
    })

    // Expand banner
    gsap.to(banner, {
      height: '100vh',
      duration: 0.8,
      ease: 'power4.out'
    })

    // Hide before image
    gsap.to('.banner-before', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    })

    // Show after image
    gsap.to('.banner-after', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out'
    })

    // Water wave animation
    gsap.to('.water-wave', {
      y: '100vh',
      duration: 1,
      ease: 'power2.inOut',
      stagger: 0.1
    })
  }

  const handleMouseLeave = () => {
    // Small delay before collapsing
    timeoutRef.current = setTimeout(() => {
      const banner = bannerRef.current

      // Water effect on collapse
      gsap.to('.water-overlay', {
        scaleY: 0,
        duration: 0.5,
        ease: 'power2.in'
      })

      // Hide after image first
      gsap.to('.banner-after', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setIsExpanded(false)
        }
      })

      // Show before image
      gsap.to('.banner-before', {
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out'
      })

      // Collapse banner
      gsap.to(banner, {
        height: '166px',
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.inOut'
      })

      // Reset water waves
      gsap.to('.water-wave', {
        y: '-100%',
        duration: 0.6,
        ease: 'power2.in'
      })
    }, 150)
  }

  return (
    <header 
      className={`expandable-banner ${isExpanded ? 'expanded' : ''}`} 
      ref={bannerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Water transition overlay */}
      <div className="water-overlay">
        <div className="water-wave wave-1"></div>
        <div className="water-wave wave-2"></div>
        <div className="water-wave wave-3"></div>
      </div>

      {/* Before image - collapsed state */}
      <div className="banner-before">
        <img src={beforeImg} alt="Banner collapsed" />
      </div>

      {/* After image - expanded state */}
      <div className="banner-after">
        <img src={afterImg} alt="Banner expanded" />
      </div>
    </header>
  )
}

export default Header
