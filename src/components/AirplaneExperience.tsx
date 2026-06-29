/* eslint-disable react-hooks/immutability */
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
const scrollState = { target: 0, current: 0 };

interface HeroSettings {
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTagline?: string;
}

function getFlightProfile(width: number) {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  if (isMobile) {
    return {
      scale: 0.05,
      startX: 0.35,
      endX: -7.25,
      startZ: 4,
      endZ: -20,
      arc: 2.15,
      descent: 0.85,
      startFov: 58,
      endFov: 72,
      startCameraZ: 22,
      endCameraZ: 29,
      cameraY: 0.25,
      smoothing: 3.2,
    };
  }

  if (isTablet) {
    return {
      scale: 0.055,
      startX: 1.1,
      endX: -11,
      startZ: 6,
      endZ: -26,
      arc: 2.6,
      descent: 1.15,
      startFov: 46,
      endFov: 64,
      startCameraZ: 17,
      endCameraZ: 24,
      cameraY: 0.1,
      smoothing: 3.7,
    };
  }

  return {
    scale: 0.06,
    startX: 2,
    endX: -18,
    startZ: 8,
    endZ: -35,
    arc: 3,
    descent: 1.5,
    startFov: 35,
    endFov: 60,
    startCameraZ: 12,
    endCameraZ: 20,
    cameraY: 0,
    smoothing: 4.5,
  };
}

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

function AirplaneChoreography() {
  const { scene } = useGLTF(MODEL_URL);
  const { size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const profile = getFlightProfile(size.width);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#e0e0e0"),
          roughness: 0.16,
          metalness: 0.78,
          envMapIntensity: 2.2,
        });
        mesh.castShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.05);
    scrollState.current = THREE.MathUtils.damp(
      scrollState.current,
      scrollState.target,
      profile.smoothing,
      dt
    );

    const t = THREE.MathUtils.clamp(scrollState.current, 0, 1);
    const easeOut = t < 0.7 ? t : t + (t - 0.7) * 1.8;

    groupRef.current.position.x = THREE.MathUtils.lerp(profile.startX, profile.endX, easeOut);
    groupRef.current.position.y = Math.sin(t * Math.PI) * profile.arc - easeOut * profile.descent;
    groupRef.current.position.z = THREE.MathUtils.lerp(profile.startZ, profile.endZ, easeOut);

    const roll = THREE.MathUtils.lerp(0, Math.PI * 2.5, t * 1.5);
    const pitch = THREE.MathUtils.lerp(-0.2, 1.2, t);
    const yaw = THREE.MathUtils.lerp(0, -1.5, t);

    groupRef.current.rotation.set(pitch, yaw, roll);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.45} rotationIntensity={0.35} floatIntensity={0.55}>
        <primitive object={scene} scale={profile.scale} />
      </Float>
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const profile = getFlightProfile(size.width);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = THREE.MathUtils.clamp(scrollState.current, 0, 1);
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    perspectiveCamera.fov = THREE.MathUtils.damp(
      perspectiveCamera.fov,
      THREE.MathUtils.lerp(profile.startFov, profile.endFov, t),
      6,
      dt
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      THREE.MathUtils.lerp(profile.startCameraZ, profile.endCameraZ, t),
      6,
      dt
    );
    camera.position.y = THREE.MathUtils.damp(camera.position.y, profile.cameraY, 6, dt);
    camera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}

export default function AirplaneExperience({ globalSettings }: { globalSettings?: HeroSettings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });

    const el = containerRef.current;
    if (!el) return;

    scrollState.target = 0;
    scrollState.current = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.5}`,
      pin: true,
      scrub: 2.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: false,
      preventOverlaps: true,
      onUpdate(self) {
        scrollState.target = THREE.MathUtils.clamp(self.progress, 0, 1);
      },
      onLeave() {
        scrollState.target = 1;
        setIsActive(false);
      },
      onEnter() {
        setIsActive(true);
      },
      onEnterBack() {
        setIsActive(true);
      },
      onLeaveBack() {
        scrollState.target = 0;
      },
      onRefresh(self) {
        scrollState.target = THREE.MathUtils.clamp(self.progress, 0, 1);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden h-[100svh] min-h-[620px] md:h-[100vh]">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-3 sm:px-6">
        <h1
          className="font-anton text-center uppercase leading-[0.84] text-[#FC352E] md:leading-[0.88]"
          style={{ fontSize: "clamp(4.9rem, 24vw, 11rem)", letterSpacing: "0" }}
        >
          {globalSettings?.heroTitleLine1 || "RAK$ CLUB"}
          <br />
          {globalSettings?.heroTitleLine2 || "MAGAZINE"}
        </h1>
        <p className="mt-5 max-w-[92vw] text-center text-white/35 font-poppins font-bold uppercase tracking-[0.24em] text-[clamp(0.58rem,2.3vw,0.9rem)] sm:tracking-[0.35em] md:mt-6 md:text-[clamp(0.55rem,1.2vw,0.9rem)]">
          {globalSettings?.heroTagline || "Cultura Urbana · Norte de España"}
        </p>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas
          frameloop={isActive ? "always" : "never"}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          shadows
        >
          <Suspense fallback={<CanvasLoader />}>
            <CameraRig />
            <ambientLight intensity={1.45} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={3.6}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            <pointLight position={[0, -2, -5]} intensity={16.0} color="#FC352E" distance={38} />
            <Environment preset="city" />
            <AirplaneChoreography />
            <EffectComposer multisampling={0}>
              <DepthOfField focusDistance={0.055} focalLength={0.04} bokehScale={1.25} height={360} />
              <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.9} height={240} opacity={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

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
