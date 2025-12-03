import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function WeatherWidget() {
  const widgetRef = useRef(null)

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
  }, [])

  return (
    <div className="widget weather-widget" ref={widgetRef}>
      <div className="weather-location">Paris, Département de la Creuse</div>
      <div className="weather-temp">-2°/-25°C</div>
      <div className="weather-desc">Mostly Cloudy</div>
      <div className="weather-date">Jeudi 21 Novembre 2019</div>
      <div className="weather-greeting">
        Bonjour André !
        <span style={{ marginLeft: '10px', opacity: 0.8 }}>10:54</span>
      </div>
    </div>
  )
}

export default WeatherWidget
