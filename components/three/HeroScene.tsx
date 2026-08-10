"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/animations/useScrollProgress";
import {
  createLetterAShape,
  createLetterMShape,
  createLetterHShape,
  LETTER_EXTRUDE_SETTINGS,
  remap
} from "./logoShapes";

/**
 * Stage map, driven by scroll progress (0 to 1):
 *
 * 0.00-0.10  Full AMH logo settles into view.
 * 0.10-0.25  A and H fade and recede. M becomes the focal point.
 * 0.25-0.45  M extrudes further, rotates, shifts from charcoal to gold.
 * 0.45-0.60  M crossfades into an abstract camera chassis.
 * 0.60-0.82  Chassis crossfades into the assembled camera (body, lens,
 *            grip, top handle, screen, vents).
 * 0.82-1.00  Camera settles into a three-quarter view and the lens
 *            brightens, standing in for the lens-portal transition.
 */

function opacityFor(materials: THREE.Material[], value: number) {
  for (const material of materials) {
    if ("opacity" in material) {
      (material as THREE.MeshStandardMaterial).opacity = value;
    }
  }
}

function setColorMetal(material: THREE.MeshStandardMaterial, t: number) {
  material.color.lerpColors(new THREE.Color("#1a1a1a"), new THREE.Color("#c9a24e"), Math.min(t * 1.3, 1));
  material.metalness = 0.55 + t * 0.35;
  material.roughness = 0.55 - t * 0.3;
}

function LogoLetterA() {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const p = progress.current;
    const fade = 1 - remap(p, 0.1, 0.25);
    mesh.position.x = -1.6 - (1 - fade) * 0.6;
    opacityFor([mesh.material as THREE.Material], fade);
  });

  return (
    <mesh ref={ref} position={[-1.6, 0, 0]}>
      <extrudeGeometry args={[createLetterAShape(), LETTER_EXTRUDE_SETTINGS]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.5} transparent opacity={1} />
    </mesh>
  );
}

function LogoLetterH() {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const p = progress.current;
    const fade = 1 - remap(p, 0.1, 0.25);
    mesh.position.x = 1.6 + (1 - fade) * 0.6;
    opacityFor([mesh.material as THREE.Material], fade);
  });

  return (
    <mesh ref={ref} position={[1.6, 0, 0]} scale={0.85}>
      <extrudeGeometry args={[createLetterHShape(), LETTER_EXTRUDE_SETTINGS]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.5} transparent opacity={1} />
    </mesh>
  );
}

function MorphGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const letterMRef = useRef<THREE.Mesh>(null);
  const chassisRef = useRef<THREE.Mesh>(null);
  const cameraGroupRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  useFrame(({ camera }) => {
    const p = progress.current;
    const group = groupRef.current;
    if (!group) return;

    const spin = remap(p, 0.1, 1);
    group.rotation.y = spin * Math.PI * 1.7;
    group.rotation.x = spin * 0.25;

    const settle = remap(p, 0, 0.1);
    group.scale.setScalar(0.9 + settle * 0.1 + remap(p, 0.25, 0.45) * 0.15);

    // Letter M: visible through the early morph, fades as the chassis appears.
    const mOpacity = 1 - remap(p, 0.45, 0.6);
    if (letterMRef.current) {
      opacityFor([letterMRef.current.material as THREE.Material], mOpacity);
      setColorMetal(letterMRef.current.material as THREE.MeshStandardMaterial, remap(p, 0.25, 0.45));
    }

    // Abstract chassis: crossfades in, then out as the camera assembles.
    const chassisIn = remap(p, 0.45, 0.6);
    const chassisOut = 1 - remap(p, 0.6, 0.82);
    const chassisOpacity = chassisIn * chassisOut;
    if (chassisRef.current) {
      opacityFor([chassisRef.current.material as THREE.Material], chassisOpacity);
      setColorMetal(chassisRef.current.material as THREE.MeshStandardMaterial, 0.7);
    }

    // Assembled camera: crossfades in from the chassis and holds.
    const cameraOpacity = remap(p, 0.6, 0.82);
    if (cameraGroupRef.current) {
      cameraGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          opacityFor([child.material as THREE.Material], cameraOpacity);
        }
      });
    }

    // Lens brightens in the final stretch, standing in for the portal reveal.
    const lensGlow = remap(p, 0.82, 1);
    if (lensRef.current) {
      const material = lensRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = lensGlow * 1.5;
      lensRef.current.scale.setScalar(1 + lensGlow * 0.4);
    }

    // Slow cinematic dolly toward the subject as the sequence progresses.
    camera.position.z = 5 - remap(p, 0, 1) * 1.6;
    camera.position.y = remap(p, 0.6, 1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={letterMRef}>
        <extrudeGeometry args={[createLetterMShape(), LETTER_EXTRUDE_SETTINGS]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.5} transparent opacity={1} />
      </mesh>

      <mesh ref={chassisRef}>
        <boxGeometry args={[1.1, 0.75, 0.55]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} transparent opacity={0} />
      </mesh>

      <group ref={cameraGroupRef}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[1.15, 0.7, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.35} transparent opacity={0} />
        </mesh>

        {/* Lens mount collar */}
        <mesh position={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.28, 0.3, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.3} transparent opacity={0} />
        </mesh>

        {/* Lens barrel */}
        <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.5, 24]} />
          <meshStandardMaterial color="#141414" metalness={0.75} roughness={0.25} transparent opacity={0} />
        </mesh>

        {/* Lens glass, brightens in the final stage */}
        <mesh ref={lensRef} position={[0, 0, 0.91]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.03, 24]} />
          <meshStandardMaterial
            color="#c9a24e"
            emissive="#c9a24e"
            emissiveIntensity={0}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Top handle */}
        <mesh position={[0, 0.5, -0.05]}>
          <boxGeometry args={[0.7, 0.08, 0.28]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} transparent opacity={0} />
        </mesh>

        {/* Grip */}
        <mesh position={[-0.62, -0.1, 0.05]}>
          <boxGeometry args={[0.18, 0.55, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} transparent opacity={0} />
        </mesh>

        {/* Screen panel */}
        <mesh position={[0.45, -0.05, -0.22]}>
          <boxGeometry args={[0.35, 0.4, 0.03]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} transparent opacity={0} />
        </mesh>

        {/* Control buttons */}
        {[-0.15, 0, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.38, 0.15]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
            <meshStandardMaterial color="#c9a24e" metalness={0.8} roughness={0.3} transparent opacity={0} />
          </mesh>
        ))}

        {/* Cooling vents */}
        {[-0.1, 0, 0.1].map((y, i) => (
          <mesh key={i} position={[0.58, y, -0.1]}>
            <boxGeometry args={[0.02, 0.04, 0.25]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.5} roughness={0.6} transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <spotLight position={[3, 4, 5]} angle={0.3} penumbra={0.6} intensity={1.2} color="#c9a24e" />
      <pointLight position={[-4, -2, -3]} intensity={0.3} color="#ffffff" />
      <Environment preset="city" />

      <LogoLetterA />
      <MorphGroup />
      <LogoLetterH />
    </Canvas>
  );
}
