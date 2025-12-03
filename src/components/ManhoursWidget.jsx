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
      const nodeCount = 35
      particlesRef.current = []

      // Create network nodes (more concentrated in upper-left)
      for (let i = 0; i < nodeCount; i++) {
        let x, y
        const rand = Math.random()
        if (rand < 0.5) {
          // Concentrate in upper-left (50% of nodes)
          x = Math.random() * (canvas.width * 0.5) + 10
          y = Math.random() * (canvas.height * 0.5) + 10
        } else if (rand < 0.8) {
          // Middle area (30% of nodes)
          x = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2
          y = Math.random() * (canvas.height * 0.6) + canvas.height * 0.2
        } else {
          // Spread out (20% of nodes)
          x = Math.random() * (canvas.width * 0.7) + canvas.width * 0.15
          y = Math.random() * (canvas.height * 0.7) + canvas.height * 0.15
        }

        const node = {
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 1.2, // Faster movement: 0.6x speed
          vy: (Math.random() - 0.5) * 1.2, // Faster movement: 0.6x speed
          radius: Math.random() * 1 + 1.5, // 1.5-2.5px nodes
          opacity: 0.6,
          targetOpacity: 0.6,
          pulseScale: 1
        }
        
        particlesRef.current.push(node)

        // Animate pulse with GSAP
        gsap.to(node, {
          pulseScale: 1.3,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1
        })
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw connections first (behind nodes)
        particlesRef.current.forEach((node, i) => {
          particlesRef.current.slice(i + 1).forEach(otherNode => {
            const dx = otherNode.x - node.x
            const dy = otherNode.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Connect nearby nodes (increased distance for more connections)
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.3
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = `rgba(0, 166, 20, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })

        // Update and draw nodes
        particlesRef.current.forEach((node, i) => {
          // Update position (faster movement)
          node.x += node.vx
          node.y += node.vy

          // Keep nodes in bounds
          if (node.x < 5 || node.x > canvas.width - 5) {
            node.vx *= -1
            node.x = Math.max(5, Math.min(canvas.width - 5, node.x))
          }
          if (node.y < 5 || node.y > canvas.height - 5) {
            node.vy *= -1
            node.y = Math.max(5, Math.min(canvas.height - 5, node.y))
          }

          // Draw node as solid circle (network node style)
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * node.pulseScale, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 166, 20, ${node.opacity})`
          ctx.fill()
          
          // Optional: Add subtle glow
          ctx.shadowBlur = 3
          ctx.shadowColor = 'rgba(0, 166, 20, 0.3)'
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * node.pulseScale, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
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
