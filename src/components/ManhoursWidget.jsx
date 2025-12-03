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
      const colors = ['#FFD700', '#2ecc71', '#4a90e2', '#FFCC2E', '#FF6B6B', '#9b59b6']
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100 + 100, // Start from bottom
          size: Math.random() * 5 + 1.5,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360
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
          // Reset position
          gsap.set(particle, {
            y: `${p.y}%`,
            x: `${p.x}%`,
            opacity: 0.9,
            scale: 1,
            rotation: p.rotation
          })

          // Animate upward with drift
          const driftX = (Math.random() - 0.5) * 80
          const moveY = -Math.random() * 120 - 80
          
          gsap.to(particle, {
            y: `+=${moveY}%`,
            x: `+=${driftX}%`,
            opacity: 0,
            scale: 0.3,
            rotation: `+=${Math.random() * 360}`,
            duration: p.duration,
            delay: p.delay,
            ease: 'power1.out',
            repeat: -1,
            yoyo: false,
            onComplete: () => {
              // Reset to bottom when animation completes
              gsap.set(particle, {
                y: `${Math.random() * 20 + 100}%`,
                x: `${Math.random() * 100}%`,
                opacity: 0.9,
                scale: 1
              })
            }
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
