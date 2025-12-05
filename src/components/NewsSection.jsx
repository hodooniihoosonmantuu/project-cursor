import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function NewsSection({ title, variant }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('.news-item')
      gsap.fromTo(items,
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.4
        }
      )
    }
  }, [])

  const newsItems = variant === 'gold' ? [
    { day: '3', month: 'DEC', title: 'Алтны зах зээлийн тойм 2025', desc: 'Бороо Гоулд Компани #19' },
    { day: '23', month: 'NOV', title: 'Алтны зах зээлийн тойм 2025', desc: 'Бороо Гоулд Компани #18' },
    { day: '15', month: 'OCT', title: 'Алтны зах зээлийн тойм 2025', desc: 'Бороо Гоулд Компани #17' }
  ] : [
    { day: '01', month: 'DEC', title: 'Аюулгүй ажиллагааны сэрэмжлүүлэг 2025', desc: 'Нийтлэл: 46' },
    { day: '13', month: 'NOV', title: 'Аюулгүй ажиллагааны сэрэмжлүүлэг 2025', desc: 'Нийтлэл: 45' },
    { day: '02', month: 'OCT', title: 'Аюулгүй ажиллагааны сэрэмжлүүлэг 2025', desc: 'Нийтлэл: 44' }
  ]

  return (
    <div className="news-section" ref={sectionRef}>
      <div className="news-header">
        <h3 className="news-title">{title}</h3>
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
        <span>Дэлгэрэнгүй</span>
        <span>→</span>
      </div>
    </div>
  )
}

export default NewsSection
