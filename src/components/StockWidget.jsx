import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function StockWidget() {
  const chartRef = useRef(null)

  useEffect(() => {
    // Animate chart elements
    if (chartRef.current) {
      gsap.fromTo('.candlestick, .trend-band, .signal-marker',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.5
        }
      )
    }
  }, [])

  // Candlestick data with trend bands
  const data = [
    // Initial upward trend (teal band)
    { o: 4200, h: 4250, l: 4180, c: 4230, isUp: true, band: 'teal', trend: 'up', ma: 4215 },
    { o: 4230, h: 4280, l: 4210, c: 4250, isUp: true, band: 'teal', trend: 'up', ma: 4230 },
    { o: 4250, h: 4270, l: 4190, c: 4200, isUp: false, band: 'teal', trend: 'up', ma: 4240 },
    { o: 4200, h: 4240, l: 4180, c: 4220, isUp: true, band: 'teal', trend: 'up', ma: 4235 },
    { o: 4220, h: 4260, l: 4200, c: 4240, isUp: true, band: 'teal', trend: 'up', ma: 4245 },
    
    // Consolidation/decline (red band starts)
    { o: 4240, h: 4250, l: 4210, c: 4215, isUp: false, band: 'red', trend: 'down', ma: 4238, signal: 'sell' },
    { o: 4215, h: 4240, l: 4195, c: 4225, isUp: true, band: 'red', trend: 'down', ma: 4230 },
    { o: 4225, h: 4235, l: 4200, c: 4210, isUp: false, band: 'red', trend: 'down', ma: 4220 },
    
    // New upward trend starts (buy signal)
    { o: 4210, h: 4240, l: 4190, c: 4230, isUp: true, band: 'teal', trend: 'up', ma: 4215, signal: 'buy' },
    { o: 4230, h: 4280, l: 4220, c: 4260, isUp: true, band: 'teal', trend: 'up', ma: 4235 },
    { o: 4260, h: 4320, l: 4250, c: 4290, isUp: true, band: 'teal', trend: 'up', ma: 4260 },
    { o: 4290, h: 4350, l: 4280, c: 4320, isUp: true, band: 'teal', trend: 'up', ma: 4290 },
    { o: 4320, h: 4380, l: 4310, c: 4350, isUp: true, band: 'teal', trend: 'up', ma: 4320 },
    { o: 4350, h: 4400, l: 4340, c: 4370, isUp: true, band: 'teal', trend: 'up', ma: 4350 },
    
    // Peak and reversal (red band)
    { o: 4370, h: 4390, l: 4330, c: 4340, isUp: false, band: 'red', trend: 'down', ma: 4355 },
    { o: 4340, h: 4360, l: 4290, c: 4310, isUp: false, band: 'red', trend: 'down', ma: 4340 },
    { o: 4310, h: 4330, l: 4260, c: 4280, isUp: false, band: 'red', trend: 'down', ma: 4310 },
    { o: 4280, h: 4300, l: 4230, c: 4250, isUp: false, band: 'red', trend: 'down', ma: 4280 }
  ]

  const priceRange = { min: 4150, max: 4450 }
  const chartHeight = 180
  const chartWidth = 500

  const scaleY = (value) => {
    return chartHeight - ((value - priceRange.min) / (priceRange.max - priceRange.min)) * chartHeight
  }

  // Generate trend band paths
  const generateTrendBand = (startIdx, endIdx, isUp) => {
    if (startIdx === endIdx) return null
    
    const points = data.slice(startIdx, endIdx + 1)
    const upperPath = points.map((d, i) => {
      const x = ((startIdx + i) / data.length) * chartWidth
      const y = scaleY(d.h)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    const lowerPath = points.map((d, i) => {
      const x = ((startIdx + i) / data.length) * chartWidth
      const y = scaleY(d.l)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).reverse().map((point, i) => {
      if (i === 0) return point.replace('M', 'L')
      return point
    }).join(' ')

    return `${upperPath} ${lowerPath} Z`
  }

  // Group data by bands
  let bandGroups = []
  let currentBand = { type: data[0].band, start: 0 }
  for (let i = 1; i < data.length; i++) {
    if (data[i].band !== currentBand.type) {
      bandGroups.push({ ...currentBand, end: i - 1 })
      currentBand = { type: data[i].band, start: i }
    }
  }
  bandGroups.push({ ...currentBand, end: data.length - 1 })

  const currentPrice = 4250
  const change = -120
  const changePercent = -2.76
  const isPositive = change >= 0

  return (
    <div className="widget stock-widget">
      <div className="stock-header">
        <div>
          <div className="stock-label">Алтны ханш</div>
        </div>
        <div className="stock-price-info">
          <div className="stock-price-current">{currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className={`stock-price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="stock-chart-container" ref={chartRef}>
        <div className="price-axis">
          <span>4,450</span>
          <span>4,300</span>
          <span>4,150</span>
        </div>
        
        <svg className="candlestick-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          {/* Trend Bands */}
          {bandGroups.map((band, bandIdx) => {
            const pathData = generateTrendBand(band.start, band.end, band.type === 'teal')
            if (!pathData) return null
            
            return (
              <path
                key={bandIdx}
                className="trend-band"
                d={pathData}
                fill={band.type === 'teal' ? 'rgba(0, 200, 180, 0.2)' : 'rgba(231, 76, 60, 0.2)'}
                stroke={band.type === 'teal' ? 'rgba(0, 200, 180, 0.3)' : 'rgba(231, 76, 60, 0.3)'}
                strokeWidth="1"
              />
            )
          })}

          {/* Moving Average Line */}
          <polyline
            className="ma-line"
            points={data.map((d, i) => {
              const x = (i / data.length) * chartWidth
              const y = scaleY(d.ma)
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke="rgba(200, 200, 200, 0.6)"
            strokeWidth="2"
          />

          {/* Current price line */}
          <line 
            x1="0" 
            y1={scaleY(currentPrice)} 
            x2={chartWidth} 
            y2={scaleY(currentPrice)} 
            stroke="#e74c3c" 
            strokeWidth="1" 
            strokeDasharray="4 4"
            opacity="0.5"
          />
          
          {/* Candlesticks */}
          {data.map((candle, i) => {
            const x = (i / data.length) * chartWidth
            const w = (chartWidth / data.length) * 0.7
            const bodyTop = scaleY(Math.max(candle.o, candle.c))
            const bodyBottom = scaleY(Math.min(candle.o, candle.c))
            const bodyHeight = Math.abs(bodyTop - bodyBottom) || 3
            const wickTop = scaleY(candle.h)
            const wickBottom = scaleY(candle.l)
            const color = candle.isUp ? '#00c8b4' : '#e74c3c'

            return (
              <g key={i} className="candlestick">
                {/* Wick */}
                <line 
                  x1={x + w / 2} 
                  y1={wickTop} 
                  x2={x + w / 2} 
                  y2={wickBottom} 
                  stroke={color} 
                  strokeWidth="2"
                />
                {/* Body */}
                <rect 
                  x={x} 
                  y={bodyTop} 
                  width={w} 
                  height={bodyHeight} 
                  fill={color}
                  rx="1"
                />

                {/* Buy Signal (Green Triangle) */}
                {candle.signal === 'buy' && (
                  <polygon
                    className="signal-marker"
                    points={`${x + w / 2},${wickBottom + 8} ${x + w / 2 - 6},${wickBottom + 16} ${x + w / 2 + 6},${wickBottom + 16}`}
                    fill="#2ecc71"
                    opacity="0.9"
                  />
                )}

                {/* Sell Signal (Red Heart) */}
                {candle.signal === 'sell' && (
                  <g className="signal-marker" transform={`translate(${x + w / 2}, ${wickTop - 8})`}>
                    <path
                      d="M0,0 C0,-4 -4,-6 -4,-8 C-4,-10 -2,-12 0,-12 C2,-12 4,-10 4,-8 C4,-6 0,-4 0,0 Z"
                      fill="#e74c3c"
                      opacity="0.9"
                    />
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default StockWidget
