import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import heroMp4 from "@/assets/hero.mp4.asset.json";
import heroWebm from "@/assets/hero.webm.asset.json";
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  NAV,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  type Skill,
} from "@/lib/data";

const sections = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];
const families = ["All", ...SKILL_GROUPS.map((group) => group.name)];
const allSkills = SKILL_GROUPS.flatMap((group) => group.skills);
const socialIcons: Record<string, typeof Github> = { GitHub: Github, LinkedIn: Linkedin, Behance: ExternalLink, Linktree: ExternalLink };

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <p className="section-kicker"><span>{number}</span><span>—</span><span>{label}</span></p>;
}

function useReveals() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function ProjectIllustration({ type }: { type: string }) {
  return (
    <div className={`project-visual project-visual-${type}`} aria-label="Illustrative UI, not an original project screenshot">
      <div className="visual-window" aria-hidden="true">
        <div className="visual-bar"><i /><i /><i /></div>
        <div className="visual-body">
          <div className="visual-side"><i className="visual-line" /><i className="visual-line" /><i className="visual-line" /><i className="visual-line" /></div>
          <div className="visual-content"><i className="visual-line" /><i className="visual-line" /><div className="visual-chart"><i /><i /><i /><i /><i /><i /></div></div>
        </div>
      </div>
      <span className="visual-caption">Illustrative UI</span>
    </div>
  );
}

