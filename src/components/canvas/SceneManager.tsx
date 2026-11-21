"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";

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
        keyLightIntensity: 1.6,
        rimLightColor: "#93C5FD",
      };
    case "/expertise":
      return {
        cameraPos: [-0.2, 0.15, 4.4],
        avatarPosDesktop: [1.45, -1.0, -0.2],
        avatarPosMobile: [0, -1.35, -0.6],
        avatarYaw: -0.22,
        keyLightIntensity: 1.5,
        rimLightColor: "#2563EB",
      };
    case "/projects":
      return {
        cameraPos: [0, 0.1, 4.6],
        avatarPosDesktop: [1.55, -1.05, -0.4],
        avatarPosMobile: [0, -1.4, -0.8],
        avatarYaw: -0.18,
        keyLightIntensity: 1.45,
        rimLightColor: "#60A5FA",
      };
    case "/experience":
      return {
        cameraPos: [-0.25, 0.2, 4.3],
        avatarPosDesktop: [1.35, -0.98, -0.2],
        avatarPosMobile: [0, -1.35, -0.6],
        avatarYaw: -0.12,
        keyLightIntensity: 1.55,
        rimLightColor: "#A7B0C0",
      };
    case "/contact":
      return {
        cameraPos: [0, 0.22, 3.8],
        avatarPosDesktop: [1.05, -0.9, 0.25],
        avatarPosMobile: [0, -1.2, -0.3],
        avatarYaw: 0,
        keyLightIntensity: 1.35,
        rimLightColor: "#3B82F6",
      };
    case "/":
    default:
      return {
        cameraPos: [0, 0.18, 4.0],
        avatarPosDesktop: [1.1, -0.92, 0.15],
        avatarPosMobile: [0, -1.22, -0.35],
        avatarYaw: -0.08,
        keyLightIntensity: 1.7,
        rimLightColor: "#2563EB",
      };
  }
}

function buildAvatarRig() {
  const root = new THREE.Group();
  root.name = "StudioPlaceholderFullBodyAvatar";

  const suitMat = new THREE.MeshStandardMaterial({
    color: "#151821",
    roughness: 0.68,
    metalness: 0.08,
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: "#E6EAF0",
    roughness: 0.55,
    metalness: 0.02,
  });
  const placeholderMat = new THREE.MeshStandardMaterial({
    color: "#8A93A3",
    roughness: 0.52,
    metalness: 0.06,
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: "#0B0D12",
    roughness: 0.35,
    metalness: 0.22,
  });

  const makeLeg = (x: number, z: number) => {
    const leg = new THREE.Group();
    leg.position.set(x, 0.48, z);

    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.082, 0.064, 0.44, 24),
      suitMat
    );
    upper.position.set(0, 0.22, 0);
    leg.add(upper);

    const lower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.064, 0.052, 0.44, 24),
      suitMat
    );
    lower.position.set(0, -0.02, 0.01);
    leg.add(lower);

    const shoe = new THREE.Mesh(
      new THREE.BoxGeometry(0.105, 0.065, 0.24),
      shoeMat
    );
    shoe.position.set(0, -0.26, 0.04);
    leg.add(shoe);

    return leg;
  };

  root.add(makeLeg(-0.11, 0));
  root.add(makeLeg(0.11, 0.03));

  const hips = new THREE.Mesh(
    new THREE.CylinderGeometry(0.155, 0.14, 0.14, 28),
    suitMat
  );
  hips.position.set(0, 0.94, 0);
  root.add(hips);

  const torso = new THREE.Group();
  torso.position.set(0, 1.12, 0);
  root.add(torso);

  const chest = new THREE.Mesh(
    new THREE.CylinderGeometry(0.205, 0.155, 0.38, 32),
    suitMat
  );
  chest.position.set(0, 0.16, 0);
  torso.add(chest);

  const shirtFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.24, 0.04),
    shirtMat
  );
  shirtFront.position.set(0, 0.22, 0.165);
  shirtFront.rotation.x = -0.12;
  torso.add(shirtFront);

  const makeArm = (side: -1 | 1) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.245, 0.31, 0);

    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.072, 20, 20),
      suitMat
    );
    shoulder.position.set(0, -0.02, 0);
    arm.add(shoulder);

    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.052, 0.3, 20),
      suitMat
    );
    upperArm.position.set(0, -0.18, 0.01);
    arm.add(upperArm);

    const forearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.042, 0.24, 20),
      shirtMat
    );
    forearm.position.set(0, -0.38, 0.02);
    arm.add(forearm);

    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.044, 18, 18),
      placeholderMat
    );
    hand.position.set(0, -0.53, 0.025);
    arm.add(hand);

    return arm;
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  torso.add(leftArm, rightArm);

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.058, 0.066, 0.11, 20),
    placeholderMat
  );
  neck.position.set(0, 0.39, 0.01);
  torso.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 0.54, 0.015);
  torso.add(head);

  const headMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 28, 28),
    placeholderMat
  );
  head.add(headMesh);

  const hairMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.118, 28, 24, 0, Math.PI * 2, 0, Math.PI * 0.58),
    shoeMat
  );
  hairMesh.position.set(0, 0.035, -0.012);
  head.add(hairMesh);

  return { root, torso, head, leftArm, rightArm };
}

