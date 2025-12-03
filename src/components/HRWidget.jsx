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
    { type: 'Уурхай', percentage: 49, color: '#f5d98a' },
    { type: 'Улаанбаатар', percentage: 31, color: '#4a5568' },
    { type: 'Улаанбулаг', percentage: 19, color: '#a0aec0' }
  ]

  return (
    <div className="widget hr-widget">
      <div className="widget-header">
        <span className="widget-title">Хүний нөөцийн хэлтэс</span>
        <span className="widget-expand">↗</span>
      </div>
      <div className="hr-employee-count">
        <span className="hr-count-value">{employeeCount}</span>
        <span className="hr-count-label">Нийт ажилчдын тоо</span>
      </div>
      
      <div className="hr-chart" ref={barsRef}>
        {employeeData.map((item, i) => (
          <div key={i} className="hr-bar-item">
            <div className="hr-bar-percentage">{item.percentage}%</div>
            <div 
              className="hr-bar" 
              style={{ 
                height: `${item.percentage * 1.2}%`,
                background: item.color
              }}
            />
            <div className="hr-bar-label">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HRWidget
