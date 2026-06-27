"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Float, Html, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scenegraph-layer/airplane.glb";
const scrollState = { progress: 0 };

// LOADER para que no haya salto extraño
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-[#FC352E] font-anton text-2xl tracking-widest uppercase flex flex-col items-center">
        <span>INICIANDO...</span>
        <span className="text-white/50 text-sm">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

// 1. EL AVIÓN (Coreografía matemática pura)
function AirplaneChoreography() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#e0e0e0"),
          roughness: 0.1,
          metalness: 0.8,
          envMapIntensity: 2.5,
        });
        mesh.material = mat;
        mesh.castShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = scrollState.progress;

    // Curva Matemática: Entra desde la cámara y sale disparado por la esquina superior/lejana
    // Al pasar de 0.8, aceleramos la salida
    const easeOut = t < 0.7 ? t : t + (t - 0.7) * 2; 

    groupRef.current.position.x = THREE.MathUtils.lerp(2, -18, easeOut); 
    groupRef.current.position.y = Math.sin(t * Math.PI) * 3 - (easeOut * 1.5); 
    groupRef.current.position.z = THREE.MathUtils.lerp(8, -35, easeOut); 

    // Rotación (Barrel Roll + Giro)
    const roll = THREE.MathUtils.lerp(0, Math.PI * 2.5, t * 1.5); 
    const pitch = THREE.MathUtils.lerp(-0.2, 1.2, t); 
    const yaw = THREE.MathUtils.lerp(0, -1.5, t); 
    
    groupRef.current.rotation.set(pitch, yaw, roll);
    // Eliminado el fade out artificial (difuminado), ahora sale del plano de forma natural.
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive object={scene} scale={0.06} />
      </Float>
    </group>
  );
}

// 2. EL RIG DE CÁMARA CINEMATOGRÁFICO
function CameraRig() {
  const { camera } = useThree();
  
  useFrame(() => {
    const t = scrollState.progress;
    // Zoom out dinámico: Aumentamos el FOV y alejamos la cámara
    const fov = THREE.MathUtils.lerp(35, 60, t);
    const z = THREE.MathUtils.lerp(12, 20, t);
    
    (camera as THREE.PerspectiveCamera).fov = fov;
    camera.position.z = z;
    camera.updateProjectionMatrix();
  });
  return null;
}

// 3. COMPONENTE PRINCIPAL
export default function AirplaneExperience({ globalSettings }: { globalSettings?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") ScrollTrigger.config({ ignoreMobileResize: true });

    const el = containerRef.current;
    if (!el) return;

    scrollState.progress = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      // Reducido de * 5 a * 2.5 para hacerlo mucho más ágil y que no haya que scrollear tanto
      end: () => "+=" + window.innerHeight * 2.5,
      pin: true,
      scrub: 1.2, // Scrub más reactivo
      onUpdate(self) {
        scrollState.progress = self.progress;
      },
      onLeave() {
        setIsActive(false); 
      },
      onEnterBack() {
        setIsActive(true);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden h-[100vh]">
      
      {/* CAPA DE TEXTOS */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        <h1 className="font-anton text-center uppercase tracking-tighter leading-[0.88] text-[#FC352E]" style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}>
          {globalSettings?.heroTitleLine1 || "RAK$ CLUB"}
          <br />
          {globalSettings?.heroTitleLine2 || "MAGAZINE"}
        </h1>
        <p className="mt-6 text-white/30 font-poppins font-bold uppercase tracking-[0.35em] text-[clamp(0.55rem,1.2vw,0.9rem)]">
          {globalSettings?.heroTagline || "Cultura Urbana · Norte de España"}
        </p>
      </div>

      {/* RENDER 3D OPTIMIZADO */}
      <div ref={canvasWrapRef} className="absolute inset-0 z-20 pointer-events-none">
        <Canvas
          frameloop={isActive ? "always" : "never"}
          dpr={[1, 2]} 
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          shadows
        >
          <Suspense fallback={<CanvasLoader />}>
            <CameraRig />
            <ambientLight intensity={1.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={4.0} 
              castShadow 
              shadow-mapSize={[2048, 2048]} 
              shadow-bias={-0.0001}
            />
            <pointLight position={[0, -2, -5]} intensity={20.0} color="#FC352E" distance={40} />
            <Environment preset="city" />
            
            <AirplaneChoreography />

            {/* Multisampling a 8 para AA Extremo, elimina por completo el aliasing */}
            <EffectComposer multisampling={8}>
              <DepthOfField focusDistance={0.05} focalLength={0.05} bokehScale={2} height={480} />
              <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-3">
        <span
          className="text-white/50 font-poppins font-bold uppercase tracking-[0.3em] animate-pulse"
          style={{ fontSize: "0.58rem" }}
        >
          Scroll para entrar
        </span>
        <div className="relative w-px h-10 bg-white/10 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-white/60"
            style={{
              height: "40%",
              animation: "slideDown 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
