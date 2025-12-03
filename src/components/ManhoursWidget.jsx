import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function ManhoursWidget() {
  const widgetRef = useRef(null)
  const svgRef = useRef(null)
  const [nodes, setNodes] = useState([])
  const [connections, setConnections] = useState([])

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

    // Create network nodes and connections
    const createNetwork = () => {
      if (!widgetRef.current) return
      
      const rect = widgetRef.current.getBoundingClientRect()
      const widgetWidth = rect.width || 300
      const widgetHeight = rect.height || 140
      const nodeCount = 20
      const newNodes = []
      const newConnections = []

      // Create nodes (more concentrated in upper-left, dissipating to bottom-right)
      for (let i = 0; i < nodeCount; i++) {
        let x, y
        const rand = Math.random()
        if (rand < 0.5) {
          // Concentrate in upper-left (50% of nodes)
          x = Math.random() * (widgetWidth * 0.5)
          y = Math.random() * (widgetHeight * 0.5)
        } else if (rand < 0.8) {
          // Middle area (30% of nodes)
          x = Math.random() * (widgetWidth * 0.7)
          y = Math.random() * (widgetHeight * 0.7)
        } else {
          // Spread out (20% of nodes)
          x = Math.random() * widgetWidth
          y = Math.random() * widgetHeight
        }
        
        newNodes.push({
          id: i,
          x: x,
          y: y,
          radius: Math.random() * 1.5 + 1
        })
      }

      // Create connections between nearby nodes
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const node1 = newNodes[i]
          const node2 = newNodes[j]
          const distance = Math.sqrt(
            Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
          )
          
          // Connect nodes that are close enough (varying connection probability)
          const maxDistance = 100
          const connectionChance = 1 - (distance / maxDistance)
          if (distance < maxDistance && Math.random() < connectionChance * 0.6) {
            newConnections.push({
              id: `${i}-${j}`,
              x1: node1.x,
              y1: node1.y,
              x2: node2.x,
              y2: node2.y,
              opacity: 0.2 + Math.random() * 0.3,
              strokeWidth: 0.3 + Math.random() * 0.4
            })
          }
        }
      }

      setNodes(newNodes)
      setConnections(newConnections)
    }

    // Wait for widget to be rendered, then create network
    setTimeout(createNetwork, 100)
  }, [])

  // Animate network after nodes are rendered
  useEffect(() => {
    if (nodes.length > 0 && svgRef.current) {
      setTimeout(() => {
        const lines = svgRef.current.querySelectorAll('.network-line')
        const dots = svgRef.current.querySelectorAll('.network-node')
        
        // Animate lines with pulse effect
        lines.forEach((line, i) => {
          gsap.to(line, {
            opacity: '+=0.2',
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.1
          })
        })

        // Animate nodes with subtle pulse
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            scale: 1.3,
            duration: 1.5 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15
          })
        })
      }, 50)
    }
  }, [nodes])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <svg 
        ref={svgRef}
        className="network-svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#90EE90" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#90EE90" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Connections */}
        {connections.map((conn) => (
          <line
            key={conn.id}
            className="network-line"
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="#90EE90"
            strokeWidth={conn.strokeWidth || 0.5}
            opacity={conn.opacity}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            className="network-node"
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill="#90EE90"
            opacity="0.5"
          />
        ))}
      </svg>
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large">1383942.80</div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget
