import type { Project } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// Fallback image mapping
const fallbackImages: Record<string, string> = {
  'pedagojikuyku.com': '/pedagojikuyku-ss.webp',
  'nevzatyildirim.com': '/nevzatyildirim-ss.webp',
  'gender gap in technology analysis': '/gendergapintech-v1.webp',
  'global email database analysis': '/globalvision2000-EMAIL-ANALYSIS.webp',
  'global vision 2000': '/globalvision2000-ss.webp',
  'crown conference platform': '/crown-ss.webp',
  'crown e-commerce': '/crown-ss.webp',
  'old boutique': '/oldbutik-ss.webp',
  'Gender Gap in Technology Analysis': '/gendergapintech-v1.webp',
  'Global Email Database Analysis': '/globalvision2000-EMAIL-ANALYSIS.webp',
  'Global Vision 2000': '/globalvision2000-ss.webp',
  'Crown Conference Platform': '/crown-ss.webp',
  'Crown E-Commerce': '/crown-ss.webp',
  'Old Boutique': '/oldbutik-ss.webp',
};

export interface ProjectCardProps {
  project?: Project;
  title?: string;
  desc?: string;
  image?: string;
  image2?: string;
  url?: string;
  date?: string;
  index?: number;
}

export function ProjectCard({
  project,
  title: propTitle,
  desc: propDesc,
  image: propImage,
  image2: propImage2,
  url: propUrl,
  date: propDate,
  index = 0,
}: ProjectCardProps) {
  const { lang } = useLanguage();
  const tWorks = translations[lang].works;

  const title = propTitle || project?.title || '';
  const desc = propDesc || project?.desc || '';
  const date = propDate || project?.date;
  const image2 = propImage2 || project?.image2;
  const url = propUrl || project?.url;

  const image =
    propImage ||
    project?.image ||
    fallbackImages[title] ||
    '/pedagojikuyku-ss.webp';

  return (
    <div
      id={`project-card-${index}`}
      className="group relative flex h-[480px] w-full flex-col overflow-hidden rounded-[2rem] bg-transparent shadow-xl transition-all duration-300 hover:-translate-y-1.5 isolate"
    >
      {/* ── TOP: Image Section (Clean rounded top with zero dark bleed) ── */}
      <div className="relative h-48 sm:h-52 w-full shrink-0 overflow-hidden rounded-t-[2rem] bg-transparent">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {image2 && (
          <img
            src={image2}
            alt={`${title} preview 2`}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          />
        )}
      </div>

      {/* ── BOTTOM: Dark Content Body ── */}
      <div className="flex flex-1 flex-col justify-between p-6 bg-zinc-950 rounded-b-[2rem] border-x border-b border-white/10">
        <div className="flex flex-col gap-2.5">
          {/* Title & Date Row */}
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white lowercase">
              {title}
            </h3>
            {date && (
              <span className="shrink-0 font-mono text-xs text-zinc-300">
                {date}
              </span>
            )}
          </div>

          {/* Description with Uniform 3-Line Clamp */}
          <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-zinc-400">
            {desc}
          </p>
        </div>

        {/* ── ACTION BUTTON: Pinned to Bottom ── */}
        <div className="mt-4 pt-2">
          <a
            href={url || '#contact'}
            target={url ? '_blank' : undefined}
            rel={url ? 'noopener noreferrer' : undefined}
            className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            aria-label={url ? `Visit live site for ${title}` : `Case study and details for ${title}`}
          >
            {url ? (
              <>
                <span>{tWorks.visitLive.replace(' ↗', '')}</span>
                <span>↗</span>
              </>
            ) : (
              <>
                <span className="font-mono text-xs text-zinc-500">&lt;/&gt;</span>
                <span>{tWorks.caseStudy.replace('</> ', '')}</span>
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
