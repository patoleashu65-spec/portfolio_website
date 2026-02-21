import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const GITHUB_USERNAME = 'patoleashu65-spec';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Contact'];

const SKILLS = [
  { name: 'JavaScript', level: 88 },
  { name: 'React', level: 82 },
  { name: 'Node.js', level: 75 },
  { name: 'Python', level: 70 },
  { name: 'CSS / Tailwind', level: 85 },
  { name: 'Git & GitHub', level: 90 },
  { name: 'TypeScript', level: 65 },
  { name: 'REST APIs', level: 80 },
];

const PROJECTS = [
  {
    title: 'Project Alpha',
    desc: 'A full-stack web application built with React and Node.js, featuring real-time updates and responsive design.',
    tags: ['React', 'Node.js', 'MongoDB'],
    repo: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: 'Project Beta',
    desc: 'Command-line tool automating repetitive development tasks with configurable pipelines and rich output.',
    tags: ['Python', 'CLI', 'Automation'],
    repo: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: 'Project Gamma',
    desc: 'Responsive portfolio template with dark mode, smooth animations, and a minimal design system.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    repo: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    title: 'Project Delta',
    desc: 'REST API with authentication, rate-limiting, and full CRUD operations. Deployed on cloud infrastructure.',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    repo: `https://github.com/${GITHUB_USERNAME}`,
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">[</span>
        pat
        <span className="logo-accent">.</span>
        <span className="logo-bracket">]</span>
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className={active === l.toLowerCase() ? 'active' : ''}
            >
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="nav-gh"
          >
            <GithubIcon />
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-grid-bg" aria-hidden />
      <div className="hero-content">
        <p className="hero-eyebrow animate-fadeUp delay-1">
          <span className="blink">▮</span> available for work
        </p>
        <h1 className="hero-name animate-fadeUp delay-2">
          patoleashu<span className="accent-text">65</span>
        </h1>
        <p className="hero-tagline animate-fadeUp delay-3">
          Full-Stack Developer &amp; Open Source Enthusiast
        </p>
        <p className="hero-sub animate-fadeUp delay-4">
          Building clean, fast, and functional web experiences.<br />
          Passionate about code quality and developer tools.
        </p>
        <div className="hero-cta animate-fadeUp delay-5">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            <GithubIcon /> GitHub Profile
          </a>
        </div>
        <div className="hero-meta animate-fadeUp delay-6">
          <span className="mono">@{GITHUB_USERNAME}</span>
        </div>
      </div>
      <div className="hero-scroll-hint" aria-hidden>
        scroll <ArrowDown />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionLabel>About</SectionLabel>
        <div className="about-grid">
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <img
                src={`https://github.com/${GITHUB_USERNAME}.png`}
                alt="Profile"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="avatar-placeholder">
                {GITHUB_USERNAME[0].toUpperCase()}
              </div>
            </div>
            <div className="avatar-ring" aria-hidden />
          </div>
          <div className="about-text">
            <h2 className="section-title">
              Hey, I'm <span className="accent-text">patoleashu65</span>
            </h2>
            <p>
              I'm a developer who loves turning ideas into working software.
              With a focus on the web stack, I build everything from snappy
              front-end interfaces to solid back-end services.
            </p>
            <p>
              When I'm not pushing commits, I'm exploring new frameworks,
              contributing to open source, and levelling up my problem-solving
              skills on coding challenges.
            </p>
            <div className="about-stats">
              {[
                { n: '10+', label: 'Repositories' },
                { n: '2+', label: 'Years Coding' },
                { n: '∞', label: 'Cups of Coffee' },
              ].map(({ n, label }) => (
                <div key={label} className="stat">
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, index }) {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (barRef.current) obs.observe(barRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill-row" ref={barRef} style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct mono">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, tags, repo, index }) {
  return (
    <a
      href={repo}
      target="_blank"
      rel="noreferrer"
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-top">
        <FolderIcon />
        <div className="card-links">
          <GithubIcon />
        </div>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-tags">
        {tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="section-title">Things I've Built</h2>
        <p className="section-sub">
          A selection of projects from my GitHub. Replace these with your real repos!
        </p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
        <div className="projects-more">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            All Repositories <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-sub">
          Got a project in mind, want to collaborate, or just want to say hi?
          My inbox is always open.
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary big"
        >
          Say Hello on GitHub
        </a>
        <div className="social-row">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="mono">
        Built with React · Designed with care · Hosted on Vercel
      </span>
      <span className="footer-name">
        <span className="accent-text">@{GITHUB_USERNAME}</span>
      </span>
    </footer>
  );
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755
        -1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997
        .108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22
        -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005
        2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84
        1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015
        2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden>
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="section-label mono">
      <span className="accent-text">// </span>{children}
    </p>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Cursor />
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
