"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/* ── Animated ring orbiting the prism ── */
function OrbitalRing({ radius = 3, speed = 0.5, color = "#6C5CE7" }: { radius?: number; speed?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} />
    </mesh>
  );
}

/* ── Floating data particles ── */
function DataParticles({ count = 80 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
      points.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#6C5CE7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── The central Lucent Prism ── */
function LucentPrism() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#1a1a2e"
          emissive="#6C5CE7"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ── Inner glowing core ── */
function GlowCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#6C5CE7"
        emissive="#A896FF"
        emissiveIntensity={3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ── Main exported canvas ── */
export function Hero3D() {
  return (
    <div className="absolute inset-0 h-screen w-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#09090b"]} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#09090b", 8, 20]} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#6C5CE7" />
        <directionalLight position={[-5, -3, -5]} intensity={1} color="#3B82F6" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#A896FF" distance={8} decay={2} />
        
        <Suspense fallback={null}>
          <LucentPrism />
          <GlowCore />
          
          {/* Three orbital rings at different angles */}
          <OrbitalRing radius={3.2} speed={0.4} color="#6C5CE7" />
          <group rotation={[Math.PI / 3, 0, Math.PI / 6]}>
            <OrbitalRing radius={3.8} speed={0.3} color="#3B82F6" />
          </group>
          <group rotation={[0, Math.PI / 4, Math.PI / 3]}>
            <OrbitalRing radius={4.2} speed={0.2} color="#A896FF" />
          </group>
          
          <DataParticles count={120} />
          <Sparkles count={80} scale={12} size={1.5} speed={0.3} opacity={0.15} color="#6C5CE7" />
        </Suspense>
        
        {/* Allow slow drag to peek around the scene */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
