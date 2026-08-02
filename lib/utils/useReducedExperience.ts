"use client";

import { useEffect, useState } from "react";

/**
 * Determines whether the visitor should receive the lightweight fallback
 * experience instead of the full WebGL hero sequence.
 *
 * Triggers on: prefers-reduced-motion, low core count, save-data, or a
 * slow effective connection type.
 */
export function useReducedExperience(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      hardwareConcurrency?: number;
    };

    const lowPower =
      (nav.hardwareConcurrency ?? 8) <= 2 ||
      nav.connection?.saveData === true ||
      ["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "");

    const update = () => setReduced(motionQuery.matches || lowPower);
    update();

    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}