export default function SceneManager() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<RouteSceneConfig>(getRouteSceneConfig(pathname));

  useEffect(() => {
    configRef.current = getRouteSceneConfig(pathname);
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      });
    } catch {
      return;
    }

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    let reducedMotion = mqMotion.matches;
    let isMobile = mqMobile.matches;

    const scene = new THREE.Scene();
    const initialCfg = configRef.current;

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      50
    );
    camera.position.set(...initialCfg.cameraPos);
    camera.lookAt(0, 0.05, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#CBD5E1", 0.55);
    const hemiLight = new THREE.HemisphereLight("#E2E8F0", "#0B0D12", 0.65);
    const keyLight = new THREE.DirectionalLight(
      "#FFFFFF",
      initialCfg.keyLightIntensity
    );
    keyLight.position.set(2.8, 4.2, 3.5);

    const rimLight = new THREE.DirectionalLight(initialCfg.rimLightColor, 1.1);
    rimLight.position.set(-2.5, 2.0, -2.6);

    const fillLight = new THREE.PointLight("#E2E8F0", 0.55);
    fillLight.position.set(0.4, 1.2, 2.2);

    scene.add(ambientLight, hemiLight, keyLight, rimLight, fillLight);

    const avatarRig = buildAvatarRig();
    const startPos = isMobile
      ? initialCfg.avatarPosMobile
      : initialCfg.avatarPosDesktop;
    avatarRig.root.position.set(...startPos);
    avatarRig.root.rotation.y = initialCfg.avatarYaw;
    scene.add(avatarRig.root);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.x = nx * 0.09;
      pointer.y = ny * 0.04;
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const syncMedia = () => {
      reducedMotion = mqMotion.matches;
      isMobile = mqMobile.matches;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    mqMotion.addEventListener("change", syncMedia);
    mqMobile.addEventListener("change", syncMedia);

    const clock = new THREE.Clock();
    const targetCamVec = new THREE.Vector3();
    const targetAvatarVec = new THREE.Vector3();
    let rafId = 0;

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const cfg = configRef.current;

      keyLight.intensity = cfg.keyLightIntensity;
      rimLight.color.set(cfg.rimLightColor);

      targetCamVec.set(...cfg.cameraPos);
      const desiredAvatarPos = isMobile
        ? cfg.avatarPosMobile
        : cfg.avatarPosDesktop;
      targetAvatarVec.set(...desiredAvatarPos);
      const desiredScale = isMobile ? 0.86 : 1.0;

      if (reducedMotion) {
        camera.position.copy(targetCamVec);
        avatarRig.root.position.copy(targetAvatarVec);
        avatarRig.root.scale.setScalar(desiredScale);
        avatarRig.root.rotation.set(0, cfg.avatarYaw, 0);
      } else {
        camera.position.lerp(targetCamVec, delta * 3.2);
        avatarRig.root.position.lerp(targetAvatarVec, delta * 4.0);
        const nextScale = THREE.MathUtils.lerp(
          avatarRig.root.scale.x,
          desiredScale,
          delta * 4.0
        );
        avatarRig.root.scale.setScalar(nextScale);

        const desiredYaw = cfg.avatarYaw + pointer.x;
        const desiredPitch = -pointer.y * 0.35;
        avatarRig.root.rotation.y = THREE.MathUtils.lerp(
          avatarRig.root.rotation.y,
          desiredYaw,
          delta * 4.5
        );
        avatarRig.root.rotation.x = THREE.MathUtils.lerp(
          avatarRig.root.rotation.x,
          desiredPitch,
          delta * 4.5
        );

        const breath = Math.sin(elapsed * 1.4) * 0.008;
        avatarRig.torso.position.y = 1.12 + breath;
        avatarRig.torso.rotation.z = Math.sin(elapsed * 0.7) * 0.008;
        avatarRig.head.rotation.y = Math.sin(elapsed * 0.55) * 0.04;
        avatarRig.head.rotation.x = Math.cos(elapsed * 0.9) * 0.015;
        avatarRig.leftArm.rotation.z = 0.06 + Math.sin(elapsed * 1.1) * 0.012;
        avatarRig.rightArm.rotation.z = -0.06 - Math.sin(elapsed * 1.1) * 0.012;
      }

      camera.lookAt(0, 0.05, 0);
      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      mqMotion.removeEventListener("change", syncMedia);
      mqMobile.removeEventListener("change", syncMedia);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-90"
    />
  );
}
