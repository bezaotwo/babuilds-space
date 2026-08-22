import React, { useState, useEffect, useRef } from 'react';
import './WordHeroPage.css';

export type Theme = 'system' | 'light' | 'dark';

export type WordHeroPageProps = {
  /** Static prefix text */
  prefix?: string;
  /** Words that cycle under the sticky header */
  items?: string[];
  /** UI theme */
  theme?: Theme;
  /** Accent hue */
  hue?: number;
  /** Children placed on the rising curtain */
  children?: React.ReactNode;
};

export function WordHeroPage({
  prefix = 'i specialize in',
  items = [
    'data.',
    'analysis.',
    'web development.',
    'ui/ux.',
    'marketing.',
  ],
  children,
}: WordHeroPageProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setProgress(p);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateScrollProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const totalWords = items.length;
  const exactIndex = progress * (totalWords - 1);

  return (
    <div id="home" className="w-full relative bg-black">
      {/* ── Fixed Screen Grid Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
            backgroundPosition: '16px 14px',
            maskImage: 'linear-gradient(-20deg, transparent 15%, white 80%)',
            WebkitMaskImage: 'linear-gradient(-20deg, transparent 15%, white 80%)',
          }}
        />
      </div>

      {/* ── Multi-viewport Sticky Scroll Track ── */}
      <div ref={trackRef} className="relative h-[250vh] sm:h-[300vh] w-full">
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 flex h-dvh sm:h-screen w-full items-center justify-center overflow-hidden z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 px-6 max-w-4xl mx-auto w-full justify-center items-start sm:items-center">
            {/* Static Prefix */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white shrink-0 lowercase leading-tight">
              {prefix.trimEnd()}
            </h1>

            {/* Dynamic Words Column */}
            <div className="relative h-[1.35em] overflow-hidden flex flex-col justify-start">
              <div
                className="flex flex-col will-change-transform"
                style={{
                  transform: `translateY(-${exactIndex * 1.35}em)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                {items.map((word, i) => {
                  const dist = Math.abs(exactIndex - i);
                  const opacity = Math.max(0.2, 1 - dist * 0.85);
                  const isActive = dist < 0.45;

                  return (
                    <div
                      key={i}
                      className={`h-[1.35em] flex items-center text-2xl sm:text-4xl md:text-5xl font-bold lowercase tracking-tight whitespace-nowrap transition-colors duration-200 ${
                        isActive
                          ? 'text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                          : 'text-zinc-600'
                      }`}
                      style={{ opacity }}
                    >
                      {word}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Rising White Curtain for all body sections ── */}
      <main
        id="content-curtain"
        className="relative z-20 w-full bg-white text-zinc-950 rounded-t-[2.5rem] shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.6)] border-t border-white/15"
      >
        {children}
      </main>
    </div>
  );
}

export default WordHeroPage;
