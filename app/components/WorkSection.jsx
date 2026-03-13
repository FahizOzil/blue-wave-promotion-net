"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// PORTFOLIO / WORK SECTION — BlueWave Promotions
//
// Features:
//   • Filter tabs by service category
//   • Masonry-style bento grid (mixed card sizes)
//   • Each card: image placeholder + title + category + hover overlay
//   • Animated filter transitions
//   • "Load More" button
//   • Scroll-triggered reveal
// ============================================================

const CATEGORIES = ["All", "UI/UX", "Web Dev", "App Dev", "Graphics", "Ebook"];

const PROJECTS = [
  {
    id: 1,
    title: "FinTrack Dashboard",
    category: "UI/UX",
    tags: ["Figma", "Prototyping"],
    description: "A clean finance tracking dashboard with dark mode and data visualizations.",
    size: "large",   // spans 2 cols
    // ── IMAGE GUIDE ──────────────────────────────────────────
    // Add your project screenshot/mockup here.
    // Recommended size: 900×600px
    // Path: /public/images/work/work-fintrack.jpg
    // ─────────────────────────────────────────────────────────
    image: "/images/work/work-fintrack.jpg",
    accent: "#38bdf8",
    link: "/portfolio/fintrack-dashboard",
  },
  {
    id: 2,
    title: "Luxe E-Commerce",
    category: "Web Dev",
    tags: ["Next.js", "Shopify"],
    description: "High-converting fashion store with custom animations.",
    size: "small",
    image: "/images/work/work-luxe.jpg",
    accent: "#0ea5e9",
    link: "/portfolio/luxe-ecommerce",
  },
  {
    id: 3,
    title: "FitPulse Mobile App",
    category: "App Dev",
    tags: ["React Native", "iOS"],
    description: "Fitness tracking app with workout plans and progress analytics.",
    size: "small",
    image: "/images/work/work-fitpulse.jpg",
    accent: "#7dd3fc",
    link: "/portfolio/fitpulse-app",
  },
  {
    id: 4,
    title: "Bloom Brand Identity",
    category: "Graphics",
    tags: ["Branding", "Logo"],
    description: "Full brand identity for a luxury wellness startup.",
    size: "small",
    image: "/images/work/work-bloom.jpg",
    accent: "#0284c7",
    link: "/portfolio/bloom-brand",
  },
  {
    id: 5,
    title: "The Founder's Playbook",
    category: "Ebook",
    tags: ["Cover Design", "Layout"],
    description: "Lead magnet ebook with premium cover and editorial layout.",
    size: "small",
    image: "/images/work/work-ebook-founder.jpg",
    accent: "#38bdf8",
    link: "/portfolio/founders-playbook",
  },
  {
    id: 6,
    title: "MediCare Patient Portal",
    category: "UI/UX",
    tags: ["UX Research", "Figma"],
    description: "Accessible patient portal redesign for a healthcare provider.",
    size: "large",
    image: "/images/work/work-medicare.jpg",
    accent: "#0ea5e9",
    link: "/portfolio/medicare-portal",
  },
  {
    id: 7,
    title: "NomadHQ SaaS Platform",
    category: "Web Dev",
    tags: ["React", "Node.js"],
    description: "Remote team management platform with real-time collaboration.",
    size: "small",
    image: "/images/work/work-nomadhq.jpg",
    accent: "#7dd3fc",
    link: "/portfolio/nomadhq",
  },
  {
    id: 8,
    title: "SwiftDeliver App",
    category: "App Dev",
    tags: ["Flutter", "Android"],
    description: "Last-mile delivery tracking app with live map integration.",
    size: "small",
    image: "/images/work/work-swiftdeliver.jpg",
    accent: "#0284c7",
    link: "/portfolio/swiftdeliver",
  },
  {
    id: 9,
    title: "Atlas Social Media Kit",
    category: "Graphics",
    tags: ["Social Media", "Branding"],
    description: "60-piece social media template kit for a travel influencer.",
    size: "large",
    image: "/images/work/work-atlas.jpg",
    accent: "#38bdf8",
    link: "/portfolio/atlas-kit",
  },
  {
    id: 10,
    title: "Scale Your Agency",
    category: "Ebook",
    tags: ["Writing", "Design"],
    description: "Authority ebook for a marketing coach — written, designed, formatted.",
    size: "small",
    image: "/images/work/work-ebook-agency.jpg",
    accent: "#0ea5e9",
    link: "/portfolio/scale-your-agency",
  },
];

