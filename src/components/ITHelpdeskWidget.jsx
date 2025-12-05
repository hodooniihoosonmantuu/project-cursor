import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ITHelpdeskWidget() {
  const widgetRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current
      const dots = text.querySelectorAll('.dot')
      
      // Animate text appearance
      gsap.fromTo(text,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.4
        }
      )

      // Animate dots
      gsap.to(dots, {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'power2.inOut',
        delay: 0.8
      })
    }
  }, [])

  return (
    <div className="widget search-widget it-helpdesk-widget" ref={widgetRef}>
      <div className="it-helpdesk-content">
        <div className="it-helpdesk-text" ref={textRef}>
          IT helpdesk руу имэйл явуулах <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
      </div>
    </div>
  )
}

export default ITHelpdeskWidget

