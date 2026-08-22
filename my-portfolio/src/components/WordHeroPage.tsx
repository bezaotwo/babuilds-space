import React, { useEffect, useRef, useState } from 'react';
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
  hue = 280,
  startVh = 50,
  spaceVh = 20,
  debug = false,
  children,
}: WordHeroPageProps) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    let ticking = false;

    const updateActiveMobileWord = () => {
      if (!listRef.current) return;
      const listItems = listRef.current.querySelectorAll('li');
      if (!listItems.length) return;

      const targetY = window.innerHeight * (startVh / 100);
      let minDistance = Infinity;
      let closestIdx = 0;

      listItems.forEach((li, index) => {
        const rect = li.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
        }
      });

      setActiveMobileIndex(closestIdx);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveMobileWord);
        ticking = true;
      }
    };

    updateActiveMobileWord();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [startVh, items.length]);

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
          <ul className="word-hero-list" aria-hidden="true" ref={listRef}>
            {items.map((word, i) => {
              const isMobileActive = i === activeMobileIndex;
              return (
                <li
                  key={i}
                  className={`scrolling-word ${
                    isMobileActive
                      ? 'scrolling-word-mobile-active'
                      : 'scrolling-word-mobile-inactive'
                  }`}
                  style={{ ['--i' as string]: i } as React.CSSProperties}
                >
                  {word}
                </li>
              );
            })}
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
