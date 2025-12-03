import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrambledText from 'react-scrambled-text'

function ManhoursWidget() {
  const widgetRef = useRef(null)

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.4
        }
      )
    }
  }, [])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large">
        <ScrambledText
          text="1383942.80"
          speed={50}
          scrambleSpeed={30}
          scrambleDuration={2000}
          characters="0123456789."
        />
      </div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget

