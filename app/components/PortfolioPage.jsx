"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ============================================================
// PORTFOLIO PAGE — BlueWave Promotions
// app/portfolio/page.jsx
//
// Sections:
//   1. Hero        — animated counter stats + headline
//   2. Filter Bar  — category tabs (All / UI-UX / Web / App / Graphics / Ebook)
//   3. Bento Grid  — masonry-style project cards (load more)
//   4. Stats Strip — animated numbers
//   5. Testimonial — featured client quote
//   6. CTA         — start your project
// ============================================================

const CATEGORIES = [
  { id: "all",      label: "All Work",    count: 24 },
  { id: "ui-ux",   label: "UI/UX",       count: 6  },
  { id: "web",     label: "Web Dev",      count: 6  },
  { id: "app",     label: "App Dev",      count: 4  },
  { id: "graphics",label: "Graphics",     count: 5  },
  { id: "ebook",   label: "Ebooks",       count: 3  },
];

// ── All 24 projects ──
const PROJECTS = [
  // UI/UX
  {
    id: 1, cat: "ui-ux", size: "large",
    title: "FinTrack Dashboard",
    type: "SaaS Product Design",
    tags: ["Figma", "Design System", "UX Research"],
    result: "65% higher user retention",
    accent: "#38bdf8",
    // ── IMAGE GUIDE ──────────────────────────────────────────
    // Add screenshot at /public/images/work/work-fintrack.jpg
    // Recommended: 1200×800px min
    // ─────────────────────────────────────────────────────────
    image: "/images/work/work-fintrack.jpg",
    year: "2024",
    href: "/portfolio/fintrack-dashboard",
    desc: "Full product redesign of a fintech SaaS dashboard — from UX research and persona mapping to a complete design system with 200+ components.",
  },
  {
    id: 2, cat: "ui-ux", size: "small",
    title: "MediCare Portal",
    type: "Healthcare UX",
    tags: ["Accessibility", "WCAG AA", "Figma"],
    result: "4.8★ usability score",
    accent: "#0ea5e9",
    image: "/images/work/work-medicare.jpg",
    year: "2024",
    href: "/portfolio/medicare-portal",
    desc: "Patient-facing healthcare portal designed to WCAG 2.1 AA standards, tested with 40+ real users across 3 rounds of usability testing.",
  },
  {
    id: 3, cat: "ui-ux", size: "small",
    title: "FitPulse App UI",
    type: "Mobile App Design",
    tags: ["iOS", "Mobile UI", "Prototype"],
    result: "App Store rating: 3.2 → 4.7★",
    accent: "#7dd3fc",
    image: "/images/work/work-fitpulse.jpg",
    year: "2023",
    href: "/portfolio/fitpulse-app",
    desc: "Complete redesign of a fitness tracking app — new IA, gamification system, and a dark-mode first design language.",
  },
  {
    id: 4, cat: "ui-ux", size: "small",
    title: "NomadHQ Onboarding",
    type: "Onboarding Flow Design",
    tags: ["User Flow", "Conversion", "Figma"],
    result: "Activation rate +42%",
    accent: "#38bdf8",
    image: "/images/work/work-nomad-ux.jpg",
    year: "2023",
    href: "/portfolio/nomadhq-onboarding",
    desc: "Redesigned the 7-step onboarding flow for a remote-work SaaS platform, reducing drop-off from 68% to 26%.",
  },
  {
    id: 5, cat: "ui-ux", size: "small",
    title: "Bloom E-Commerce UX",
    type: "E-Commerce Experience",
    tags: ["Checkout Flow", "CRO", "Figma"],
    result: "Checkout abandonment −38%",
    accent: "#0ea5e9",
    image: "/images/work/work-bloom-ux.jpg",
    year: "2024",
    href: "/portfolio/bloom-ecommerce",
    desc: "Full UX audit and redesign of a DTC beauty brand's checkout and product discovery flows.",
  },
  {
    id: 6, cat: "ui-ux", size: "small",
    title: "DataLens Analytics",
    type: "Dashboard Design",
    tags: ["Data Viz", "B2B SaaS", "Design System"],
    result: "Time-on-task reduced 40%",
    accent: "#7dd3fc",
    image: "/images/work/work-datalens.jpg",
    year: "2023",
    href: "/portfolio/datalens",
    desc: "Complex analytics dashboard designed to surface insights faster — with a custom charting component library.",
  },

  // Web Dev
  {
    id: 7, cat: "web", size: "large",
    title: "Luxe E-Commerce",
    type: "Shopify + Custom Theme",
    tags: ["Next.js", "Shopify", "Tailwind"],
    result: "2× conversion rate",
    accent: "#0ea5e9",
    image: "/images/work/work-luxe.jpg",
    year: "2024",
    href: "/portfolio/luxe-ecommerce",
    desc: "Custom Shopify theme built from scratch for a luxury fashion brand — headless architecture, 98 PageSpeed, and a bespoke product configurator.",
  },
  {
    id: 8, cat: "web", size: "small",
    title: "NomadHQ Platform",
    type: "SaaS Web Application",
    tags: ["React", "Node.js", "PostgreSQL"],
    result: "Launched in 10 weeks",
    accent: "#38bdf8",
    image: "/images/work/work-nomadhq.jpg",
    year: "2024",
    href: "/portfolio/nomadhq",
    desc: "Full-stack SaaS platform for remote teams — real-time collaboration, subscription billing, and multi-tenant architecture.",
  },
  {
    id: 9, cat: "web", size: "small",
    title: "Apex Law Firm",
    type: "Marketing Website",
    tags: ["Next.js", "Sanity CMS", "SEO"],
    result: "Organic traffic +210%",
    accent: "#7dd3fc",
    image: "/images/work/work-apex.jpg",
    year: "2023",
    href: "/portfolio/apex-law",
    desc: "SEO-first marketing site for a boutique law firm — structured content, local SEO, and a blog system built on Sanity CMS.",
  },
  {
    id: 10, cat: "web", size: "small",
    title: "Harvest Farm Store",
    type: "E-Commerce Website",
    tags: ["WooCommerce", "WordPress", "Payments"],
    result: "$240k in first 6 months",
    accent: "#0ea5e9",
    image: "/images/work/work-harvest.jpg",
    year: "2023",
    href: "/portfolio/harvest-farm",
    desc: "Online farm-to-table store with subscription boxes, local delivery zones, and a custom WooCommerce checkout.",
  },
  {
    id: 11, cat: "web", size: "small",
    title: "TechPulse Blog",
    type: "Content Platform",
    tags: ["Next.js", "MDX", "Sanity"],
    result: "100k monthly readers in yr 1",
    accent: "#38bdf8",
    image: "/images/work/work-techpulse.jpg",
    year: "2023",
    href: "/portfolio/techpulse",
    desc: "High-performance tech publication built with Next.js and Sanity — with newsletter integration, dark mode, and code syntax highlighting.",
  },
  {
    id: 12, cat: "web", size: "small",
    title: "MindSet Agency",
    type: "Agency Website",
    tags: ["Next.js", "GSAP", "Animations"],
    result: "Best Agency Site Award 2024",
    accent: "#7dd3fc",
    image: "/images/work/work-mindset.jpg",
    year: "2024",
    href: "/portfolio/mindset-agency",
    desc: "Award-winning agency website with scroll-driven animations, a parallax hero, and an interactive case study grid.",
  },

  // App Dev
  {
    id: 13, cat: "app", size: "large",
    title: "SwiftDeliver",
    type: "Last-Mile Delivery App",
    tags: ["Flutter", "Android", "Maps API"],
    result: "20k downloads in 3 months",
    accent: "#7dd3fc",
    image: "/images/work/work-swiftdeliver.jpg",
    year: "2024",
    href: "/portfolio/swiftdeliver",
    desc: "Real-time delivery tracking app for a logistics startup — live driver tracking, push notifications, and a React Native dispatcher dashboard.",
  },
  {
    id: 14, cat: "app", size: "small",
    title: "FitPulse iOS",
    type: "Fitness Tracking App",
    tags: ["React Native", "HealthKit", "Firebase"],
    result: "App Store rating: 4.7★",
    accent: "#38bdf8",
    image: "/images/work/work-fitpulse-app.jpg",
    year: "2024",
    href: "/portfolio/fitpulse-ios",
    desc: "Full-featured fitness app with HealthKit integration, custom workout builder, and social challenges.",
  },
  {
    id: 15, cat: "app", size: "small",
    title: "MediCare Patient App",
    type: "Healthcare Mobile App",
    tags: ["Swift", "iOS", "HIPAA"],
    result: "HIPAA certified · 4.8★",
    accent: "#0ea5e9",
    image: "/images/work/work-medicare-app.jpg",
    year: "2023",
    href: "/portfolio/medicare-app",
    desc: "Native iOS app for patient appointment booking, prescription management, and secure doctor messaging.",
  },
  {
    id: 16, cat: "app", size: "small",
    title: "Penny Budget App",
    type: "Personal Finance App",
    tags: ["React Native", "Plaid API", "Charts"],
    result: "4.5★ · 50k+ downloads",
    accent: "#7dd3fc",
    image: "/images/work/work-penny.jpg",
    year: "2023",
    href: "/portfolio/penny-budget",
    desc: "Personal finance app with Plaid bank sync, AI-powered spending insights, and goal-based savings buckets.",
  },

  // Graphics
  {
    id: 17, cat: "graphics", size: "large",
    title: "Vela Brand Identity",
    type: "Full Brand Identity",
    tags: ["Logo", "Brand Kit", "Guidelines"],
    result: "Used across 3 product lines",
    accent: "#0284c7",
    image: "/images/work/work-vela.jpg",
    year: "2024",
    href: "/portfolio/vela-brand",
    desc: "Complete brand identity for a sustainable activewear brand — logo system, 60 social templates, packaging, and a 40-page brand guidelines doc.",
  },
  {
    id: 18, cat: "graphics", size: "small",
    title: "NomadHQ Pitch Deck",
    type: "Investor Pitch Deck",
    tags: ["PowerPoint", "Infographics", "Data Viz"],
    result: "$2.4M seed round closed",
    accent: "#38bdf8",
    image: "/images/work/work-pitch.jpg",
    year: "2024",
    href: "/portfolio/nomadhq-deck",
    desc: "32-slide investor deck that helped NomadHQ close their seed round — data visualizations, financial charts, and a narrative-driven layout.",
  },
  {
    id: 19, cat: "graphics", size: "small",
    title: "Bloom Social Pack",
    type: "Social Media Kit",
    tags: ["60 Templates", "Canva", "Instagram"],
    result: "Engagement +180%",
    accent: "#7dd3fc",
    image: "/images/work/work-bloom-social.jpg",
    year: "2023",
    href: "/portfolio/bloom-social",
    desc: "60-piece social media template kit for a beauty brand — Reels covers, carousels, stories, and a brand color system.",
  },
  {
    id: 20, cat: "graphics", size: "small",
    title: "Harvest Packaging",
    type: "Product Packaging",
    tags: ["Labels", "Packaging", "Print"],
    result: "Stocked in 80+ stores",
    accent: "#0284c7",
    image: "/images/work/work-harvest-pkg.jpg",
    year: "2023",
    href: "/portfolio/harvest-packaging",
    desc: "Farm-to-table product label and packaging design — 12 SKUs across jams, honey, and dried goods.",
  },
  {
    id: 21, cat: "graphics", size: "small",
    title: "Apex Legal Illustrations",
    type: "Custom Illustration Set",
    tags: ["Icons", "Illustrations", "SVG"],
    result: "12 custom illustrations",
    accent: "#38bdf8",
    image: "/images/work/work-apex-illus.jpg",
    year: "2024",
    href: "/portfolio/apex-illustrations",
    desc: "12 bespoke editorial illustrations for a law firm's website and print materials — professional yet approachable.",
  },

  // Ebooks
  {
    id: 22, cat: "ebook", size: "large",
    title: "The Creator's Playbook",
    type: "Lead Magnet Ebook",
    tags: ["30 Pages", "PDF", "List Building"],
    result: "2,400 email signups in 30 days",
    accent: "#38bdf8",
    image: "/images/work/work-creators-ebook.jpg",
    year: "2024",
    href: "/portfolio/creators-playbook",
    desc: "Beautifully designed 30-page lead magnet for a creator coach — full ghostwriting, cover design, and Gumroad setup included.",
  },
  {
    id: 23, cat: "ebook", size: "small",
    title: "Scale Your SaaS",
    type: "Full-Length Business Book",
    tags: ["180 Pages", "KDP", "Amazon"],
    result: "#1 in category on Amazon",
    accent: "#0ea5e9",
    image: "/images/work/work-saas-ebook.jpg",
    year: "2023",
    href: "/portfolio/scale-your-saas",
    desc: "Full-length business book for a SaaS founder — ghostwritten, professionally edited, and launched on Amazon KDP.",
  },
  {
    id: 24, cat: "ebook", size: "small",
    title: "Mindful Morning Workbook",
    type: "Fillable Course Workbook",
    tags: ["60 Pages", "Fillable PDF", "Gumroad"],
    result: "$18k in first month",
    accent: "#7dd3fc",
    image: "/images/work/work-mindful-ebook.jpg",
    year: "2023",
    href: "/portfolio/mindful-morning",
    desc: "Wellness workbook to accompany an online course — fillable PDF with daily journal pages, habit trackers, and reflection prompts.",
  },
];

const INITIAL_COUNT = 9;

// ── InView hook ──
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Counter hook ──
function useCounter(target, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ── Project Card ──
function ProjectCard({ project, index, onClick, visible }) {
  const isLarge = project.size === "large";
  return (
    <div
      onClick={() => onClick(project)}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity .55s ease ${(index % 9) * .06}s, transform .55s ease ${(index % 9) * .06}s`,
        cursor: "pointer",
        background: "rgba(5,15,31,.75)",
        border: "1px solid rgba(14,165,233,.1)",
        borderRadius: "1.25rem", overflow: "hidden",
        position: "relative",
      }}
      className="group project-card"
    >
      {/* Image / preview area */}
      <div style={{
        height: isLarge ? "280px" : "200px",
        background: `linear-gradient(145deg, rgba(5,15,31,.95), ${project.accent}18, rgba(5,15,31,.88))`,
        position: "relative", overflow: "hidden",
      }}>
        {/* ── IMAGE PLACEHOLDER ──────────────────────────────────
            Replace the div below with:
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        ────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(${project.accent}14 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          transition: "transform .5s ease",
        }} className="group-hover:scale-105" />

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${project.accent}15, rgba(2,12,24,.5))`,
          opacity: 0, transition: "opacity .35s ease",
        }} className="group-hover:opacity-100" />

        {/* View button */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity .3s ease",
        }} className="group-hover:opacity-100">
          <div style={{
            background: "rgba(2,12,24,.85)", backdropFilter: "blur(10px)",
            border: `1px solid ${project.accent}40`,
            borderRadius: "999px", padding: ".5rem 1.25rem",
            display: "flex", alignItems: "center", gap: ".5rem",
          }}>
            <span style={{ fontFamily: "'Syne',sans-serif", color: project.accent, fontSize: ".78rem", fontWeight: 700 }}>View Project</span>
            <svg style={{ color: project.accent, width: ".85rem", height: ".85rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Year badge */}
        <div style={{
          position: "absolute", top: ".85rem", left: ".85rem",
          background: "rgba(2,12,24,.8)", backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "999px", padding: ".2rem .6rem",
        }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".65rem" }}>{project.year}</span>
        </div>

        {/* Category badge */}
        <div style={{
          position: "absolute", top: ".85rem", right: ".85rem",
          background: `${project.accent}15`, backdropFilter: "blur(6px)",
          border: `1px solid ${project.accent}30`,
          borderRadius: "999px", padding: ".2rem .65rem",
        }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", color: project.accent, fontSize: ".65rem" }}>{project.type}</span>
        </div>

        {/* Bottom gradient */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(5,15,31,.98) 0%, transparent 100%)" }} />
      </div>

      {/* Card body */}
      <div style={{ padding: "1.1rem 1.35rem 1.35rem" }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: ".8rem" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)",
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
              fontSize: ".62rem", letterSpacing: ".05em", padding: ".18rem .6rem", borderRadius: "999px",
            }}>{t}</span>
          ))}
        </div>

        <h3 style={{
          fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.92)",
          fontWeight: 700, fontSize: isLarge ? "1.1rem" : ".95rem",
          marginBottom: ".25rem",
        }}>{project.title}</h3>

        {/* Result metric */}
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginTop: ".6rem" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", color: project.accent, fontSize: ".75rem", fontWeight: 500 }}>{project.result}</span>
        </div>
      </div>
    </div>
  );
}

