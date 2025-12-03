import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ManhoursWidget() {
  const widgetRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)

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

    // Initialize particles
    const initParticles = () => {
      if (!canvasRef.current || !widgetRef.current) return

      const canvas = canvasRef.current
      const rect = widgetRef.current.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      const ctx = canvas.getContext('2d')
      const particleCount = 30
      particlesRef.current = []

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.5 + 0.3
        })
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particlesRef.current.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          // Keep particles in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 166, 20, ${particle.opacity})`
          ctx.fill()

          // Draw connections
          particlesRef.current.slice(i + 1).forEach(otherParticle => {
            const dx = otherParticle.x - particle.x
            const dy = otherParticle.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              const opacity = (1 - distance / 80) * 0.2
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(0, 166, 20, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })

        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!widgetRef.current) return
        const rect = widgetRef.current.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        
        // Reposition particles
        particlesRef.current.forEach(particle => {
          particle.x = Math.min(particle.x, canvas.width)
          particle.y = Math.min(particle.y, canvas.height)
        })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        window.removeEventListener('resize', handleResize)
      }
    }

    const timer = setTimeout(initParticles, 100)
    return () => {
      clearTimeout(timer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <canvas 
        ref={canvasRef}
        className="particles-canvas"
      />
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large">1383942.80</div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget
