"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// UI/UX DESIGNING SERVICE PAGE — BlueWave Promotions
// app/services/ui-ux-designing/page.jsx
//
// Sections:
//   1. Hero        — floating design elements canvas + headline
//   2. Overview    — what we design + image placeholder
//   3. Design Process — 6-step visual flow
//   4. Deliverables — what you get cards
//   5. Tools       — interactive tool selector
//   6. Case Studies — 3 projects
//   7. Packages    — 3 tiers
//   8. Other Services
//   9. CTA
// ============================================================

const DESIGN_PROCESS = [
  { step: "01", title: "Discover",   desc: "Stakeholder interviews, user research, competitor analysis, and goal setting.",        icon: "◎", color: "#38bdf8" },
  { step: "02", title: "Define",     desc: "Personas, user journeys, pain points mapped into clear design requirements.",           icon: "◈", color: "#0ea5e9" },
  { step: "03", title: "Ideate",     desc: "Rapid sketching, concept exploration, and information architecture design.",            icon: "✦", color: "#7dd3fc" },
  { step: "04", title: "Wireframe",  desc: "Low-fidelity layouts that validate structure and flow before visual design begins.",   icon: "◇", color: "#0284c7" },
  { step: "05", title: "Design",     desc: "High-fidelity screens, design system, components, and micro-interactions in Figma.",   icon: "⬡", color: "#38bdf8" },
  { step: "06", title: "Test",       desc: "Usability testing, iteration, developer handoff, and post-launch review.",             icon: "❋", color: "#0ea5e9" },
];

const DELIVERABLES = [
  {
    icon: "◎",
    title: "Research & Strategy",
    accent: "#38bdf8",
    items: [
      "User interviews & surveys",
      "Competitor UX audit",
      "User personas & empathy maps",
      "Jobs-to-be-done framework",
    ],
  },
  {
    icon: "◈",
    title: "Information Architecture",
    accent: "#0ea5e9",
    items: [
      "Site maps & content hierarchy",
      "User flow diagrams",
      "Navigation design",
      "Card sorting results",
    ],
  },
  {
    icon: "✦",
    title: "Visual Design",
    accent: "#7dd3fc",
    items: [
      "High-fidelity Figma screens",
      "Design system & tokens",
      "Component library",
      "Dark & light mode variants",
    ],
  },
  {
    icon: "⬡",
    title: "Prototyping & Testing",
    accent: "#0284c7",
    items: [
      "Interactive Figma prototypes",
      "Usability testing sessions",
      "Heatmap & click analysis",
      "Iteration report",
    ],
  },
  {
    icon: "◇",
    title: "Developer Handoff",
    accent: "#38bdf8",
    items: [
      "Annotated Figma specs",
      "Export-ready assets",
      "Zeplin / Storybook setup",
      "Dev Q&A support",
    ],
  },
];

const TOOLS = [
  { name: "Figma",     cat: "Design & Proto",  color: "#f24e1e", desc: "Our primary tool for all UI design, prototyping, and design system work." },
  { name: "FigJam",   cat: "Collaboration",    color: "#ff7262", desc: "Used for workshops, journey mapping, and real-time team ideation." },
  { name: "Maze",     cat: "User Testing",     color: "#6c47ff", desc: "Remote usability testing with real users — quantified UX insights fast." },
  { name: "Hotjar",   cat: "Analytics",        color: "#ff3c00", desc: "Heatmaps and session recordings to understand real user behavior." },
  { name: "Zeplin",   cat: "Handoff",          color: "#fdbd39", desc: "Pixel-perfect developer handoff with component specs and assets." },
  { name: "Lottie",   cat: "Animation",        color: "#00ddb3", desc: "Micro-interaction animations that bring the interface to life." },
];

const CASE_STUDIES = [
  {
    title: "FinTrack Dashboard",
    type: "SaaS Product Design",
    result: "User retention up 65% post-redesign",
    tags: ["Figma", "Prototyping", "Design System"],
    image: "/images/work/work-fintrack.jpg",
    accent: "#38bdf8",
    href: "/portfolio/fintrack-dashboard",
  },
  {
    title: "MediCare Patient Portal",
    type: "Healthcare UX",
    result: "WCAG AA certified · 4.8★ usability",
    tags: ["UX Research", "Accessibility", "Figma"],
    image: "/images/work/work-medicare.jpg",
    accent: "#0ea5e9",
    href: "/portfolio/medicare-portal",
  },
  {
    title: "FitPulse Mobile UI",
    type: "Mobile App Design",
    result: "App Store rating jumped 3.2 → 4.7★",
    tags: ["Mobile UI", "iOS", "Design System"],
    image: "/images/work/work-fitpulse.jpg",
    accent: "#7dd3fc",
    href: "/portfolio/fitpulse-app",
  },
];

