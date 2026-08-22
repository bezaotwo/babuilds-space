import React, { useEffect } from 'react';
import './WordHeroPage.css';

export type Theme = 'system' | 'light' | 'dark';

export type WordHeroPageProps = {
  /** Static prefix text */
  prefix?: string;
  /** Words that cycle under the sticky header */
  items?: string[];
  /** UI theme (affects color-scheme + switch color) */
  theme?: Theme;
  /** Enable view-timeline animations if supported */
  animate?: boolean;
  /** Accent hue (0–359) */
  hue?: number;
  /** Where the highlight band starts (vh) */
  startVh?: number; // default 50
  /** Space (vh) below the sticky header block */
  spaceVh?: number; // default 20
  /** Debug outline (for dev) */
  debug?: boolean;
  /** Children placed on the rising curtain */
  children?: React.ReactNode;
};

export function WordHeroPage({
  prefix = 'i specialize in ',
  items = [
    'data.',
    'analysis.',
    'web development.',
    'ui/ux.',
    'marketing.',
  ],
  theme = 'dark',
  animate = true,
  hue = 199,
  startVh = 50,
  spaceVh = 20,
  debug = false,
  children,
}: WordHeroPageProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.animate = String(animate);
    root.dataset.debug = String(debug);
    root.style.setProperty('--hue', String(hue));
    root.style.setProperty('--start', `${startVh}vh`);
    root.style.setProperty('--space', `${spaceVh}vh`);
    root.style.setProperty('--count', String(items.length));
  }, [theme, animate, debug, hue, startVh, spaceVh, items.length]);

  return (
    <div
      id="home"
      className="min-h-screen w-full relative"
      style={
        {
          ['--count' as string]: items.length,
        } as React.CSSProperties
      }
    >
      {/* Sticky Word Header */}
      <header className="word-hero-header content fluid">
        <section className="content">
          <h1>
            <span>{prefix.trimEnd()}</span>
          </h1>

          {/* Visible cycling words */}
          <ul className="word-hero-list" aria-hidden="true">
            {items.map((word, i) => (
              <li key={i} style={{ ['--i' as string]: i } as React.CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* Main Rising Curtain for all portfolio body content */}
      <main id="content-curtain" className="word-hero-main content-curtain">
        {children}
      </main>
    </div>
  );
}

export default WordHeroPage;
