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
      const widgetWidth = 300 // Approximate widget width
      const widgetHeight = 140 // Approximate widget height
      const nodeCount = 15
      const newNodes = []
      const newConnections = []

      // Create nodes (more concentrated in upper-left)
      for (let i = 0; i < nodeCount; i++) {
        let x, y
        if (i < nodeCount * 0.6) {
          // Concentrate in upper-left
          x = Math.random() * (widgetWidth * 0.6)
          y = Math.random() * (widgetHeight * 0.6)
        } else {
          // Spread out
          x = Math.random() * widgetWidth
          y = Math.random() * widgetHeight
        }
        
        newNodes.push({
          id: i,
          x: x,
          y: y,
          radius: Math.random() * 2 + 1.5
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
          
          // Connect nodes that are close enough
          if (distance < 120 && Math.random() > 0.5) {
            newConnections.push({
              id: `${i}-${j}`,
              x1: node1.x,
              y1: node1.y,
              x2: node2.x,
              y2: node2.y,
              opacity: 0.3 + Math.random() * 0.4
            })
          }
        }
      }

      setNodes(newNodes)
      setConnections(newConnections)
    }

    createNetwork()

    // Animate network
    if (svgRef.current) {
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
    }
  }, [])

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <svg 
        ref={svgRef}
        className="network-svg"
        viewBox="0 0 300 140"
        preserveAspectRatio="none"
      >
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
            strokeWidth="0.5"
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
            opacity="0.6"
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
