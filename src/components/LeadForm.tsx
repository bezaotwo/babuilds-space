import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send, ChevronLeft } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';
import { translations } from '../utils/translations';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface FormData {
  serviceType: string;
  projectScope: string;
  contactInfo: string;
}

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] as const },
  }),
};

// ─────────────────────────────────────────────
// STEP DOTS
// ─────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i + 1 === current ? 24 : 8,
            backgroundColor: i + 1 === current ? '#22d3ee' : '#334155',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// OPTION BUTTON
// ─────────────────────────────────────────────
function OptionButton({
  label,
  emoji,
  onClick,
}: {
  label: string;
  emoji: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group w-full flex items-center gap-4 px-6 py-4 rounded-2xl
        bg-slate-800/60 border border-slate-700 text-left
        hover:bg-slate-800 hover:border-cyan-500/50
        hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]
        transition-all duration-200 cursor-pointer outline-none"
    >
      <span className="text-2xl leading-none select-none">{emoji}</span>
      <span className="text-slate-200 font-semibold text-sm group-hover:text-cyan-300 transition-colors duration-200">
        {label}
      </span>
      <span className="ml-auto text-slate-600 group-hover:text-cyan-400 transition-all duration-200 text-lg group-hover:translate-x-0.5">
        →
      </span>
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function LeadForm() {
  const { lang } = useConfig();
  const t = translations[lang];

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    projectScope: '',
    contactInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalSteps = 3;

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'Web Design': return t.lead_web_design;
      case 'Full-Stack App': return t.lead_full_stack_app;
      case 'Data Dashboard': return t.lead_data_dashboard;
      default: return service;
    }
  };

  const getScopeLabel = (scope: string) => {
    switch (scope) {
      // Web Design scopes
      case 'Landing Page': return t.lead_landing_page;
      case 'Multi-page Website': return t.lead_multi_page_website;
      case 'E-commerce Site': return t.lead_ecommerce_site;
      // Full-Stack App scopes
      case 'MVP / Prototype': return t.lead_mvp_prototype;
      case 'SaaS Platform': return t.lead_saas_platform;
      case 'Custom Web App': return t.lead_custom_web_app;
      // Data Dashboard scopes
      case 'Business Analytics': return t.lead_business_analytics;
      case 'Admin Panel': return t.lead_admin_panel;
      case 'Data Visualization': return t.lead_data_visualization;
      default: return scope;
    }
  };

  const renderSuccessDesc = () => {
    const template = t.lead_success_desc;
    const serviceNode = (
      <span className="text-cyan-300 font-semibold" key="service">
        {getServiceLabel(formData.serviceType)}
      </span>
    );
    const scopeNode = (
      <span className="text-cyan-300 font-semibold" key="scope">
        {getScopeLabel(formData.projectScope)}
      </span>
    );
    const emailNode = (
      <span className="text-cyan-300 font-semibold" key="email">
        {formData.contactInfo}
      </span>
    );

    const parts = template.split(/(\{service\}|\{scope\}|\{email\})/g);
    return parts.map((part) => {
      if (part === '{service}') return serviceNode;
      if (part === '{scope}') return scopeNode;
      if (part === '{email}') return emailNode;
      return part;
    });
  };

  const advance = (newStep: number) => {
    setDirection(1);
    setStep(newStep);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleServiceSelect = (value: string) => {
    setFormData((d) => ({ ...d, serviceType: value }));
    advance(2);
  };

  const handleScopeSelect = (value: string) => {
    setFormData((d) => ({ ...d, projectScope: value }));
    advance(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Client-side validation ──────────────────
    const email = formData.contactInfo.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubmitError('');
    setIsSubmitting(true);

    // ── Web3Forms submission ────────────────────
    try {
      const payload = {
        access_key: 'c87d12d0-7826-4ef4-81a9-52922cf7015b',
        // Use the standard 'email' key so Web3Forms sets the Reply-To header
        email: formData.contactInfo.trim(),
        // Add a dynamic subject to bypass Gmail's generic spam filters
        subject: `New Lead: ${formData.serviceType} for babuilds.space`,
        // Custom fields will be formatted in the email body
        service_needed: formData.serviceType,
        project_scope: formData.projectScope,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as { message?: string }).message ??
          `Server returned ${response.status}`
        );
      }

      // ── Success ─────────────────────────────
      setSubmitted(true);
    } catch (err) {
      console.error('[LeadForm] Web3Forms submission failed:', err);
      setSubmitError(
        'Something went wrong sending your request. Please try again or email me directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDirection(1);
    setStep(1);
    setFormData({ serviceType: '', projectScope: '', contactInfo: '' });
    setSubmitted(false);
    setEmailError('');
    setSubmitError('');
    setIsSubmitting(false);
  };

  // ── SUCCESS STATE ──────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center text-center py-4 gap-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
        >
          <CheckCircle2 className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <h3 className="text-xl font-bold text-slate-100">{t.lead_success_title}</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
            {renderSuccessDesc()}
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 px-6 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold
            hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200 cursor-pointer outline-none"
        >
          {t.lead_start_over}
        </motion.button>
      </motion.div>
    );
  }

  // ── FORM STEPS ─────────────────────────────
  return (
    <div className="w-full flex flex-col">
      {/* Step Dots Indicator */}
      <StepDots current={step} total={totalSteps} />

      {/* Step Counter Label */}
      <p className="text-center text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-6">
        {t.lead_step.replace('{step}', String(step)).replace('{totalSteps}', String(totalSteps))}
      </p>

      {/* Animated Step Content */}
      <div className="relative overflow-hidden min-h-[260px]">
        <AnimatePresence mode="wait" custom={direction}>

          {/* ─── STEP 1: Service Type ─── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-3 p-2"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 text-center mb-3">
                {t.lead_step1_title}
              </h3>
              <OptionButton
                emoji="🎨"
                label={t.lead_web_design}
                onClick={() => handleServiceSelect('Web Design')}
              />
              <OptionButton
                emoji="⚡"
                label={t.lead_full_stack_app}
                onClick={() => handleServiceSelect('Full-Stack App')}
              />
              <OptionButton
                emoji="📊"
                label={t.lead_data_dashboard}
                onClick={() => handleServiceSelect('Data Dashboard')}
              />
            </motion.div>
          )}

          {/* ─── STEP 2: Project Scope (dynamic per serviceType) ─── */}
          {step === 2 && (() => {
            const scopeOptions: Record<string, { emoji: string; label: string; value: string }[]> = {
              'Web Design': [
                { emoji: '🚀', label: t.lead_landing_page, value: 'Landing Page' },
                { emoji: '🌐', label: t.lead_multi_page_website, value: 'Multi-page Website' },
                { emoji: '🛍️', label: t.lead_ecommerce_site, value: 'E-commerce Site' },
              ],
              'Full-Stack App': [
                { emoji: '🏗️', label: t.lead_mvp_prototype, value: 'MVP / Prototype' },
                { emoji: '☁️', label: t.lead_saas_platform, value: 'SaaS Platform' },
                { emoji: '⚙️', label: t.lead_custom_web_app, value: 'Custom Web App' },
              ],
              'Data Dashboard': [
                { emoji: '📈', label: t.lead_business_analytics, value: 'Business Analytics' },
                { emoji: '🔐', label: t.lead_admin_panel, value: 'Admin Panel' },
                { emoji: '📉', label: t.lead_data_visualization, value: 'Data Visualization' },
              ],
            };
            const options = scopeOptions[formData.serviceType] ?? [];
            return (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-3 p-2"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 text-center mb-3">
                  {t.lead_step2_title}
                </h3>
                {options.map(({ emoji, label, value }) => (
                  <React.Fragment key={value}>
                    <OptionButton
                      emoji={emoji}
                      label={label}
                      onClick={() => handleScopeSelect(value)}
                    />
                  </React.Fragment>
                ))}
              </motion.div>
            );
          })()}

          {/* ─── STEP 3: Email Capture ─── */}
          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-5 p-2"
            >
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
                  {t.lead_step3_title}
                </h3>
                {/* Breadcrumb summary of choices */}
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                    {getServiceLabel(formData.serviceType)}
                  </span>
                  <span className="text-slate-600 text-xs">·</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-medium">
                    {getScopeLabel(formData.projectScope)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                <div>
                  <input
                    id="lead-email"
                    type="email"
                    value={formData.contactInfo}
                    onChange={(e) => {
                      setFormData((d) => ({ ...d, contactInfo: e.target.value }));
                      if (emailError) setEmailError('');
                    }}
                    placeholder={t.lead_email_placeholder}
                    autoFocus
                    className={`w-full px-5 py-4 rounded-2xl bg-slate-800/60 border text-slate-200
                      placeholder:text-slate-600 text-sm font-medium outline-none
                      focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60
                      transition-all duration-200
                      ${emailError
                        ? 'border-red-500/60 focus:ring-red-500/30'
                        : 'border-slate-700 hover:border-slate-600 focus:border-cyan-500/60'
                      }`}
                  />
                  <AnimatePresence>
                    {emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-1.5 text-xs text-red-400 font-medium px-1"
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit error message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-xs text-red-400 font-medium px-1 text-center leading-relaxed"
                    >
                      {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02, y: -1 }}
                  whileTap={isSubmitting ? {} : { scale: 0.97 }}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
                    font-bold text-sm transition-all duration-200 outline-none
                    ${isSubmitting
                      ? 'bg-cyan-700 text-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_45px_rgba(6,182,212,0.55)]'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="animate-spin w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t.lead_sending}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.lead_submit_btn}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Back button (steps 2 & 3) */}
      <AnimatePresence>
        {step > 1 && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            onClick={goBack}
            className="mt-6 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300
              transition-colors duration-200 cursor-pointer mx-auto outline-none"
          >
            <ChevronLeft size={14} />
            {t.lead_go_back}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
