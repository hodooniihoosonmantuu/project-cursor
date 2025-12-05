import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import articleImage from '../images/News/article.jpg'

function NewsWidget1() {
  const widgetRef = useRef(null)

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.4
        }
      )
    }
  }, [])

  return (
    <div className="widget news-widget news-widget-1" ref={widgetRef}>
      <div className="news-background">
        <img src={articleImage} alt="News" className="news-background-image" />
        <div className="news-overlay"></div>
      </div>
      <div className="news-card">
        <h2 className="news-card-title">Сүүлийн үеийн мэдээ</h2>
        <p className="news-card-content">
          Улс орнууд өөрийн үндэсний мөнгөн тэмдэгтийг гүйлгээнд гаргаж, дотоодын төлбөр тооцоондоо ашигладаг бол гадаад төлбөр тооцоонд олон улсад хүлээн зөвшөөрөгдөх валютыг ашигладаг.
        </p>
        <div className="news-card-footer">
          <span className="news-date">12.04.2025</span>
          <span className="news-time">11:41 AM</span>
        </div>
      </div>
      <div className="news-details">
        <span className="news-details-text">Дэлгэрэнгүй</span>
        <span className="news-details-arrow">→</span>
      </div>
    </div>
  )
}

export default NewsWidget1

