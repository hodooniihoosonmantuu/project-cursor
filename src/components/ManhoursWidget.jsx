import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function ManhoursWidget() {
  const widgetRef = useRef(null)
  const particlesRef = useRef(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.4
        }
      )
    }

    // Create particles
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
          color: ['#FFD700', '#2ecc71', '#4a90e2', '#FFCC2E'][Math.floor(Math.random() * 4)]
        })
      }
      setParticles(newParticles)
    }

    createParticles()
  }, [])

  // Animate particles after they're rendered
  useEffect(() => {
    if (particlesRef.current && particles.length > 0) {
      const particleElements = particlesRef.current.querySelectorAll('.particle')
      particleElements.forEach((particle, i) => {
        const p = particles[i]
        if (p) {
          gsap.to(particle, {
            y: `+=${Math.random() * 100 + 50}`,
            x: `+=${(Math.random() - 0.5) * 50}`,
            opacity: 0,
            scale: 0,
            duration: p.duration,
            delay: p.delay,
            ease: 'power1.out',
            repeat: -1,
            yoyo: false
          })
        }
      })
    }
  }, [particles])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <div className="particles-container" ref={particlesRef}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
          />
        ))}
      </div>
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large">1383942.80</div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget
