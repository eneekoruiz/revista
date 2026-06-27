'use client'

import { useRef, useEffect } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Abstracción brutalista de un avión
function BrutalistAbstractAirplane() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(groupRef.current!.position, 
        { x: -5, y: -3, z: -10 },
        { 
          x: 5, y: -1.5, z: 7,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "600px top",
            scrub: 0.8
          }
        }
      )
      gsap.fromTo(groupRef.current!.rotation,
        { x: 0, y: Math.PI / 4, z: Math.PI / 6 },
        {
          x: Math.PI * 2, y: -Math.PI / 4, z: -Math.PI,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "600px top",
            scrub: 0.8
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 4]} />
        <meshStandardMaterial color="#FC352E" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, -0.5]}>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.3, -1.8]}>
        <boxGeometry args={[0.1, 0.8, 1]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text
        position={[0.6, 0, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        fontSize={0.4}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        RAK$
      </Text>
    </group>
  )
}

export default function Airplane() {
  return <BrutalistAbstractAirplane />
}
