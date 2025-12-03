import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function HRWidget() {
  const [employeeCount, setEmployeeCount] = useState(450)
  const barsRef = useRef(null)

  useEffect(() => {
    // Animate employee count
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 450,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: () => {
        setEmployeeCount(Math.round(obj.value))
      }
    })

    // Animate bars
    if (barsRef.current) {
      const bars = barsRef.current.querySelectorAll('.hr-bar')
      gsap.fromTo(bars,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.out',
          delay: 0.6
        }
      )
    }
  }, [])

  const barHeights = [30, 45, 35, 60, 50, 70, 55, 80, 65, 75, 85, 70, 90, 75, 65]

  return (
    <div className="widget hr-widget">
      <div className="hr-title">Хүний нөөцийн хэлтэс</div>
      <div className="hr-value">{employeeCount}</div>
      <div className="hr-label">Active Employees</div>
      
      <div className="hr-chart" ref={barsRef}>
        {barHeights.map((height, i) => (
          <div
            key={i}
            className="hr-bar"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="hr-buttons">
        <button className="hr-btn primary">Comment</button>
        <button className="hr-btn secondary">Promotion</button>
      </div>
    </div>
  )
}

export default HRWidget
