import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function KPIWidget() {
  const valueRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    // Animate the KPI value
    gsap.from(valueRef.current, {
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 0.01 },
      onUpdate: function() {
        valueRef.current.textContent = parseFloat(this.targets()[0].textContent).toFixed(2) + '%'
      }
    })

    // Animate chart bars
    if (chartRef.current) {
      gsap.from(chartRef.current.children, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.3
      })
    }
  }, [])

  const chartData = [60, 45, 70, 55, 80, 65, 75, 85, 60, 90, 70, 50]

  return (
    <div className="widget kpi-widget">
      <div className="widget-header">
        <span className="widget-title">Average Team KPI</span>
      </div>
      <div className="kpi-value" ref={valueRef}>70.32%</div>
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

