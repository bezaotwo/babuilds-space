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
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-0 md:px-4 pointer-events-none">
      <header
        className={`pointer-events-auto w-full transition-all duration-300 ease-out ${scrolled && !open
            ? 'md:top-4 md:max-w-4xl md:rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 px-3 md:py-1'
            : 'max-w-6xl border-b border-white/5 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 py-1'
          } ${open ? 'bg-black/95 backdrop-blur-2xl border-b border-white/15' : ''}`}
      >
        <nav
          className="flex h-14 md:h-12 w-full items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <a
            href="#home"
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

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 min-h-[44px]">
              {(['en', 'tr'] as const).map((l) => (
                <button
                  key={l}
                  id={`header-lang-${l}`}
                  type="button"
                  onClick={() => handleLangSelect(l)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${lang === l
                      ? 'bg-[#280970] text-white shadow-sm border border-purple-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-[#280970] hover:bg-[#3b1299] text-white text-xs font-semibold px-4 py-2 rounded-full border border-purple-400/20 transition-all duration-200 shadow-md min-h-[44px] min-w-[44px]"
            >
              <Mail className="w-3.5 h-3.5 text-purple-300" />
              <span>{t.contact}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Panel */}
        {open && (
          <div className="md:hidden fixed top-16 inset-x-0 bottom-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-white/10 flex flex-col justify-between p-6 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 px-3 mb-1">
                navigation
              </span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center text-zinc-200 hover:text-white hover:bg-[#280970]/30 px-4 py-3 rounded-2xl text-lg font-medium transition-all min-h-[44px] lowercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              {/* Language Selector in Mobile Drawer */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {t.language}
                </span>
                <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 min-h-[44px]">
                  {(['en', 'tr'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLangSelect(l)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px] min-w-[44px] cursor-pointer flex items-center justify-center ${lang === l
                          ? 'bg-[#280970] text-white shadow-md'
                          : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons in Mobile Drawer */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#280970] hover:bg-[#3b1299] text-white text-sm font-semibold py-3 px-4 rounded-2xl transition-all shadow-md min-h-[44px]"
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
