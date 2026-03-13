"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// WEB DEVELOPMENT SERVICE PAGE — BlueWave Promotions
// app/services/web-development/page.jsx
//
// Sections:
//   1. Hero        — full-screen with code rain + headline
//   2. Overview    — what we build + image placeholder
//   3. Tech Stack  — interactive tech cards
//   4. What's Included — detailed deliverables
//   5. Case Studies — 3 mini project cards
//   6. Packages    — 3 pricing tiers
//   7. Other Services — cross-links
//   8. CTA         — closing strip
// ============================================================

const TECH_STACK = [
  { name: "Next.js",      category: "Framework",  color: "#ffffff", desc: "Our default for all web projects — fast, SEO-ready, and scalable." },
  { name: "React",        category: "UI Library", color: "#61dafb", desc: "Component-driven UIs that are fast to build and easy to maintain." },
  { name: "Tailwind CSS", category: "Styling",    color: "#38bdf8", desc: "Utility-first CSS for pixel-perfect, consistent designs every time." },
  { name: "Node.js",      category: "Backend",    color: "#84cc16", desc: "Fast, event-driven server-side logic for APIs and backends." },
  { name: "Shopify",      category: "E-Commerce", color: "#96bf48", desc: "Custom Shopify themes and apps for high-converting online stores." },
  { name: "Sanity CMS",   category: "CMS",        color: "#f05a28", desc: "Structured content management that editors actually enjoy using." },
  { name: "Vercel",       category: "Deployment", color: "#ffffff", desc: "Zero-config deployments with edge CDN and instant rollbacks." },
  { name: "PostgreSQL",   category: "Database",   color: "#336791", desc: "Rock-solid relational database for data-heavy applications." },
];

const DELIVERABLES = [
  {
    category: "Design & UX",
    accent: "#38bdf8",
    icon: "◎",
    items: [
      "Responsive design — flawless on all screen sizes",
      "UX-first information architecture",
      "Custom animations & micro-interactions",
      "Accessibility (WCAG 2.1 AA compliant)",
    ],
  },
  {
    category: "Performance",
    accent: "#0ea5e9",
    icon: "⚡",
    items: [
      "95+ Google PageSpeed score",
      "Core Web Vitals optimized",
      "Image optimization & lazy loading",
      "Edge caching & CDN setup",
    ],
  },
  {
    category: "SEO & Marketing",
    accent: "#7dd3fc",
    icon: "✦",
    items: [
      "Technical SEO setup (meta, OG, schema)",
      "Sitemap & robots.txt",
      "Analytics integration (GA4 / Plausible)",
      "Conversion rate optimization",
    ],
  },
  {
    category: "Technical",
    accent: "#0284c7",
    icon: "◈",
    items: [
      "Clean, documented codebase",
      "Git version control",
      "Environment setup (dev/staging/prod)",
      "API integrations (CRM, payments, email)",
    ],
  },
  {
    category: "Post-Launch",
    accent: "#38bdf8",
    icon: "◇",
    items: [
      "30-day post-launch support",
      "Video walkthrough of your site",
      "Deployment & DNS setup",
      "Training for your team",
    ],
  },
];

const CASE_STUDIES = [
  {
    title: "Luxe E-Commerce",
    type: "Shopify + Custom Theme",
    result: "2× conversion rate after redesign",
    tags: ["Next.js", "Shopify", "Tailwind"],
    // ── IMAGE GUIDE ────────────────────────────────
    // Add project screenshot at:
    // /public/images/work/work-luxe.jpg (900×560px)
    // ──────────────────────────────────────────────
    image: "/images/work/work-luxe.jpg",
    accent: "#38bdf8",
    href: "/portfolio/luxe-ecommerce",
  },
  {
    title: "NomadHQ Platform",
    type: "SaaS Web Application",
    result: "Launched in 10 weeks, 0 downtime",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "/images/work/work-nomadhq.jpg",
    accent: "#0ea5e9",
    href: "/portfolio/nomadhq",
  },
  {
    title: "MediCare Portal",
    type: "Healthcare Web Platform",
    result: "4.8★ usability score from patients",
    tags: ["Next.js", "Sanity CMS", "WCAG AA"],
    image: "/images/work/work-medicare.jpg",
    accent: "#7dd3fc",
    href: "/portfolio/medicare-portal",
  },
];

