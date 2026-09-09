"use client";

import React, { useEffect, useRef, useState } from "react";

// Dynamically import heavy react-three libraries at runtime on the client
// to avoid bundler/resolution issues and duplicate React internals.

function SceneModel({ libs, modelPath = "/models/scene.glb", scrollRef, pointerRef }: any) {
  const { useGLTF, useFrame } = libs;
  const group = useRef<any>();
  const accentGroup = useRef<any>();
  let gltf: any | null = null;
  try {
    gltf = useGLTF(modelPath);
  } catch (e) {
    gltf = null;
  }

  useFrame(() => {
    if (!group.current) return;
    const t = scrollRef?.current ?? 0;
    const pointerX = pointerRef?.current?.x ?? 0;
    const pointerY = pointerRef?.current?.y ?? 0;
    const targetRotY = t * Math.PI * 4 - Math.PI;
    const targetRotX = Math.sin(t * Math.PI * 2) * 0.18 + pointerY * 0.22;
    const targetPointerRotY = targetRotY + pointerX * 0.32;
    const targetX = pointerX * 0.34 + Math.sin(t * Math.PI * 3) * 0.12;
    const targetZ = pointerY * 0.22 + Math.cos(t * Math.PI * 2) * 0.1;
    group.current.rotation.y += (targetPointerRotY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.08;
    group.current.position.x += (targetX - group.current.position.x) * 0.08;
    group.current.position.z += (targetZ - group.current.position.z) * 0.08;
    const targetY = Math.sin(t * Math.PI * 2) * 0.35;
    group.current.position.y += (targetY - group.current.position.y) * 0.08;
    if (accentGroup.current) {
      accentGroup.current.rotation.x += (pointerY * -0.28 - accentGroup.current.rotation.x) * 0.06;
      accentGroup.current.rotation.z += (pointerX * 0.24 - accentGroup.current.rotation.z) * 0.06;
      accentGroup.current.position.y = Math.sin(t * Math.PI * 4) * 0.08;
    }
    const targetScale = 0.92 + Math.sin(t * Math.PI) * 0.2;
    // lerp scale
    const cs = group.current.scale;
    cs.x += (targetScale - cs.x) * 0.08;
    cs.y += (targetScale - cs.y) * 0.08;
    cs.z += (targetScale - cs.z) * 0.08;
  });

  return (
    <group ref={group} dispose={null}>
      {gltf ? (
        <primitive object={gltf.scene} scale={1} />
      ) : (
        <group ref={accentGroup}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.05, 0.055, 16, 96]} />
            <meshStandardMaterial color="#9affb2" emissive="#147a33" emissiveIntensity={1.4} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.78, 0.045, 16, 96]} />
            <meshStandardMaterial color="#ffffff" emissive="#147a33" emissiveIntensity={0.7} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.66, 1]} />
            <meshPhysicalMaterial color="#86ff9b" transmission={0.78} transparent opacity={0.42} roughness={0.08} metalness={0.15} thickness={0.8} />
          </mesh>
          <mesh position={[1.24, 0.18, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#c6ffd0" />
          </mesh>
          <mesh position={[-1.1, -0.2, 0.2]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function ModelSceneClient({ modelPath }: { modelPath?: string }) {
  const [libs, setLibs] = useState<any | null>(null);
  const [ThreeComponents, setThreeComponents] = useState<any | null>(null);
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX / window.innerWidth - 0.5;
      pointerRef.current.y = event.clientY / window.innerHeight - 0.5;
    };
    const onPointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("blur", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("@react-three/fiber"), import("@react-three/drei")])
      .then(([fiber, drei]) => {
        if (!mounted) return;
        setLibs({ useGLTF: drei.useGLTF, useFrame: fiber.useFrame });
        setThreeComponents({
          Canvas: fiber.Canvas,
          OrbitControls: drei.OrbitControls,
        });
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!libs) return;
    const { getGsap, prefersReducedMotion } = require("@/lib/gsap");
    const { gsap, ScrollTrigger } = getGsap();
    if (prefersReducedMotion()) {
      scrollRef.current = 0.5;
      return;
    }

    const triggerEl = document.body;
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate(self: { progress: number }) {
        scrollRef.current = self.progress;
      },
    });

    return () => {
      try {
        st.kill();
      } catch (e) {}
    };
  }, [libs]);

  if (!libs || !ThreeComponents) return null;

  const { Canvas, OrbitControls } = ThreeComponents;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[0, 1.5, 2]} color="#7dff9a" intensity={2.2} distance={5} />
        <React.Suspense fallback={null}>
          <SceneModel libs={libs} modelPath={modelPath} scrollRef={scrollRef} pointerRef={pointerRef} />
        </React.Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
