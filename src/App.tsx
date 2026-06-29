import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, ArrowUpRight, ExternalLink, LayoutTemplate, BarChart3, Mail, Linkedin } from 'lucide-react';
import { ConfigProvider, useConfig } from './contexts/ConfigContext';
import { useTactileAudio } from './hooks/useTactileAudio';
import { translations } from './utils/translations';
import HeroWave from './components/Herowave';
import { GooeyText } from './components/GooeyText';

// ─────────────────────────────────────────────
// SHARED STYLE CONSTANTS
// ─────────────────────────────────────────────
const flatTag = "bg-transparent border border-slate-700 text-slate-400 px-4 py-1 rounded-full text-xs font-medium";
const solidBtn = "rounded-full bg-slate-800 text-slate-200 border border-slate-700 shadow-lg hover:bg-slate-700 hover:text-cyan-400 hover:border-cyan-900 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer";
const ghostBtn = "rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-300 cursor-pointer";
const sectionCard = "rounded-[32px] bg-slate-900 border border-slate-800 shadow-[inset_5px_5px_15px_#080e1c,inset_-5px_-5px_15px_#161f36]";

// ─────────────────────────────────────────────
// APP CONTENT
// ─────────────────────────────────────────────
function AppContent() {
  const { lang, setLang } = useConfig();
  const t = translations[lang];
  const { isMuted, toggleMute, playSound } = useTactileAudio();

  const toggleLang = () => setLang(lang === 'en' ? 'tr' : 'en');

  const [activeSection, setActiveSection] = useState('home');
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    playSound('nav');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 w-full relative selection:bg-cyan-500 selection:text-slate-950">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 md:px-12 h-16">
        <span className="font-bold tracking-widest text-slate-300 text-sm uppercase">BA</span>
        <div className="flex gap-6 md:gap-8 items-center">
          {['home', 'works', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-widest cursor-pointer outline-none pb-1 border-b-2 ${activeSection === item
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-slate-100 border-transparent'
                }`}
            >
              {t[`nav_${item}` as keyof typeof t]}
            </button>
          ))}
        </div>
        <div className="flex items-center">
          <button
            onClick={() => { playSound('toggle'); toggleLang(); }}
            aria-label="Toggle Language"
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-slate-100 transition-colors duration-300 cursor-pointer outline-none"
          >
            {lang === 'en' ? 'EN' : 'TR'}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative w-full min-h-[85vh] overflow-hidden bg-slate-950"
      >
        <HeroWave />

        {/* Centred hero text */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 h-full min-h-[85vh] flex flex-col items-center justify-center text-center pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 text-slate-100 flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2"
          >
            <span>{t.hero_title}</span>
            <span className="text-slate-500 hidden md:inline">—</span>
            <GooeyText
              texts={['DATA', 'MARKETING', 'DEVELOPMENT', 'ANALYSIS']}
              morphTime={1.2}
              cooldownTime={0.4}
              className="inline-flex items-center justify-center min-w-[200px] sm:min-w-[300px] md:min-w-[380px] h-12 sm:h-16"
              textClassName="text-3xl sm:text-5xl md:text-6xl text-cyan-400 font-extrabold tracking-tighter uppercase"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            {t.hero_tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-8 py-3 font-semibold text-base ${solidBtn}`}
            >
              {t.cta}
            </button>
            <a
              href="/CV_BeyzanurAcisu.pdf"
              download
              className={`px-8 py-3 font-semibold text-base ${ghostBtn}`}
            >
              {t.cta_cv}
            </a>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[9px] tracking-widest text-slate-500 font-bold uppercase">Scroll</span>
          <svg
            className="w-4 h-4 text-cyan-400 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        {/* Seamless gradient separator */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="bg-slate-950 max-w-7xl mx-auto px-6 sm:px-12 pb-20 flex flex-col gap-32 pt-16">

        {/* ── Projects ── */}
        <section id="works" className="flex flex-col gap-12">
          <h2 className="text-3xl font-bold text-slate-100">{t.nav_works}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <motion.div variants={itemVariants} className="flex">
              <ProjectCard
                title={t.card_1_title}
                subtitle={t.card_1_subtitle}
                desc={t.card_1_desc}
                tags={['React', 'TypeScript', 'Tailwind CSS', 'Supabase']}
                icon={<LayoutTemplate size={32} />}
                image="/pedagojikuyku-ss.webp"
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex">
              <ProjectCard
                title={t.card_2_title}
                subtitle={t.card_2_subtitle}
                desc={t.card_2_desc}
                tags={['Vite', 'React', 'TypeScript']}
                icon={<LayoutTemplate size={32} />}
                image="/nevzatyildirim-ss.webp"
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex">
              <ProjectCard
                title={t.card_3_title}
                subtitle={t.card_3_subtitle}
                desc={t.card_3_desc}
                tags={['Python', 'SQL', 'Data Preprocessing', 'Statistical Analysis', 'Bokeh']}
                image="/analysis.webp"
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex">
              <ProjectCard
                title={t.card_5_title}
                subtitle={t.card_5_subtitle}
                desc={t.card_5_desc}
                tags={['Python', 'Data Cleaning', 'Data Visualization', 'Scripting']}
                image="/graphic1.png"
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="flex">
              <ProjectCard
                title={t.card_4_title}
                subtitle={t.card_4_subtitle}
                desc={t.card_4_desc}
                tags={['Database Administration', 'UI/UX Debugging', 'Legacy Systems']}
                image="/globalvision2000-ss.webp"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── About ── */}
        <section id="about" className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-slate-100">{t.architect_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: text */}
            <div className={`${sectionCard} p-8 flex flex-col gap-6`}>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">{t.architect_p1}</p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">{t.architect_p2}</p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">{t.architect_p3}</p>
            </div>
            {/* Right: profile picture container */}
            <div className="w-full min-h-[300px] rounded-[32px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 border border-slate-700/50 overflow-hidden relative group/profile flex items-center justify-center">
              <img
                src="/cvfoto.png"
                alt={t.hero_title}
                loading="lazy"
                className="w-full h-full object-cover object-center grayscale-[20%] brightness-95 group-hover/profile:grayscale-0 group-hover/profile:brightness-100 group-hover/profile:scale-105 transition-all duration-500 ease-out"
              />
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-slate-100">{t.experience_title}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-5"
          >
            {t.experiences.map((exp, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`${sectionCard} p-8 sm:p-10`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-cyan-400 font-semibold mt-1">{exp.company}</p>
                  </div>
                  <span className="text-slate-400 text-sm whitespace-nowrap pt-1">{exp.date}</span>
                </div>
                <ul className="flex flex-col space-y-1.5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 leading-[1.65]">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-slate-100">{t.skills_title}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="w-full flex">
              <SkillColumn
                title={t.skills_web}
                skills={['React', 'TypeScript', 'Tailwind CSS', 'Supabase']}
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full flex">
              <SkillColumn
                title={t.skills_data}
                skills={['Python', 'SQL', 'Tableau & Power BI', 'IBM SPSS', 'Advanced Excel']}
                className="w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full flex">
              <SkillColumn
                title={t.skills_design}
                skills={['Generative AI for Campaigns & HR', 'Prompt Engineering', 'Adobe Creative Suite']}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-slate-100">{t.certifications_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Data Analysis School: AI, Machine Learning, Basic Statistics', org: 'YÖK (Turkish Higher Education Council)' },
              { title: 'Data Analyst / Vertex AI Prompt Design', org: 'Coursera & Google · November 2025' },
              { title: 'Data Science Bootcamp', org: 'Kodluyoruz · August 2024 – October 2024' },
              { title: 'Organization Coordinator & Volunteer', org: 'Genç TEMA' },
            ].map((cert) => (
              <div key={cert.title} className={`${sectionCard} p-6 flex flex-col gap-1`}>
                <p className="text-slate-100 font-semibold text-sm leading-snug">{cert.title}</p>
                <p className="text-slate-300 text-xs font-medium">{cert.org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-slate-100">{t.contact_title}</h2>
          <div className={`${sectionCard} px-6 py-10 md:px-12 md:py-12 flex flex-col items-center text-center gap-6 w-full`}>
            {/* Availability Context */}
            <div className="flex flex-col gap-1.5">
              <p className="text-base text-slate-200 font-semibold tracking-tight">
                {t.contact_availability}
              </p>
              <p className="text-xs text-slate-400">
                {t.contact_response}
              </p>
            </div>

            {/* Labeled Pill Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-2">
              <a
                href="mailto:acisubeyzanur@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-8 h-14 ${solidBtn} flex flex-col items-center justify-center`}
              >
                <span className="font-semibold text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t.contact_email_btn}
                </span>
                <span className="text-[10px] text-cyan-300 font-medium">acisubeyzanur@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/beyzanur-acisu-722163207/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-8 h-14 ${ghostBtn} flex items-center justify-center gap-2 text-sm font-semibold`}
              >
                <Linkedin className="w-4 h-4" />
                {t.contact_linkedin_btn}
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Audio FAB */}
      <button
        onClick={() => { toggleMute(); playSound('toggle'); }}
        aria-label="Toggle Audio"
        className={`fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center z-50 ${solidBtn}`}
        style={{ borderRadius: '9999px' }}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <footer className="w-full text-center py-8 text-xs font-medium tracking-widest uppercase flex flex-col sm:flex-row justify-between items-center px-12 max-w-7xl mx-auto text-slate-600">
        <span>&copy; {new Date().getFullYear()} Beyzanur Acısu</span>
        <div className="flex gap-6 mt-4 sm:mt-0">
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/beyzanuracisu' },
            { label: 'GitHub', href: 'https://github.com/' },
            { label: 'Behance', href: 'https://behance.net/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-100 transition-colors duration-200 flex items-center gap-1"
            >
              {label}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({
  title, subtitle, desc, tags, icon, image, className = ""
}: {
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  icon?: React.ReactNode;
  image?: string;
  className?: string;
}) {
  const { playSound } = useTactileAudio();

  return (
    <div
      className={`group relative rounded-[32px] p-8 bg-slate-900 border border-slate-800 transition-all duration-300 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={() => playSound('click')}
    >
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-cyan-400 z-10">
        <ArrowUpRight size={20} />
      </div>
      {/* Image / icon */}
      <div className="mb-6">
        <div className="w-full h-36 rounded-2xl flex items-center justify-center bg-slate-950 overflow-hidden border border-slate-800">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top grayscale-[60%] brightness-75 opacity-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500"
            />
          ) : (
            <span className="text-slate-600 group-hover:text-cyan-400 transition-colors duration-300">{icon}</span>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-base font-bold text-slate-100 leading-tight">{title}</h3>
        <p className="text-xs text-slate-300 font-medium">{subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed mt-1 flex-1">{desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map(tag => (
            <span key={tag} className="bg-transparent border border-slate-700 text-slate-400 px-3 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMING SOON CARD
// ─────────────────────────────────────────────
function ComingSoonCard({ title, desc, className = "" }: { title: string; desc: string; className?: string }) {
  return (
    <div className={`group relative rounded-[32px] p-8 bg-slate-900 border border-slate-800 flex flex-col items-center justify-center min-h-[280px] overflow-hidden opacity-70 ${className}`}>
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
          <span className="text-slate-500 text-xl">✦</span>
        </div>
        <h3 className="text-base font-bold text-slate-400 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto italic">{desc}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SKILL COLUMN
// ─────────────────────────────────────────────
function SkillColumn({ title, skills, className = "" }: { title: string; skills: string[]; className?: string }) {
  return (
    <div className={`w-full rounded-[32px] bg-slate-900 border border-slate-800 shadow-[inset_5px_5px_15px_#080e1c,inset_-5px_-5px_15px_#161f36] p-8 flex flex-col gap-6 ${className}`}>
      <h3 className="text-lg font-bold text-slate-100">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="bg-white/[0.08] text-slate-300 px-4 py-1.5 rounded-full text-xs font-medium border-none"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}
