import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function ManhoursWidget() {
  const widgetRef = useRef(null)
  const valueRef = useRef(null)
  const [displayValue, setDisplayValue] = useState('1383942.80')

  // Scramble function
  const scrambleText = (target, chars = '0123456789.', duration = 2000) => {
    const originalText = target
    const charsArray = chars.split('')
    let currentText = originalText.split('').map(() => charsArray[Math.floor(Math.random() * charsArray.length)]).join('')
    
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      if (progress >= 1) {
        setDisplayValue(originalText)
        clearInterval(interval)
        return
      }

      // Gradually reveal correct characters
      const newText = originalText.split('').map((char, index) => {
        const revealProgress = (progress * originalText.length) - index
        if (revealProgress > 0) {
          return char
        }
        return charsArray[Math.floor(Math.random() * charsArray.length)]
      }).join('')
      
      setDisplayValue(newText)
    }, 30)

    return () => clearInterval(interval)
  }

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

    // Initial scramble animation
    const cleanup = scrambleText('1383942.80', '0123456789.', 2000)

    // Continuous subtle scramble effect every 5 seconds
    const scrambleInterval = setInterval(() => {
      scrambleText('1383942.80', '0123456789.', 800)
    }, 5000)

    return () => {
      cleanup()
      clearInterval(scrambleInterval)
    }
  }, [])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large" ref={valueRef}>{displayValue}</div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget

