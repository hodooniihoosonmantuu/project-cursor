import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef()
  const count = 500

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // Green and gold color palette
      const isGold = Math.random() > 0.7
      if (isGold) {
        colors[i * 3] = 0.83 // R
        colors[i * 3 + 1] = 0.66 // G
        colors[i * 3 + 2] = 0.29 // B
      } else {
        colors[i * 3] = 0.1 // R
        colors[i * 3 + 1] = 0.48 // G
        colors[i * 3 + 2] = 0.24 // B
      }
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShapes() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[-5, 2, -10]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1a7a3d" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[6, -3, -8]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#d4a84b" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 5, -12]}>
        <torusGeometry args={[1.5, 0.3, 8, 20]} />
        <meshBasicMaterial color="#1a7a3d" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function ThreeBackground() {
  return (
    <div className="three-background">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}

export default ThreeBackground

