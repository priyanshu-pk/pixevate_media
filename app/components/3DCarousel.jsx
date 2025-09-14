'use client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Brand logo component with 3D card effect
function BrandCard({ position, rotation, brandIndex, onHover, isHovered, isAnyHovered }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Brand names - replace with actual brand logos
  const brands = [
    'Nike', 'Apple', 'Google', 'Microsoft', 'Tesla', 'Amazon', 'Meta', 'Netflix'
  ];
  
  // Animation for hover effects
  useFrame(() => {
    if (meshRef.current) {
      let targetScale = 1;
      let targetRotation = 0;
      
      if (hovered) {
        targetScale = 1.15;
        targetRotation = 0.1;
      } else if (isAnyHovered) {
        targetScale = 0.9;
      }
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotation, 0.1);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
      rotation={rotation}
    >
      <group ref={meshRef}>
        {/* Main card */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        >
          {/* Card background with gradient effect */}
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial 
            color="#ffffff"
            metalness={0.1}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
          
          {/* Glowing border effect */}
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[3.1, 2.1, 0.02]} />
            <meshStandardMaterial 
              color="#003cff"
              emissive="#003cff"
              emissiveIntensity={hovered ? 0.5 : 0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </mesh>
        
        {/* Brand name */}
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.4}
          color="#003cff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {brands[brandIndex % brands.length]}
        </Text>
        
        {/* Subtle shadow */}
        <mesh position={[0, -1.2, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.5, 0.5]} />
          <meshBasicMaterial color="#000000" opacity={0.1} transparent />
        </mesh>
      </group>
    </Float>
  );
}

// Main carousel component
function BrandCarousel({ isPaused }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Carousel configuration
  const itemCount = 8;
  const radius = 12;
  const rotationSpeed = 0.003;
  
  // Continuous rotation animation
  useFrame(() => {
    if (groupRef.current && !isPaused) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  // Generate carousel items in a spiral pattern
  const items = Array.from({ length: itemCount }, (_, index) => {
    const angle = (index / itemCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 2) * 2; // Add some vertical variation
    
    return {
      position: [x, y, z],
      rotation: [0, -angle, 0],
      brandIndex: index
    };
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <BrandCard
          key={index}
          position={item.position}
          rotation={item.rotation}
          brandIndex={item.brandIndex}
          onHover={setHovered}
          isHovered={hovered}
          isAnyHovered={hovered}
        />
      ))}
    </group>
  );
}

// Main component
export default function App() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full h-[400px] relative">
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,60,255,0.05) 0%, rgba(0,3,31,0.1) 50%, rgba(0,60,255,0.05) 100%)',
          border: '1px solid rgba(0,60,255,0.15)',
          backdropFilter: 'blur(10px)'
        }}
      />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 20], fov: 50 }}
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        style={{ background: 'transparent' }}
        shadows
      >
        {/* Professional lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#003cff" />
        <pointLight position={[10, -10, 10]} intensity={0.3} color="#3388ff" />
        
        {/* Environment for realistic reflections */}
        <Environment preset="city" />
        
        {/* Carousel */}
        <BrandCarousel isPaused={isPaused} />
        
        {/* Ground plane for shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#000000" opacity={0.1} transparent />
        </mesh>
      </Canvas>
      
      {/* Modern overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-white/40 text-xs font-medium tracking-wider uppercase">
            Trusted by Industry Leaders
          </p>
        </div>
      </div>
    </div>
  );
}
