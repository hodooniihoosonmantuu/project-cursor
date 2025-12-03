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
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsExpanded(true)
    const banner = bannerRef.current

    // Subtle expand with smooth timing
    gsap.to(banner, {
      height: '380px',
      duration: 0.8,
      ease: 'power2.inOut'
    })

    // Gentle blur out the before image
    gsap.to('.banner-before', {
      opacity: 0,
      filter: 'blur(8px)',
      scale: 1.02,
      duration: 0.6,
      ease: 'power2.inOut'
    })

    // Smooth fade in the after image with subtle blur clear
    gsap.fromTo('.banner-after', 
      { filter: 'blur(12px)', scale: 1.05 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    )

    // Water ripple overlay
    gsap.to('.water-ripple', {
      opacity: 1,
      scale: 2.5,
      duration: 1,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      const banner = bannerRef.current

      // Fade out after with blur
      gsap.to('.banner-after', {
        opacity: 0,
        filter: 'blur(8px)',
        scale: 1.02,
        duration: 0.5,
        ease: 'power2.in'
      })

      // Bring back before image smoothly
      gsap.to('.banner-before', {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out'
      })

      // Collapse banner
      gsap.to(banner, {
        height: '140px',
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.inOut',
        onComplete: () => setIsExpanded(false)
      })

      // Reset water ripple
      gsap.to('.water-ripple', {
        opacity: 0,
        scale: 0,
        duration: 0.4,
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
      {/* Water ripple effect */}
      <div className="water-ripple"></div>

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
