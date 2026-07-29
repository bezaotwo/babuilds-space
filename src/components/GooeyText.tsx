"use client";

import * as React from "react";
import { cn } from "../utils/cn";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export const GooeyText = React.memo(function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth > 768;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  React.useEffect(() => {
    let animationFrameId: number;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        if (isDesktop) {
          text2Ref.current.style.filter = `blur(${Math.min(20 / fraction - 20, 100)}px)`;
          text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

          const invFraction = 1 - fraction;
          text1Ref.current.style.filter = `blur(${Math.min(20 / invFraction - 20, 100)}px)`;
          text1Ref.current.style.opacity = `${Math.pow(invFraction, 0.4) * 100}%`;
        } else {
          // Mobile: lightweight opacity cross-fade, zero SVG blur filters
          text2Ref.current.style.filter = "";
          text1Ref.current.style.filter = "";
          text2Ref.current.style.opacity = `${fraction * 100}%`;
          text1Ref.current.style.opacity = `${(1 - fraction) * 100}%`;
        }
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (containerRef.current) {
        containerRef.current.style.willChange = "auto";
      }
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      if (containerRef.current && isDesktop) {
        containerRef.current.style.willChange = "filter, opacity";
      }

      setMorph(fraction);
    };

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [texts, morphTime, cooldownTime, isDesktop]);

  return (
    <div className={cn("relative", className)}>
      {isDesktop && (
        <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="threshold" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 255 -120"
              />
            </filter>
          </defs>
        </svg>
      )}

      <div
        ref={containerRef}
        className="flex items-center justify-center transform-gpu"
        style={
          isDesktop
            ? { filter: "url(#threshold)", transform: "translateZ(0)" }
            : {
                textShadow: "0 0 12px rgba(6, 182, 212, 0.85), 0 0 24px rgba(6, 182, 212, 0.4)",
                transform: "translateZ(0)"
              }
        }
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center font-black",
            !isDesktop && "text-cyan-400",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center font-black",
            !isDesktop && "text-cyan-400",
            textClassName
          )}
        />
      </div>
    </div>
  );
});
