import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { WordHeroPage } from './components/WordHeroPage';
import { ProjectCard } from './components/ProjectCard';
import { ProposalForm } from './components/ProposalForm';
import { TornEdge } from './components/TornEdge';
import { portfolioData } from './data/portfolioData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './data/translations';
import {
  Mail,
  Download,
  Award,
  ChevronRight
} from 'lucide-react';
import './index.css';

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Tiny helpers ────────────────────────────────────────────────────────────

/** Intersection-observer reveal wrapper */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Section header without underline, left-aligned, modern typography */
function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-8 sm:mb-10 md:mb-12 text-left ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight md:tracking-tighter text-[#09090b] lowercase">
        {children}
      </h2>
    </div>
  );
}

// ─── Tagline / CTA ────────────────────────────────────────────────────────────

function TaglineSection() {
  const { lang } = useLanguage();
  const t = translations[lang].heroCurtain;

  return (
    <section
      id="tagline"
      className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center"
    >
      <Reveal>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#09090b] leading-snug max-w-3xl mx-auto">
          {t.tagline}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            id="cta-contact"
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#09090b] hover:bg-[#280970] text-white px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] min-w-[44px]"
          >
            <Mail className="w-4 h-4 text-purple-300" />
            <span>{t.contactBtn}</span>
          </a>
          <a
            id="cta-cv"
            href="/BEYZANURACISU-ENG-RESUME-v7.pdf"
            download="Beyzanur_Acisu_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-[#09090b] border border-zinc-300 hover:border-[#280970] px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
          >
            <Download className="w-4 h-4 text-[#280970]" />
            <span>{t.cvBtn}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Works ────────────────────────────────────────────────────────────────────

function WorksSection() {
  const { lang } = useLanguage();
  const t = translations[lang].works;
  const projects = t.projects || [];

  return (
    <section
      id="works"
      className="py-20 max-w-6xl mx-auto w-full px-4 sm:px-6"
    >
      <Reveal>
        <SectionHeading>{t.heading}</SectionHeading>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 90} className="h-full">
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const paragraphs = t.paragraphs;

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#000000] py-24 sm:py-28 text-white"
    >
      {/* Torn Edge - Top */}
      <TornEdge position="top" fillColor="#ffffff" />

      {/* Background Grid Pattern */}
      <div className="about-grid-bg" aria-hidden="true" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-8 sm:mb-10 md:mb-12 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight md:tracking-tighter text-white lowercase">
              {t.heading}
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Avatar Photo Card */}
          <Reveal className="flex-shrink-0" delay={100}>
            <div className="relative">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl bg-gradient-to-br from-[#280970] via-[#1a064a] to-black">
                <img
                  src="/BA-FOTO.webp"
                  alt="Beyzanur Acısu"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute -inset-1 rounded-3xl bg-purple-600/20 blur-xl shadow-[0_0_50px_-12px_rgba(124,58,237,0.35)] -z-10" />
            </div>
          </Reveal>

          {/* Bio */}
          <div className="flex-1 space-y-4">
            {paragraphs.map((para, i) => (
              <Reveal key={i} delay={150 + i * 80}>
                <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={350}>
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  id="about-linkedin"
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-purple-400/50 bg-white/5 hover:bg-[#280970]/50 px-4 py-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px]"
                >
                  <LinkedinIcon className="w-4 h-4 text-purple-300" />
                  <span>linkedin</span>
                </a>
                <a
                  id="about-github"
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-purple-400/50 bg-white/5 hover:bg-[#280970]/50 px-4 py-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px]"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-200" />
                  <span>github</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Torn Edge - Bottom */}
      <TornEdge position="bottom" fillColor="#ffffff" />
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;
  const experiences = t.items || [];

  return (
    <section id="experience" className="py-20 max-w-6xl mx-auto w-full px-4 sm:px-6">
      <Reveal>
        <SectionHeading>{t.heading}</SectionHeading>
      </Reveal>

      <div className="relative max-w-4xl">
        {/* Timeline bar */}
        <div className="absolute left-0 sm:left-6 top-3 bottom-3 w-px bg-gradient-to-b from-[#280970] via-purple-300 to-transparent hidden sm:block" />

        <div className="space-y-8 sm:pl-16">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company + i} delay={i * 100}>
              <article
                id={`exp-${i}`}
                className="relative bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300"
              >
                {/* Timeline dot */}
                <div className="hidden sm:block absolute -left-[2.65rem] top-7 w-3.5 h-3.5 rounded-full bg-[#280970] border-2 border-white shadow-sm shadow-purple-400/40" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-[#09090b]">{exp.role}</h3>
                    <p className="text-[#280970] font-semibold text-sm mt-0.5">{exp.company}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                    <span className="text-sm font-semibold text-zinc-600">
                      {exp.date}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-sm text-zinc-700 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#280970] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills & Certifications ───────────────────────────────────────────────────

function SkillsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;
  const skillCategories = [
    t.categories.web,
    t.categories.data,
    t.categories.ai,
  ];
  const certifications = t.certifications || [];

  return (
    <section id="skills" className="w-full bg-white text-zinc-950 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* ── LEFT COLUMN: Skills / Yetenekler ── */}
          <Reveal className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 lowercase">
              {t.heading}
            </h2>
            <div className="flex flex-col gap-4">
              {skillCategories.map((group, gi) => (
                <div
                  key={group.title}
                  id={`skill-group-${gi}`}
                  className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#280970] block mb-3">
                    {group.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-100 border border-zinc-200/80 px-3.5 py-1.5 text-xs font-medium text-zinc-900"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── RIGHT COLUMN: Certifications & Education / Sertifikalar & Eğitimler ── */}
          <Reveal className="flex flex-col gap-3 sm:gap-4" delay={120}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 lowercase">
              {t.certificationsHeading}
            </h2>
            <div className="flex flex-col gap-3.5">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title + i}
                  id={`cert-${i}`}
                  className="group flex items-center gap-4 rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 min-h-[44px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-50 border border-purple-100 text-[#280970] group-hover:bg-[#280970] group-hover:text-white transition-all">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-sm font-semibold text-zinc-950">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {cert.org}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang].proposal;

  return (
    <section id="contact" className="w-full bg-gradient-to-b from-white to-zinc-50 text-zinc-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mx-auto mb-8 sm:mb-10 max-w-2xl px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 lowercase">
              {t.letsBuildHeading || "let's build together"}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ProposalForm />
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black py-8 px-5 text-zinc-400">
      {/* Background Grid Pattern Overlay */}
      <div className="about-grid-bg" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-zinc-400">
          © {year}{' '}
          <span className="font-semibold text-white">{portfolioData.name}</span>.
          {' '}{t.rights}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-purple-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-zinc-400 hover:text-purple-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Portfolio Content (Inside Language Context) ─────────────────────────

function PortfolioContent() {
  const { lang } = useLanguage();
  const heroT = translations[lang].hero;

  return (
    <>
      <Header />

      <WordHeroPage
        key={lang} // Re-initialize word animation on language change
        prefix={heroT.prefix}
        items={heroT.words}
      >
        {/* ── Everything below lives on the rising white curtain ── */}
        <TaglineSection />
        <WorksSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </WordHeroPage>
    </>
  );
}

// ─── App Root with Provider ────────────────────────────────────────────────────

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
