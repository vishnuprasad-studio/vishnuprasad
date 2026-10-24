import resumeAsset from "@/assets/Vishnu_Prasad_UIUX.pdf.asset.json";

export const PROFILE = {
  name: "Vishnu Prasad",
  firstName: "Vishnu",
  role: "Senior UI/UX Designer — Enterprise Web & Product Applications",
  email: "vishnuprasad5684@gmail.com",
  phone: "+91 9746249297",
  phoneHref: "tel:+919746249297",
  location: "Kochi, Kerala, India",
  resume: resumeAsset.url,
  summary:
    "UI/UX Designer with 4+ years of experience designing applications with real functional complexity: dashboards, workflows, and multi-role systems. Portfolio includes a government platform redesign serving 500,000+ users across 20+ modules and a 4-platform transit ecosystem. Strong Figma command across component libraries, variants, interactive prototyping, and design systems. Works alongside developers through design handoff and build, and explains design decisions clearly to clients, stakeholders, and leadership.",
  links: [
    { label: "GitHub", href: "https://github.com/enchanter56" },
    { label: "LinkedIn", href: "https://linkedin.com/in/vishnuprasad56" },
    { label: "Behance", href: "https://behance.net/vishnuprasad109" },
    { label: "Linktree", href: "https://linktr.ee/vis.hnu_prasad" },
  ],
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export type Skill = {
  name: string;
  symbol: string;
  family: string;
  projectNote?: string;
  note?: string;
};

export const SKILL_GROUPS: { name: string; skills: Skill[] }[] = [
  {
    name: "Product design",
    skills: [
      { name: "Figma", symbol: "Fg", family: "Product design", projectNote: "Named in the SPARK 2.0 and Zodi Mithra design-system work.", note: "Primary design tool across every project in the résumé." },
      { name: "Components", symbol: "Co", family: "Product design", note: "Reusable component libraries delivered on SPARK 2.0 and OneDI, still supporting design operations after handoff." },
      { name: "Variants", symbol: "Va", family: "Product design", note: "Component variants inside shared style guides, including the Zodi Mithra design system." },
      { name: "Interactive prototyping", symbol: "Pr", family: "Product design", note: "Interactive prototypes built as part of the OneDI end-to-end design process." },
      { name: "Low/high-fidelity wireframing", symbol: "Wi", family: "Product design", note: "Wireframes carried from research through prototyping and usability review on OneDI." },
      { name: "Annotated wireframes", symbol: "An", family: "Product design", note: "Created for the Zavinos product configurator to guide the purchase journey." },
      { name: "User flows", symbol: "Uf", family: "Product design", note: "Mapped for Zavinos, balancing brand feel with usability to reduce purchase friction." },
      { name: "UX research & usability studies", symbol: "Ux", family: "Product design", note: "Research and usability reviews anchored the OneDI end-to-end design process." },
      { name: "Information architecture", symbol: "Ia", family: "Product design", note: "Structured across 20+ modules of the SPARK 2.0 government platform redesign." },
      { name: "Visual hierarchy", symbol: "Vh", family: "Product design", note: "Applied with typography and colour theory across SPARK 2.0's modules." },
      { name: "Typography", symbol: "Ty", family: "Product design", note: "Applied alongside colour theory and WCAG 2.1 AA standards on SPARK 2.0." },
      { name: "Colour theory", symbol: "Ct", family: "Product design", note: "Applied with typography and WCAG 2.1 AA accessibility standards on SPARK 2.0." },
      { name: "eCommerce design", symbol: "Ec", family: "Product design", note: "Conversion-focused homepage and made-to-measure flow for the Zavinos store." },
    ],
  },
  {
    name: "Design systems",
    skills: [
      { name: "Design system architecture", symbol: "Ds", family: "Design systems", note: "Architected the scalable Figma design system for SPARK 2.0, later adopted across future government web applications." },
      { name: "UI libraries", symbol: "Ui", family: "Design systems", note: "Built a UI library that helped reduce UI inconsistencies by 85%." },
      { name: "Design tokens", symbol: "Dt", family: "Design systems", note: "Standardized tokens that helped cut design time by 50%." },
      { name: "Component variants", symbol: "Cv", family: "Design systems", note: "Reusable variants across the Zodi Mithra shared style guide." },
      { name: "WCAG 2.1 AA", symbol: "Wa", family: "Design systems", note: "Accessibility standard applied across all 20+ SPARK 2.0 modules for 500,000+ users." },
    ],
  },
  {
    name: "Front-end",
    skills: [
      { name: "HTML5", symbol: "H5", family: "Front-end", note: "Front-end foundation used to check build feasibility with developers before handoff." },
      { name: "CSS3", symbol: "C3", family: "Front-end", note: "Supports handoff-ready specs and feasibility checks with developers." },
      { name: "Tailwind CSS", symbol: "Tw", family: "Front-end", note: "Utility-first styling knowledge, backed by the Tailwind UI certification." },
      { name: "JavaScript (working knowledge)", symbol: "Js", family: "Front-end", note: "Working knowledge, enough to speak precisely with developers during handoff." },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Adobe Creative Suite", symbol: "Ad", family: "Tools", note: "Day-to-day tools for visual asset creation, certified in Photoshop and Illustrator." },
      { name: "Illustrator", symbol: "Ai", family: "Tools", note: "Certified through the Adobe Photoshop and Illustrator certification." },
      { name: "Photoshop", symbol: "Ps", family: "Tools", note: "Certified alongside Illustrator; used for brand and campaign assets." },
      { name: "Sketch", symbol: "Sk", family: "Tools", note: "Vector-based UI design tool used for interface and wireframe work." },
      { name: "InVision", symbol: "Iv", family: "Tools", note: "Prototyping tool used for interactive mockups and client validation." },
    ],
  },
  {
    name: "Collaboration",
    skills: [
      { name: "Stakeholder presentations", symbol: "Sp", family: "Collaboration", note: "Presented design decisions and rationale to stakeholders across departments on SPARK 2.0." },
      { name: "Design rationale & decision advocacy", symbol: "Dr", family: "Collaboration", note: "Explained design decisions clearly to clients, stakeholders, and leadership." },
      { name: "Developer & QA handoff", symbol: "Dh", family: "Collaboration", note: "Delivered thorough handoffs and checked build feasibility with developers." },
      { name: "Agile sprints", symbol: "Ag", family: "Collaboration", note: "Delivered design work within sprint-based product teams." },
      { name: "Sole-designer ownership", symbol: "So", family: "Collaboration", note: "Owned the full design workload solo across the OneDI transit ecosystem." },
    ],
  },
];

export const PROJECTS = [
  {
    title: "SPARK 2.0",
    category: "Government platform · Enterprise system redesign",
    description: "Redesigned 20+ modules for 500,000+ users, streamlining workflows and applying WCAG 2.1 AA accessibility standards. Migrated a legacy UI to a modern, component-based Figma design system.",
    features: ["20+ platform modules", "500,000+ users", "WCAG 2.1 AA", "Reusable Figma system"],
    visual: "systems",
    role: "National Informatics Center · Design lead",
    metrics: [{ value: "500K+", label: "users served" }, { value: "20+", label: "modules redesigned" }, { value: "85%", label: "fewer UI inconsistencies" }],
  },
  {
    title: "OneDI Transit Ecosystem",
    category: "Transit · Four connected platforms",
    description: "Designed a unified, responsive experience across 4 interconnected platforms with a 95% QR-ticketing success rate. Built a scalable component library supporting multiple user roles.",
    features: ["QR ticketing", "Payments", "Fleet management", "Multiple user roles"],
    visual: "transit",
    role: "Technovia · Sole designer",
    metrics: [{ value: "4", label: "connected platforms" }, { value: "95%", label: "QR-ticketing success" }, { value: "40%", label: "fewer revision cycles" }],
  },
  {
    title: "Zodi Mithra",
    category: "Product workspace · Design lead",
    description: "Built bento-style dashboards and consultant-facing workspaces on a component-based Figma design system with reusable variants and a shared style guide.",
    features: ["Bento-style dashboards", "Consultant workspaces", "Reusable variants", "Shared style guide"],
    visual: "workspace",
    role: "Thriveminds · Design lead",
    metrics: [{ value: "Bento", label: "dashboard system" }, { value: "Figma", label: "reusable variants" }, { value: "1", label: "shared style guide" }],
  },
  {
    title: "Zavinos",
    category: "Premium eCommerce · Made-to-measure",
    description: "Led UX and UI design for an ultra-premium DTC e-commerce website, creating a conversion-focused homepage and a custom made-to-measure purchase flow. Created user flows and annotated wireframes for its product configurator.",
    features: ["Custom purchase flow", "Product configurator", "User flows", "Annotated wireframes"],
    visual: "commerce",
    role: "Thriveminds · UX & UI lead",
    metrics: [{ value: "DTC", label: "ultra-premium store" }, { value: "MTM", label: "made-to-measure flow" }, { value: "Flows", label: "annotated wireframes" }],
  },
  {
    title: "Lexanber",
    category: "Product design · Design handoff",
    description: "Worked with developers on design handoff and iterated on layout and interaction paths for a core product page, based on user feedback and design-system updates.",
    features: ["Core product page", "Developer handoff", "User feedback", "Design-system updates"],
    visual: "product",
    role: "Thriveminds · UI/UX designer",
    metrics: [{ value: "Handoff", label: "with developers" }, { value: "Iterated", label: "layout & interactions" }, { value: "Feedback", label: "user-driven updates" }],
  },
];

export const CERTIFICATIONS = [
  "Tailwind UI",
  "Adobe Photoshop and Illustrator",
  "User Flow, Task Flow, and Prototyping",
  "Programming using HTML & CSS",
];

export const EXPERIENCE = [
  {
    dates: "Jan 2026 – Present",
    role: "UI/UX Designer",
    company: "Thriveminds Technologies Pvt Ltd",
    location: "Kochi, Kerala, India",
    details: [
      "Design lead for Zodi Mithra, building bento-style dashboards and consultant-facing workspaces on a component-based Figma design system with reusable variants and a shared style guide.",
      "Led UX and UI design for Zavinos, an ultra-premium DTC e-commerce website, creating a conversion-focused homepage and a custom made-to-measure purchase flow.",
      "Created user flows and annotated wireframes for the product configurator, balancing brand feel with usability to reduce friction in the purchase journey.",
      "Worked with developers on design handoff and iterated on layout and interaction paths for a core product page on Lexanber, based on user feedback and design-system updates.",
    ],
  },
  {
    dates: "Apr 2025 – Dec 2025",
    role: "UI/UX Designer",
    company: "National Informatics Center",
    location: "Thiruvananthapuram, Kerala, India",
    details: [
      "Led the complete UX redesign of a government web platform serving 500,000+ users across 20+ modules, presenting design decisions and rationale to stakeholders across departments.",
      "Architected a scalable Figma design system and UI library, and directed design-development collaboration by checking feasibility with developers and delivering thorough handoffs.",
      "Reduced UI inconsistencies by 85% by establishing reusable design standards later adopted across future government web applications.",
      "Applied design principles, typography, and colour theory alongside WCAG 2.1 AA accessibility standards across all modules.",
    ],
  },
  {
    dates: "Dec 2024 – Feb 2025",
    role: "Graphic Designer (Freelance)",
    company: "CareBharth Insurance Brokers Pvt Ltd",
    location: "Kochi, Kerala, India · evenings/weekends alongside full-time role",
    details: [
      "Designed marketing campaigns that increased social media engagement by 25%, with visual assets optimized for SEO and brand visibility.",
    ],
  },
  {
    dates: "May 2023 – Mar 2025",
    role: "UI/UX Designer",
    company: "Technovia Info Solutions Pvt Ltd",
    location: "Kochi, Kerala, India",
    details: [
      "Sole designer for the OneDI transit ecosystem, setting design standards across 4 interconnected, data-driven platforms covering QR ticketing, payments, and fleet management.",
      "Built an end-to-end design process (research, wireframes, interactive prototyping, usability review) that cut revision cycles by 40%.",
      "Delivered scalable, reusable component libraries within a shared design system that kept supporting the company's design operations after handoff.",
    ],
  },
  {
    dates: "Mar 2020 – Jun 2021",
    role: "UI/UX & Graphic Designer",
    company: "Hadhi's Print Shop",
    location: "Idukki, India",
    details: [
      "Developed branding systems and design workflows across 15+ client projects spanning digital and print.",
      "Created interactive mockups for client validation, improving approval rates and satisfaction.",
    ],
  },
];

export const EDUCATION = [
  { degree: "Master of Computer Applications", school: "MG University, Ernakulam, India", dates: "2021 – 2023" },
  { degree: "Bachelor of Computer Applications", school: "MG University, Idukki, India", dates: "2018 – 2020" },
];

export const ACHIEVEMENTS = [
  { value: "500,000+", label: "Users reached by the redesigned government platform.", index: "01" },
  { value: "85%", label: "Reduction in UI inconsistencies after reusable standards were introduced.", index: "02" },
  { value: "95%", label: "QR-ticketing success rate across the OneDI transit ecosystem.", index: "03" },
  { value: "40%", label: "Fewer revision cycles after building an end-to-end design process.", index: "04" },
  { value: "50%", label: "Less design time through reusable libraries and standardized tokens.", index: "05" },
  { value: "25%", label: "Increase in social media engagement from marketing campaigns.", index: "06" },
];