const PACKAGES = [
  {
    name: "UX Audit",
    price: "$599",
    timeline: "3–5 days",
    perfect: "Existing products",
    accent: "#38bdf8",
    popular: false,
    features: [
      "Heuristic evaluation",
      "UX scorecard report",
      "Priority fix list",
      "30-min walkthrough call",
    ],
  },
  {
    name: "Full UI/UX Design",
    price: "$2,999",
    timeline: "3–5 weeks",
    perfect: "New products & redesigns",
    accent: "#0ea5e9",
    popular: true,
    features: [
      "User research & personas",
      "Wireframes + high-fidelity",
      "Interactive prototype",
      "Design system included",
      "2 rounds of user testing",
      "Dev handoff ready",
    ],
  },
  {
    name: "Design System",
    price: "From $4,499",
    timeline: "4–8 weeks",
    perfect: "Teams & scale-ups",
    accent: "#7dd3fc",
    popular: false,
    features: [
      "Complete component library",
      "Token-based design system",
      "Documentation site",
      "Figma + code (React)",
      "Team training session",
      "Ongoing maintenance plan",
    ],
  },
];

const OTHER_SERVICES = [
  { label: "Web Development",   href: "/services/web-development",   icon: "◇", accent: "#38bdf8" },
  { label: "App Development",   href: "/services/app-development",   icon: "◈", accent: "#0ea5e9" },
  { label: "Graphics Designing",href: "/services/graphics-designing",icon: "✦", accent: "#7dd3fc" },
  { label: "Ebook Services",    href: "/services/ebook-services",    icon: "⬡", accent: "#0284c7" },
];

