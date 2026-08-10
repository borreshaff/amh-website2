"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/animations/useScrollProgress";
import { remap } from "./logoShapes";

function AmhLogoMeshes() {
  const data = useLoader(SVGLoader, "/images/logo-white.svg");
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const progress = useScrollProgress();

  const { meshes, scale } = useMemo(() => {
    const allShapes: THREE.Shape[] = [];
    data.paths.forEach((path) => {
      allShapes.push(...SVGLoader.createShapes(path));
    });

    let fMinY = Infinity;
    let fMaxY = -Infinity;
    allShapes.forEach((shape) => {
      shape.getPoints().forEach((pt) => {
        fMinY = Math.min(fMinY, pt.y);
        fMaxY = Math.max(fMaxY, pt.y);
      });
    });
    const flatHeight = fMaxY - fMinY || 1;
    const depth = flatHeight * 0.16;

    const built: THREE.Mesh[] = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    allShapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: depth * 0.15,
        bevelSize: depth * 0.15,
        bevelSegments: 2
      });
      geometry.computeBoundingBox();
      const bb = geometry.boundingBox;
      if (bb) {
        minX = Math.min(minX, bb.min.x);
        maxX = Math.max(maxX, bb.max.x);
        minY = Math.min(minY, bb.min.y);
        maxY = Math.max(maxY, bb.max.y);
      }
      const material = new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        metalness: 0.6,
        roughness: 0.5,
        transparent: true,
        opacity: 1
      });
      built.push(new THREE.Mesh(geometry, material));
    });

    const width = maxX - minX || 1;
    const height = maxY - minY || 1;
    const s = 2.6 / Math.max(width, height);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = depth / 2;

    built.forEach((mesh) => {
      mesh.position.set(-cx, -cy, -cz);
    });

    materialsRef.current = built.map((m) => m.material as THREE.MeshStandardMaterial);
    return { meshes: built, scale: s };
  }, [data]);

  useFrame(({ camera }) => {
    const group = groupRef.current;
    if (!group) return;
    const p = progress.current;

    const settle = remap(p, 0, 0.08);
    group.rotation.y = remap(p, 0.15, 1) * Math.PI * 1.3;
    group.rotation.x = remap(p, 0.15, 1) * 0.2;
    group.scale.setScalar(1 + settle * 0.04);

    const fadeOut = 1 - remap(p, 0.28, 0.45);
    const colorT = remap(p, 0, 0.28);
    materialsRef.current.forEach((material) => {
      material.opacity = fadeOut;
      material.color.lerpColors(new THREE.Color("#1a1a1a"), new THREE.Color("#c9a24e"), Math.min(colorT * 1.2, 1));
      material.metalness = 0.55 + colorT * 0.35;
      material.roughness = 0.55 - colorT * 0.3;
    });

    camera.position.z = 5 - remap(p, 0, 0.3) * 0.6;
  });

  return (
    <group ref={groupRef}>
      <group scale={[scale, -scale, scale]}>
        {meshes.map((mesh, i) => (
          <primitive key={i} object={mesh} />
        ))}
      </group>
    </group>
  );
}

export function AmhLogo3D() {
  return (
    <Suspense fallback={null}>
      <AmhLogoMeshes />
    </Suspense>
  );
}
