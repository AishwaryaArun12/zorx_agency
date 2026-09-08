"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function SceneModel({ modelPath = "/models/scene.glb" }: { modelPath?: string }) {
  const group = useRef<any>();
  let gltf: any | null = null;
  try {
    gltf = useGLTF(modelPath);
  } catch (e) {
    gltf = null;
  }

  const scroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = scroll.current;
    // rotate based on scroll (smooth)
    group.current.rotation.y += (t * Math.PI * 2 - group.current.rotation.y) * 0.08;
    group.current.position.y += ((t - 0.5) * -2 - group.current.position.y) * 0.08;
  });

  return (
    <group ref={group} dispose={null}>
      {gltf ? (
        <primitive object={gltf.scene} scale={1} />
      ) : (
        // fallback: simple torus if no model provided
        <mesh>
          <torusGeometry args={[1, 0.4, 32, 64]} />
          <meshStandardMaterial color="#00aaff" metalness={0.6} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
}

export default function ModelScene({ modelPath }: { modelPath?: string }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <SceneModel modelPath={modelPath} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
