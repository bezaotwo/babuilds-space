import type { Project, Experience, Certification } from './portfolioData';

export interface TranslationDictionary {
  nav: {
    home: string;
    works: string;
    skills: string;
    experience: string;
    about: string;
    contact: string;
    language: string;
    requestCv: string;
  };
  hero: {
    prefix: string;
    words: string[];
  };
  heroCurtain: {
    tagline: string;
    contactBtn: string;
    cvBtn: string;
  };
  works: {
    heading: string;
    visitLive: string;
    caseStudy: string;
    projects: Project[];
  };
  about: {
    heading: string;
    location: string;
    paragraphs: string[];
    cvSubject: string;
  };
  experience: {
    heading: string;
    items: Experience[];
  };
  skills: {
    heading: string;
    categories: {
      web: { title: string; skills: string[] };
      data: { title: string; skills: string[] };
      ai: { title: string; skills: string[] };
    };
    certificationsHeading: string;
    certifications: Certification[];
  };
  proposal: {
    heading: string;
    letsBuildHeading?: string;
    subtitle: string;
    complete: string;
    stepOf: string; // e.g. "step {step} of 3"
    step1: {
      title: string;
      desc: string;
      options: {
        webDesign: { label: string; desc: string };
        fullStackApp: { label: string; desc: string };
        dataDashboard: { label: string; desc: string };
      };
    };
    step2: {
      title: string;
      tailoredFor: string; // e.g. "Tailored options for"
      options: {
        webDesign: [
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string }
        ];
        fullStackApp: [
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string }
        ];
        dataDashboard: [
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string },
          { id: string; label: string; desc: string }
        ];
      };
      goBack: string;
    };
    step3: {
      title: string;
      desc: string;
      emailLabel: string;
      placeholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successDescPart1: string;
      successDescPart2: string;
      successDescPart3: string;
      resetBtn: string;
      goBack: string;
    };
    ctas: {
      emailPrefix: string;
      linkedin: string;
    };
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}

