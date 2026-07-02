/* eslint-disable react-hooks/immutability */
"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "/assets/models/airplane.glb";
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
      scale: 0.052,
      startX: -0.55,
      midX: 0.25,
      exitX: 0.1,
      startY: -0.05,
      exitY: -12,
      startZ: 3.8,
      midZ: -5.8,
      exitZ: 1.5,
      arc: 2.15,
      startFov: 53,
      endFov: 62,
      startCameraZ: 20,
      endCameraZ: 23,
      cameraY: 0.18,
      smoothing: 4.8,
    };
  }

  if (isTablet) {
    return {
      scale: 0.058,
      startX: -0.8,
      midX: 1.25,
      exitX: 0.1,
      startY: -0.05,
      exitY: -16,
      startZ: 6,
      midZ: -8.5,
      exitZ: 2,
      arc: 2.6,
      startFov: 43,
      endFov: 56,
      startCameraZ: 16,
      endCameraZ: 19.5,
      cameraY: 0.04,
      smoothing: 5.1,
    };
  }

  return {
    scale: 0.064,
    startX: -1.6,
    midX: 2.3,
    exitX: 0.1,
    startY: 0,
    exitY: -20,
    startZ: 8,
    midZ: -11,
    exitZ: 3,
    arc: 3,
    startFov: 34,
    endFov: 51,
    startCameraZ: 12,
    endCameraZ: 16.5,
    cameraY: 0,
    smoothing: 5.5,
  };
}

function LoadingCurtain({ progress, isReady }: { progress: number; isReady: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isReady ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isReady}
    >
      <div className="w-full max-w-[34rem] px-8 text-center">
        <p className="font-anton uppercase leading-none text-[#FC352E]" style={{ fontSize: "clamp(3.1rem, 13vw, 7rem)" }}>
          Cargando
        </p>
        <p className="mt-1 font-poppins text-[0.62rem] font-black uppercase tracking-[0.44em] text-white/70 sm:text-xs">
          Vuelo {Math.min(100, Math.round(progress))}%
        </p>
        <div className="mt-6 h-[3px] w-full bg-white/10">
          <div
            className="h-full bg-[#FC352E] transition-[width] duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
          />
        </div>
      </div>
    </div>
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
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#ffffff"),
          roughness: 0.2,
          metalness: 0.8,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.5,
          emissive: new THREE.Color("#ffffff"),
          emissiveIntensity: 0.15,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.045);
    scrollState.current = THREE.MathUtils.damp(
      scrollState.current,
      scrollState.target,
      profile.smoothing,
      dt
    );

    const t = THREE.MathUtils.clamp(scrollState.current, 0, 1);
    const cruise = THREE.MathUtils.smoothstep(t, 0, 0.64);
    const exit = THREE.MathUtils.smoothstep(t, 0.58, 1);

    const x = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(profile.startX, profile.midX, cruise),
      profile.exitX,
      exit
    );
    const y = profile.startY + Math.sin(cruise * Math.PI) * profile.arc + exit * profile.exitY;
    const z = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(profile.startZ, profile.midZ, cruise),
      profile.exitZ,
      exit
    );

    groupRef.current.position.set(x, y, z);

    const roll = t < 0.66
      ? THREE.MathUtils.lerp(0, -Math.PI * 1.9, cruise)
      : THREE.MathUtils.lerp(-Math.PI * 1.9, -Math.PI * 2.04, exit);
    // pitch dives steeply nose-down during exit — the plane points toward
    // the bottom of the screen where the page content begins
    const pitch = THREE.MathUtils.lerp(-0.12, 0.48, cruise) - exit * 1.55;
    // yaw returns to ~0 during exit so the nose faces forward/down, not sideways
    const yaw = THREE.MathUtils.lerp(-0.02, 0.82, cruise) - exit * 0.82;

    groupRef.current.rotation.set(pitch, yaw, roll);
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.95} rotationIntensity={0.08} floatIntensity={0.18}>
        <primitive object={scene} scale={profile.scale} />
        {/* White halo light — makes the fuselage glow like a mini spotlight */}
        <pointLight intensity={6} distance={12} color="#ffffff" decay={2} />
        {/* Red accent light attached to the airplane — reflections follow it throughout the flight */}
        <pointLight position={[0, 0.5, 2]} intensity={18} distance={20} color="#FC352E" decay={2} />
      </Float>
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const profile = getFlightProfile(size.width);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.045);
    const t = THREE.MathUtils.clamp(scrollState.current, 0, 1);
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    perspectiveCamera.fov = THREE.MathUtils.damp(
      perspectiveCamera.fov,
      THREE.MathUtils.lerp(profile.startFov, profile.endFov, t),
      7.5,
      dt
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      THREE.MathUtils.lerp(profile.startCameraZ, profile.endCameraZ, t),
      7.5,
      dt
    );
    camera.position.y = THREE.MathUtils.damp(camera.position.y, profile.cameraY, 7.5, dt);
    camera.lookAt(0, 0.15, 0);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}

