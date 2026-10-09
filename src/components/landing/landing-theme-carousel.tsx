"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { themeMotion, themeScenes } from "./landing-theme-config";
import { ThemeScene } from "./landing-theme-scene";
import { prepareTheme } from "./landing-theme-loading";
import { ThemeParallax } from "./landing-theme-parallax";

function useThemeCarousel() {
  const [state, setState] = useState({ active: 0, previous: -1 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busy = useRef(false);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const move = async (direction: number) => {
    if (busy.current || themeScenes.length < 2) return;
    const next =
      (state.active + direction + themeScenes.length) % themeScenes.length;
    busy.current = true;
    try {
      await prepareTheme(next);
    } catch {
      busy.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState({ active: next, previous: -1 });
      busy.current = false;
      return;
    }
    busy.current = true;
    setState({ active: next, previous: state.active });
    timer.current = setTimeout(() => {
      setState({ active: next, previous: -1 });
      busy.current = false;
    }, themeMotion.duration);
  };
  return { state, move };
}

export function ThemeCarousel() {
  const { state, move } = useThemeCarousel();
  const current = themeScenes[state.active];
  if (!current) return null;
  const previous = themeScenes[state.previous];
  const disabled = themeScenes.length < 2 || state.previous !== -1;
  return (
    <div
      className="landing-theme-carousel"
      role="region"
      aria-label="Custom brand themes"
      style={
        {
          backgroundColor: current.colour,
          "--theme-duration": `${themeMotion.duration}ms`,
        } as CSSProperties
      }
    >
      <ThemeParallax>
        {previous ? (
          <ThemeScene key={previous.id} scene={previous} phase="outgoing" />
        ) : null}
        <ThemeScene
          key={current.id}
          scene={current}
          phase={previous ? "incoming" : "settled"}
        />
      </ThemeParallax>
      <span className="sr-only" aria-live="polite">
        {current.description}
      </span>
      <ThemeControls disabled={disabled} move={move} />
    </div>
  );
}

function ThemeControls({
  disabled,
  move,
}: {
  disabled: boolean;
  move: (direction: number) => void;
}) {
  return (
    <div className="landing-theme-controls">
      <button
        type="button"
        aria-label="Previous theme"
        disabled={disabled}
        onClick={() => move(-1)}
      >
        <ArrowLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next theme"
        disabled={disabled}
        onClick={() => move(1)}
      >
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  );
}
