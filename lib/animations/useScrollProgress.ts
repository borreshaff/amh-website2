"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

// Shared across every consumer so only ONE pinned ScrollTrigger is ever
// created for #hero-transform, no matter how many components (logo,
// camera morph, etc.) read scroll progress. Multiple pins on the same
// element was causing the scroll-position glitch.
const sharedProgress = { current: 0 };
let sharedTrigger: ScrollTrigger | null = null;
let refCount = 0;

export function useScrollProgress() {
  const localRef = useRef(sharedProgress);

  useEffect(() => {
    refCount += 1;

    if (!sharedTrigger) {
      window.scrollTo(0, 0);
      sharedTrigger = ScrollTrigger.create({
        trigger: "#hero-transform",
        start: "top top",
        end: "+=280%",
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          sharedProgress.current = self.progress;
        }
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timeout = setTimeout(refresh, 1000);

    return () => {
      refCount -= 1;
      window.removeEventListener("load", refresh);
      clearTimeout(timeout);
      if (refCount === 0 && sharedTrigger) {
        sharedTrigger.kill();
        sharedTrigger = null;
      }
    };
  }, []);

  return localRef.current;
}
