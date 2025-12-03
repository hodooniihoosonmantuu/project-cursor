import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function HRWidget() {
  const [employeeCount, setEmployeeCount] = useState(598)
  const barsRef = useRef(null)

  useEffect(() => {
    // Animate employee count
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 598,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: () => {
        setEmployeeCount(Math.round(obj.value))
      }
    })

    // Animate bars
    if (barsRef.current) {
      const bars = barsRef.current.querySelectorAll('.hr-bar-item')
      gsap.fromTo(bars,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.6
        }
      )
    }
  }, [])

  const employeeData = [
    { type: 'Уурхай', percentage: 49, color: '#FFCC2E' },      // Yellow - largest portion
    { type: 'Улаанбаатар', percentage: 31, color: '#303030' }, // Black - middle portion
    { type: 'Улаанбулаг', percentage: 19, color: '#7D7D7D' }   // Silver - smallest portion
  ]

  return (
    <div className="widget hr-widget">
      <div className="widget-header">
        <span className="widget-title">Хүний нөөцийн хэлтэс</span>
        <span className="widget-expand">↗</span>
      </div>
      <div className="hr-employee-count">
        <span className="hr-count-value">
          {showScramble ? (
            <ScrambledText
              text="598"
              speed={50}
              scrambleSpeed={30}
              scrambleDuration={2000}
              characters="0123456789"
            />
          ) : (
            employeeCount
          )}
        </span>
        <span className="hr-count-label">Нийт ажилчдын тоо</span>
      </div>
      
      <div className="hr-chart" ref={barsRef}>
        {employeeData.map((item, i) => (
          <div key={i} className="hr-bar-item">
            <div 
              className="hr-bar" 
              style={{ 
                height: `${item.percentage * 2.2}%`,
                background: item.color
              }}
            >
              <div className="hr-bar-percentage">{item.percentage}%</div>
            </div>
            <div className="hr-bar-label">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HRWidget
