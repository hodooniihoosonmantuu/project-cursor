import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function NewsSection({ title, variant }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.news-item'), {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      })
    }
  }, [])

  const newsItems = variant === 'gold' ? [
    { day: '15', month: 'SEP', title: 'Rendez-vous du Parc : La Roche merveilleuse !', desc: 'Mongolian National Park' },
    { day: '23', month: 'OCT', title: 'Village de Noël à la Place des Palmiers !', desc: 'Annual celebration event' },
    { day: '15', month: 'NOV', title: 'Rendez-vous du Parc : La Roche merveilleuse !', desc: 'Mongolian National Park' }
  ] : [
    { day: '01', month: 'DEC', title: 'Parc national de Forêts : Le 11ème parc national français voit le jour !', desc: 'Safety announcement' },
    { day: '08', month: 'DEC', title: 'Actions de désinstallation à la Roche Ecrite', desc: 'Quarterly safety review' },
    { day: '15', month: 'DEC', title: 'Demi-conférence des camps de braconniers dans l\'Etat de l\'île', desc: 'Environmental update' }
  ]

  return (
    <div className="news-section" ref={sectionRef}>
      <div className="news-header">
        <h3 className="news-title">{title}</h3>
        {variant === 'safety' && (
          <span style={{ 
            background: '#d4a84b', 
            padding: '4px 10px', 
            borderRadius: '15px', 
            fontSize: '10px',
            fontWeight: '600'
          }}>
            ✨ Applications
          </span>
        )}
      </div>
      <div className="news-list">
        {newsItems.map((item, index) => (
          <div key={index} className="news-item">
            <div className={`news-date ${variant === 'gold' ? 'gold' : ''}`}>
              <span className="day">{item.day}</span>
              <span className="month">{item.month}</span>
            </div>
            <div className="news-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="news-more">
        <span>Tous les événements</span>
        <span>→</span>
      </div>
    </div>
  )
}

export default NewsSection

