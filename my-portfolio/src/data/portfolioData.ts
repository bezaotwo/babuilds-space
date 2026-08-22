export interface Project {
    title: string;
    role: string;
    desc: string;
    tags: string[];
    date?: string;
    url?: string;
    image?: string;
    image2?: string;
}

export interface Skills {
    web: string[];
    data: string[];
    ai: string[];
}

export interface Experience {
    role: string;
    company: string;
    date: string;
    bullets: string[];
}

export interface Certification {
    title: string;
    org: string;
}

export interface PortfolioData {
    name: string;
    tagline: string;
    email: string;
    linkedin: string;
    github: string;
    heroWords: string[];
    about: {
        p1: string;
        p2: string;
        p3: string;
    };
    projects: Project[];
    experiences: Experience[];
    skills: Skills;
    certifications: Certification[];
}

export const portfolioData: PortfolioData = {
    name: "Beyzanur Acısu",
    tagline: "i build digital products, analyze datasets, and make both make sense for business.",
    email: "acisubeyzanur@gmail.com",
    linkedin: "https://www.linkedin.com/in/beyzanur-acisu-722163207/",
    github: "https://github.com/bezaotwo",
    heroWords: ["data.", "analysis.", "web development.", "ui/ux.", "marketing."],
    about: {
        p1: "I am a bilingual (TR/EN) professional focused on delivering impactful results at both operational and strategic levels across Data-Driven Marketing, Business Development, Data Analysis, and Web Development.",
        p2: "I hold a degree in English Language Teaching from Istanbul Medipol University (2025) and am completing my senior year in New Media and Communications (2026).",
        p3: "Driven by curiosity and a passion for automation, I integrate generative AI and prompt engineering into my workflows to optimize campaigns and development processes."
    },
    projects: [
        {
            title: "pedagojikuyku.com",
            role: "Independent Developer",
            desc: "Full-stack web application for educational sleep content with user auth, Supabase database, and responsive UI.",
            tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
            date: "Dec 2025",
            url: "https://pedagojikuyku.com",
            image: "/pedagojikuyku-ss.webp"
        },
        {
            title: "nevzatyildirim.com",
            role: "Independent Developer",
            desc: "Professional portfolio website built with Vite and React focusing on performance and editorial aesthetics.",
            tags: ["Vite", "React", "TypeScript"],
            date: "May 2026",
            url: "https://nevzatyildirim.com",
            image: "/nevzatyildirim-ss.webp",
            image2: "/nevzat-yildirim-ss2.webp"
        },
        {
            title: "Gender Gap in Technology Analysis",
            role: "Data Analysis Lead",
            desc: "Examined over 30,000 data points to reveal gender disparities in technical roles with interactive dashboards.",
            tags: ["Python", "SQL", "Data Preprocessing", "Statistical Analysis"],
            date: "Nov 2024",
            image: "/gendergapintech-v1.webp"
        },
        {
            title: "Global Email Database Analysis",
            role: "Data Analyst & Researcher",
            desc: "Executed large-scale data analysis on a database of 190,000+ records using Python. Cleaned, segmented, and visualized records by domain, active status, and behavioral intent.",
            tags: ["Python", "Data Segmentation", "Data Cleaning", "Analytics"],
            date: "May 2026",
            image: "/globalvision2000-EMAIL-ANALYSIS.webp"
        },
        {
            title: "Global Vision 2000",
            role: "Technical Consultant",
            desc: "Restored legacy platform operations by resolving backend admin lockouts, executing database-level credential resets, and fixing frontend modal & UI glitches.",
            tags: ["Security", "Backend Recovery", "SQL", "UI/UX Fixes"],
            date: "Jun 2026",
            image: "/globalvision2000-ss.webp"
        },
        {
            title: "Crown E-Commerce",
            role: "UI/UX & Frontend Developer",
            desc: "Mock e-commerce platform and editorial UI/UX designed for university coursework, blending vintage aesthetics with responsive modern storefront catalog browsing.",
            tags: ["UI/UX Design", "Figma", "HTML/CSS", "Tailwind"],
            date: "Nov 2025",
            image: "/crown-ss.webp",
            image2: "/crown-ss2.webp"
        },
        {
            title: "Old Boutique",
            role: "Shopify Developer & UI/UX Designer",
            desc: "Comprehensive Shopify mobile UI/UX optimization, WCAG accessibility compliance, collection filtering architecture, and minimalist visual overhaul.",
            tags: ["Shopify", "UI/UX Optimization", "Liquid", "E-Commerce"],
            date: "Aug 2026",
            url: "https://oldboutique.com.tr/",
            image: "/oldbutik-ss.webp"
        }
    ],
    experiences: [
        {
            role: "UI/UX Designer & Frontend Developer",
            company: "IWW Non-Linear Intelligent Dynamics Conference (UMass Chan)",
            date: "June 2026",
            bullets: [
                "Architected UI/UX for an academic conference platform.",
                "Developed production-ready frontend drafts (HTML/CSS) for backend handoff."
            ]
        },
        {
            role: "Technical Consultant & Data Analyst",
            company: "Global Vision 2000",
            date: "May 2026 – Aug 2026",
            bullets: [
                "Restored site operations by resolving backend lockouts and credential resets.",
                "Executed data analysis on 190K+ email records, segmenting by nationality and domain."
            ]
        },
        {
            role: "Marketing and Business Development Intern",
            company: "Anadolu Agency",
            date: "Feb 2026",
            bullets: ["Synthesized strategy discussions into structured internal reports for senior management."]
        }
    ],
    skills: {
        web: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
        data: ["Python", "SQL", "Tableau & Power BI", "IBM SPSS", "Advanced Excel"],
        ai: ["Generative AI for Campaigns & HR", "Prompt Engineering", "Adobe Creative Suite"]
    },
    certifications: [
        { title: "Data Analysis School: AI, Machine Learning, Basic Statistics", org: "YÖK (Turkish Higher Education Council)" },
        { title: "Data Analyst / Vertex AI Prompt Design", org: "Coursera & Google" },
        { title: "Data Science Bootcamp", org: "Kodluyoruz" },
        { title: "Organization Coordinator & Volunteer", org: "Genç TEMA" }
    ]
};

export default portfolioData;