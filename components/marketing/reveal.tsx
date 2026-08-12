"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /**
   * "fade" rises and fades in. "curtain" wipes an overlay upward to unmask
   * media — used instead of clip-path so the browser still lazy-loads images
   * (Chromium skips lazy images whose visible area is zero).
   */
  variant?: "fade" | "curtain";
  delay?: number;
  className?: string;
};

/** Adds the `on` class when the element enters the viewport. */
export function Reveal({ children, variant = "fade", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("on");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "curtain") {
    return (
      <div ref={ref} className={cn("reveal-curtain-wrap", className)}>
        {children}
        <span className="reveal-curtain" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("reveal-fade", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
