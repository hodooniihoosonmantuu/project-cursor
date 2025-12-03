import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function KPIWidget() {
  const [displayValue, setDisplayValue] = useState('70,32%')
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
        setDisplayValue(obj.value.toFixed(2).replace('.', ',') + '%')
      }
    })

    // Animate line chart
    if (chartRef.current) {
      const path = chartRef.current.querySelector('.kpi-line')
      if (path) {
        const length = path.getTotalLength()
        gsap.fromTo(path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            delay: 0.8
          }
        )
      }
    }
  }, [])

  // KPI trend data for Jul-Dec (matching the image pattern)
  const kpiData = [
    { month: 'Jul', value: 65 },
    { month: 'Aug', value: 72 },
    { month: 'Sep', value: 68 },
    { month: 'Oct', value: 78 },
    { month: 'Nov', value: 72 },
    { month: 'Dec', value: 75 }
  ]

  const chartWidth = 200
  const chartHeight = 80
  const maxValue = 100
  const minValue = 50

  const scaleX = (index) => (index / (kpiData.length - 1)) * chartWidth
  const scaleY = (value) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

  const linePath = kpiData.map((d, i) => {
    const x = scaleX(i)
    const y = scaleY(d.value)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  const areaPath = linePath + ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`

  return (
    <div className="widget kpi-widget">
      <div className="widget-header">
        <span className="widget-title">Average Team KPI</span>
        <span className="widget-icon">📊</span>
        <span className="widget-expand">↗</span>
      </div>
      <div className="kpi-content">
        <div className="kpi-value-container">
          <span className="kpi-value">{displayValue}</span>
          <span className="kpi-icon-small">📈</span>
        </div>
      </div>
      <div className="kpi-chart" ref={chartRef}>
        <svg width="100%" height="80" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="kpiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5d98a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f5d98a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#kpiGradient)"
            opacity="0.3"
          />
          {/* Line */}
          <path
            className="kpi-line"
            d={linePath}
            fill="none"
            stroke="#f5d98a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dashed target line */}
          <line
            x1="0"
            y1={scaleY(70)}
            x2={chartWidth}
            y2={scaleY(70)}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
        <div className="kpi-months">
          {kpiData.map((d, i) => (
            <span key={i}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KPIWidget
