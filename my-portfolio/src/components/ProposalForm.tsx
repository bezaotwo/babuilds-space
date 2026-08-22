import React, { useState } from 'react';
import {
  Palette,
  Layers,
  BarChart3,
  Layout,
  Component,
  Sparkles,
  Shield,
  Database,
  TrendingUp,
  Workflow,
  PieChart,
  Send,
  Check,
  ChevronLeft,
  Mail,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  type LucideIcon
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface StepOption {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}

export function ProposalForm() {
  const { lang } = useLanguage();
  const t = translations[lang].proposal;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceId, setServiceId] = useState<string>('web-design');
  const [scopeId, setScopeId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const step1Options: StepOption[] = [
    {
      id: 'web-design',
      label: t.step1.options.webDesign.label,
      desc: t.step1.options.webDesign.desc,
      icon: Palette,
    },
    {
      id: 'full-stack-app',
      label: t.step1.options.fullStackApp.label,
      desc: t.step1.options.fullStackApp.desc,
      icon: Layers,
    },
    {
      id: 'data-dashboard',
      label: t.step1.options.dataDashboard.label,
      desc: t.step1.options.dataDashboard.desc,
      icon: BarChart3,
    },
  ];

  const step2IconMap: Record<string, LucideIcon> = {
    'landing-page': Layout,
    'design-system': Component,
    'website-redesign': Sparkles,
    'saas-custom-app': Layers,
    'admin-portal': Shield,
    'db-auth': Database,
    'bi-kpis': TrendingUp,
    'data-pipeline': Workflow,
    'data-viz': PieChart,
  };

  const getStep2Options = (): StepOption[] => {
    let rawList;
    if (serviceId === 'full-stack-app') {
      rawList = t.step2.options.fullStackApp;
    } else if (serviceId === 'data-dashboard') {
      rawList = t.step2.options.dataDashboard;
    } else {
      rawList = t.step2.options.webDesign;
    }

    return rawList.map((item) => ({
      ...item,
      icon: step2IconMap[item.id] || Palette,
    }));
  };

  const currentStep2Options = getStep2Options();

  const handleSelectService = (id: string) => {
    if (id !== serviceId) {
      setScopeId(''); // Reset scope selection if service changes
    }
    setServiceId(id);
    setStep(2);
  };

  const handleSelectScope = (id: string) => {
    setScopeId(id);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === 'your_web3forms_access_key_here') {
      console.warn('Web3Forms access key is not set in environment variables.');
      setError('Web3Forms Access Key is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY in your .env file or contact directly via email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const activeService = step1Options.find((o) => o.id === serviceId) || step1Options[0];
      const activeScope = currentStep2Options.find((o) => o.id === scopeId) || currentStep2Options[0];

      const payload = {
        access_key: accessKey,
        subject: `New Proposal Request - ${email}`,
        from_name: 'Portfolio Proposal Bot',
        service: activeService.label,
        scope: activeScope?.label || '',
        email: email,
        message: `New proposal request submitted:\n- Service: ${activeService.label}\n- Scope: ${activeScope?.label || 'N/A'}\n- Email: ${email}`,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || 'Failed to submit proposal request. Please try again or reach out directly.');
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setError('A network error occurred. Please check your connection and try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setServiceId('web-design');
    setScopeId('');
    setEmail('');
    setSubmitted(false);
    setError(null);
  };

  const activeServiceObj = step1Options.find((o) => o.id === serviceId) || step1Options[0];
  const activeScopeObj = currentStep2Options.find((o) => o.id === scopeId) || currentStep2Options[0];
  const ServiceIcon = activeServiceObj.icon;
  const ScopeIcon = activeScopeObj ? activeScopeObj.icon : TrendingUp;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── Elevated Dark Card ─── */}
      <div className="relative overflow-hidden bg-slate-900/90 border border-white/10 rounded-[2.5rem] p-7 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Glow Accent */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#7c3aed]/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 bg-[#280970]/30 rounded-full blur-3xl" />

        {/* Stepper Progress Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-400 ${step === s
                  ? 'w-10 bg-[#7c3aed] shadow-sm shadow-purple-500/50'
                  : step > s || submitted
                    ? 'w-4 bg-purple-900/80'
                    : 'w-4 bg-white/10'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {submitted ? t.complete : t.stepOf.replace('{step}', String(step))}
          </span>
        </div>

        {/* ─── Content States ─── */}
        <div className="relative z-10">
          {submitted ? (
            /* Success State */
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#280970]/40 border border-purple-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-950/50">
                <CheckCircle2 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight lowercase">
                {t.step3.successTitle}
              </h3>
              <p className="text-zinc-300 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                {t.step3.successDescPart1}{' '}
                <span className="text-purple-300 font-semibold">{activeServiceObj.label}</span>{' '}
                {t.step3.successDescPart2}{' '}
                <span className="text-purple-300 font-semibold">{activeScopeObj?.label || ''}</span>{' '}
                {t.step3.successDescPart3}{' '}
                <span className="text-white font-medium underline underline-offset-4 decoration-purple-400">
                  {email}
                </span>.
              </p>
              <p className="text-purple-200 text-xs mt-3 font-medium">
                I will review your requirements and respond to your email within 24 hours.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all min-h-[44px] min-w-[44px] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.step3.resetBtn}</span>
              </button>
            </div>
          ) : step === 1 ? (
            /* Step 1: Service Selection */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight lowercase">
                  {t.step1.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-1.5">
                  {t.step1.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5 pt-2">
                {step1Options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = serviceId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectService(opt.id)}
                      className={`group w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between min-h-[64px] cursor-pointer ${isSelected
                        ? 'bg-[#280970]/50 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/40 text-zinc-200'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 group-hover:bg-[#280970] group-hover:text-purple-200 border border-white/10 flex items-center justify-center transition-colors shrink-0">
                          <Icon className="w-5 h-5 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white lowercase">
                            {opt.label}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2 flex items-center justify-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center text-white transition-all duration-200 shadow-sm shadow-purple-500/50">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-white/20 transition-all duration-200 group-hover:border-purple-400/50" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : step === 2 ? (
            /* Step 2: Dynamic Scope Selection */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight lowercase">
                    {t.step2.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1.5">
                    {t.step2.tailoredFor}{' '}
                    <span className="text-purple-300 font-semibold">{activeServiceObj.label}</span>:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 pt-2">
                {currentStep2Options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = scopeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectScope(opt.id)}
                      className={`group w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between min-h-[64px] cursor-pointer ${isSelected
                        ? 'bg-[#280970]/50 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/40 text-zinc-200'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 group-hover:bg-[#280970] group-hover:text-purple-200 border border-white/10 flex items-center justify-center transition-colors shrink-0">
                          <Icon className="w-5 h-5 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white lowercase">
                            {opt.label}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2 flex items-center justify-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center text-white transition-all duration-200 shadow-sm shadow-purple-500/50">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-white/20 transition-all duration-200 group-hover:border-purple-400/50" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] px-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.step2.goBack}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Step 3: Contact & Email */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight lowercase">
                  {t.step3.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-1.5">
                  {t.step3.desc}
                </p>
              </div>

              {/* Summary tags with dynamic icons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 bg-[#280970]/50 border border-purple-500/30 text-purple-200 text-xs px-3 py-1.5 rounded-full font-medium">
                  <ServiceIcon className="w-3.5 h-3.5 text-purple-300" />
                  {activeServiceObj.label}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#280970]/50 border border-purple-500/30 text-purple-200 text-xs px-3 py-1.5 rounded-full font-medium">
                  <ScopeIcon className="w-3.5 h-3.5 text-purple-300" />
                  {activeScopeObj ? activeScopeObj.label : ''}
                </span>
              </div>

              {/* Form Input & CTA */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label htmlFor="proposal-email" className="block text-xs font-semibold text-zinc-300 mb-2 lowercase">
                    {t.step3.emailLabel}
                  </label>
                  <div className="relative">
                    <input
                      id="proposal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.step3.placeholder}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/40 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-all min-h-[48px]"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-medium leading-relaxed">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] bg-[#280970] hover:bg-[#3b1299] text-white text-sm font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-purple-950/50 hover:shadow-purple-900/60 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.step3.submittingBtn}
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-purple-300" />
                      <span>{t.step3.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] px-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.step2.goBack}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom External CTAs ─── */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {/* Email CTA */}
        <a
          id="proposal-mailto-cta"
          href={`mailto:${portfolioData.email}?subject=${encodeURIComponent(translations[lang].about.cvSubject)}`}
          className="flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 shadow-sm hover:shadow-md hover:border-purple-300 hover:text-[#280970] transition-all min-h-[44px]"
        >
          <Mail className="h-4 w-4 text-[#7c3aed]" />
          <span>{t.ctas.emailPrefix} {portfolioData.email}</span>
        </a>

        {/* LinkedIn CTA */}
        <a
          id="proposal-linkedin-cta"
          href={portfolioData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 shadow-sm hover:shadow-md hover:border-purple-300 hover:text-[#280970] transition-all min-h-[44px]"
        >
          <LinkedinIcon className="h-4 w-4 text-[#0a66c2]" />
          <span>{t.ctas.linkedin}</span>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
        </a>
      </div>
    </div>
  );
}

export default ProposalForm;
