"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { themeMotion } from "./landing-theme-config";

export function ThemeParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia(themeMotion.narrowViewport);
    let frame = 0;
    let current = 0;
    const update = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const progress = reduced.matches
        ? 0
        : Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight - top) / (window.innerHeight + height),
            ),
          ) - 0.5;
      const scale = narrow.matches ? themeMotion.mobileTravelScale : 1;
      const target = Math.max(-0.22, Math.min(0.22, progress)) * scale;
      current = reduced.matches ? 0 : current + (target - current) * 0.09;
      element.style.setProperty("--theme-progress", String(current));
      if (Math.abs(target - current) > 0.0005)
        frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div ref={ref} className="landing-theme-parallax">
      {children}
    </div>
  );
}