// ── InView hook ──
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Floating shapes canvas (design-themed) ──
function FloatingShapes() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const shapes = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      type: ["circle", "rect", "triangle"][Math.floor(Math.random() * 3)],
      size: Math.random() * 18 + 6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.2 + 0.04,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      color: ["rgba(56,189,248,", "rgba(14,165,233,", "rgba(125,211,252,"][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(s => {
        s.x += s.speedX; s.y += s.speedY; s.rotation += s.rotSpeed;
        if (s.x < -30) s.x = canvas.width + 30;
        if (s.x > canvas.width + 30) s.x = -30;
        if (s.y < -30) s.y = canvas.height + 30;
        if (s.y > canvas.height + 30) s.y = -30;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = `${s.color}${s.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        if (s.type === "circle") {
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        } else if (s.type === "rect") {
          ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else {
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.866, s.size * 0.5);
          ctx.lineTo(-s.size * 0.866, s.size * 0.5);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7, pointerEvents: "none" }} />;
}

export default function UIUXPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTool, setActiveTool]   = useState(TOOLS[0]);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [overviewRef,  overviewInView]  = useInView(0.1);
  const [processRef,   processInView]   = useInView(0.08);
  const [delivRef,     delivInView]     = useInView(0.08);
  const [toolsRef,     toolsInView]     = useInView(0.1);
  const [casesRef,     casesInView]     = useInView(0.08);
  const [packagesRef,  packagesInView]  = useInView(0.08);
  const [othersRef,    othersInView]    = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .ux-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        .sl { opacity:0; transform:translateX(-26px); transition:opacity .75s ease,transform .75s ease; }
        .sl.show { opacity:1; transform:translateX(0); }
        .sr { opacity:0; transform:translateX(26px);  transition:opacity .75s ease .1s,transform .75s ease .1s; }
        .sr.show { opacity:1; transform:translateX(0); }
        .tool-chip { font-family:'DM Sans',sans-serif; font-size:.78rem; font-weight:500; padding:.45rem 1rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; white-space:nowrap; transition:all .22s ease; }
        .tool-chip:hover { color:rgba(255,255,255,.75); border-color:rgba(255,255,255,.18); }
        .tool-chip.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 14px rgba(14,165,233,.2); }
        @keyframes priceGlow { 0%,100%{box-shadow:0 0 30px rgba(14,165,233,.15)} 50%{box-shadow:0 0 50px rgba(14,165,233,.3)} }
        .price-glow { animation:priceGlow 3.5s ease-in-out infinite; }
        .case-card { transition:border-color .3s ease,transform .3s ease; }
        .case-card:hover { transform:translateY(-4px); }
        .del-card { transition:border-color .3s ease,transform .3s ease; }
        .del-card:hover { transform:translateY(-3px); }
        .other-svc { transition:all .25s ease; }
        .other-svc:hover { border-color:rgba(56,189,248,.3)!important; background:rgba(14,165,233,.06)!important; transform:translateX(4px); }
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }
        .process-line { position:absolute; top:1.5rem; left:calc(50% + 1.5rem); right:calc(-50% + 1.5rem); height:1px; background:linear-gradient(90deg,rgba(14,165,233,.3),rgba(14,165,233,.05)); }
        @keyframes shimLine { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .shim-line { background:linear-gradient(90deg,transparent,#38bdf8,transparent); background-size:200% auto; animation:shimLine 3s linear infinite; }
      `}</style>

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "9rem", paddingBottom: "6rem" }}>
          <FloatingShapes />
          <div style={{ position: "absolute", top: "15%", right: "-5%", width: "45vw", height: "45vw", maxWidth: 560, background: "radial-gradient(circle,rgba(14,165,233,.09) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>UI/UX Designing</span></span>
            </div>

            <div style={{ maxWidth: "800px" }}>
              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  UI/UX Designing
                </span>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                  <span className="text-white">Design That</span><br />
                  <span className="ux-grad">Feels Inevitable.</span>
                </h1>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "560px", marginBottom: "2.5rem" }}>
                  Great UI/UX isn't just about looking good — it's about making every interaction feel natural, every journey feel effortless, and every user feel understood. That's what we build.
                </p>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap gap-4`} style={{ transitionDelay: ".32s" }}>
                <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                  Start Your Design
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link href="/portfolio" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                  View Design Work
                </Link>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap items-center gap-6 mt-10`} style={{ transitionDelay: ".42s" }}>
                {[["🎨","Figma Expert"],["♿","WCAG Compliant"],["🔬","Research-Led"],["⚡","Fast Delivery"]].map(([icon, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                    <span style={{ fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".75rem" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55px", overflow: "hidden" }}>
            <svg className="wv-a" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }} viewBox="0 0 1440 55" preserveAspectRatio="none">
              <path d="M0,28 C240,50 480,5 720,28 C960,50 1200,5 1440,28 L1440,55 L0,55 Z" fill="rgba(14,165,233,.05)" />
              <path d="M0,28 C240,50 480,5 720,28 C960,50 1200,5 1440,28 L1440,55 L0,55 Z" transform="translate(720,0)" fill="rgba(14,165,233,.05)" />
            </svg>
          </div>
        </section>

        {/* ── 2. OVERVIEW ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={overviewRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: content */}
              <div className={`sl ${overviewInView ? "show" : ""}`}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  What We Design
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.7rem,3vw,2.5rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Every screen, every state, every user.
                  </span>
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: ".92rem", marginBottom: "1.75rem" }}>
                  We design the full spectrum — from the first landing page impression to the deepest dashboard interaction. Our process starts with real users, not assumptions, and ends with designs your developers will love building.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                  {["SaaS Product Interfaces","Mobile App UI (iOS & Android)","E-Commerce Experiences","Onboarding & Activation Flows","Admin Dashboards & Data Viz","Landing Pages & Marketing Sites","Design Systems & Component Libraries"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px #38bdf8", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", fontSize: ".88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image */}
              <div className={`sr ${overviewInView ? "show" : ""}`}>
                {/* ────────────────────────────────────────────────────
                    OVERVIEW IMAGE
                    Replace with:
                    Recommended: Figma screen, device mockup, or
                    design process photo. 1160×880px
                ──────────────────────────────────────────────────── */}
                    <Image src="/images/services/ui-ux-overview.jpg"
                      alt="UI/UX Design at BlueWave"
                      width={580} height={440}
                      className="rounded-2xl object-cover w-full" />

                {/* <div style={{ width: "100%", height: "420px", borderRadius: "1.5rem", background: "linear-gradient(135deg,rgba(56,189,248,.1),rgba(5,15,31,.9),rgba(14,165,233,.07))", border: "1px solid rgba(14,165,233,.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.06) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                  
                  <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "10px", width: "75%" }}>
                    {[["#38bdf8","90%"],["#0ea5e9","70%"],["#38bdf8","85%"],["#7dd3fc","55%"]].map(([c,w],i) => (
                      <div key={i} style={{ height: "10px", borderRadius: "6px", width: w, background: `${c}22`, border: `1px solid ${c}33` }} />
                    ))}
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      {["#38bdf8","#0284c7","#7dd3fc"].map(c => <div key={c} style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${c}18`, border: `1px solid ${c}30` }} />)}
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(56,189,248,.4)", fontSize: ".7rem", position: "relative", zIndex: 1 }}>/images/services/ui-ux-overview.jpg</p>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. DESIGN PROCESS ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={processRef} style={{ opacity: processInView ? 1 : 0, transform: processInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Our Design Process
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                  <span className="text-white">Research first.</span> <span className="ux-grad">Design second.</span>
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1.1rem", position: "relative" }}>
                {/* Connector line */}
                <div className="hidden lg:block" style={{ position: "absolute", top: "1.5rem", left: "8%", right: "8%", height: "1px", background: "linear-gradient(90deg,rgba(14,165,233,.05),rgba(14,165,233,.25) 50%,rgba(14,165,233,.05))", zIndex: 0 }}>
                  <div className="shim-line" style={{ position: "absolute", inset: 0 }} />
                </div>

                {DESIGN_PROCESS.map((p, i) => (
                  <div key={p.step} style={{
                    opacity: processInView ? 1 : 0,
                    transform: processInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity .6s ease ${.1 + i * .1}s,transform .6s ease ${.1 + i * .1}s`,
                    background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.1)",
                    borderRadius: "1.1rem", padding: "1.5rem 1.1rem", textAlign: "center",
                    position: "relative", zIndex: 1,
                  }}>
                    <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", margin: "0 auto .85rem", background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: p.color, fontSize: "1.1rem" }}>{p.icon}</span>
                    </div>
                    <span style={{ fontFamily: "'Syne',sans-serif", color: p.color, fontSize: ".65rem", letterSpacing: ".1em", fontWeight: 700 }}>STEP {p.step}</span>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: ".92rem", margin: ".3rem 0 .5rem" }}>{p.title}</h4>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".76rem", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DELIVERABLES ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={delivRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What You Get
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Every deliverable</span> <span className="ux-grad">your team needs</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              {DELIVERABLES.map((d, i) => (
                <div key={d.title} className="del-card" style={{
                  opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s`,
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1.1rem", padding: "1.6rem", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${d.accent},transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.1rem" }}>
                    <span style={{ fontSize: "1.3rem", color: d.accent, filter: `drop-shadow(0 0 6px ${d.accent}80)` }}>{d.icon}</span>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.88)", fontWeight: 700, fontSize: ".9rem" }}>{d.title}</h4>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".55rem" }}>
                    {d.items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: ".55rem" }}>
                        <svg style={{ color: d.accent, width: ".85rem", height: ".85rem", flexShrink: 0, marginTop: "3px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.52)", fontSize: ".81rem", lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. TOOLS ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div ref={toolsRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: toolsInView ? 1 : 0, transform: toolsInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Our Tools
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="ux-grad">Industry-standard tools,</span><br /><span className="text-white">expert hands</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {TOOLS.map(t => (
                <button key={t.name} onClick={() => setActiveTool(t)} className={`tool-chip ${activeTool.name === t.name ? "active" : ""}`}>{t.name}</button>
              ))}
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "1.25rem", padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", flexShrink: 0, background: `${activeTool.color}18`, border: `1px solid ${activeTool.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", color: activeTool.color, fontWeight: 700, fontSize: ".7rem" }}>{activeTool.name.slice(0,3)}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".4rem" }}>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: "1rem" }}>{activeTool.name}</h4>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".7rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", padding: ".15rem .6rem", borderRadius: "999px" }}>{activeTool.cat}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", fontSize: ".87rem", lineHeight: 1.7 }}>{activeTool.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CASE STUDIES ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={casesRef} style={{ marginBottom: "3rem", opacity: casesInView ? 1 : 0, transform: casesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-4">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Design Work
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="ux-grad">Recent design</span> <span className="text-white">projects</span>
                </h2>
              </div>
              <Link href="/portfolio" style={{ fontFamily: "'DM Sans',sans-serif", color: "#38bdf8", fontSize: ".85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".4rem" }} className="hover:gap-2 transition-all">
                View all work <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
              {CASE_STUDIES.map((cs, i) => (
                <Link key={cs.title} href={cs.href} className="case-card" style={{ opacity: casesInView ? 1 : 0, transform: casesInView ? "translateY(0)" : "translateY(28px)", transition: `opacity .65s ease ${i * .1}s,transform .65s ease ${i * .1}s`, display: "block", textDecoration: "none", background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)", borderRadius: "1.25rem", overflow: "hidden" }}>
                  <div style={{ height: "200px", background: `linear-gradient(135deg,rgba(5,15,31,.95),${cs.accent}18,rgba(5,15,31,.85))`, position: "relative" }}>
                    <Image src={cs.image} alt={cs.title} fill className="object-cover" />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${cs.accent}15 1px,transparent 1px)`, backgroundSize: "22px 22px" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: `${cs.accent}40`, fontSize: ".7rem" }}>{cs.image}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top,rgba(5,15,31,.95),transparent)" }} />
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".85rem" }}>
                      {cs.tags.map(t => <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", color: cs.accent, background: `${cs.accent}10`, border: `1px solid ${cs.accent}25`, fontSize: ".65rem", letterSpacing: ".06em", padding: ".2rem .65rem", borderRadius: "999px" }}>{t}</span>)}
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: "1rem", marginBottom: ".3rem" }}>{cs.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.4)", fontSize: ".78rem", marginBottom: ".85rem" }}>{cs.type}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <span style={{ fontSize: ".8rem" }}>📈</span>
                      <span style={{ fontFamily: "'Syne',sans-serif", color: cs.accent, fontWeight: 600, fontSize: ".8rem" }}>{cs.result}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. PACKAGES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={packagesRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: packagesInView ? 1 : 0, transform: packagesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Packages
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Transparent pricing,</span><br /><span className="ux-grad">no surprises</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem", alignItems: "start" }}>
              {PACKAGES.map((pkg, i) => (
                <div key={pkg.name} className={pkg.popular ? "price-glow" : ""} style={{ opacity: packagesInView ? 1 : 0, transform: packagesInView ? (pkg.popular ? "scale(1.03)" : "scale(1)") : "translateY(28px)", transition: `opacity .65s ease ${i * .1}s,transform .65s ease ${i * .1}s`, background: pkg.popular ? "linear-gradient(135deg,rgba(14,165,233,.1),rgba(5,15,31,.95))" : "rgba(5,15,31,.7)", border: `1px solid ${pkg.popular ? "rgba(14,165,233,.35)" : "rgba(14,165,233,.1)"}`, borderRadius: "1.35rem", padding: "2rem", position: "relative", overflow: "hidden" }}>
                  {pkg.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#38bdf8,transparent)" }} />}
                  {pkg.popular && <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", color: "#38bdf8", fontFamily: "'DM Sans',sans-serif", fontSize: ".65rem", letterSpacing: ".1em", padding: ".25rem .7rem", borderRadius: "999px" }}>MOST POPULAR</span>}
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: pkg.accent, fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".35rem" }}>{pkg.name}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: ".3rem", marginBottom: ".25rem" }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "2.25rem", color: "white" }}>{pkg.price}</span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".75rem" }}>⏱ {pkg.timeline}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".75rem" }}>✓ {pkg.perfect}</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: ".6rem" }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
                        <svg style={{ color: pkg.accent, width: ".85rem", height: ".85rem", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.58)", fontSize: ".81rem" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" style={{ display: "block", textAlign: "center", textDecoration: "none", background: pkg.popular ? "linear-gradient(135deg,#0ea5e9,#0284c7)" : "rgba(14,165,233,.07)", border: pkg.popular ? "none" : `1px solid ${pkg.accent}30`, color: pkg.popular ? "white" : pkg.accent, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem", padding: ".85rem", borderRadius: ".75rem", boxShadow: pkg.popular ? "0 0 20px rgba(14,165,233,.25)" : "none" }} className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. OTHER SERVICES ── */}
        <section style={{ background: "var(--surface)", padding: "5rem 0" }}>
          <div ref={othersRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: othersInView ? 1 : 0, transform: othersInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.25)", fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>We also offer</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: ".85rem" }}>
              {OTHER_SERVICES.map(s => (
                <Link key={s.label} href={s.href} className="other-svc" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(5,15,31,.6)", border: "1px solid rgba(14,165,233,.08)", borderRadius: ".875rem", padding: "1rem 1.25rem", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                    <span style={{ color: s.accent, fontSize: "1.1rem" }}>{s.icon}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.65)", fontSize: ".85rem", fontWeight: 500 }}>{s.label}</span>
                  </div>
                  <svg style={{ color: "rgba(255,255,255,.2)", width: "1rem", height: "1rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. CTA ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--wave-3)", fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Ready to design something great?</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-5xl">
              <span className="text-white">Your users deserve</span><br /><span className="ux-grad">a better experience.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
              Share your brief or just an idea — we'll come back with a plan and a price within 24 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                Start Your Design <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href="/services" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.65)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                ← All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}