// ── Project Modal ──
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(2,12,24,.92)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn .25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "rgba(5,15,31,.97)",
          border: `1px solid ${project.accent}30`,
          borderRadius: "1.5rem", overflow: "hidden",
          width: "100%", maxWidth: "680px",
          maxHeight: "90vh", overflowY: "auto",
          animation: "slideUp .3s ease",
          boxShadow: `0 0 60px ${project.accent}18, 0 40px 80px rgba(0,0,0,.6)`,
        }}
      >
        {/* Modal image */}
        <div style={{
          height: "260px",
          background: `linear-gradient(145deg, rgba(5,15,31,.95), ${project.accent}20)`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Replace with <Image src={project.image} alt={project.title} fill className="object-cover" /> */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${project.accent}15 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(5,15,31,.98), transparent)" }} />
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: "2.2rem", height: "2.2rem", borderRadius: "50%",
              background: "rgba(2,12,24,.8)", border: "1px solid rgba(255,255,255,.12)",
              color: "rgba(255,255,255,.6)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", transition: "all .2s ease",
            }}
            className="hover:bg-white/10 hover:text-white"
          >×</button>
        </div>

        {/* Modal content */}
        <div style={{ padding: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1rem" }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", color: project.accent, background: `${project.accent}10`, border: `1px solid ${project.accent}25`, fontSize: ".68rem", padding: ".2rem .7rem", borderRadius: "999px" }}>{t}</span>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.95)", fontWeight: 800, fontSize: "1.5rem", marginBottom: ".35rem" }}>{project.title}</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: project.accent, fontSize: ".8rem", marginBottom: "1.25rem" }}>{project.type} · {project.year}</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontSize: ".9rem", marginBottom: "1.5rem" }}>{project.desc}</p>

          <div style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: "1rem 1.25rem", background: `${project.accent}08`, border: `1px solid ${project.accent}20`, borderRadius: "1rem", marginBottom: "1.75rem" }}>
            <span style={{ fontSize: "1.1rem" }}>📈</span>
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase" }}>Result</p>
              <p style={{ fontFamily: "'Syne',sans-serif", color: project.accent, fontWeight: 700, fontSize: ".9rem" }}>{project.result}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
            <Link href={project.href} style={{
              flex: 1, minWidth: "140px", textAlign: "center",
              background: `linear-gradient(135deg, ${project.accent}, #0284c7)`,
              color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem",
              padding: ".85rem", borderRadius: ".75rem", textDecoration: "none",
            }} className="hover:opacity-90 transition-opacity">
              View Full Case Study
            </Link>
            <Link href="/contact" style={{
              flex: 1, minWidth: "140px", textAlign: "center",
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)",
              color: "rgba(255,255,255,.65)", fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
              padding: ".85rem", borderRadius: ".75rem", textDecoration: "none",
            }} className="hover:bg-white/10 transition-all">
              Start Similar Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [heroVisible, setHeroVisible]     = useState(false);
  const [activeFilter, setActiveFilter]   = useState("all");
  const [visibleCount, setVisibleCount]   = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState(null);
  const [gridVisible, setGridVisible]     = useState(true);

  const [statsRef, statsInView] = useInView(0.3);
  const [testiRef, testiInView] = useInView(0.2);
  const [ctaRef,   ctaInView]   = useInView(0.2);

  const c1 = useCounter(200, 1600, statsInView);
  const c2 = useCounter(98,  1400, statsInView);
  const c3 = useCounter(18,  1200, statsInView);
  const c4 = useCounter(5,   1000, statsInView);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilter = (id) => {
    setGridVisible(false);
    setTimeout(() => {
      setActiveFilter(id);
      setVisibleCount(INITIAL_COUNT);
      setGridVisible(true);
    }, 200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .pf-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .stat-num { background:linear-gradient(135deg,#38bdf8,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        .filter-pill { font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:500; padding:.5rem 1.1rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; white-space:nowrap; transition:all .22s ease; display:flex; align-items:center; gap:.4rem; }
        .filter-pill:hover { color:rgba(255,255,255,.78); border-color:rgba(255,255,255,.18); }
        .filter-pill.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 16px rgba(14,165,233,.22); }
        .project-card { transition:border-color .3s ease, transform .3s ease, box-shadow .3s ease; }
        .project-card:hover { border-color:rgba(56,189,248,.3)!important; transform:translateY(-4px)!important; box-shadow:0 16px 40px rgba(0,0,0,.4); }
        .grid-fade { opacity:0; transition:opacity .2s ease; }
        .grid-fade.show { opacity:1; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }
        .other-svc { transition:all .25s ease; }
        .other-svc:hover { border-color:rgba(56,189,248,.3)!important; background:rgba(14,165,233,.06)!important; transform:translateX(4px); }

        /* Bento grid */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        @media (max-width: 1024px) {
          .project-grid { grid-template-columns: repeat(2,1fr); }
          .project-grid > [style*="span 2"] { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .project-grid { grid-template-columns: 1fr; }
          .project-grid > [style*="span 2"] { grid-column: span 1; }
        }
      `}</style>

      {/* <Navbar /> */}

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: "9rem", paddingBottom: "5rem" }}>
          {/* Bg orbs */}
          <div style={{ position: "absolute", top: "-10%", left: "-8%", width: "50vw", height: "50vw", maxWidth: 600, background: "radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-5%", right: "-8%", width: "40vw", height: "40vw", maxWidth: 500, background: "radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(14,165,233,.07) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb"><Link href="/">Home</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>Portfolio</span></span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "flex-end" }} className="grid-cols-1 lg:grid-cols-[1fr_auto]">
              <div>
                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                  <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                    className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                    <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                    Our Work
                  </span>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                    <span className="text-white">Work That</span><br />
                    <span className="pf-grad">Speaks for Itself.</span>
                  </h1>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", lineHeight: 1.8, fontSize: "1rem", maxWidth: "520px" }}>
                    24 projects across UI/UX, web development, app development, graphics, and ebooks. Every one of them built with the same obsessive attention to quality.
                  </p>
                </div>
              </div>

              {/* Inline mini stats */}
              <div className={`fu hidden lg:grid ${heroVisible ? "show" : ""} grid-cols-2 gap-4`} style={{ transitionDelay: ".32s" }}>
                {[
                  { n: "200+", label: "Projects" },
                  { n: "98%",  label: "Satisfaction" },
                  { n: "18",   label: "Countries" },
                  { n: "5+",   label: "Years" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "1rem", background: "rgba(14,165,233,.05)", border: "1px solid rgba(14,165,233,.12)", borderRadius: ".875rem" }}>
                    <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "1.5rem" }} className="stat-num">{s.n}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".7rem", marginTop: ".15rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50px", overflow: "hidden" }}>
            <svg className="wv-a" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }} viewBox="0 0 1440 50" preserveAspectRatio="none">
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" fill="rgba(14,165,233,.05)" />
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" transform="translate(720,0)" fill="rgba(14,165,233,.05)" />
            </svg>
          </div>
        </section>

        {/* ── 2. FILTER BAR ── */}
        <div style={{
          position: "sticky", top: "79px", zIndex: 40,
          background: "rgba(2,12,24,.95)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(14,165,233,.1)",
          padding: "0 1.5rem",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", overflowX: "auto", scrollbarWidth: "none" }}>
            <div style={{ display: "flex", gap: ".5rem", padding: ".85rem 0", width: "max-content", minWidth: "100%" }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => handleFilter(cat.id)}
                  className={`filter-pill ${activeFilter === cat.id ? "active" : ""}`}>
                  {cat.label}
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".6rem", padding: ".15rem .45rem", borderRadius: "999px",
                    background: activeFilter === cat.id ? "rgba(56,189,248,.2)" : "rgba(255,255,255,.06)",
                    color: activeFilter === cat.id ? "#38bdf8" : "rgba(255,255,255,.3)",
                  }}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. PROJECT GRID ── */}
        <section style={{ background: "var(--surface)", padding: "4rem 0 6rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>

            {/* Result count */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".8rem" }}>
                Showing <span style={{ color: "#38bdf8", fontWeight: 600 }}>{Math.min(visibleCount, filtered.length)}</span> of <span style={{ color: "rgba(255,255,255,.6)" }}>{filtered.length}</span> projects
              </p>
              {activeFilter !== "all" && (
                <button onClick={() => handleFilter("all")} style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".75rem", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".3rem" }}
                  className="hover:text-white/60 transition-colors">
                  ← View all work
                </button>
              )}
            </div>

            {/* Grid */}
            <div className={`project-grid ${gridVisible ? "grid-fade show" : "grid-fade"}`}>
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setSelectedProject}
                  visible={gridVisible}
                />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button
                  onClick={() => setVisibleCount(v => v + 6)}
                  style={{
                    background: "rgba(14,165,233,.08)",
                    border: "1px solid rgba(14,165,233,.2)",
                    color: "rgba(255,255,255,.65)",
                    fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: ".88rem",
                    padding: ".9rem 2.5rem", borderRadius: "999px",
                    cursor: "pointer", transition: "all .25s ease",
                    display: "inline-flex", alignItems: "center", gap: ".5rem",
                  }}
                  className="hover:bg-sky-400/10 hover:text-white hover:border-sky-400/35 transition-all"
                >
                  Load More Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.2)", fontSize: ".72rem", marginTop: ".75rem" }}>
                  {filtered.length - visibleCount} more projects
                </p>
              </div>
            )}

            {/* All loaded message */}
            {!hasMore && filtered.length > INITIAL_COUNT && (
              <p style={{ textAlign: "center", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.2)", fontSize: ".78rem", marginTop: "2.5rem" }}>
                You've seen all {filtered.length} projects ✦
              </p>
            )}
          </div>
        </section>

        {/* ── 4. STATS STRIP ── */}
        <section style={{ background: "var(--deep)", padding: "5rem 0" }}>
          <div ref={statsRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "2rem",
              background: "rgba(14,165,233,.04)", border: "1px solid rgba(14,165,233,.12)",
              borderRadius: "1.5rem", padding: "3rem 2.5rem",
            }}>
              {[
                { n: c1, suffix: "+", label: "Projects Delivered", sub: "Across 5 services" },
                { n: c2, suffix: "%", label: "Client Satisfaction", sub: "Average across all projects" },
                { n: c3, suffix: "",  label: "Countries Served",   sub: "Globally distributed team" },
                { n: c4, suffix: "+", label: "Years of Experience", sub: "Senior talent only" },
              ].map(({ n, suffix, label, sub }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 1 }} className="stat-num">{n}{suffix}</p>
                  <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.75)", fontSize: ".88rem", fontWeight: 600, marginTop: ".4rem" }}>{label}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.28)", fontSize: ".7rem", marginTop: ".2rem" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. FEATURED TESTIMONIAL ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div ref={testiRef} style={{
            maxWidth: "820px", margin: "0 auto", padding: "0 1.5rem",
            opacity: testiInView ? 1 : 0, transform: testiInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .8s ease, transform .8s ease",
          }}>
            <div style={{
              background: "rgba(5,15,31,.8)",
              border: "1px solid rgba(14,165,233,.18)",
              borderRadius: "1.5rem", padding: "3rem",
              position: "relative", overflow: "hidden",
              boxShadow: "0 0 60px rgba(14,165,233,.06)",
            }}>
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#38bdf8 40%,#0ea5e9 60%,transparent)" }} />

              {/* Quote mark */}
              <div style={{
                fontFamily: "'Syne',sans-serif", fontSize: "5rem", lineHeight: 1,
                color: "rgba(56,189,248,.12)", fontWeight: 900,
                position: "absolute", top: "1rem", left: "2rem",
                userSelect: "none",
              }}>"</div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{
                  fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.82)",
                  fontSize: "clamp(1rem,2.2vw,1.25rem)", lineHeight: 1.7,
                  fontWeight: 600, marginBottom: "2rem", fontStyle: "italic",
                }}>
                  BlueWave delivered our entire brand identity, website, and investor deck in under 3 weeks. The quality blew our team away — and the deck helped us close a $2.4M seed round. They're not just a service, they're a strategic partner.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  {/* ── AVATAR PLACEHOLDER ──────────────────────────────────
                      Replace with:
                      <Image src="/images/avatars/avatar-james.jpg"
                        alt="James Okafor"
                        width={48} height={48}
                        className="rounded-full object-cover" />
                  ────────────────────────────────────────────────────── */}
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(14,165,233,.3),rgba(56,189,248,.15))", border: "1px solid rgba(56,189,248,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", color: "#38bdf8", fontWeight: 700, fontSize: ".85rem" }}>JO</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.88)", fontWeight: 700, fontSize: ".92rem" }}>James Okafor</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".75rem" }}>CEO, NomadHQ · Seed-funded startup</p>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: "3px" }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} style={{ color: "#f59e0b", width: "1rem", height: "1rem" }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CTA ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div ref={ctaRef} style={{
            maxWidth: "740px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center",
            opacity: ctaInView ? 1 : 0, transform: ctaInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .8s ease, transform .8s ease",
          }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--wave-3)", fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Ready to be our next success story?
            </p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-6xl">
              <span className="text-white">Let's build something</span><br /><span className="pf-grad">worth showing off.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", maxWidth: "440px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: ".92rem" }}>
              Tell us what you need — brief or detailed. We'll come back with a plan and price within 24 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                Start Your Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href="/services" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.65)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                View Services
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Project modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* <Footer /> */}
    </>
  );
}