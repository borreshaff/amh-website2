"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/animations/useScrollProgress";

/**
 * Proof-of-concept transformation rig (Brief Section 33/34/9).
 *
 * Progress-driven staging:
 *   0.00–0.10  logo reveal (opacity/light sweep — see HTML/CSS overlay)
 *   0.10–0.25  isolate H
 *   0.25–0.40  extrude H
 *   0.40–0.55  abstract chassis
 *   0.55–0.75  camera detail assembly
 *   0.75–0.90  final camera, 3/4 orbit
 *   0.90–1.00  lens portal transition out
 *
 * This component currently renders a single extruded "H" placeholder mesh
 * whose scale, rotation, and material respond to scroll progress, standing
 * in for the full multi-asset assembly described in the foundation doc.
 * Swap in the chassis/camera GLB assets at the marked extension points.
 */
function TransformRig() {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useScrollProgress();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const progress = progressRef.current;

    // Stage 3 (extrude) → Stage 6 (final orbit): rotate + scale with scroll.
    mesh.rotation.y = progress * Math.PI * 1.5;
    mesh.rotation.x = progress * 0.3;

    const scale = 1 + progress * 0.6;
    mesh.scale.setScalar(scale);

    // Gold ↔ black-chrome material transition across the sequence.
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.color.lerpColors(
      new THREE.Color("#1a1a1a"),
      new THREE.Color("#c9a24e"),
      Math.min(progress * 1.4, 1)
    );
    material.metalness = 0.6 + progress * 0.3;
    material.roughness = 0.5 - progress * 0.3;
  });

  // Simple extruded "H" placeholder — replace with the modeled logo/chassis/
  // camera GLB assets and crossfade between them by progress range.
  const hShape = new THREE.Shape();
  hShape.moveTo(-1, -1);
  hShape.lineTo(-0.6, -1);
  hShape.lineTo(-0.6, -0.15);
  hShape.lineTo(0.6, -0.15);
  hShape.lineTo(0.6, -1);
  hShape.lineTo(1, -1);
  hShape.lineTo(1, 1);
  hShape.lineTo(0.6, 1);
  hShape.lineTo(0.6, 0.15);
  hShape.lineTo(-0.6, 0.15);
  hShape.lineTo(-0.6, 1);
  hShape.lineTo(-1, 1);
  hShape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2
  };

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <extrudeGeometry args={[hShape, extrudeSettings]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.5} />
    </mesh>
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
      <spotLight
        position={[3, 4, 5]}
        angle={0.3}
        penumbra={0.6}
        intensity={1.2}
        color="#c9a24e"
      />
      <pointLight position={[-4, -2, -3]} intensity={0.3} color="#ffffff" />
      <Environment preset="city" />
      <TransformRig />
    </Canvas>
  );
}
