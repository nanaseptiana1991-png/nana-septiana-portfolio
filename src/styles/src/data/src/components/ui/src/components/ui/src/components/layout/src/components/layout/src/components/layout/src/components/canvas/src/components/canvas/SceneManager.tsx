"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Avatar3D from "./Avatar3D";

interface RouteSceneConfig {
  cameraPos: [number, number, number];
  avatarPosDesktop: [number, number, number];
  avatarPosMobile: [number, number, number];
  avatarYaw: number;
  keyLightIntensity: number;
  rimLightColor: string;
}

function getRouteSceneConfig(pathname: string): RouteSceneConfig {
  switch (pathname) {
    case "/about":
      return {
        cameraPos: [0.3, 0.25, 4.1],
        avatarPosDesktop: [-1.25, -0.95, 0.1],
        avatarPosMobile: [0, -1.25, -0.4],
        avatarYaw: 0.28,
        keyLightIntensity: 1.5,
        rimLightColor: "#93C5FD",
      };
    case "/expertise":
      return {
        cameraPos: [-0.2, 0.15, 4.4],
        avatarPosDesktop: [1.45, -1.0, -0.2],
        avatarPosMobile: [0, -1.35, -0.6],
        avatarYaw: -0.22,
        keyLightIntensity: 1.4,
        rimLightColor: "#2563EB",
      };
    case "/projects":
      return {
        cameraPos: [0, 0.1, 4.6],
        avatarPosDesktop: [1.55, -1.05, -0.4],
        avatarPosMobile: [0, -1.4, -0.8],
        avatarYaw: -0.18,
        keyLightIntensity: 1.35,
        rimLightColor: "#60A5FA",
      };
    case "/experience":
      return {
        cameraPos: [-0.25, 0.2, 4.3],
        avatarPosDesktop: [1.35, -0.98, -0.2],
        avatarPosMobile: [0, -1.35, -0.6],
        avatarYaw: -0.12,
        keyLightIntensity: 1.45,
        rimLightColor: "#A7B0C0",
      };
    case "/contact":
      return {
        cameraPos: [0, 0.22, 3.8],
        avatarPosDesktop: [1.05, -0.9, 0.25],
        avatarPosMobile: [0, -1.2, -0.3],
        avatarYaw: 0,
        keyLightIntensity: 1.25,
        rimLightColor: "#3B82F6",
      };
    case "/":
    default:
      return {
        cameraPos: [0, 0.18, 4.0],
        avatarPosDesktop: [1.1, -0.92, 0.15],
        avatarPosMobile: [0, -1.22, -0.35],
        avatarYaw: -0.08,
        keyLightIntensity: 1.6,
        rimLightColor: "#2563EB",
      };
  }
}

function CameraRig({
  targetPos,
  reducedMotion,
}: {
  targetPos: [number, number, number];
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const desiredVec = useRef(new THREE.Vector3(...targetPos));

  useEffect(() => {
    desiredVec.current.set(...targetPos);
    if (reducedMotion) {
      camera.position.set(...targetPos);
      camera.lookAt(0, 0.05, 0);
    }
  }, [targetPos, reducedMotion, camera]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const step = Math.min(delta, 0.05) * 3.2;
    camera.position.lerp(desiredVec.current, step);
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

export default function SceneManager() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const syncFlags = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches);
    };

    syncFlags();
    mqMotion.addEventListener("change", syncFlags);
    mqMobile.addEventListener("change", syncFlags);

    return () => {
      mqMotion.removeEventListener("change", syncFlags);
      mqMobile.removeEventListener("change", syncFlags);
    };
  }, []);

  const config = getRouteSceneConfig(pathname);
  const avatarPos = isMobile ? config.avatarPosMobile : config.avatarPosDesktop;
  const avatarScale = isMobile ? 0.86 : 1.0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-90"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: config.cameraPos, fov: 38, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <CameraRig targetPos={config.cameraPos} reducedMotion={reducedMotion} />

        {/* Studio Three-Point Lighting */}
        <ambientLight intensity={0.38} color="#CBD5E1" />
        <directionalLight
          position={[2.8, 4.2, 3.5]}
          intensity={config.keyLightIntensity}
          color="#FFFFFF"
        />
        <directionalLight
          position={[-2.5, 2.0, -2.6]}
          intensity={0.95}
          color={config.rimLightColor}
        />
        <pointLight position={[0.4, 1.2, 2.2]} intensity={0.45} color="#E2E8F0" />

        <Environment resolution={128}>
          <mesh scale={15}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#181C26" side={THREE.BackSide} />
          </mesh>
        </Environment>

        <Avatar3D
          position={avatarPos}
          scale={avatarScale}
          targetYaw={config.avatarYaw}
          reducedMotion={reducedMotion}
        />

        <ContactShadows
          position={[avatarPos[0], avatarPos[1] - 0.25, avatarPos[2]]}
          opacity={0.45}
          scale={3.5}
          blur={2.2}
          far={2.5}
        />
      </Canvas>
    </div>
  );
}
