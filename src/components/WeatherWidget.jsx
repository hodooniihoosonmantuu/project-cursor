import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import weatherDayIcon from '../icons/weather/3D weather Day.png'
import weatherNightIcon from '../icons/weather/3D weather Night.png'

function WeatherWidget() {
  const widgetRef = useRef(null)
  const starsRef = useRef(null)

  // Use day icon for "Partly Cloudy", night icon for night conditions
  const weatherIcon = weatherDayIcon

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }

    // Animate stars (subtle floating effect)
    // Note: Icon is static - no rotation animation
    if (starsRef.current) {
      const stars = starsRef.current.querySelectorAll('.weather-star')
      stars.forEach((star, index) => {
        gsap.to(star, {
          y: -10,
          opacity: 0.6,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        })
      })
    }
  }, [])

  return (
    <div className="widget weather-widget" ref={widgetRef}>
      <div className="weather-title">ЦАГ АГААРЫН МЭДЭЭ</div>
      <div className="weather-content">
        <div className="weather-left">
          <div className="weather-temp-section">
            <div className="weather-temp">-19°</div>
            <div className="weather-temp-details">
              <div className="weather-detail-item">
                <span className="detail-label">Агаарын хамгийн их температур</span>
                <span className="detail-value">-0.34 °C</span>
              </div>
              <div className="weather-detail-item">
                <span className="detail-label">Агаарын хамгийн бага температур</span>
                <span className="detail-value">-20.91 °C</span>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-right">
          <div className="weather-details-above-icon">
            <div className="weather-detail-item">
              <span className="detail-label">Салхины хамгийн их хурд</span>
              <span className="detail-value">14.05 м/с</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Хур тунадасны нийлбэр</span>
              <span className="detail-value">0.2 мм</span>
            </div>
          </div>
          <div className="weather-icon-3d">
            <img 
              src={weatherIcon} 
              alt="Weather Icon" 
              className="weather-icon-image"
            />
          </div>
          <div className="weather-stars" ref={starsRef}>
            <div className="weather-star star-1">✦</div>
            <div className="weather-star star-2">✦</div>
            <div className="weather-star star-3">✦</div>
            <div className="weather-star star-4">✦</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
