"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/animations/useScrollProgress";
import { remap } from "./logoShapes";

function AmhLogoMeshes() {
  const data = useLoader(SVGLoader, "/images/logo-white.svg");
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const progress = useScrollProgress();

  const { meshes, scale } = useMemo(() => {
    const rawShapes: THREE.Shape[] = [];
    data.paths.forEach((path) => {
      rawShapes.push(...SVGLoader.createShapes(path));
    });

    // Filter out tiny stray shapes (registration marks, cut guides, or
    // duplicate artifacts sometimes left in exported SVGs) by comparing
    // each shape's bounding-box area against the largest shape found.
    // Real letter strokes are always a substantial fraction of the
    // biggest shape; artifacts are orders of magnitude smaller.
    const areas = rawShapes.map((shape) => {
      const box = new THREE.Box2().setFromPoints(shape.getPoints());
      const size = new THREE.Vector2();
      box.getSize(size);
      return size.x * size.y;
    });
    const maxArea = Math.max(...areas, 0.0001);
    const allShapes = rawShapes.filter((_, i) => (areas[i] ?? 0) > maxArea * 0.01);

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
      let geometry: THREE.BufferGeometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: false,
        curveSegments: 12
      });
      geometry = mergeVertices(geometry, 1e-4);
      geometry.computeVertexNormals();
      geometry.computeBoundingBox();
      const bb = geometry.boundingBox;
      if (bb) {
        minX = Math.min(minX, bb.min.x);
        maxX = Math.max(maxX, bb.max.x);
        minY = Math.min(minY, bb.min.y);
        maxY = Math.max(maxY, bb.max.y);
      }
      const material = new THREE.MeshStandardMaterial({
        color: "#3a3a3a",
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
      });
      built.push(new THREE.Mesh(geometry, material));
    });

    const width = maxX - minX || 1;
    const height = maxY - minY || 1;
    const s = 4.6 / Math.max(width, height);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = depth / 2;

    built.forEach((mesh) => {
      mesh.position.set(-cx, -cy, -cz);
    });

    materialsRef.current = built.map((m) => m.material as THREE.MeshStandardMaterial);
    return { meshes: built, scale: s };
  }, [data]);

  useFrame(({ camera, clock }) => {
    const group = groupRef.current;
    if (!group) return;
    if (startTimeRef.current === null) startTimeRef.current = clock.getElapsedTime();
    const fadeIn = Math.min((clock.getElapsedTime() - startTimeRef.current) / 1.2, 1);
    const p = progress.current;

    const settle = remap(p, 0, 0.08);
    group.rotation.y = remap(p, 0.15, 1) * Math.PI * 1.3;
    group.rotation.x = remap(p, 0.15, 1) * 0.2;
    group.scale.setScalar(1 + settle * 0.04);

    const fadeOut = 1 - remap(p, 0.28, 0.45);
    const colorT = remap(p, 0, 0.28);
    materialsRef.current.forEach((material) => {
      material.opacity = fadeIn * fadeOut;
      material.color.lerpColors(new THREE.Color("#3a3a3a"), new THREE.Color("#c4c4cc"), Math.min(colorT * 1.2, 1));
      material.metalness = 0.5 + colorT * 0.35;
      material.roughness = 0.4 - colorT * 0.3;
    });

    camera.position.z = 5 - remap(p, 0, 0.3) * 0.6;
  });

  return (
    <group ref={groupRef} position={[-0.12, 0.22, 0]}>
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
