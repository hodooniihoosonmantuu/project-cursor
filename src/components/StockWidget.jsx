import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function StockWidget() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const path = chartRef.current.querySelector('.chart-line')
      if (path) {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          delay: 0.5
        })
      }
    }
  }, [])

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const chartPath = "M0,80 L40,75 L80,60 L120,65 L160,40 L200,45 L240,30 L280,35 L320,20 L360,25 L400,15"

  return (
    <div className="widget stock-widget">
      <div className="stock-header">
        <div>
          <div className="stock-label">АЛТНЫ ХАНШ</div>
          <div className="stock-title">Gold Price Index</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>XAU/TZS</div>
          <div style={{ fontSize: '14px', color: '#4ade80' }}>↗ +2.4%</div>
        </div>
      </div>

      <div className="stock-chart" ref={chartRef}>
        <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a84b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4a84b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={chartPath + " L400,100 L0,100 Z"} className="chart-area" />
          <path d={chartPath} className="chart-line" />
        </svg>
      </div>

      <div className="chart-months">
        {months.map((month, i) => (
          <span key={i}>{month}</span>
        ))}
      </div>

      <div className="manhours-widget">
        <div className="manhours-item">
          <span className="manhours-label">Days</span>
          <span className="manhours-value">158 Days</span>
        </div>
        <div className="manhours-item" style={{ flex: 1 }}>
          <span className="manhours-label">MANHOURS</span>
          <span className="manhours-value manhours-large">1383942.80</span>
        </div>
        <div className="manhours-item">
          <span className="manhours-label">LTI Free Days</span>
          <span className="manhours-value">1795 Days</span>
        </div>
      </div>
    </div>
  )
}

export default StockWidget

