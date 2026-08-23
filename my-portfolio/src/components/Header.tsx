import { useState, useEffect } from 'react';
import { Menu, X, Mail, Download } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { translations } from '../data/translations';

export function useScroll(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const curtain = document.querySelector('.content-curtain, .word-hero-main');
      if (curtain) {
        const rect = curtain.getBoundingClientRect();
        // Morph into floating pill when top edge of white curtain hits navbar area (<= 80px)
        setScrolled(rect.top <= 80);
      } else {
        // Fallback: trigger after scrolling past initial hero phase
        setScrolled(window.scrollY > window.innerHeight * 0.7);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return scrolled;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;
  const scrolled = useScroll();

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
  };

  const links = [
    { label: t.home, href: '#home' },
    { label: t.works, href: '#works' },
    { label: t.skills, href: '#skills' },
    { label: t.contact, href: '#contact' },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-0 md:px-4 pointer-events-none">
      <header
        className={`pointer-events-auto w-full transition-all duration-300 ease-out ${
          scrolled && !open
            ? 'md:top-4 md:max-w-4xl md:rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 px-3 md:py-1'
            : 'max-w-6xl border-b border-white/5 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 py-1'
        } ${open ? 'bg-transparent border-transparent' : ''}`}
      >
        <nav
          className="relative z-50 flex h-14 md:h-12 w-full items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 transition-opacity hover:opacity-85 min-h-[44px] min-w-[44px] px-2 py-1 select-none"
            aria-label="BA builds - Beyzanur Home"
          >
            <img
              src="/BA-small-PURPLE-LOGO-v2.webp"
              alt="BA builds"
              className="h-8 w-auto object-contain sm:h-9"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-300 hover:text-white px-3.5 py-2 rounded-full text-sm font-medium hover:bg-[#280970]/40 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center lowercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Action Cluster */}
          <div className="hidden md:flex items-center gap-2">
            {/* Desktop Language Toggle */}
            <div className="inline-flex items-center rounded-full bg-zinc-900/80 p-0.5 border border-white/10 text-xs min-h-[44px]">
              {(['en', 'tr'] as const).map((l) => (
                <button
                  key={l}
                  id={`header-lang-${l}`}
                  type="button"
                  onClick={() => handleLangSelect(l)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer ${
                    lang === l
                      ? 'bg-[#280971] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-[#280971] hover:bg-[#3b1299] text-white text-xs font-semibold px-4 py-2 rounded-full border border-purple-400/20 transition-all duration-200 shadow-md min-h-[44px] min-w-[44px]"
            >
              <Mail className="w-3.5 h-3.5 text-purple-300" />
              <span>{t.contact}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Language Toggle + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Toggle */}
            <div className="inline-flex items-center rounded-full bg-zinc-900/80 p-0.5 border border-white/10 text-xs">
              {(['en', 'tr'] as const).map((l) => (
                <button
                  key={l}
                  id={`header-lang-mobile-${l}`}
                  type="button"
                  onClick={() => handleLangSelect(l)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    lang === l
                      ? 'bg-[#280971] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Fullscreen Mobile Drawer */}
        {open && (
          <div className="md:hidden fixed inset-0 z-40 flex h-dvh w-screen flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl p-6 pt-20 transition-all duration-300 animate-in fade-in duration-200">
            {/* Top Navigation Links */}
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mb-4">
                navigation
              </span>
              <div className="flex flex-col gap-5 text-2xl font-bold lowercase text-white">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-purple-300 transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Utility & Action Bar */}
            <div className="border-t border-white/10 pt-6 mt-auto flex flex-col gap-4">
              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#280971] hover:bg-[#3b1299] text-white text-sm font-semibold py-3 px-4 rounded-2xl transition-all shadow-md min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-purple-300" />
                  <span>{t.contact}</span>
                </a>
                <a
                  href="/BEYZANURACISU-ENG-RESUME-v7.pdf"
                  download="Beyzanur_Acisu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white text-sm font-semibold py-3 px-4 rounded-2xl border border-white/15 transition-all min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.requestCv}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