export function Portfolio() {
  useReveals();
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const [soundAvailable, setSoundAvailable] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(allSkills[0] ?? { name: "", symbol: "", family: "" });
  const [expandedProject, setExpandedProject] = useState(0);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const skillIndex = useMemo(() => allSkills.indexOf(selectedSkill) + 1, [selectedSkill]);

  useEffect(() => {
    const targets = sections.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    targets.forEach((target) => observer.observe(target));
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(100, Math.max(0, (window.scrollY / distance) * 100)) : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = heroRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.intersectionRatio < 0.35) video.pause();
      else if (video.paused) void video.play().catch(() => undefined);
    }, { threshold: [0, 0.35, 0.6] });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const changeSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      try {
        await video.play();
        setPlayingSound(true);
      } catch {
        video.muted = true;
        setPlayingSound(false);
        setSoundAvailable(false);
      }
    } else {
      video.muted = true;
      setPlayingSound(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const navLinks = (onNavigate?: () => void, mobile = false) => NAV.map((item, index) => {
    const id = item.href.slice(1);
    return (
      <a
        key={id}
        className={mobile ? "mobile-nav-link" : "nav-link"}
        data-active={activeSection === id}
        href={item.href}
        style={mobile ? { transitionDelay: `${menuOpen ? index * 55 : 0}ms` } : undefined}
        onClick={onNavigate}
      >
        {mobile && <small>{String(index + 1).padStart(2, "0")}</small>}{item.label}
      </a>
    );
  });

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="page-shell header-inner">
          <a className="brand-link" href="#top" aria-label={`${PROFILE.name}, back to top`}>
            <span className="brand-mark">VP</span><span>{PROFILE.name}</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">{navLinks()}</nav>
          <button className="mobile-menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-label="Open menu"><Menu size={15} />Menu</button>
        </div>
      </header>
      <nav className="mobile-nav" data-open={menuOpen} aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-nav-top"><span className="eyebrow">Navigation</span><button className="mobile-nav-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
        {navLinks(() => setMenuOpen(false), true)}
      </nav>

      <main id="top">
        <section className="hero" ref={heroRef} aria-labelledby="hero-heading">
          <div className="page-shell hero-layout">
            <div className="hero-copy">
              <div className="hero-overline"><i className="availability-dot" aria-hidden="true" />Portfolio · Kochi, Kerala, India</div>
              <h1 id="hero-heading"><span>Vishnu</span><span>Prasad.</span></h1>
              <p className="hero-role">Senior UI/UX Designer — Enterprise Web & Product Applications</p>
              <div className="hero-actions">
                <a className="pill-link pill-link-primary" href="#work">Explore work <ArrowDown size={14} /></a>
                <a className="pill-link pill-link-secondary" href="#contact">Let’s talk <ArrowRight size={14} /></a>
                <a className="pill-link pill-link-secondary" href={PROFILE.resume} download>Résumé <Download size={14} /></a>
              </div>
              <div className="hero-meta"><div><span>Focus</span>Product & enterprise UX</div><div><span>Experience</span>4+ years</div></div>
            </div>
            <div className="hero-visual">
              <span className="hero-ghost" aria-hidden="true">VISHNU</span>
              <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Vishnu Prasad introducing himself"
                onCanPlay={(event) => { void event.currentTarget.play().catch(() => undefined); }}
                onVolumeChange={(event) => setPlayingSound(!event.currentTarget.muted)}
                onError={() => setSoundAvailable(false)}
              >
                <source src={heroWebm.url} type="video/webm" /><source src={heroMp4.url} type="video/mp4" />
              </video>
              <button className="hero-player-toggle" type="button" onClick={() => void changeSound()} aria-label={playingSound ? "Mute introduction video" : "Play introduction video sound"} data-pulse={!playingSound && soundAvailable} title={playingSound ? "Mute introduction video" : "Play introduction video sound"}>
                {playingSound ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              </button>
            </div>
            <a className="hero-scroll-cue" href="#about">Scroll to explore <ArrowDown size={13} /></a>
          </div>
        </section>

        <section className="about-section section-wrap section-space" id="about" aria-labelledby="about-heading">
          <div className="page-shell">
            <div className="reveal"><SectionLabel number="01" label="About" /><h2 className="section-heading" id="about-heading">Thoughtful work,<br /><em>built for people.</em></h2></div>
            <div className="about-grid">
              <div className="about-copy reveal" style={{ "--reveal-order": 1 } as React.CSSProperties}>
                <p className="about-highlight">Hi, I’m {PROFILE.firstName}.</p>
                <p>{PROFILE.summary}</p>
                <div className="about-links">
                  <a className="pill-link pill-link-primary" href={PROFILE.resume} download>Résumé <Download size={14} /></a>
                  {PROFILE.links.filter((link) => link.label === "GitHub" || link.label === "LinkedIn").map((link) => {
                    const Icon = socialIcons[link.label] ?? ExternalLink;
                    return <a key={link.label} className="pill-link pill-link-secondary" href={link.href} target="_blank" rel="noreferrer">{link.label} <Icon size={14} /></a>;
                  })}
                </div>
              </div>
              <aside className="about-facts reveal" style={{ "--reveal-order": 2 } as React.CSSProperties}>
                <p className="facts-title">A few details</p>
                <div className="fact-row"><span>Location</span><span>{PROFILE.location}</span></div>
                <div className="fact-row"><span>Education</span><span>Master of Computer Applications<br />MG University · 2021–2023</span></div>
                <div className="fact-row"><span>Current role</span><span>UI/UX Designer<br />Thriveminds Technologies</span></div>
                <div className="fact-row"><span>Email</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
                <blockquote className="about-note">“Designing for real functional complexity, and bringing the thinking through to handoff and build.”</blockquote>
              </aside>
            </div>
          </div>
        </section>

        <section className="skills-section section-wrap section-space" id="skills" aria-labelledby="skills-heading">
          <div className="page-shell">
            <div className="reveal"><SectionLabel number="02" label="Skills" /><h2 className="section-heading" id="skills-heading">My working<br /><em>vocabulary.</em></h2><p className="section-intro">A practice shaped by product design, accessible systems, and close collaboration.</p></div>
            <div className="skill-controls" aria-label="Filter skills by family">
              {families.map((family) => <button className="filter-chip" type="button" key={family} data-selected={selectedFamily === family} aria-pressed={selectedFamily === family} onClick={() => { setSelectedFamily(family); const first = allSkills.find((s) => family === "All" || s.family === family); if (first) setSelectedSkill(first); }}>{family}</button>)}
            </div>
            <div className="skills-layout">
              <div className="skill-grid" aria-label="Skills">
                {allSkills.filter((skill) => selectedFamily === "All" || skill.family === selectedFamily).map((skill, index) => (
                  <button
                    type="button"
                    className="skill-tile"
                    key={skill.name}
                    style={{ "--tile-order": index } as React.CSSProperties}
                                        aria-pressed={selectedSkill.name === skill.name}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    onFocus={() => setSelectedSkill(skill)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <span className="skill-number">{String(index + 1).padStart(2, "0")}</span><span className="skill-symbol">{skill.symbol}</span><span className="skill-name">{skill.name}</span>
                  </button>
                ))}
              </div>
              <aside className="skill-inspector" aria-live="polite">
                <span className="inspector-index">SKILL {String(skillIndex).padStart(2, "0")} / {String(allSkills.length).padStart(2, "0")}</span>
                <span className="inspector-symbol" aria-hidden="true">{selectedSkill.symbol}</span>
                <h3>{selectedSkill.name}</h3>
                <p className="inspector-family">{selectedSkill.family}</p>
                <p className="inspector-note">{selectedSkill.projectNote ?? "Listed in the résumé’s skills and tools."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="work-section section-wrap section-space" id="work" aria-labelledby="work-heading">
          <div className="page-shell">
            <div className="reveal"><SectionLabel number="03" label="Selected work" /><h2 className="section-heading" id="work-heading">A closer look<br /><em>at the work.</em></h2><p className="section-intro">Selected product design work and outcomes drawn directly from the résumé.</p></div>
            <div className="work-gallery" aria-label="Selected projects">
              {PROJECTS.map((project, index) => (
                <button type="button" className="project-panel" data-expanded={expandedProject === index} aria-expanded={expandedProject === index} aria-label={`${project.title}: ${expandedProject === index ? "selected" : "show project details"}`} key={project.title} onMouseEnter={() => setExpandedProject(index)} onFocus={() => setExpandedProject(index)} onClick={() => setExpandedProject(index)}>
                  <span className="project-topline"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">{expandedProject === index ? "−" : "+"}</span></span>
                  <span className="project-collapsed"><strong>{project.title}</strong><ArrowUpRight size={16} /></span>
                  <span className="project-open">
                    <span><span className="project-kicker">{project.category}</span><span className="project-open-title"><span className="sr-only">{project.title}</span></span><h3 aria-hidden="true">{project.title}</h3><p>{project.description}</p><span className="project-features">{project.features.map((feature) => <span className="project-feature" key={feature}>{feature}</span>)}</span></span>
                    <span className="case-study" aria-label="Case study summary"><span className="case-role">{project.role}</span>{project.metrics.map((metric) => <span className="case-metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></span>)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="cert-section section-wrap section-space" id="certifications" aria-labelledby="cert-heading">
          <div className="page-shell cert-layout">
            <div className="cert-aside reveal"><SectionLabel number="04" label="Certifications" /><h2 className="section-heading" id="cert-heading">Always<br /><em>learning.</em></h2><p className="cert-count">{String(CERTIFICATIONS.length).padStart(2, "0")} listed in the résumé</p></div>
            <div className="cert-list reveal" style={{ "--reveal-order": 1 } as React.CSSProperties}>{CERTIFICATIONS.map((cert, index) => <div className="cert-row" key={cert} tabIndex={0}><span className="cert-number">{String(index + 1).padStart(2, "0")}</span><span className="cert-title">{cert}</span><ArrowUpRight className="cert-arrow" size={17} aria-hidden="true" /></div>)}</div>
          </div>
        </section>

        <section className="experience-section section-wrap section-space" id="experience" aria-labelledby="experience-heading">
          <div className="page-shell">
            <div className="reveal"><SectionLabel number="05" label="Experience" /><h2 className="section-heading" id="experience-heading">The path<br /><em>so far.</em></h2></div>
            <div className="experience-columns">
              <div className="reveal" style={{ "--reveal-order": 1 } as React.CSSProperties}><p className="experience-intro">Product design work across enterprise platforms, eCommerce, transit, government, and brand systems.</p><div className="education-block"><h3>Education</h3>{EDUCATION.map((item) => <div className="education-entry" key={item.degree}><div><strong>{item.degree}</strong><span>{item.school}</span></div><time>{item.dates}</time></div>)}</div></div>
              <div className="timeline">{EXPERIENCE.map((entry, index) => <article className="timeline-entry reveal" style={{ "--reveal-order": Math.min(index, 5) } as React.CSSProperties} key={`${entry.company}-${entry.dates}`}><time className="timeline-dates">{entry.dates}</time><h3>{entry.role}</h3><p className="timeline-company">{entry.company}</p><p className="timeline-location">{entry.location}</p><ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>)}</div>
            </div>
          </div>
        </section>

        <section className="impact-section section-wrap section-space" id="achievements" aria-labelledby="impact-heading">
          <div className="page-shell">
            <div className="impact-header reveal"><div><SectionLabel number="06" label="Selected outcomes" /><h2 className="section-heading" id="impact-heading">Measured<br /><em>impact.</em></h2></div><span className="impact-count">{String(ACHIEVEMENTS.length).padStart(2, "0")} / from the résumé</span></div>
            <div className="impact-grid">{ACHIEVEMENTS.map((item) => <article className="impact-card reveal" key={item.index} style={{ "--reveal-order": Number(item.index) % 3 } as React.CSSProperties}><span className="impact-index">{item.index} / 06</span><strong className="impact-value">{item.value}</strong><span className="impact-label">{item.label}</span></article>)}</div>
          </div>
        </section>

        <section className="contact-section section-wrap section-space" id="contact" aria-labelledby="contact-heading">
          <div className="page-shell">
            <div className="reveal"><SectionLabel number="07" label="Contact" /><h2 className="contact-heading" id="contact-heading" aria-label="Let’s build something together."><span>Let’s build</span><br /><span>something</span><br /><span>together.</span></h2></div>
            <div className="contact-details reveal" style={{ "--reveal-order": 1 } as React.CSSProperties}>
              <div>
                <div className="contact-email"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a><button className="copy-email" type="button" onClick={() => void copyEmail()} aria-label="Copy email address" aria-live="polite">{copied ? <><Check size={13} />Copied ✓</> : "Copy"}</button></div>
                <a className="contact-phone" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
                <div className="contact-socials">{PROFILE.links.map((link) => { const Icon = socialIcons[link.label] ?? ExternalLink; return <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}<Icon size={13} /></a>; })}</div>
              </div>
              <span className="hello-seal" aria-hidden="true">SAY HELLO<br />· &nbsp; KOCHI &nbsp; ·</span>
            </div>
            <footer className="site-footer"><span>© {new Date().getFullYear()} {PROFILE.name}</span><a href="#top">Back to top ↑</a><span>UI/UX Design · Kochi, India</span></footer>
          </div>
        </section>
      </main>
    </>
  );
}