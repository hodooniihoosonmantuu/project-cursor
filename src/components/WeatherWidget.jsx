import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function WeatherWidget() {
  const widgetRef = useRef(null)

  useEffect(() => {
    gsap.from(widgetRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
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

