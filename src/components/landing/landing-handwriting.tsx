"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import scanHandwriting from "./landing-scan-handwriting.json";
import "./landing-handwriting.css";
type HandwritingData = typeof scanHandwriting;
type WritingPhase = "static" | "waiting" | "writing";

function useWritingEntrance() {
  const ref = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<WritingPhase>("static");
  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window))
      return;
    setPhase("waiting");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPhase("writing");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    const finish = () => {
      if (reduced.matches) {
        observer.disconnect();
        setPhase("static");
      }
    };
    reduced.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", finish);
    };
  }, []);
  return { ref, phase };
}

function strokeStyle(
  delay: number,
  duration: number,
  artwork?: HandwritingData,
): CSSProperties {
  return {
    "--pen-delay": `${delay}s`,
    "--pen-duration": `${duration}s`,
    "--ink-complete-delay": artwork
      ? `${Math.max(...artwork.strokes.map((stroke) => stroke.delay + stroke.duration))}s`
      : undefined,
  } as CSSProperties;
}

export function Handwriting({
  artwork,
  className,
  decoration = "underline-arrow",
}: {
  artwork: HandwritingData;
  className?: string;
  decoration?: "underline" | "underline-arrow";
}) {
  const maskId = useId();
  const { ref, phase } = useWritingEntrance();
  return (
    <svg
      ref={ref}
      className={["landing-handwriting", className].filter(Boolean).join(" ")}
      viewBox={artwork.viewBox}
      data-phase={phase}
      style={strokeStyle(0, 0, artwork)}
      role="img"
      aria-label={artwork.label}
    >
      <title>{artwork.label}</title>
      <WritingMask artwork={artwork} maskId={maskId} />
      <path d={artwork.outline} fill="currentColor" mask={`url(#${maskId})`} />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="handwriting-pen"
          d={artwork.underline}
          pathLength="1"
          style={strokeStyle(artwork.underlineDelay, 0.4)}
        />
        {decoration === "underline-arrow" && (
          <path
            className="handwriting-pen handwriting-arrow"
            d={artwork.arrow}
            pathLength="1"
            style={strokeStyle(artwork.arrowDelay, 0.45)}
          />
        )}
      </g>
    </svg>
  );
}

function WritingMask({
  artwork,
  maskId,
}: {
  artwork: HandwritingData;
  maskId: string;
}) {
  return (
    <defs>
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={artwork.viewBox.split(" ")[2]}
        height="245"
      >
        <rect
          className="handwriting-complete-mask"
          width={artwork.viewBox.split(" ")[2]}
          height="245"
          fill="white"
        />
        <g
          fill="none"
          stroke="white"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {artwork.strokes.map((stroke, index) => (
            <path
              key={index}
              className="handwriting-pen"
              d={stroke.d}
              pathLength="1"
              style={strokeStyle(stroke.delay, stroke.duration)}
            />
          ))}
        </g>
      </mask>
    </defs>
  );
}
