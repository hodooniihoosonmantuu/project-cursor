import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function WeatherPlusWidget() {
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
      component: 'Агаар', 
      samples: 16, 
      status: 'хэвийн' 
    },
    { 
      component: 'Тоос', 
      samples: 6, 
      status: 'хэвийн' 
    },
    { 
      component: 'Ус', 
      samples: 2, 
      status: 'хэмжилт, дээжлэлт' 
    },
    { 
      component: 'Хөрс', 
      samples: 0, 
      status: 'дээжлэлт' 
    },
    { 
      component: 'Ундны ус', 
      samples: 0, 
      status: 'дээжлэлт' 
    },
    { 
      component: 'НУБ, шүүрэлт хянах хоолой (ШХХ)', 
      samples: 5, 
      status: '1, 2, 3, 4-р хэсгийн ШХХ-хуурай; Цөөрмийн ШХХ- 19.18 м (чийг/цан)' 
    }
  ]

  return (
    <div className="widget weather-plus-widget" ref={widgetRef}>
      <div className="weather-plus-title">2.2 Хяналт шинжилгээ, дээжлэлт</div>
      <div className="weather-plus-content">
        <div className="weather-plus-header">
          <div className="header-cell">БО-ны бүрэлдэхүүн хэсэг</div>
          <div className="header-cell">Дээж, ш</div>
          <div className="header-cell">Хэмжилт, дээж, сорьц</div>
        </div>
        <div className="weather-plus-table">
          {monitoringData.map((item, index) => (
            <div key={index} className="weather-plus-row">
              <div className="row-cell component-cell">{item.component}</div>
              <div className="row-cell samples-cell">{item.samples}</div>
              <div className="row-cell status-cell">{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherPlusWidget

