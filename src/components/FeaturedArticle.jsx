import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function FeaturedArticle() {
  const articleRef = useRef(null)

  useEffect(() => {
    if (articleRef.current) {
      gsap.fromTo(articleRef.current,
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
    <div className="featured-article" ref={articleRef}>
      <div>
        <div className="featured-badge">🆕 19.01.16</div>
        <h2 className="featured-title">
          L'App tpg<br />
          est désormais disponible<br />
          pour l'Apple Watch !
        </h2>
        <p className="featured-subtitle">
          Vous avez une Apple Watch à votre poignet ?<br />
          Téléchargez l'application TPG et découvrez toutes.
        </p>
      </div>
      <div className="featured-image">
        <span style={{ fontSize: '64px' }}>⌚</span>
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        right: '20px',
        background: 'rgba(255,255,255,0.2)',
        padding: '8px 15px',
        borderRadius: '20px',
        fontSize: '12px'
      }}>
        o.tpg
      </div>
    </div>
  )
}

export default FeaturedArticle
