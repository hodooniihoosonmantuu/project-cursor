import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function StockWidget() {
  const chartRef = useRef(null)
  const volumeRef = useRef(null)

  useEffect(() => {
    // Animate candlestick chart
    if (chartRef.current) {
      gsap.fromTo('.candlestick',
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.5
        }
      )
    }

    // Animate volume bars
    if (volumeRef.current) {
      gsap.fromTo('.volume-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.out',
          delay: 0.8,
          transformOrigin: 'bottom'
        }
      )
    }
  }, [])

  // Sample candlestick data (O, H, L, C)
  const candles = [
    { o: 4200, h: 4250, l: 4180, c: 4230, isUp: true },
    { o: 4230, h: 4280, l: 4210, c: 4250, isUp: true },
    { o: 4250, h: 4270, l: 4190, c: 4200, isUp: false },
    { o: 4200, h: 4240, l: 4180, c: 4220, isUp: true },
    { o: 4220, h: 4260, l: 4200, c: 4240, isUp: true },
    { o: 4240, h: 4250, l: 4210, c: 4215, isUp: false },
    { o: 4215, h: 4240, l: 4195, c: 4225, isUp: true },
    { o: 4225, h: 4235, l: 4200, c: 4210, isUp: false },
    { o: 4210, h: 4240, l: 4190, c: 4230, isUp: true },
    { o: 4230, h: 4250, l: 4215, c: 4211, isUp: false }
  ]

  const volumeData = [85, 92, 75, 88, 95, 82, 90, 78, 93, 86]

  const priceRange = { min: 3700, max: 4500 }
  const chartHeight = 180
  const chartWidth = 400

  const scaleY = (value) => {
    return chartHeight - ((value - priceRange.min) / (priceRange.max - priceRange.min)) * chartHeight
  }

  const currentPrice = 4211.478
  const change = -18.961
  const changePercent = -0.45
  const isPositive = change >= 0

  return (
    <div className="widget stock-widget">
      <div className="stock-header">
        <div>
          <div className="stock-label">Алтны ханш</div>
        </div>
        <div className="stock-price-info">
          <div className="stock-price-current">4,211.478</div>
          <div className={`stock-price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{change.toFixed(3)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="stock-ohlc">
        <div className="ohlc-item">
          <span className="ohlc-label">O</span>
          <span className="ohlc-value">4,231.470</span>
        </div>
        <div className="ohlc-item">
          <span className="ohlc-label">H</span>
          <span className="ohlc-value">4,236.000</span>
        </div>
        <div className="ohlc-item">
          <span className="ohlc-label">L</span>
          <span className="ohlc-value">4,198.320</span>
        </div>
        <div className="ohlc-item">
          <span className="ohlc-label">C</span>
          <span className="ohlc-value">4,211.478</span>
        </div>
      </div>

      <div className="stock-chart-container" ref={chartRef}>
        <div className="price-axis">
          <span>4,500</span>
          <span>4,200</span>
          <span>3,900</span>
          <span>3,700</span>
        </div>
        
        <svg className="candlestick-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          {/* Current price line */}
          <line 
            x1="0" 
            y1={scaleY(currentPrice)} 
            x2={chartWidth} 
            y2={scaleY(currentPrice)} 
            stroke="#e74c3c" 
            strokeWidth="1" 
            strokeDasharray="4 4"
            opacity="0.6"
          />
          
          {/* Candlesticks */}
          {candles.map((candle, i) => {
            const x = (i / candles.length) * chartWidth + 20
            const w = (chartWidth / candles.length) * 0.6
            const bodyTop = scaleY(Math.max(candle.o, candle.c))
            const bodyBottom = scaleY(Math.min(candle.o, candle.c))
            const bodyHeight = Math.abs(bodyTop - bodyBottom) || 2
            const wickTop = scaleY(candle.h)
            const wickBottom = scaleY(candle.l)
            const color = candle.isUp ? '#2ecc71' : '#e74c3c'

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
                />
              </g>
            )
          })}
        </svg>

        <div className="time-axis">
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Volume Chart */}
      <div className="volume-chart-container" ref={volumeRef}>
        <svg className="volume-chart" viewBox="0 0 400 60" preserveAspectRatio="none">
          {volumeData.map((vol, i) => {
            const x = (i / volumeData.length) * 400
            const w = (400 / volumeData.length) * 0.8
            const height = (vol / 100) * 60
            const color = candles[i]?.isUp ? '#2ecc71' : '#e74c3c'

            return (
              <rect
                key={i}
                className="volume-bar"
                x={x}
                y={60 - height}
                width={w}
                height={height}
                fill={color}
                opacity="0.7"
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default StockWidget
