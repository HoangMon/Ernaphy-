
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const LightOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.8}
        distort={0.3}
        speed={1.5}
        roughness={0.2}
      />
    </Sphere>
  );
};

export const PhotographyHeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#D4AF37" intensity={1} />
        
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
          <LightOrb position={[0, 0, 0]} color="#ffffff" scale={1.5} />
        </Float>
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
           <LightOrb position={[-4, 2, -3]} color="#D4AF37" scale={0.4} />
           <LightOrb position={[4, -2, -4]} color="#e5e7eb" scale={0.6} />
           <LightOrb position={[2, 3, -5]} color="#D4AF37" scale={0.3} />
        </Float>

        <Environment preset="studio" />
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const LensScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#D4AF37" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.6} floatIntensity={0.4} speed={1.5}>
          <group>
            {/* Abstract Lens/Aperture Representation */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.05, 16, 100]} />
              <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
              <torusGeometry args={[1.4, 0.02, 16, 100]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </mesh>
            <Sphere args={[1.2, 64, 64]}>
              <meshPhysicalMaterial 
                color="#ffffff" 
                transmission={1} 
                thickness={0.5} 
                roughness={0} 
                ior={1.5}
                clearcoat={1}
              />
            </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
