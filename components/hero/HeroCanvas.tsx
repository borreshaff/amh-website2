"use client";

import dynamic from "next/dynamic";
import { useReducedExperience } from "@/lib/utils/useReducedExperience";
import { HeroFallback } from "./HeroFallback";

// Loaded only on the client, after first paint, keeping Layer 1 (HTML)
// interactive immediately per the performance requirements.
const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />
});

export function HeroCanvas() {
  const reduced = useReducedExperience();

  if (reduced) {
    return <HeroFallback />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
