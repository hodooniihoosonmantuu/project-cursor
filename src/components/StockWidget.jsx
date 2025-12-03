import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function StockWidget() {
  const chartRef = useRef(null)
  const [goldData, setGoldData] = useState(null)

  useEffect(() => {
    // Fetch or generate realistic gold price data
    // For now, using realistic pattern based on actual gold market behavior
    const generateRealisticGoldData = () => {
      const basePrice = 2615.50 // Realistic current gold price in USD/oz (late 2024)
      const data = []
      
      // Generate 30 days of realistic candlestick data
      let currentPrice = basePrice
      
      for (let i = 0; i < 30; i++) {
        // Realistic price movement (gold typically moves 0.5-2% daily)
        const dailyVolatility = (Math.random() - 0.5) * 30 // $0-30 range
        const trend = Math.sin(i / 5) * 10 // Subtle trend
        
        const open = currentPrice
        const high = open + Math.abs(dailyVolatility) + trend + Math.random() * 15
        const low = open - Math.abs(dailyVolatility) - trend - Math.random() * 15
        const close = open + dailyVolatility + trend
        
        const isUp = close > open
        
        // Determine trend band based on moving average
        const ma = (open + high + low + close) / 4
        let band = 'neutral'
        if (i > 0) {
          const prevMa = data[i - 1].ma
          if (ma > prevMa) band = 'teal'
          else if (ma < prevMa) band = 'red'
        }
        
        data.push({
          o: Math.round(open * 100) / 100,
          h: Math.round(high * 100) / 100,
          l: Math.round(low * 100) / 100,
          c: Math.round(close * 100) / 100,
          isUp,
          band,
          ma: Math.round(ma * 100) / 100,
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000)
        })
        
        currentPrice = close
      }
      
      return data
    }

    const data = generateRealisticGoldData()
    setGoldData(data)
  }, [])

  useEffect(() => {
    if (!goldData || !chartRef.current) return

    // Animate chart elements
    gsap.fromTo('.candlestick-group',
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
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
  }, [goldData])

  if (!goldData) {
    return (
      <div className="widget stock-widget">
        <div className="stock-loading">Loading gold price data...</div>
      </div>
    )
  }

  const currentPrice = goldData[goldData.length - 1].c
  const prevPrice = goldData[goldData.length - 2]?.c || currentPrice
  const change = currentPrice - prevPrice
  const changePercent = ((change / prevPrice) * 100)
  const isPositive = change >= 0

  // Calculate price range for scaling
  const allPrices = goldData.flatMap(d => [d.h, d.l])
  const priceMin = Math.min(...allPrices)
  const priceMax = Math.max(...allPrices)
  const priceRange = Math.max(priceMax - priceMin, 100)
  const priceRangeMin = priceMin - priceRange * 0.05
  const priceRangeMax = priceMax + priceRange * 0.05

  const chartHeight = 200
  const chartWidth = 600

  const scaleY = (value) => {
    return chartHeight - ((value - priceRangeMin) / (priceRangeMax - priceRangeMin)) * chartHeight
  }

  // Generate trend bands
  const generateTrendBand = (startIdx, endIdx, bandType) => {
    if (startIdx >= endIdx) return null
    
    const points = goldData.slice(startIdx, endIdx + 1)
    const upperPoints = points.map((d, i) => {
      const x = ((startIdx + i) / goldData.length) * chartWidth
      const bandHeight = (d.h - d.l) * 0.2
      return { x, y: scaleY(Math.max(d.h, d.ma + bandHeight)) }
    })
    
    const lowerPoints = points.map((d, i) => {
      const x = ((startIdx + i) / goldData.length) * chartWidth
      const bandHeight = (d.h - d.l) * 0.2
      return { x, y: scaleY(Math.min(d.l, d.ma - bandHeight)) }
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
  let currentBand = { type: goldData[0].band, start: 0 }
  for (let i = 1; i < goldData.length; i++) {
    if (goldData[i].band !== currentBand.type && goldData[i].band !== 'neutral') {
      if (currentBand.type !== 'neutral') {
        bandGroups.push({ ...currentBand, end: i - 1 })
      }
      currentBand = { type: goldData[i].band, start: i }
    }
  }
  if (currentBand.type !== 'neutral') {
    bandGroups.push({ ...currentBand, end: goldData.length - 1 })
  }

  // Format price with proper commas
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  return (
    <div className="widget stock-widget">
      <div className="stock-header">
        <div>
          <div className="stock-label">Алтны ханш</div>
          <div className="stock-subtitle">Spot Gold (XAU/USD)</div>
        </div>
        <div className="stock-price-info">
          <div className="stock-price-current">${formatPrice(currentPrice)}</div>
          <div className={`stock-price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} ${Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="stock-chart-container" ref={chartRef}>
        <div className="price-axis">
          <span>${formatPrice(priceRangeMax)}</span>
          <span>${formatPrice((priceRangeMax + priceRangeMin) / 2)}</span>
          <span>${formatPrice(priceRangeMin)}</span>
        </div>
        
        <svg className="candlestick-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          {/* Trend Bands */}
          {bandGroups.map((band, bandIdx) => {
            const pathData = generateTrendBand(band.start, band.end, band.type)
            if (!pathData) return null
            
            return (
              <path
                key={bandIdx}
                className="trend-band"
                d={pathData}
                fill={band.type === 'teal' ? 'rgba(0, 200, 180, 0.12)' : 'rgba(231, 76, 60, 0.12)'}
                stroke={band.type === 'teal' ? 'rgba(0, 200, 180, 0.2)' : 'rgba(231, 76, 60, 0.2)'}
                strokeWidth="0.5"
              />
            )
          })}

          {/* Moving Average Line */}
          <polyline
            className="ma-line"
            points={goldData.map((d, i) => {
              const x = (i / goldData.length) * chartWidth
              const y = scaleY(d.ma)
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke="rgba(180, 180, 180, 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Candlesticks */}
          {goldData.map((candle, i) => {
            const x = (i / goldData.length) * chartWidth
            const centerX = x + (chartWidth / goldData.length) / 2
            const candleWidth = (chartWidth / goldData.length) * 0.75
            const bodyTop = scaleY(Math.max(candle.o, candle.c))
            const bodyBottom = scaleY(Math.min(candle.o, candle.c))
            const bodyHeight = Math.max(Math.abs(bodyTop - bodyBottom), 2)
            const wickTop = scaleY(candle.h)
            const wickBottom = scaleY(candle.l)
            const isUp = candle.isUp
            const upColor = '#00c8b4'
            const downColor = '#e74c3c'

            // Calculate percentage change for this candle
            const candleChange = ((candle.c - candle.o) / candle.o) * 100
            const showSignal = Math.abs(candleChange) > 0.8

            return (
              <g key={i} className="candlestick-group">
                {/* Upper wick */}
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
                
                {/* Body outline */}
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

                {/* Lower wick */}
                <line 
                  x1={centerX} 
                  y1={bodyBottom} 
                  x2={centerX} 
                  y2={wickBottom} 
                  stroke={isUp ? upColor : downColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Price change indicators */}
                {showSignal && (
                  <g className="price-indicator">
                    {candleChange > 0 ? (
                      <g transform={`translate(${centerX}, ${wickTop - 15})`}>
                        <polygon
                          points="0,0 -6,8 6,8"
                          fill="#2ecc71"
                          opacity="0.9"
                        />
                        <text
                          x="0"
                          y="20"
                          fill="#2ecc71"
                          fontSize="9"
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          +{candleChange.toFixed(2)}%
                        </text>
                      </g>
                    ) : (
                      <g transform={`translate(${centerX}, ${wickBottom + 15})`}>
                        <polygon
                          points="0,8 -6,0 6,0"
                          fill="#e74c3c"
                          opacity="0.9"
                        />
                        <text
                          x="0"
                          y="-8"
                          fill="#e74c3c"
                          fontSize="9"
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          {candleChange.toFixed(2)}%
                        </text>
                      </g>
                    )}
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* Time axis */}
        <div className="time-axis">
          {goldData.filter((_, i) => i % 10 === 0).map((d, i) => (
            <span key={i}>
              {d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          ))}
        </div>
      </div>

      {/* Additional info */}
      <div className="stock-info">
        <div className="info-item">
          <span className="info-label">Open</span>
          <span className="info-value">${formatPrice(goldData[0].o)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">High (30d)</span>
          <span className="info-value">${formatPrice(priceMax)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Low (30d)</span>
          <span className="info-value">${formatPrice(priceMin)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Change</span>
          <span className={`info-value ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}${change.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StockWidget
