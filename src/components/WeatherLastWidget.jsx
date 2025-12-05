import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function WeatherLastWidget() {
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

  const monitoringData = [
    { 
      no: 1,
      type: 'Пьезометр', 
      measurement: 10, 
      description: 'хэвийн' 
    },
    { 
      no: 2,
      type: 'Хяналтын цооног', 
      measurement: 5, 
      description: 'хэвийн' 
    },
    { 
      no: 3,
      type: 'Агаарын найрлага', 
      measurement: 2, 
      description: 'хэвийн' 
    }
  ]

  return (
    <div className="widget weather-last-widget" ref={widgetRef}>
      <div className="weather-last-title">2.3 Хаягдлын далангийн байгууламжийн хяналт</div>
      <div className="weather-last-content">
        <div className="weather-last-header">
          <div className="header-cell">No</div>
          <div className="header-cell">Хяналт шинжилгээний төрөл</div>
          <div className="header-cell">Хэмжилт, ш</div>
          <div className="header-cell">Тодорхойлолт</div>
        </div>
        <div className="weather-last-table">
          {monitoringData.map((item, index) => (
            <div key={index} className="weather-last-row">
              <div className="row-cell no-cell">{item.no}</div>
              <div className="row-cell type-cell">{item.type}</div>
              <div className="row-cell measurement-cell">{item.measurement}</div>
              <div className="row-cell description-cell">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherLastWidget

