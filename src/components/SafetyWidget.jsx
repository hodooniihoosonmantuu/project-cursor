import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function SafetyWidget({ location, days, showExpand = true }) {
  const widgetRef = useRef(null)

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  return (
    <div className="widget safety-widget" ref={widgetRef}>
      <div className="safety-indicator">●</div>
      {showExpand && <div className="widget-expand">↗</div>}
      <div className="safety-location">{location}</div>
      <div className="safety-days">{days}</div>
      <div className="safety-label">Days Worked Recordable Injury (LTI)</div>
    </div>
  )
}

export default SafetyWidget

