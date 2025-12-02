import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function HRWidget() {
  const valueRef = useRef(null)
  const barsRef = useRef(null)

  useEffect(() => {
    // Animate employee count
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 450,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(obj.value)
        }
      }
    })

    // Animate bars
    if (barsRef.current) {
      gsap.from(barsRef.current.children, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
        delay: 0.5
      })
    }
  }, [])

  const barHeights = [30, 45, 35, 60, 50, 70, 55, 80, 65, 75, 85, 70, 90, 75, 65]

  return (
    <div className="widget hr-widget">
      <div className="hr-title">Хүний нөөцийн хэлтэс</div>
      <div className="hr-value" ref={valueRef}>0</div>
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

