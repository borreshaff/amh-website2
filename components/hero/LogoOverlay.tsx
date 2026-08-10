"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Renders the real AMH logo as flat, accurate image content on load
 * (per brief: "the AMH logo must appear accurately on initial load" and
 * "must not distort or redesign the official logo"). Fades out as the
 * WebGL M-to-camera transform takes over.
 */
export function LogoOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: "#hero-transform",
      start: "top top",
      end: "+=25%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(ref.current, { opacity: 1 - self.progress });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
    >
      <img
        src="/images/logo-white.svg"
        alt="AMH Group"
        className="w-[240px] md:w-[420px]"
      />
    </div>
  );
}
