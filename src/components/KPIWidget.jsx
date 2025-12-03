import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function KPIWidget() {
  const [displayValue, setDisplayValue] = useState('70.32%')
  const chartRef = useRef(null)

  useEffect(() => {
    // Animate the KPI value counter
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 70.32,
      duration: 2,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: () => {
        setDisplayValue(obj.value.toFixed(2) + '%')
      }
    })

    // Animate chart bars
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('rect')
      gsap.fromTo(bars, 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  const chartData = [60, 45, 70, 55, 80, 65, 75, 85, 60, 90, 70, 50]

  return (
    <div className="widget kpi-widget">
      <div className="widget-header">
        <span className="widget-title">Average Team KPI</span>
      </div>
      <div className="kpi-value">{displayValue}</div>
      <div className="kpi-label">Performance Index</div>
      <div className="kpi-chart" ref={chartRef}>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          {chartData.map((height, i) => (
            <rect
              key={i}
              x={i * 17}
              y={60 - height * 0.6}
              width="12"
              height={height * 0.6}
              rx="2"
              fill={i === chartData.length - 1 ? '#1a7a3d' : '#e0e0e0'}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default KPIWidget
