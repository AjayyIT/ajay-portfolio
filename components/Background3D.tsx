'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Background3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire 3D group on every frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      {/* A beautiful, interactive starfield/particle effect */}
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Floating geometric shapes representing 'Cloud Nodes' */}
      <group ref={groupRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Float key={i} speed={1} rotationIntensity={1} floatIntensity={2}>
            <mesh
              position={[
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10 - 5
              ]}
            >
              <icosahedronGeometry args={[Math.random() * 0.5 + 0.2, 0]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} 
                wireframe={i % 3 === 0}
                transparent 
                opacity={0.6} 
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}