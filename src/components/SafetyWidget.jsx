import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrambledText from 'react-scrambled-text'

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

  // Extract number from days string (e.g., "158 Days" -> "158")
  const daysNumber = days.replace(/\D/g, '')

  return (
    <div className="widget safety-widget" ref={widgetRef}>
      {showExpand && <div className="widget-expand">↗</div>}
      <div className="safety-location">{location}</div>
      <div className="safety-days">
        <ScrambledText
          text={daysNumber}
          speed={50}
          scrambleSpeed={30}
          scrambleDuration={2000}
          characters="0123456789"
        />
        <span> {days.replace(daysNumber, '')}</span>
      </div>
      <div className="safety-label">Days Worked Recordable Injury (LTI)</div>
    </div>
  )
}

export default SafetyWidget

