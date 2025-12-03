import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function StockWidget() {
  const chartRef = useRef(null)

  useEffect(() => {
    // Animate chart elements with realistic timing
    if (chartRef.current) {
      gsap.fromTo('.candlestick-group',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.5
        }
      )

      gsap.fromTo('.trend-band',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
          delay: 0.3
        }
      )

      gsap.fromTo('.ma-line',
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          delay: 0.8
        }
      )
    }
  }, [])

  // More realistic candlestick data
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
  const chartHeight = 200
  const chartWidth = 550

  const scaleY = (value) => {
    return chartHeight - ((value - priceRange.min) / (priceRange.max - priceRange.min)) * chartHeight
  }

  // Generate trend band paths with smoother curves
  const generateTrendBand = (startIdx, endIdx) => {
    if (startIdx >= endIdx) return null
    
    const points = data.slice(startIdx, endIdx + 1)
    const upperPoints = points.map((d, i) => {
      const x = ((startIdx + i) / data.length) * chartWidth
      return { x, y: scaleY(Math.max(d.h, d.ma + (d.h - d.ma) * 0.3)) }
    })
    
    const lowerPoints = points.map((d, i) => {
      const x = ((startIdx + i) / data.length) * chartWidth
      return { x, y: scaleY(Math.min(d.l, d.ma - (d.ma - d.l) * 0.3)) }
    }).reverse()

    const upperPath = upperPoints.map((p, i) => 
      i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
    ).join(' ')
    
    const lowerPath = lowerPoints.map((p, i) => 
      i === 0 ? `L ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
    ).join(' ')

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
            const pathData = generateTrendBand(band.start, band.end)
            if (!pathData) return null
            
            return (
              <path
                key={bandIdx}
                className="trend-band"
                d={pathData}
                fill={band.type === 'teal' ? 'rgba(0, 200, 180, 0.15)' : 'rgba(231, 76, 60, 0.15)'}
                stroke={band.type === 'teal' ? 'rgba(0, 200, 180, 0.25)' : 'rgba(231, 76, 60, 0.25)'}
                strokeWidth="0.5"
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
            stroke="rgba(180, 180, 180, 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Candlesticks - Realistic rendering */}
          {data.map((candle, i) => {
            const x = (i / data.length) * chartWidth
            const centerX = x + (chartWidth / data.length) / 2
            const candleWidth = (chartWidth / data.length) * 0.65
            const bodyTop = scaleY(Math.max(candle.o, candle.c))
            const bodyBottom = scaleY(Math.min(candle.o, candle.c))
            const bodyHeight = Math.max(Math.abs(bodyTop - bodyBottom), 2)
            const wickTop = scaleY(candle.h)
            const wickBottom = scaleY(candle.l)
            const isUp = candle.isUp
            const upColor = '#00c8b4'
            const downColor = '#e74c3c'

            return (
              <g key={i} className="candlestick-group">
                {/* Upper wick (shadow) */}
                <line 
                  x1={centerX} 
                  y1={wickTop} 
                  x2={centerX} 
                  y2={bodyTop} 
                  stroke={isUp ? upColor : downColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                {/* Candlestick body */}
                <rect 
                  x={centerX - candleWidth / 2} 
                  y={bodyTop} 
                  width={candleWidth} 
                  height={bodyHeight} 
                  fill={isUp ? upColor : downColor}
                  rx="1"
                  className="candle-body"
                />
                
                {/* Body outline for depth */}
                <rect 
                  x={centerX - candleWidth / 2} 
                  y={bodyTop} 
                  width={candleWidth} 
                  height={bodyHeight} 
                  fill="none"
                  stroke={isUp ? 'rgba(0, 200, 180, 0.8)' : 'rgba(231, 76, 60, 0.8)'}
                  strokeWidth="0.5"
                  rx="1"
                />

                {/* Lower wick (shadow) */}
                <line 
                  x1={centerX} 
                  y1={bodyBottom} 
                  x2={centerX} 
                  y2={wickBottom} 
                  stroke={isUp ? upColor : downColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Buy Signal (Green Triangle) */}
                {candle.signal === 'buy' && (
                  <polygon
                    className="signal-marker buy-signal"
                    points={`${centerX},${wickBottom + 10} ${centerX - 7},${wickBottom + 20} ${centerX + 7},${wickBottom + 20}`}
                    fill="#2ecc71"
                    stroke="#1e8449"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                )}

                {/* Sell Signal (Red Heart) */}
                {candle.signal === 'sell' && (
                  <g className="signal-marker sell-signal" transform={`translate(${centerX}, ${wickTop - 10})`}>
                    <path
                      d="M0,0 C-2,-3 -5,-5 -5,-7 C-5,-9 -3,-11 0,-11 C3,-11 5,-9 5,-7 C5,-5 2,-3 0,0 Z"
                      fill="#e74c3c"
                      stroke="#c0392b"
                      strokeWidth="0.5"
                      opacity="0.95"
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
