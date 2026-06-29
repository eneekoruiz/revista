/* eslint-disable react-hooks/immutability */
"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Float, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
      scale: 0.052,
      startX: 0.25,
      midX: -0.9,
      exitX: -8.8,
      startY: -0.05,
      exitY: 4.8,
      startZ: 3.6,
      midZ: -6,
      exitZ: -17,
      arc: 2.35,
      startFov: 54,
      endFov: 66,
      startCameraZ: 20,
      endCameraZ: 26,
      cameraY: 0.2,
      smoothing: 4.25,
    };
  }

  if (isTablet) {
    return {
      scale: 0.058,
      startX: 1,
      midX: -1.8,
      exitX: -13.5,
      startY: -0.05,
      exitY: 5.4,
      startZ: 6,
      midZ: -9,
      exitZ: -25,
      arc: 2.8,
      startFov: 44,
      endFov: 60,
      startCameraZ: 16,
      endCameraZ: 22,
      cameraY: 0.05,
      smoothing: 4.6,
    };
  }

  return {
    scale: 0.064,
    startX: 2.2,
    midX: -2.4,
    exitX: -20,
    startY: 0,
    exitY: 6.8,
    startZ: 8,
    midZ: -12,
    exitZ: -38,
    arc: 3.25,
    startFov: 34,
    endFov: 56,
    startCameraZ: 12,
    endCameraZ: 19,
    cameraY: 0,
    smoothing: 5,
  };
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
          color: new THREE.Color("#f4f4f1"),
          roughness: 0.28,
          metalness: 0.48,
          clearcoat: 0.55,
          clearcoatRoughness: 0.18,
          envMapIntensity: 2.8,
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
    const cruise = THREE.MathUtils.smoothstep(t, 0, 0.72);
    const exit = THREE.MathUtils.smoothstep(t, 0.64, 1);

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

    const roll = t < 0.72
      ? THREE.MathUtils.lerp(0, Math.PI * 2.2, cruise)
      : THREE.MathUtils.lerp(Math.PI * 2.2, Math.PI * 2.55, exit);
    const pitch = THREE.MathUtils.lerp(-0.16, 0.72, cruise) + exit * 0.45;
    const yaw = THREE.MathUtils.lerp(0.05, -0.95, cruise) + exit * -0.5;

    groupRef.current.rotation.set(pitch, yaw, roll);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.32}>
        <primitive object={scene} scale={profile.scale} />
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
      7,
      dt
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      THREE.MathUtils.lerp(profile.startCameraZ, profile.endCameraZ, t),
      7,
      dt
    );
    camera.position.y = THREE.MathUtils.damp(camera.position.y, profile.cameraY, 7, dt);
    camera.lookAt(0, 0.15, 0);
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
      end: () => `+=${Math.max(window.innerHeight * 2.2, 1300)}`,
      pin: true,
      scrub: 2.2,
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
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden h-[100svh] min-h-[600px] md:h-[100vh]">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 sm:px-6">
        <h1
          className="font-anton text-center uppercase leading-[0.86] md:leading-[0.88]"
          style={{ fontSize: "clamp(3.85rem, 18vw, 10.6rem)", letterSpacing: "0" }}
        >
          <span className="block text-[#FC352E] drop-shadow-[0_0_22px_rgba(252,53,46,0.46)]">
            {globalSettings?.heroTitleLine1 || "RAK$ CLUB"}
          </span>
          <span className="block text-white drop-shadow-[0_0_26px_rgba(252,53,46,0.38)]">
            {globalSettings?.heroTitleLine2 || "MAGAZINE"}
          </span>
        </h1>
        <p className="mt-5 max-w-[92vw] text-center text-white/38 font-poppins font-bold uppercase tracking-[0.22em] text-[clamp(0.56rem,2vw,0.85rem)] sm:tracking-[0.32em] md:mt-6">
          {globalSettings?.heroTagline || "Cultura Urbana · Norte de España"}
        </p>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas
          frameloop={isActive ? "always" : "never"}
          dpr={[1.25, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <CameraRig />
            <ambientLight intensity={0.72} />
            <hemisphereLight intensity={0.55} color="#ffffff" groundColor="#080808" />
            <directionalLight
              position={[8, 9, 7]}
              intensity={4.4}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.00008}
            />
            <pointLight position={[-2.8, 1.2, 4]} intensity={34} color="#FC352E" distance={42} />
            <pointLight position={[3, -2, 6]} intensity={10} color="#ffffff" distance={26} />
            <Environment preset="studio" environmentIntensity={1.35} />
            <AirplaneChoreography />
            <EffectComposer multisampling={4}>
              <Bloom luminanceThreshold={0.28} luminanceSmoothing={0.72} height={720} opacity={1.2} />
            </EffectComposer>
            <Preload all />
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
