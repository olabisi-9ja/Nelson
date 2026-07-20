"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PresentationControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface ConfiguratorProps {
  leatherColor: string;
  soleColor: string;
}

// A placeholder 3D component representing the shoe
function PlaceholderShoe({ leatherColor, soleColor }: ConfiguratorProps) {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef}>
      {/* Upper (Placeholder shape) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.8, 2.5]} />
        <meshStandardMaterial 
          color={leatherColor} 
          roughness={0.4} 
          metalness={0.1} 
        />
      </mesh>
      
      {/* Sole (Placeholder shape) */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.1, 2.6]} />
        <meshStandardMaterial 
          color={soleColor} 
          roughness={0.9} 
        />
      </mesh>
    </group>
  );
}

export default function ShoeConfigurator({ leatherColor, soleColor }: ConfiguratorProps) {
  return (
    <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 4], fov: 35 }}>
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
              <PlaceholderShoe leatherColor={leatherColor} soleColor={soleColor} />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