const INITIAL_SHOW = 6;

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Single project card ──
function ProjectCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.65s ease ${index * 0.07}s, transform 0.65s ease ${index * 0.07}s`,
        position: "relative",
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "rgba(5,15,31,0.8)",
        border: `1px solid ${hovered ? project.accent + "40" : "rgba(14,165,233,0.1)"}`,
        cursor: "pointer",
        minHeight: isLarge ? "320px" : "260px",
        transition: `opacity 0.65s ease ${index * 0.07}s, transform 0.65s ease ${index * 0.07}s, border-color 0.3s ease`,
      }}
    >
      {/* ── Background image area ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

        {/* ────────────────────────────────────────────────────────────
            PROJECT IMAGE PLACEHOLDER
            Replace the div below with: */}

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              style={{ transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s ease" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Tip: Use real screenshots of your work at 900×600px minimum.
        ────────────────────────────────────────────────────────────  */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, rgba(5,15,31,0.95) 0%, ${project.accent}18 50%, rgba(5,15,31,0.85) 100%)`,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        >
          {/* Dot grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(${project.accent}20 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }} />
          {/* Center placeholder icon */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            <svg style={{ color: `${project.accent}35`, width: "2.5rem", height: "2.5rem" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span style={{ color: `${project.accent}40`, fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}>
              {project.image}
            </span>
          </div>
        </div>
      </div>

      {/* ── Always-visible gradient overlay (bottom) ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(2,12,24,0.95) 0%, rgba(2,12,24,0.5) 40%, transparent 70%)",
        zIndex: 2,
      }} />

      {/* ── Hover overlay (full) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: `linear-gradient(135deg, ${project.accent}18, rgba(2,12,24,0.7))`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* ── Card content ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "1.5rem",
      }}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} style={{
              background: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
              color: project.accent,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem", letterSpacing: "0.06em",
            }} className="px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          color: "rgba(255,255,255,0.95)",
          fontWeight: 700, fontSize: isLarge ? "1.35rem" : "1.05rem",
          marginBottom: "0.35rem",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.35s ease",
        }}>
          {project.title}
        </h3>

        {/* Description — shows on hover */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.8rem", lineHeight: 1.6,
          maxHeight: hovered ? "60px" : "0px",
          overflow: "hidden",
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.35s ease",
          marginBottom: hovered ? "0.75rem" : "0",
        }}>
          {project.description}
        </p>

        {/* View link — shows on hover */}
        <Link
          href={project.link}
          style={{
            color: project.accent,
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.8rem", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "6px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
            width: "fit-content",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          View Case Study
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* ── Category badge (top-right) ── */}
      <div style={{
        position: "absolute", top: "1rem", right: "1rem", zIndex: 5,
        background: "rgba(2,12,24,0.8)", backdropFilter: "blur(8px)",
        border: `1px solid ${project.accent}30`,
        borderRadius: "999px",
        padding: "0.3rem 0.75rem",
      }}>
        <span style={{
          color: project.accent,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          {project.category}
        </span>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setShowAll(false);
    setAnimKey((k) => k + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --border: rgba(14,165,233,0.15);
        }

        .work-title-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 55%, #0ea5e9 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Filter pill active glow */
        .filter-pill-active {
          box-shadow: 0 0 18px rgba(14,165,233,0.35), inset 0 0 12px rgba(14,165,233,0.1);
        }

        /* Bento grid */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        @media (max-width: 1024px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
          .work-grid > *[style*="span 2"] { grid-column: span 2; }
        }
        @media (max-width: 580px) {
          .work-grid { grid-template-columns: 1fr; }
          .work-grid > * { grid-column: 1 !important; }
        }

        /* Header reveal */
        .header-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .header-reveal.show { opacity: 1; transform: translateY(0); }

        /* Scroll number counter badge */
        @keyframes badgePop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .badge-pop { animation: badgePop 0.35s ease forwards; }
      `}</style>

      <section
        style={{ background: "var(--deep)", position: "relative", overflow: "hidden" }}
        className="py-24 lg:py-32"
      >
        {/* Decorative bg glow */}
        <div style={{
          position: "absolute", top: "30%", right: "-10%",
          width: "45vw", height: "45vw", maxWidth: 550,
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
        }} />

        {/* Top border */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* ── Section header ── */}
          <div
            ref={headerRef}
            className={`header-reveal ${headerInView ? "show" : ""} flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12`}
          >
            <div>
              <span style={{
                border: "1px solid var(--border)",
                background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                  className="w-1.5 h-1.5 rounded-full" />
                Our Work
              </span>

              <h2
                style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.08 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-black"
              >
                <span className="text-white">Work We're</span>
                <br />
                <span className="work-title-gradient">Proud Of</span>
              </h2>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "340px", lineHeight: 1.75,
              fontSize: "0.9rem",
            }}>
              A selection of projects across design, development, and publishing.
              Every project is a story — here are some of our favourites.
            </p>
          </div>

          {/* ── Filter tabs ── */}
          <div
            className={`header-reveal ${headerInView ? "show" : ""} flex flex-wrap gap-2.5 mb-10`}
            style={{ transitionDelay: "0.1s" }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem", fontWeight: 500,
                    padding: "0.45rem 1.1rem",
                    borderRadius: "999px",
                    border: isActive ? "1px solid rgba(14,165,233,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.15))"
                      : "rgba(255,255,255,0.03)",
                    color: isActive ? "#38bdf8" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  className={isActive ? "filter-pill-active" : "hover:border-white/20 hover:text-white/70"}
                >
                  {cat}
                  {/* project count badge */}
                  {isActive && (
                    <span className="badge-pop ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
                      style={{ background: "rgba(14,165,233,0.3)", color: "#7dd3fc" }}>
                      {activeFilter === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Project grid ── */}
          <div ref={gridRef} key={animKey} className="work-grid">
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                visible={gridInView}
              />
            ))}
          </div>

          {/* ── Load more / View all ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            {!showAll && filtered.length > INITIAL_SHOW && (
              <button
                onClick={() => setShowAll(true)}
                style={{
                  border: "1px solid var(--border)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "rgba(14,165,233,0.04)",
                }}
                className="inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-full hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                Load More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            <Link
              href="/portfolio"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                fontFamily: "'Syne', sans-serif",
                boxShadow: "0 0 24px rgba(14,165,233,0.28)",
              }}
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-full hover:scale-105 transition-transform duration-200"
            >
              View Full Portfolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* ── Bottom "work with us" strip ── */}
          <div style={{
            marginTop: "5rem",
            background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(2,132,199,0.05) 100%)",
            border: "1px solid rgba(14,165,233,0.15)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
            position: "relative", overflow: "hidden",
          }}>
            {/* Background shimmer */}
            <div style={{
              position: "absolute", top: "-50%", right: "-10%",
              width: "300px", height: "300px",
              background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.3rem" }}>
                Ready to be our next success story?
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}>
                Let's build something you'll be proud to show the world.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                fontFamily: "'Syne', sans-serif",
                boxShadow: "0 0 24px rgba(14,165,233,0.3)",
                position: "relative", zIndex: 1,
              }}
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3.5 rounded-full hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}