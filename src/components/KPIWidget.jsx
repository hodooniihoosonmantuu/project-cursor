import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function KPIWidget() {
  const chartRef = useRef(null)

  // Inflation data matching the image - adjusted for accuracy
  const inflationData = [
    // 2024
    { month: 'I', year: '2024', domestic: 4.2, imported: 2.1, solidFuel: 0.5, gasoline: 0.15, max: 0.05, total: 7.0 },
    { month: 'II', year: '2024', domestic: 3.8, imported: 1.8, solidFuel: 0.4, gasoline: 0.1, max: 0.05, total: 6.15 },
    { month: 'III', year: '2024', domestic: 3.5, imported: 1.6, solidFuel: 0.35, gasoline: 0.08, max: 0.02, total: 5.55 },
    { month: 'IV', year: '2024', domestic: 3.2, imported: 1.4, solidFuel: 0.3, gasoline: 0.08, max: 0.02, total: 5.0 },
    { month: 'V', year: '2024', domestic: 3.0, imported: 1.3, solidFuel: 0.25, gasoline: 0.07, max: 0.02, total: 4.64 },
    { month: 'VI', year: '2024', domestic: 2.7, imported: 1.1, solidFuel: 0.2, gasoline: 0.06, max: 0.01, total: 4.07 },
    { month: 'VII', year: '2024', domestic: 2.9, imported: 1.2, solidFuel: 0.3, gasoline: 0.07, max: 0.01, total: 4.48 },
    { month: 'VIII', year: '2024', domestic: 3.1, imported: 1.3, solidFuel: 0.4, gasoline: 0.08, max: 0.01, total: 4.89 },
    { month: 'IX', year: '2024', domestic: 3.5, imported: 1.5, solidFuel: 0.5, gasoline: 0.09, max: 0.01, total: 5.6 },
    { month: 'X', year: '2024', domestic: 4.0, imported: 1.7, solidFuel: 0.6, gasoline: 0.1, max: 0.01, total: 6.4 },
    { month: 'XI', year: '2024', domestic: 4.5, imported: 1.8, solidFuel: 0.7, gasoline: 0.11, max: 0.01, total: 7.12 },
    { month: 'XII', year: '2024', domestic: 5.0, imported: 2.0, solidFuel: 0.8, gasoline: 0.12, max: 0.02, total: 7.94 },
    // 2025
    { month: 'I', year: '2025', domestic: 5.5, imported: 2.2, solidFuel: 0.9, gasoline: 0.13, max: 0.02, total: 8.75 },
    { month: 'II', year: '2025', domestic: 6.0, imported: 2.4, solidFuel: 1.0, gasoline: 0.14, max: 0.02, total: 9.56 },
    { month: 'III', year: '2025', domestic: 6.2, imported: 2.5, solidFuel: 1.1, gasoline: 0.14, max: 0.02, total: 10.0 },
    { month: 'IV', year: '2025', domestic: 6.3, imported: 2.4, solidFuel: 1.0, gasoline: 0.13, max: 0.02, total: 9.85 },
    { month: 'V', year: '2025', domestic: 6.4, imported: 2.3, solidFuel: 0.95, gasoline: 0.13, max: 0.02, total: 9.8 },
    { month: 'VI', year: '2025', domestic: 6.4, imported: 2.2, solidFuel: 0.9, gasoline: 0.12, max: 0.02, total: 9.64 },
    { month: 'VII', year: '2025', domestic: 6.5, imported: 2.0, solidFuel: 0.85, gasoline: 0.11, max: 0.02, total: 9.48 },
    { month: 'VIII', year: '2025', domestic: 6.5, imported: 1.9, solidFuel: 0.8, gasoline: 0.1, max: 0.01, total: 9.31 },
    { month: 'IX', year: '2025', domestic: 6.5, imported: 1.85, solidFuel: 0.75, gasoline: 0.1, max: 0.01, total: 9.2 },
    { month: 'X', year: '2025', domestic: 6.5, imported: 1.8, solidFuel: 1.5, gasoline: 0.1, max: 0.01, total: 9.9 }
  ]

  useEffect(() => {
    if (!chartRef.current) return

    // Animate stacked bars
    const bars = chartRef.current.querySelectorAll('.stacked-bar-segment')
    gsap.fromTo(bars,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        transformOrigin: 'bottom',
        duration: 0.6,
        stagger: {
          amount: 1.5,
          from: 'start'
        },
        ease: 'power2.out',
        delay: 0.3
      }
    )

    // Animate inflation line
    const line = chartRef.current.querySelector('.inflation-line')
    if (line) {
      const length = line.getTotalLength()
      gsap.fromTo(line,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          delay: 0.8
        }
      )
    }

    // Animate value labels
    const labels = chartRef.current.querySelectorAll('.inflation-value-label')
    gsap.fromTo(labels,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 1.5
      }
    )
  }, [])

  const chartWidth = 900
  const chartHeight = 250
  const padding = { top: 40, right: 50, bottom: 50, left: 60 }
  const graphWidth = chartWidth - padding.left - padding.right
  const graphHeight = chartHeight - padding.top - padding.bottom

  const yMin = -1.0
  const yMax = 11.0
  const yRange = yMax - yMin

  const scaleX = (index) => {
    return padding.left + (index / (inflationData.length - 1)) * graphWidth
  }

  const scaleY = (value) => {
    return padding.top + graphHeight - ((value - yMin) / yRange) * graphHeight
  }

  const barWidth = graphWidth / inflationData.length * 0.7

  // Colors matching the chart
  const colors = {
    max: '#e8f4f8',
    gasoline: '#b3d9e6',
    solidFuel: '#5fa8d3',
    imported: '#2980b9',
    domestic: '#1a4d80',
    inflation: '#e74c3c'
  }

  return (
    <div className="widget kpi-widget inflation-widget">
      <div className="widget-header">
        <span className="widget-title">
          УЛААНБААТАР ХОТЫН ЖИЛИЙН ИНФЛЯЦЫН БҮРЭЛДЭХҮҮН, сараар
        </span>
      </div>
      
      <div className="inflation-chart-container" ref={chartRef}>
        <svg width="100%" height="280" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
          {/* Y-axis labels */}
          <g className="y-axis">
            {[-1, 3, 7, 11].map((value) => (
              <g key={value}>
                <line
                  x1={padding.left}
                  y1={scaleY(value)}
                  x2={chartWidth - padding.right}
                  y2={scaleY(value)}
                  stroke="rgba(0, 0, 0, 0.08)"
                  strokeWidth="1"
                  strokeDasharray={value === -1 ? '0' : '4 4'}
                />
                <text
                  x={padding.left - 10}
                  y={scaleY(value) + 4}
                  fill="var(--text-secondary)"
                  fontSize="11"
                  textAnchor="end"
                >
                  {value.toFixed(1)}
                </text>
              </g>
            ))}
            <text
              x={15}
              y={chartHeight / 2}
              fill="var(--text-secondary)"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90, 15, ${chartHeight / 2})`}
            >
              нэгжхувь
            </text>
          </g>

          {/* Stacked bars */}
          {inflationData.map((data, i) => {
            const x = scaleX(i) - barWidth / 2
            const baselineY = scaleY(0)
            
            // Stack from bottom (baseline) upward - order matters for stacking
            const segments = [
              { value: data.domestic, color: colors.domestic, label: 'Дотоодын бараа' },
              { value: data.imported, color: colors.imported, label: 'Импортын бараа' },
              { value: data.solidFuel, color: colors.solidFuel, label: 'Хатуу түлш' },
              { value: data.gasoline, color: colors.gasoline, label: 'Бензин түлш' },
              { value: data.max, color: colors.max, label: 'Max' }
            ]

            let accumulatedY = baselineY

            return (
              <g key={i} className="stacked-bar-group">
                {segments.map((segment, segIdx) => {
                  if (segment.value <= 0) return null
                  
                  const height = Math.abs(scaleY(0) - scaleY(segment.value))
                  const y = accumulatedY - height
                  
                  accumulatedY = y
                  
                  return (
                    <rect
                      key={segIdx}
                      className="stacked-bar-segment"
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      fill={segment.color}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="0.5"
                    />
                  )
                })}
              </g>
            )
          })}

          {/* Inflation line - draw after bars so it's on top */}
          <g className="inflation-line-group">
            {/* Main inflation line */}
            <polyline
              className="inflation-line"
              points={inflationData.map((data, i) => {
                const x = scaleX(i)
                const y = scaleY(data.total)
                return `${x},${y}`
              }).join(' ')}
              fill="none"
              stroke={colors.inflation}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Dots on line at key points */}
            {inflationData.map((data, i) => {
              const x = scaleX(i)
              const y = scaleY(data.total)
              
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill={colors.inflation}
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}

            {/* Value labels on line for Oct 2024 (6.4%) and Sept 2025 (9.2%) */}
            {[
              { index: 9, value: 6.4 },  // Oct 2024
              { index: 19, value: 9.2 }  // Sept 2025
            ].map((item) => {
              const x = scaleX(item.index)
              const y = scaleY(item.value)
              
              return (
                <g key={item.index} className="inflation-value-label">
                  <text
                    x={x}
                    y={y - 12}
                    fill={colors.inflation}
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {item.value.toFixed(1)}%
                  </text>
                </g>
              )
            })}
          </g>

          {/* X-axis labels */}
          <g className="x-axis">
            {inflationData.map((data, i) => {
              const x = scaleX(i)
              const isYearStart = (i === 0 || (i > 0 && inflationData[i - 1].year !== data.year))
              
              return (
                <g key={i}>
                  <text
                    x={x}
                    y={chartHeight - padding.bottom + 20}
                    fill="var(--text-secondary)"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {data.month}
                  </text>
                  {isYearStart && (
                    <text
                      x={x}
                      y={chartHeight - padding.bottom + 35}
                      fill="var(--text-secondary)"
                      fontSize="11"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {data.year}
                    </text>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="inflation-legend">
        <div className="legend-title">Бүрэлдэхүүн:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ background: colors.domestic }}></div>
            <span>Дотоодын бараа</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: colors.imported }}></div>
            <span>Импортын бараа</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: colors.solidFuel }}></div>
            <span>Хатуу түлш</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: colors.gasoline }}></div>
            <span>Бензин түлш</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: colors.max }}></div>
            <span>Max</span>
          </div>
        </div>
        <div className="legend-line">
          <div className="legend-line-color" style={{ background: colors.inflation }}></div>
          <span>Инфляц</span>
        </div>
      </div>
    </div>
  )
}

export default KPIWidget