export default function AirplaneExperience({ globalSettings }: { globalSettings?: HeroSettings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [minimumLoaderElapsed, setMinimumLoaderElapsed] = useState(false);
  const { active, progress } = useProgress();
  const loadProgress = minimumLoaderElapsed ? progress : Math.max(12, Math.min(96, progress));
  const isReady = minimumLoaderElapsed && !active && progress >= 100;

  useEffect(() => {
    useGLTF.preload(MODEL_URL);
    const minimumTimer = window.setTimeout(() => setMinimumLoaderElapsed(true), 520);
    return () => window.clearTimeout(minimumTimer);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    if (!isReady) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.overscrollBehavior = previousOverscroll;
      };
    }

    document.body.style.overflow = previousOverflow;
    document.body.style.overscrollBehavior = previousOverscroll;
    ScrollTrigger.refresh();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });

    const el = containerRef.current;
    if (!el) return;

    scrollState.target = 0;
    scrollState.current = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 2.05, 1180)}`,
      pin: true,
      pinSpacing: true,
      scrub: 2.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: false,
      preventOverlaps: true,
      onUpdate(self) {
        scrollState.target = THREE.MathUtils.clamp(self.progress, 0, 1);
      },
      onLeave() {
        scrollState.target = 1;
        scrollState.current = 1;
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

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => st.kill();
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden h-[100svh] min-h-[600px] md:h-[100vh]">
      <LoadingCurtain progress={loadProgress} isReady={isReady} />

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 sm:px-6 transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}>
        <h1 className="font-anton text-center uppercase leading-[0.86] md:leading-[0.88]" style={{ letterSpacing: "0" }}>
          <span
            className="block text-[#FC352E]"
            style={{
              fontSize: "clamp(4rem, 18vw, 10.8rem)",
              textShadow: "0 0 18px rgba(252,53,46,0.55), 0 0 60px rgba(252,53,46,0.22), 0 0 120px rgba(252,53,46,0.1)"
            }}
          >
            {globalSettings?.heroTitleLine1 || "RAK$ CLUB"}
          </span>
          <span
            className="mt-2 block font-poppins font-black uppercase text-white/88"
            style={{ fontSize: "clamp(0.95rem, 4.6vw, 2.65rem)", letterSpacing: "clamp(0.34rem, 2.4vw, 1.35rem)" }}
          >
            {globalSettings?.heroTitleLine2 || "MAGAZINE"}
          </span>
        </h1>
        <p className="mt-6 max-w-[92vw] text-center text-white/36 font-poppins font-bold uppercase tracking-[0.22em] text-[clamp(0.56rem,2vw,0.85rem)] sm:tracking-[0.32em]">
          {globalSettings?.heroTagline || "Cultura Urbana · Norte de España"}
        </p>
      </div>

      <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}>
        <Canvas
          frameloop={isActive ? "always" : "never"}
          dpr={[1.1, 1.65]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.12,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <CameraRig />
            <ambientLight intensity={0.34} />
          <hemisphereLight intensity={0.28} color="#f3efe7" groundColor="#070707" />
          <directionalLight
            position={[8, 9, 7]}
            intensity={1.75}
            castShadow
            shadow-mapSize={[1536, 1536]}
            shadow-bias={-0.00008}
          />
          {/* Ambient red fill from the left — subtle scene mood */}
          <pointLight position={[-3.2, 1.4, 4.5]} intensity={8} color="#FC352E" distance={40} />
          <pointLight position={[3, -2, 6]} intensity={2.2} color="#fff6e8" distance={24} />
          <AirplaneChoreography />
            <EffectComposer multisampling={4}>
              {/* Tight bloom — the bright white fuselage and red lights */}
              <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.3} height={480} intensity={1.8} />
              {/* Wide soft halo — cinematic light bleed around the plane */}
              <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.9} height={200} intensity={0.6} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-3 transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}>
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