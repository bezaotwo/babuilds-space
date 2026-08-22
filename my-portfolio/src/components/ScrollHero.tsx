import React, { useEffect } from 'react';

export interface ScrollHeroProps {
  prefix?: string;
  items?: string[];
  children?: React.ReactNode;
}

export function ScrollHero({
  prefix = 'i specialize in',
  items = ['data.', 'analysis.', 'web development.', 'ui/ux.', 'marketing.'],
  children,
}: ScrollHeroProps) {
  useEffect(() => {
    document.documentElement.style.setProperty('--count', String(items.length));
  }, [items.length]);

  return (
    <div
      className="hero-viewport"
      style={{ ['--count' as string]: items.length } as React.CSSProperties}
    >
      {/* Pinned Sticky Word Header */}
      <header className="sticky-track">
        <section>
          <h1><span>{prefix}&nbsp;</span></h1>
          <ul aria-hidden="true">
            {items.map((word, i) => (
              <li key={i} style={{ ['--i' as string]: i } as React.CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* The Rising Curtain holding all portfolio body content */}
      <div className="content-curtain">
        {children}
      </div>

      <style>{`
        .hero-viewport {
          --start: 50vh;
          --space: 80vh;
          --accent: #0ea5e9;
          --dimmed: rgba(255, 255, 255, 0.18);
          --font-size-hero: clamp(2.5rem, 6vw, 4.75rem);
          --line-height-hero: 1.15;
          --half-line: 0.575em;
          position: relative;
          width: 100%;
          background-color: #020617;
          color: #f8fafc;
        }
        .hero-viewport::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black 35%, transparent 95%);
          -webkit-mask-image: linear-gradient(to bottom, black 35%, transparent 95%);
          pointer-events: none;
        }
        .sticky-track {
          position: sticky;
          top: calc((var(--count) - 1) * (var(--line-height-hero) * -1em));
          display: flex;
          align-items: flex-start;
          width: 100%;
          margin-bottom: var(--space);
          z-index: 10;
        }
        .sticky-track section {
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: center;
          padding-top: calc(var(--start) - var(--half-line));
          gap: 0.35em;
        }
        .sticky-track h1, .sticky-track ul, .sticky-track li {
          margin: 0;
          padding: 0;
          font-size: var(--font-size-hero);
          line-height: var(--line-height-hero);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: lowercase;
        }
        .sticky-track h1 {
          position: sticky;
          top: calc(var(--start) - var(--half-line));
          color: #f8fafc;
          white-space: nowrap;
        }
        .sticky-track ul { list-style: none; }
        .sticky-track li {
          background: linear-gradient(
            180deg,
            var(--dimmed) 0 calc(var(--start) - var(--half-line)),
            var(--accent) calc(var(--start) - var(--half-line)) calc(var(--start) + var(--half-line)),
            var(--dimmed) calc(var(--start) + var(--half-line))
          );
          background-attachment: fixed;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .content-curtain {
          width: 100%;
          position: relative;
          z-index: 20;
          background: #f8fafc;
          color: #0f172a;
          border-radius: 2.5rem 2.5rem 0 0;
          box-shadow: 0 -25px 50px -12px rgba(0, 0, 0, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.6);
        }
        @supports (animation-timeline: view()) {
          .content-curtain {
            view-timeline: --curtain-view;
            transform-origin: 50% 100%;
            animation: curtainGrow both ease-in-out;
            animation-timeline: --curtain-view;
            animation-range: entry 0% cover 40%;
          }
          @keyframes curtainGrow {
            from { border-radius: 2.5rem 2.5rem 0 0; }
            to { border-radius: 0; }
          }
        }
      `}</style>
    </div>
  );
}

export default ScrollHero;