const PACKAGES = [
  {
    name: "Landing Page",
    price: "$799",
    timeline: "5–7 days",
    perfect: "Solopreneurs & launches",
    accent: "#38bdf8",
    features: [
      "Up to 5 sections",
      "Responsive design",
      "Contact form integration",
      "SEO basics",
      "2 revision rounds",
      "Vercel deployment",
    ],
    popular: false,
  },
  {
    name: "Business Website",
    price: "$2,499",
    timeline: "2–3 weeks",
    perfect: "Growing businesses",
    accent: "#0ea5e9",
    features: [
      "Up to 10 pages",
      "CMS integration",
      "Blog setup",
      "Analytics & SEO",
      "Unlimited revisions",
      "30-day support",
      "Performance 95+",
    ],
    popular: true,
  },
  {
    name: "Web Application",
    price: "From $5,999",
    timeline: "6–16 weeks",
    perfect: "SaaS & platforms",
    accent: "#7dd3fc",
    features: [
      "Custom architecture",
      "Authentication & dashboards",
      "API development",
      "Database design",
      "Dedicated PM",
      "SLA + ongoing retainer",
      "Full source ownership",
    ],
    popular: false,
  },
];

const OTHER_SERVICES = [
  { label: "UI/UX Designing",   href: "/services/ui-ux-designing",   icon: "◎", accent: "#38bdf8" },
  { label: "App Development",   href: "/services/app-development",   icon: "◈", accent: "#0ea5e9" },
  { label: "Graphics Designing",href: "/services/graphics-designing",icon: "✦", accent: "#7dd3fc" },
  { label: "Ebook Services",    href: "/services/ebook-services",    icon: "⬡", accent: "#0284c7" },
];

// ── InView hook ──
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

// ── Animated code rain ──
function CodeRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols   = Math.floor(canvas.width / 22);
    const drops  = Array(cols).fill(0).map(() => Math.random() * -50);
    const chars  = "01{}[]<>/=;()function=>import export const let";

    const draw = () => {
      ctx.fillStyle = "rgba(2,12,24,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() * 0.4 + 0.05;
        ctx.fillStyle = `rgba(14,165,233,${alpha})`;
        ctx.fillText(char, i * 22, y * 22);
        if (y * 22 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5, pointerEvents: "none" }} />;
}

