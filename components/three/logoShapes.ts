import * as THREE from "three";

/**
 * Placeholder vector approximations of the AMH wordmark letters.
 * These stand in for the real logo until a licensed SVG is supplied,
 * at which point they can be swapped for SVGLoader-extruded paths
 * without changing any of the scene logic below.
 */

export function createLetterAShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.55, -0.9);
  s.lineTo(-0.15, 0.9);
  s.lineTo(0.15, 0.9);
  s.lineTo(0.55, -0.9);
  s.lineTo(0.3, -0.9);
  s.lineTo(0.18, -0.45);
  s.lineTo(-0.18, -0.45);
  s.lineTo(-0.3, -0.9);
  s.closePath();

  const hole = new THREE.Path();
  hole.moveTo(-0.12, -0.15);
  hole.lineTo(0, 0.55);
  hole.lineTo(0.12, -0.15);
  hole.closePath();
  s.holes.push(hole);

  return s;
}

export function createLetterMShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.7, -0.9);
  s.lineTo(-0.7, 0.9);
  s.lineTo(-0.35, 0.9);
  s.lineTo(0, 0.1);
  s.lineTo(0.35, 0.9);
  s.lineTo(0.7, 0.9);
  s.lineTo(0.7, -0.9);
  s.lineTo(0.4, -0.9);
  s.lineTo(0.4, 0.35);
  s.lineTo(0.12, -0.25);
  s.lineTo(-0.12, -0.25);
  s.lineTo(-0.4, 0.35);
  s.lineTo(-0.4, -0.9);
  s.closePath();
  return s;
}

export function createLetterHShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-1, -1);
  s.lineTo(-0.6, -1);
  s.lineTo(-0.6, -0.15);
  s.lineTo(0.6, -0.15);
  s.lineTo(0.6, -1);
  s.lineTo(1, -1);
  s.lineTo(1, 1);
  s.lineTo(0.6, 1);
  s.lineTo(0.6, 0.15);
  s.lineTo(-0.6, 0.15);
  s.lineTo(-0.6, 1);
  s.lineTo(-1, 1);
  s.closePath();
  return s;
}

export const LETTER_EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 2
};

export function remap(value: number, inMin: number, inMax: number): number {
  if (inMax === inMin) return value >= inMax ? 1 : 0;
  const t = (value - inMin) / (inMax - inMin);
  return Math.min(1, Math.max(0, t));
}
