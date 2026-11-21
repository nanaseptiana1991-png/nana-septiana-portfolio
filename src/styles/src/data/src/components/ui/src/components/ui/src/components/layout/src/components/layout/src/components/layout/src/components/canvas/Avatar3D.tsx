"use client";

import { useEffect, useRef, useState, Component, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface Avatar3DProps {
  modelUrl?: string;
  targetYaw?: number;
  position?: [number, number, number];
  scale?: number;
  reducedMotion?: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Fallback handled gracefully by rendering the placeholder avatar
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function ExternalGlbModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

function StudioPlaceholderAvatar() {
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const breath = Math.sin(t * 1.4) * 0.008;

    if (torsoRef.current) {
      torsoRef.current.position.y = 1.12 + breath;
      torsoRef.current.rotation.z = Math.sin(t * 0.7) * 0.008;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.55) * 0.04;
      headRef.current.rotation.x = Math.cos(t * 0.9) * 0.015;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.06 + Math.sin(t * 1.1) * 0.012;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.06 - Math.sin(t * 1.1) * 0.012;
    }
  });

  // Natural human proportions (~1.78m height in scene units)
  const suitMaterial = (
    <meshStandardMaterial
      color="#151821"
      roughness={0.68}
      metalness={0.08}
    />
  );

  const shirtMaterial = (
    <meshStandardMaterial
      color="#E6EAF0"
      roughness={0.55}
      metalness={0.02}
    />
  );

  const neutralPlaceholderMaterial = (
    <meshStandardMaterial
      color="#8A93A3"
      roughness={0.52}
      metalness={0.06}
    />
  );

  const shoeMaterial = (
    <meshStandardMaterial
      color="#0B0D12"
      roughness={0.35}
      metalness={0.22}
    />
  );

  return (
    <group name="StudioPlaceholderFullBodyAvatar">
      {/* Left Leg & Trouser */}
      <group position={[-0.11, 0.48, 0]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.082, 0.064, 0.44, 24]} />
          {suitMaterial}
        </mesh>
        <mesh position={[0, -0.02, 0.01]} castShadow receiveShadow>
          <cylinderGeometry args={[0.064, 0.052, 0.44, 24]} />
          {suitMaterial}
        </mesh>
        {/* Left Shoe */}
        <mesh position={[0, -0.26, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.105, 0.065, 0.24]} />
          {shoeMaterial}
        </mesh>
      </group>

      {/* Right Leg & Trouser (slightly forward for confident stance) */}
      <group position={[0.11, 0.48, 0.03]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.082, 0.064, 0.44, 24]} />
          {suitMaterial}
        </mesh>
        <mesh position={[0, -0.02, 0.01]} castShadow receiveShadow>
          <cylinderGeometry args={[0.064, 0.052, 0.44, 24]} />
          {suitMaterial}
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0, -0.26, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.105, 0.065, 0.24]} />
          {shoeMaterial}
        </mesh>
      </group>

      {/* Pelvis & Waist */}
      <mesh position={[0, 0.94, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.155, 0.14, 0.14, 28]} />
        {suitMaterial}
      </mesh>

      {/* Upper Torso (Modern Blazer + Crisp Shirt Front) */}
      <group ref={torsoRef} position={[0, 1.12, 0]}>
        {/* Blazer Torso */}
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.205, 0.155, 0.38, 32]} />
          {suitMaterial}
        </mesh>

        {/* Shirt V-Front Insert */}
        <mesh position={[0, 0.22, 0.165]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.11, 0.24, 0.04]} />
          {shirtMaterial}
        </mesh>

        {/* Left Shoulder & Arm */}
        <group ref={leftArmRef} position={[-0.245, 0.31, 0]}>
          <mesh position={[0, -0.02, 0]} castShadow>
            <sphereGeometry args={[0.072, 20, 20]} />
            {suitMaterial}
          </mesh>
          <mesh position={[0, -0.18, 0.01]} castShadow receiveShadow>
            <cylinderGeometry args={[0.062, 0.052, 0.3, 20]} />
            {suitMaterial}
          </mesh>
          <mesh position={[0, -0.38, 0.02]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.042, 0.24, 20]} />
            {shirtMaterial}
          </mesh>
          <mesh position={[0, -0.53, 0.025]} castShadow>
            <sphereGeometry args={[0.044, 18, 18]} />
            {neutralPlaceholderMaterial}
          </mesh>
        </group>

        {/* Right Shoulder & Arm */}
        <group ref={rightArmRef} position={[0.245, 0.31, 0]}>
          <mesh position={[0, -0.02, 0]} castShadow>
            <sphereGeometry args={[0.072, 20, 20]} />
            {suitMaterial}
          </mesh>
          <mesh position={[0, -0.18, 0.01]} castShadow receiveShadow>
            <cylinderGeometry args={[0.062, 0.052, 0.3, 20]} />
            {suitMaterial}
          </mesh>
          <mesh position={[0, -0.38, 0.02]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.042, 0.24, 20]} />
            {shirtMaterial}
          </mesh>
          <mesh position={[0, -0.53, 0.025]} castShadow>
            <sphereGeometry args={[0.044, 18, 18]} />
            {neutralPlaceholderMaterial}
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.39, 0.01]} castShadow>
          <cylinderGeometry args={[0.058, 0.066, 0.11, 20]} />
          {neutralPlaceholderMaterial}
        </mesh>

        {/* Head (Non-specific studio placeholder proportions) */}
        <group ref={headRef} position={[0, 0.54, 0.015]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.115, 28, 28]} />
            {neutralPlaceholderMaterial}
          </mesh>
          {/* Minimal hair cap */}
          <mesh position={[0, 0.035, -0.012]} castShadow>
            <sphereGeometry args={[0.118, 28, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
            {shoeMaterial}
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function Avatar3D({
  modelUrl,
  targetYaw = 0,
  position = [1.15, -0.92, 0],
  scale = 1,
  reducedMotion = false,
}: Avatar3DProps) {
  const rootRef = useRef<THREE.Group>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointerOffset({ x: nx * 0.09, y: ny * 0.04 });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (!rootRef.current) return;
    const clampedDelta = Math.min(delta, 0.05);
    const desiredYaw = targetYaw + (reducedMotion ? 0 : pointerOffset.x);
    const desiredPitch = reducedMotion ? 0 : -pointerOffset.y * 0.35;

    if (reducedMotion) {
      rootRef.current.rotation.y = targetYaw;
      rootRef.current.rotation.x = 0;
    } else {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        desiredYaw,
        clampedDelta * 4.5
      );
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        desiredPitch,
        clampedDelta * 4.5
      );
    }
  });

  const placeholder = <StudioPlaceholderAvatar />;

  return (
    <group ref={rootRef} position={position} scale={scale}>
      {modelUrl ? (
        <ModelErrorBoundary fallback={placeholder}>
          <ExternalGlbModel url={modelUrl} />
        </ModelErrorBoundary>
      ) : (
        placeholder
      )}
    </group>
  );
}