export const translations: Record<'en' | 'tr', TranslationDictionary> = {
  en: {
    nav: {
      home: 'home',
      works: 'works',
      skills: 'skills',
      experience: 'experience',
      about: 'about',
      contact: 'contact',
      language: 'language',
      requestCv: 'request cv',
    },
    hero: {
      prefix: 'i specialize in ',
      words: [
        'data.',
        'analysis.',
        'web development.',
        'ui/ux.',
        'marketing.',
      ],
    },
    heroCurtain: {
      tagline: 'i build digital products, analyze datasets, and make both make sense for business.',
      contactBtn: 'contact me',
      cvBtn: 'download cv',
    },
    works: {
      heading: 'works',
      visitLive: 'visit live ↗',
      caseStudy: '</> case study & details',
      projects: [
        {
          title: 'pedagojikuyku.com',
          role: 'Independent Developer',
          desc: 'Full-stack web application for educational sleep content with user auth, Supabase database, and responsive UI.',
          tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
          date: 'Dec 2025',
          url: 'https://pedagojikuyku.com',
          image: '/pedagojikuyku-ss.webp',
        },
        {
          title: 'nevzatyildirim.com',
          role: 'Independent Developer',
          desc: 'Professional portfolio website built with Vite and React focusing on performance and editorial aesthetics.',
          tags: ['Vite', 'React', 'TypeScript'],
          date: 'May 2026',
          url: 'https://nevzatyildirim.com',
          image: '/nevzatyildirim-ss.webp',
          image2: '/nevzat-yildirim-ss2.webp',
        },
        {
          title: 'gender gap in technology analysis',
          role: 'Data Analysis Lead',
          desc: 'Examined over 30,000 data points to reveal gender disparities in technical roles with interactive dashboards.',
          tags: ['Python', 'SQL', 'Data Preprocessing', 'Statistical Analysis'],
          date: 'Nov 2024',
          image: '/gendergapintech-v1.webp',
        },
        {
          title: 'global email database analysis',
          role: 'Data Analyst & Researcher',
          desc: 'Executed large-scale data analysis on a database of 190,000+ records using Python. Cleaned, segmented, and visualized records by domain, active status, and behavioral intent.',
          tags: ['Python', 'Data Segmentation', 'Data Cleaning', 'Analytics'],
          date: 'May 2026',
          image: '/globalvision2000-EMAIL-ANALYSIS.webp',
        },
        {
          title: 'global vision 2000',
          role: 'Technical Consultant',
          desc: 'Restored legacy platform operations by resolving backend admin lockouts, executing database-level credential resets, and fixing frontend modal & UI glitches.',
          tags: ['Security', 'Backend Recovery', 'SQL', 'UI/UX Fixes'],
          date: 'Jun 2026',
          image: '/globalvision2000-ss.webp',
        },
        {
          title: 'crown e-commerce',
          role: 'UI/UX & Frontend Developer',
          desc: 'Mock e-commerce platform and editorial UI/UX designed for university coursework, blending vintage aesthetics with responsive modern storefront catalog browsing.',
          tags: ['UI/UX Design', 'Figma', 'HTML/CSS', 'Tailwind'],
          date: 'Nov 2025',
          image: '/crown-ss.webp',
          image2: '/crown-ss2.webp',
        },
        {
          title: 'old boutique',
          role: 'Shopify Developer & UI/UX Designer',
          desc: 'Comprehensive Shopify mobile UI/UX optimization, WCAG accessibility compliance, collection filtering architecture, and minimalist visual overhaul.',
          tags: ['Shopify', 'UI/UX Optimization', 'Liquid', 'E-Commerce'],
          date: 'Aug 2026',
          url: 'https://oldboutique.com.tr/',
          image: '/oldbutik-ss.webp',
        },
      ],
    },
    about: {
      heading: 'about me',
      location: 'Istanbul, TR',
      paragraphs: [
        'I am a bilingual (TR/EN) professional focused on delivering impactful results at both operational and strategic levels across Data-Driven Marketing, Business Development, Data Analysis, and Web Development.',
        'I hold a degree in English Language Teaching from Istanbul Medipol University (2025) and am completing my senior year in New Media and Communications (2026).',
        'Driven by curiosity and a passion for automation, I integrate generative AI and prompt engineering into my workflows to optimize campaigns and development processes.',
      ],
      cvSubject: 'CV Request - Beyzanur Acısu',
    },
    experience: {
      heading: 'experience',
      items: [
        {
          role: 'UI/UX Designer & Frontend Developer',
          company: 'IWW Non-Linear Intelligent Dynamics Conference (UMass Chan)',
          date: 'Mid 2026',
          bullets: [
            'Architected UI/UX for an academic conference platform.',
            'Developed production-ready frontend drafts (HTML/CSS) for backend handoff.',
          ],
        },
        {
          role: 'Technical Consultant & Data Analyst',
          company: 'Global Vision 2000',
          date: 'May 2026 – Ongoing',
          bullets: [
            'Restored site operations by resolving backend lockouts and credential resets.',
            'Executed data analysis on 190K+ email records, segmenting by nationality and domain.',
          ],
        },
        {
          role: 'Marketing and Business Development Intern',
          company: 'Anadolu Agency',
          date: 'Feb 2026',
          bullets: [
            'Synthesized strategy discussions into structured internal reports for senior management.',
          ],
        },
      ],
    },
    skills: {
      heading: 'skills',
      categories: {
        web: {
          title: 'Web & Systems Development',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        },
        data: {
          title: 'Data Analysis & Business Intelligence',
          skills: ['Python', 'SQL', 'Tableau & Power BI', 'IBM SPSS', 'Advanced Excel'],
        },
        ai: {
          title: 'AI, Automation & Design',
          skills: ['Generative AI for Campaigns & HR', 'Prompt Engineering', 'Adobe Creative Suite'],
        },
      },
      certificationsHeading: 'certifications & learning',
      certifications: [
        {
          title: 'Data Analysis School: AI, Machine Learning, Basic Statistics',
          org: 'YÖK (Turkish Higher Education Council)',
        },
        {
          title: 'Data Analyst / Vertex AI Prompt Design',
          org: 'Coursera & Google',
        },
        {
          title: 'Data Science Bootcamp',
          org: 'Kodluyoruz',
        },
        {
          title: 'Organization Coordinator & Volunteer',
          org: 'Genç TEMA',
        },
      ],
    },
    proposal: {
      heading: "let's build together",
      letsBuildHeading: "let's build together",
      subtitle: 'Have a project, role, or collaboration in mind? Request a quick proposal or reach out directly.',
      complete: 'complete',
      stepOf: 'step {step} of 3',
      step1: {
        title: 'what do you need built?',
        desc: 'Select the primary objective for your upcoming project.',
        options: {
          webDesign: {
            label: 'web design',
            desc: 'Modern, high-converting responsive interfaces & UI/UX',
          },
          fullStackApp: {
            label: 'full-stack app',
            desc: 'Scalable web apps, authentication & custom databases',
          },
          dataDashboard: {
            label: 'data dashboard',
            desc: 'Interactive business intelligence, KPIs & live analytics',
          },
        },
      },
      step2: {
        title: 'what is the project scope?',
        tailoredFor: 'Tailored options for',
        options: {
          webDesign: [
            {
              id: 'landing-page',
              label: 'landing page & ui/ux',
              desc: 'High-impact landing pages, responsive layouts & typography',
            },
            {
              id: 'design-system',
              label: 'design system & ui kit',
              desc: 'Reusable component library, tokens & design guidelines',
            },
            {
              id: 'website-redesign',
              label: 'website redesign & audit',
              desc: 'Mobile optimization, accessibility & modern UX overhaul',
            },
          ],
          fullStackApp: [
            {
              id: 'saas-custom-app',
              label: 'saas / custom web app',
              desc: 'End-to-end full-stack web application with React & backend',
            },
            {
              id: 'admin-portal',
              label: 'admin panel & portal',
              desc: 'Role-based access, management dashboards & secure workflows',
            },
            {
              id: 'db-auth',
              label: 'database & auth architecture',
              desc: 'Supabase integration, authentication & custom API logic',
            },
          ],
          dataDashboard: [
            {
              id: 'bi-kpis',
              label: 'business intelligence & kpis',
              desc: 'Interactive executive dashboards & KPI tracking',
            },
            {
              id: 'data-pipeline',
              label: 'data pipeline & cleaning',
              desc: 'Python preprocessing, dataset structuring & ETL automation',
            },
            {
              id: 'data-viz',
              label: 'custom data visualization',
              desc: 'Interactive reporting dashboards, charts & statistical analysis',
            },
          ],
        },
        goBack: 'go back',
      },
      step3: {
        title: 'where should i send the proposal?',
        desc: "I'll prepare a structured breakdown tailored to your selections.",
        emailLabel: 'your email address',
        placeholder: 'your@email.com',
        submitBtn: 'send my proposal',
        submittingBtn: 'preparing proposal...',
        successTitle: 'proposal requested!',
        successDescPart1: 'Thank you! I will review your requirements for',
        successDescPart2: 'and',
        successDescPart3: 'and send a structured proposal to',
        resetBtn: 'start another proposal',
        goBack: 'go back',
      },
      ctas: {
        emailPrefix: 'send an email →',
        linkedin: 'connect on linkedin',
      },
    },
    footer: {
      builtWith: 'built with react, typescript & tailwind css',
      rights: 'all rights reserved.',
    },
  },
  tr: {
    nav: {
      home: 'ana sayfa',
      works: 'projeler',
      skills: 'yetenekler',
      experience: 'deneyim',
      about: 'hakkımda',
      contact: 'iletişim',
      language: 'dil',
      requestCv: 'özgeçmiş iste',
    },
    hero: {
      prefix: 'uzmanlık alanlarım: ',
      words: [
        'veri.',
        'analiz.',
        'web geliştirme.',
        'ui/ux.',
        'pazarlama.',
      ],
    },
    heroCurtain: {
      tagline: 'dijital ürünler geliştiriyor, veri setlerini analiz ediyor ve her ikisini de iş hedefleri için anlamlı hale getiriyorum.',
      contactBtn: 'iletişime geç',
      cvBtn: 'özgeçmişi indir',
    },
    works: {
      heading: 'projeler',
      visitLive: 'canlı incele ↗',
      caseStudy: '</> vaka analizi & detaylar',
      projects: [
        {
          title: 'pedagojikuyku.com',
          role: 'Bağımsız Geliştirici',
          desc: 'Kullanıcı kimlik doğrulaması, Supabase veritabanı ve duyarlı arayüz ile eğitici uyku içerikleri için full-stack web uygulaması.',
          tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
          date: 'Ara 2025',
          url: 'https://pedagojikuyku.com',
          image: '/pedagojikuyku-ss.webp',
        },
        {
          title: 'nevzatyildirim.com',
          role: 'Bağımsız Geliştirici',
          desc: 'Yüksek performans ve editoryal estetiğe odaklanan, Vite ve React ile geliştirilmiş profesyonel portfolyo web sitesi.',
          tags: ['Vite', 'React', 'TypeScript'],
          date: 'May 2026',
          url: 'https://nevzatyildirim.com',
          image: '/nevzatyildirim-ss.webp',
          image2: '/nevzat-yildirim-ss2.webp',
        },
        {
          title: 'gender gap in technology analysis',
          role: 'Veri Analizi Lideri',
          desc: 'Teknik rollerdeki cinsiyet eşitsizliklerini ortaya çıkarmak için 30.000\'den fazla veri noktasının etkileşimli panellerle analizi.',
          tags: ['Python', 'SQL', 'Veri Ön İşleme', 'İstatistiksel Analiz'],
          date: 'Kas 2024',
          image: '/gendergapintech-v1.webp',
        },
        {
          title: 'global email database analysis',
          role: 'Veri Analisti & Araştırmacı',
          desc: "Python kullanarak 190.000'den fazla kayıttan oluşan veri tabanı üzerinde kapsamlı analiz gerçekleştirildi; veriler temizlendi, segmente edildi ve görselleştirildi.",
          tags: ['Python', 'Veri Segmentasyonu', 'Veri Temizleme', 'Analitik'],
          date: 'May 2026',
          image: '/globalvision2000-EMAIL-ANALYSIS.webp',
        },
        {
          title: 'global vision 2000',
          role: 'Teknik Danışman',
          desc: 'Yönetici paneli kilitlenmelerini gidererek, veri tabanı düzeyinde kimlik sıfırlamaları yaparak ve ön yüz modal arayüz hatalarını düzelterek eski sistem operasyonları kurtarıldı.',
          tags: ['Güvenlik', 'Backend Kurtarma', 'SQL', 'UI/UX İyileştirmeleri'],
          date: 'Haz 2026',
          image: '/globalvision2000-ss.webp',
        },
        {
          title: 'crown e-commerce',
          role: 'UI/UX & Frontend Geliştirici',
          desc: 'Üniversite projesi kapsamında geliştirilen, retro-fütüristik editoryal estetik ve duyarlı ürün vitrini mimarisine sahip e-ticaret konsepti.',
          tags: ['UI/UX Tasarım', 'Figma', 'HTML/CSS', 'Tailwind'],
          date: 'Kas 2025',
          image: '/crown-ss.webp',
          image2: '/crown-ss2.webp',
        },
        {
          title: 'old boutique',
          role: 'Shopify Geliştirici & UI/UX Tasarımcı',
          desc: 'Shopify mobil UI/UX optimizasyonu, WCAG erişilebilirlik standartları uyumu, filtreleme altyapısı ve minimalist arayüz modernizasyonu.',
          tags: ['Shopify', 'UI/UX Optimizasyon', 'Liquid', 'E-Ticaret'],
          date: 'Ağu 2026',
          url: 'https://oldboutique.com.tr/',
          image: '/oldbutik-ss.webp',
        },
      ],
    },
    about: {
      heading: 'hakkımda',
      location: 'İstanbul, TR',
      paragraphs: [
        'Veri Odaklı Pazarlama, İş Geliştirme, Veri Analizi ve Web Geliştirme alanlarında hem operasyonel hem de stratejik düzeyde somut ve etkili sonuçlar sunmaya odaklanan iki dilli (TR/EN) bir profesyonelim.',
        'İstanbul Medipol Üniversitesi İngilizce Öğretmenliği (2025) mezunuyum ve Yeni Medya ve İletişim bölümünde son sınıfımı (2026) tamamlamaktayım.',
        'Merak ve otomasyon tutkusuyla, kampanyaları ve geliştirme süreçlerini optimize etmek için üretken yapay zeka ile prompt mühendisliğini iş akışlarıma entegre ediyorum.',
      ],
      cvSubject: 'Özgeçmiş Talebi - Beyzanur Acısu',
    },
    experience: {
      heading: 'deneyim',
      items: [
        {
          role: 'UI/UX Tasarımcı & Frontend Geliştirici',
          company: 'IWW Non-Linear Intelligent Dynamics Conference (UMass Chan)',
          date: 'Haziran 2026',
          bullets: [
            'Akademik konferans platformu için UI/UX mimarisini tasarladı.',
            'Backend entegrasyonu için üretime hazır frontend taslakları (HTML/CSS) geliştirdi.',
          ],
        },
        {
          role: 'Teknik Danışman & Veri Analisti',
          company: 'Global Vision 2000',
          date: 'Mayıs 2026 – Ağustos 2026',
          bullets: [
            'Backend erişim kilitlerini ve kimlik sıfırlamalarını çözerek site operasyonlarını yeniden başlattı.',
            '190 binden fazla e-posta kaydı üzerinde veri analizi yaparak uyruk ve alan adına göre segmentasyon gerçekleştirdi.',
          ],
        },
        {
          role: 'Pazarlama ve İş Geliştirme Stajyeri',
          company: 'Anadolu Ajansı',
          date: 'Şubat 2026',
          bullets: [
            'Strateji toplantılarını üst yönetim için yapılandırılmış iç raporlar halinde derledi.',
          ],
        },
      ],
    },
    skills: {
      heading: 'yetenekler',
      categories: {
        web: {
          title: 'Web & Sistem Geliştirme',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        },
        data: {
          title: 'Veri Analizi & İş Zekası',
          skills: ['Python', 'SQL', 'Tableau & Power BI', 'IBM SPSS', 'İleri Düzey Excel'],
        },
        ai: {
          title: 'Yapay Zeka, Otomasyon & Tasarım',
          skills: ['Kampanyalar ve İK için Üretken YZ', 'Prompt Mühendisliği', 'Adobe Creative Suite'],
        },
      },
      certificationsHeading: 'sertifikalar & eğitimler',
      certifications: [
        {
          title: 'Veri Analizi Okulu: YZ, Makine Öğrenimi, Temel İstatistik',
          org: 'YÖK (Yükseköğretim Kurulu)',
        },
        {
          title: 'Veri Analisti / Vertex AI Prompt Tasarımı',
          org: 'Coursera & Google',
        },
        {
          title: 'Veri Bilimi Bootcamp\'i',
          org: 'Kodluyoruz',
        },
        {
          title: 'Organizasyon Koordinatörü & Gönüllü',
          org: 'Genç TEMA',
        },
      ],
    },
    proposal: {
      heading: 'birlikte inşa edelim',
      letsBuildHeading: 'birlikte inşa edelim',
      subtitle: 'Aklınızda bir proje, pozisyon veya iş birliği mi var? Hızlıca teklif isteyin veya doğrudan iletişime geçin.',
      complete: 'tamamlandı',
      stepOf: 'adım {step} / 3',
      step1: {
        title: 'ne inşa etmek istiyorsunuz?',
        desc: 'Yaklaşan projeniz için temel hedefi seçin.',
        options: {
          webDesign: {
            label: 'web tasarım',
            desc: 'Modern, dönüşüm odaklı duyarlı arayüzler ve UI/UX',
          },
          fullStackApp: {
            label: 'full-stack uygulama',
            desc: 'Ölçeklenebilir web uygulamaları, kimlik doğrulama & özel veritabanları',
          },
          dataDashboard: {
            label: 'veri paneli',
            desc: 'Etkileşimli iş zekası, KPI\'lar & canlı analizler',
          },
        },
      },
      step2: {
        title: 'proje kapsamı nedir?',
        tailoredFor: 'için özel seçenekler',
        options: {
          webDesign: [
            {
              id: 'landing-page',
              label: 'açılış sayfası & ui/ux',
              desc: 'Yüksek etkili açılış sayfaları, duyarlı düzenler & tipografi',
            },
            {
              id: 'design-system',
              label: 'tasarım sistemi & ui kiti',
              desc: 'Yeniden kullanılabilir bileşen kütüphanesi, belirteçler & tasarım kuralları',
            },
            {
              id: 'website-redesign',
              label: 'web sitesi yenileme & denetim',
              desc: 'Mobil optimizasyon, erişilebilirlik & modern UX revizyonu',
            },
          ],
          fullStackApp: [
            {
              id: 'saas-custom-app',
              label: 'saas / özel web uygulaması',
              desc: 'React & backend ile uçtan uca full-stack web uygulaması',
            },
            {
              id: 'admin-portal',
              label: 'yönetim paneli & portal',
              desc: 'Rol tabanlı erişim, yönetim panelleri & güvenli iş akışları',
            },
            {
              id: 'db-auth',
              label: 'veritabanı & kimlik doğrulama mimarisi',
              desc: 'Supabase entegrasyonu, kimlik doğrulama & özel API mantığı',
            },
          ],
          dataDashboard: [
            {
              id: 'bi-kpis',
              label: 'iş zekası & kpi\'lar',
              desc: 'Etkileşimli yönetici panelleri & KPI takibi',
            },
            {
              id: 'data-pipeline',
              label: 'veri hattı & temizleme',
              desc: 'Python ön işleme, veri seti yapılandırma & ETL otomasyonu',
            },
            {
              id: 'data-viz',
              label: 'özel veri görselleştirme',
              desc: 'Etkileşimli raporlama panelleri, grafikler & istatistiksel analiz',
            },
          ],
        },
        goBack: 'geri dön',
      },
      step3: {
        title: 'teklifi nereye göndereyim?',
        desc: 'Seçimlerinize özel yapılandırılmış bir döküm hazırlayacağım.',
        emailLabel: 'e-posta adresiniz',
        placeholder: 'ornek@eposta.com',
        submitBtn: 'teklifimi gönder',
        submittingBtn: 'teklif hazırlanıyor...',
        successTitle: 'teklif talebi alındı!',
        successDescPart1: 'Teşekkürler!',
        successDescPart2: 've',
        successDescPart3: 'için gereksinimlerinizi inceleyip kısa süre içinde detaylı bir teklif ileteceğim:',
        resetBtn: 'yeni bir teklif başlat',
        goBack: 'geri dön',
      },
      ctas: {
        emailPrefix: 'e-posta gönder →',
        linkedin: "linkedin'de bağlantı kur",
      },
    },
    footer: {
      builtWith: 'react, typescript ve tailwind css ile geliştirildi',
      rights: 'tüm hakları saklıdır.',
    },
  },
};

export default translations;
