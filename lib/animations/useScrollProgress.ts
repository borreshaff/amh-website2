"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/**
 * Drives a ref-backed 0→1 progress value across the pinned #hero-transform
 * section. Read inside useFrame() rather than via React state to avoid
 * re-render cost on every scroll tick.
 */
export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero-transform",
      start: "top top",
      end: "+=280%", // ~280vh desktop; shortened via media query for mobile
      scrub: 0.6,
      pin: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      }
    });

    return () => trigger.kill();
  }, []);

  // Returned as a ref (not state) so consumers can read .current inside
  // useFrame() every tick without triggering React re-renders on scroll.
  return progressRef;
}
