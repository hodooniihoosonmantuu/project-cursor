import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Header() {
  const bannerRef = useRef(null)

  useEffect(() => {
    gsap.from(bannerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  return (
    <header className="header" ref={bannerRef}>
      <div className="header-banner">
        <span className="banner-text">Full screen Expandable banner</span>
        <span className="banner-text">will be here.</span>
      </div>
    </header>
  )
}

export default Header

