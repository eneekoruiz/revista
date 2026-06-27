'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Airplane from './Airplane'

export default function BrutalistCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-10 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={3} 
          color="#ffffff" 
        />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#FC352E" />
        <pointLight position={[5, 2, -2]} intensity={2.0} color="#ffffff" />

        <Environment preset="city" background={false} />

        <EffectComposer multisampling={4}>
          <Bloom 
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.9} 
            intensity={1.5} 
            mipmapBlur
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={[0.004, 0.004] as unknown as [number, number]}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Airplane />
        </Suspense>
      </Canvas>
    </div>
  )
}