export default function WebDevelopmentPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTech, setActiveTech]   = useState(TECH_STACK[0]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const [overviewRef,   overviewInView]   = useInView(0.1);
  const [techRef,       techInView]       = useInView(0.1);
  const [delivRef,      delivInView]      = useInView(0.1);
  const [casesRef,      casesInView]      = useInView(0.08);
  const [packagesRef,   packagesInView]   = useInView(0.08);
  const [othersRef,     othersInView]     = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --surface:#050f1f;
          --border: rgba(14,165,233,0.15);
        }

        .wd-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 55%, #0ea5e9 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fade-up {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }

        .slide-left  { opacity:0; transform:translateX(-28px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .slide-left.show  { opacity:1; transform:translateX(0); }
        .slide-right { opacity:0; transform:translateX(28px);  transition: opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s; }
        .slide-right.show { opacity:1; transform:translateX(0); }

        /* Tech card */
        .tech-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          padding: 0.45rem 1rem; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.45);
          cursor: pointer; white-space: nowrap;
          transition: all 0.22s ease;
        }
        .tech-chip:hover { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.18); }
        .tech-chip.active {
          background: rgba(14,165,233,0.15);
          border-color: rgba(56,189,248,0.45);
          color: #38bdf8;
          box-shadow: 0 0 14px rgba(14,165,233,0.2);
        }

        /* Deliverable card hover */
        .del-card { transition: border-color 0.3s ease, transform 0.3s ease; }
        .del-card:hover { transform: translateY(-3px); }

        /* Pricing popular glow */
        @keyframes priceGlow {
          0%,100% { box-shadow: 0 0 30px rgba(14,165,233,0.15); }
          50%      { box-shadow: 0 0 50px rgba(14,165,233,0.3); }
        }
        .price-glow { animation: priceGlow 3.5s ease-in-out infinite; }

        /* Case study card */
        .case-card { transition: border-color 0.3s ease, transform 0.3s ease; }
        .case-card:hover { transform: translateY(-4px); }

        /* Other service link */
        .other-svc { transition: all 0.25s ease; }
        .other-svc:hover { border-color: rgba(56,189,248,0.3) !important; background: rgba(14,165,233,0.06) !important; transform: translateX(4px); }

        /* Breadcrumb */
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:0.75rem; color:rgba(255,255,255,0.3); }
        .breadcrumb a { color:rgba(56,189,248,0.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }

        /* Wave */
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation: wvA 16s linear infinite; }

        /* Mono font for code snippets */
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ================================================================
            1. HERO
            ================================================================ */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "9rem", paddingBottom: "6rem" }}>

          {/* Code rain canvas */}
          <CodeRain />

          {/* Radial glow */}
          <div style={{
            position: "absolute", top: "10%", left: "5%",
            width: "55vw", height: "55vw", maxWidth: 680,
            background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)",
            pointerEvents: "none", borderRadius: "50%",
          }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

            {/* Breadcrumb */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb">
                <Link href="/">Home</Link> {" / "}
                <Link href="/services">Services</Link> {" / "}
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Web Development</span>
              </span>
            </div>

            <div style={{ maxWidth: "780px" }}>
              {/* Eyebrow */}
              <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.05s", marginBottom: "1.5rem" }}>
                <span style={{
                  border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                  color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
                }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Web Development
                </span>
              </div>

              {/* Headline */}
              <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.12s" }}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }}
                  className="text-5xl lg:text-7xl">
                  <span className="text-white">Websites That</span>
                  <br />
                  <span className="wd-gradient">Work as Hard</span>
                  <br />
                  <span className="text-white">as You Do.</span>
                </h1>
              </div>

              {/* Sub */}
              <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.22s" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "560px", marginBottom: "2.5rem" }}>
                  From lightning-fast landing pages to complex SaaS platforms — we build
                  with Next.js, clean architecture, and an obsession for performance that
                  your users and search engines will love.
                </p>
              </div>

              {/* CTAs */}
              <div className={`fade-up ${heroVisible ? "show" : ""} flex flex-wrap gap-4`} style={{ transitionDelay: "0.32s" }}>
                <Link href="/contact" style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: "0.9rem", padding: "0.95rem 2rem", borderRadius: "999px",
                  textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,0.35)",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                }} className="hover:scale-105 transition-transform duration-200">
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/portfolio" style={{
                  border: "1px solid rgba(14,165,233,0.2)", color: "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                  padding: "0.95rem 2rem", borderRadius: "999px", textDecoration: "none",
                  background: "rgba(14,165,233,0.04)",
                }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                  See Live Work
                </Link>
              </div>

              {/* Trust badges */}
              <div className={`fade-up ${heroVisible ? "show" : ""} flex flex-wrap items-center gap-6 mt-10`} style={{ transitionDelay: "0.42s" }}>
                {[
                  { icon: "⚡", label: "95+ PageSpeed" },
                  { icon: "🔒", label: "SSL + GDPR Ready" },
                  { icon: "📱", label: "Mobile-First" },
                  { icon: "♿", label: "WCAG Compliant" },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.9rem" }}>{b.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55px", overflow: "hidden" }}>
            <svg className="wv-a" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }}
              viewBox="0 0 1440 55" preserveAspectRatio="none">
              <path d="M0,28 C240,50 480,5 720,28 C960,50 1200,5 1440,28 L1440,55 L0,55 Z" fill="rgba(14,165,233,0.05)" />
              <path d="M0,28 C240,50 480,5 720,28 C960,50 1200,5 1440,28 L1440,55 L0,55 Z" transform="translate(720,0)" fill="rgba(14,165,233,0.05)" />
            </svg>
          </div>
        </section>

        {/* ================================================================
            2. OVERVIEW + IMAGE
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={overviewRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
              className="grid-cols-1 lg:grid-cols-2">

              {/* Left image */}
              <div className={`slide-left ${overviewInView ? "show" : ""}`}>
                {/* ──────────────────────────────────────────────────────
                    OVERVIEW IMAGE PLACEHOLDER
                    Replace with:
                    Recommended: browser mockup, laptop with website,
                    or multi-device responsive screenshot. 1160×840px
                ────────────────────────────────────────────────────── */}
                    <Image
                      src="/images/services/web-dev-overview.jpg"
                      alt="Web Development at BlueWave"
                      width={580} height={420}
                      className="rounded-2xl object-cover w-full"
                    />


                {/* <div style={{
                  width: "100%", height: "400px", borderRadius: "1.5rem",
                  background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(5,15,31,0.9), rgba(56,189,248,0.07))",
                  border: "1px solid rgba(14,165,233,0.18)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(14,165,233,0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                 
                  <div style={{
                    position: "relative", zIndex: 1, width: "85%",
                    background: "rgba(5,15,31,0.9)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}>
                    <div style={{ padding: "0.6rem 0.9rem", borderBottom: "1px solid rgba(14,165,233,0.1)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {["#f87171","#fbbf24","#34d399"].map(c => (
                        <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />
                      ))}
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "18px", marginLeft: "0.5rem" }} />
                    </div>
                    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[80, 60, 90, 45].map((w, i) => (
                        <div key={i} style={{ height: "8px", borderRadius: "4px", width: `${w}%`, background: "rgba(14,165,233,0.2)" }} />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(14,165,233,0.4)", fontSize: "0.7rem", position: "relative", zIndex: 1 }}>
                    /images/services/web-dev-overview.jpg
                  </p>
                </div> */}
              </div>

              {/* Right content */}
              <div className={`slide-right ${overviewInView ? "show" : ""}`}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  What We Build
                </span>

                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.7rem,3vw,2.5rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    Every type of web project, built right.
                  </span>
                </h2>

                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "1.75rem" }}>
                  Whether you need a polished marketing site, a full-blown SaaS product, or
                  a high-converting e-commerce store — we've built them all. Our Next.js-first
                  approach means your site is fast by default, scalable by design, and
                  maintainable by anyone.
                </p>

                {/* What we build list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {[
                    "Marketing & Portfolio Websites",
                    "E-Commerce Stores (Shopify / Custom)",
                    "SaaS Platforms & Dashboards",
                    "Company Intranets & Portals",
                    "Blog & Content Platforms",
                    "Web Apps & Tools",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 6px #0ea5e9", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            3. TECH STACK
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div ref={techRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem",
            opacity: techInView ? 1 : 0, transform: techInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease" }}>

            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Our Stack
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="wd-gradient">Battle-tested tech,</span>
                <br />
                <span className="text-white">chosen for your success</span>
              </h2>
            </div>

            {/* Chip row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {TECH_STACK.map(t => (
                <button key={t.name} onClick={() => setActiveTech(t)}
                  className={`tech-chip ${activeTech.name === t.name ? "active" : ""}`}>
                  {t.name}
                </button>
              ))}
            </div>

            {/* Active tech detail */}
            <div style={{
              maxWidth: "640px", margin: "0 auto",
              background: "rgba(5,15,31,0.8)", border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: "1.25rem", padding: "2rem",
              display: "flex", gap: "1.5rem", alignItems: "flex-start",
              transition: "all 0.3s ease",
            }}>
              <div style={{
                width: "3.5rem", height: "3.5rem", borderRadius: "1rem", flexShrink: 0,
                background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="mono" style={{ color: activeTech.color, fontWeight: 700, fontSize: "0.75rem" }}>
                  {activeTech.name.slice(0, 3)}
                </span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "1rem" }}>
                    {activeTech.name}
                  </h4>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.15rem 0.6rem", borderRadius: "999px" }}>
                    {activeTech.category}
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.48)", fontSize: "0.87rem", lineHeight: 1.7 }}>
                  {activeTech.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            4. DELIVERABLES
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={delivRef} style={{ textAlign: "center", marginBottom: "3.5rem",
              opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What You Get
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Everything your</span>{" "}
                <span className="wd-gradient">site needs to win</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.1rem" }}>
              {DELIVERABLES.map((d, i) => (
                <div key={d.category}
                  className="del-card"
                  style={{
                    opacity: delivInView ? 1 : 0,
                    transform: delivInView ? "translateY(0)" : "translateY(28px)",
                    transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
                    background: "rgba(5,15,31,0.7)",
                    border: `1px solid rgba(14,165,233,0.1)`,
                    borderRadius: "1.1rem", padding: "1.6rem",
                    position: "relative", overflow: "hidden",
                  }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${d.accent}, transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
                    <span style={{ fontSize: "1.3rem", color: d.accent, filter: `drop-shadow(0 0 6px ${d.accent}80)` }}>{d.icon}</span>
                    <h4 style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.9rem" }}>{d.category}</h4>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    {d.items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                        <svg style={{ color: d.accent, width: "0.85rem", height: "0.85rem", flexShrink: 0, marginTop: "3px" }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.52)", fontSize: "0.81rem", lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            5. CASE STUDIES
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={casesRef} style={{ marginBottom: "3rem",
              opacity: casesInView ? 1 : 0, transform: casesInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-4">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Work We've Done
                </span>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="wd-gradient">Recent web</span>{" "}
                  <span className="text-white">projects</span>
                </h2>
              </div>
              <Link href="/portfolio" style={{ fontFamily: "'DM Sans', sans-serif", color: "#38bdf8", fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                className="hover:gap-2 transition-all">
                View all work
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {CASE_STUDIES.map((cs, i) => (
                <Link key={cs.title} href={cs.href}
                  className="case-card"
                  style={{
                    opacity: casesInView ? 1 : 0,
                    transform: casesInView ? "translateY(0)" : "translateY(32px)",
                    transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
                    display: "block", textDecoration: "none",
                    background: "rgba(5,15,31,0.7)",
                    border: `1px solid rgba(14,165,233,0.1)`,
                    borderRadius: "1.25rem", overflow: "hidden",
                  }}>
                  {/* Image area */}
                  <div style={{ height: "200px", position: "relative", overflow: "hidden",
                    background: `linear-gradient(135deg, rgba(5,15,31,0.95), ${cs.accent}18, rgba(5,15,31,0.85))` }}>
                    <Image src={cs.image} alt={cs.title} fill className="object-cover" /> ──
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${cs.accent}15 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: `${cs.accent}40`, fontSize: "0.7rem" }}>{cs.image}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(5,15,31,0.95), transparent)" }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
                      {cs.tags.map(t => (
                        <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", color: cs.accent, background: `${cs.accent}10`, border: `1px solid ${cs.accent}25`, fontSize: "0.65rem", letterSpacing: "0.06em", padding: "0.2rem 0.65rem", borderRadius: "999px" }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem" }}>{cs.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginBottom: "0.85rem" }}>{cs.type}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem" }}>📈</span>
                      <span style={{ fontFamily: "'Syne', sans-serif", color: cs.accent, fontWeight: 600, fontSize: "0.8rem" }}>{cs.result}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            6. PACKAGES
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={packagesRef} style={{ textAlign: "center", marginBottom: "3.5rem",
              opacity: packagesInView ? 1 : 0, transform: packagesInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Packages
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Pick your package,</span>
                <br />
                <span className="wd-gradient">we'll do the rest</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
              {PACKAGES.map((pkg, i) => (
                <div key={pkg.name}
                  className={pkg.popular ? "price-glow" : ""}
                  style={{
                    opacity: packagesInView ? 1 : 0,
                    transform: packagesInView ? (pkg.popular ? "scale(1.03)" : "scale(1)") : "translateY(32px)",
                    transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
                    background: pkg.popular ? "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(5,15,31,0.95))" : "rgba(5,15,31,0.7)",
                    border: `1px solid ${pkg.popular ? "rgba(14,165,233,0.35)" : "rgba(14,165,233,0.1)"}`,
                    borderRadius: "1.35rem", padding: "2rem",
                    position: "relative", overflow: "hidden",
                  }}>
                  {pkg.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />}
                  {pkg.popular && (
                    <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", color: "#38bdf8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", padding: "0.25rem 0.7rem", borderRadius: "999px" }}>
                      MOST POPULAR
                    </span>
                  )}
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: pkg.accent, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{pkg.name}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "2.25rem", color: "white" }}>{pkg.price}</span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span>⏱</span> {pkg.timeline}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span>✓</span> {pkg.perfect}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <svg style={{ color: pkg.accent, width: "0.85rem", height: "0.85rem", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.58)", fontSize: "0.81rem" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" style={{
                    display: "block", textAlign: "center", textDecoration: "none",
                    background: pkg.popular ? "linear-gradient(135deg, #0ea5e9, #0284c7)" : "rgba(14,165,233,0.07)",
                    border: pkg.popular ? "none" : `1px solid ${pkg.accent}30`,
                    color: pkg.popular ? "white" : pkg.accent,
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                    padding: "0.85rem", borderRadius: "0.75rem",
                    boxShadow: pkg.popular ? "0 0 20px rgba(14,165,233,0.25)" : "none",
                  }} className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.22)", fontSize: "0.76rem", marginTop: "1.25rem" }}>
              All prices are starting points. Final quote after free discovery call.
            </p>
          </div>
        </section>

        {/* ================================================================
            7. OTHER SERVICES
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "5rem 0" }}>
          <div ref={othersRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem",
            opacity: othersInView ? 1 : 0, transform: othersInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              We also offer
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem" }}>
              {OTHER_SERVICES.map(s => (
                <Link key={s.label} href={s.href}
                  className="other-svc"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(5,15,31,0.6)", border: "1px solid rgba(14,165,233,0.08)",
                    borderRadius: "0.875rem", padding: "1rem 1.25rem", textDecoration: "none",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: s.accent, fontSize: "1.1rem" }}>{s.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", fontWeight: 500 }}>{s.label}</span>
                  </div>
                  <svg style={{ color: "rgba(255,255,255,0.2)", width: "1rem", height: "1rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            8. FINAL CTA
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--wave-3)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Let's build something great
            </p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-5xl">
              <span className="text-white">Your next website</span>
              <br />
              <span className="wd-gradient">starts with one message.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.38)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: "0.9rem" }}>
              Tell us what you need — brief or detailed. We respond within 24 hours with a plan and a price.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "white",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none",
                boxShadow: "0 0 28px rgba(14,165,233,0.35)",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }} className="hover:scale-105 transition-transform duration-200">
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/services" style={{
                border: "1px solid rgba(14,165,233,0.2)", color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none",
                background: "rgba(14,165,233,0.04)",
              }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                ← All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}