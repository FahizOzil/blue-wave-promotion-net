"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Image from "next/image";

// ============================================================
// EBOOK SERVICES PAGE — BlueWave Promotions
// app/services/ebook-services/page.jsx
//
// Sections:
//   1. Hero        — animated floating book pages canvas
//   2. Overview    — what we do + image
//   3. Ebook Types — 6 type cards (Lead Magnet, Course, etc.)
//   4. Our Process — 5-step publishing pipeline
//   5. What's Included — deliverables grid
//   6. Format Support — platform cards
//   7. Showcase    — 3 sample ebook covers
//   8. Packages    — 3 tiers
//   9. Other Services
//  10. CTA
// ============================================================

const EBOOK_TYPES = [
  {
    icon: "🎁",
    title: "Lead Magnet Ebook",
    accent: "#38bdf8",
    desc: "Short, high-value guides (10–30 pages) designed to grow your email list and build authority in your niche.",
    tags: ["List Building", "Authority", "PDF"],
  },
  {
    icon: "📚",
    title: "Course Companion",
    accent: "#0ea5e9",
    desc: "Workbooks and companion guides that go alongside your online course, bootcamp, or coaching program.",
    tags: ["Workbooks", "Exercises", "Fillable PDF"],
  },
  {
    icon: "💡",
    title: "How-To Guide",
    accent: "#7dd3fc",
    desc: "Step-by-step instructional ebooks that position you as the go-to expert and drive organic traffic.",
    tags: ["Tutorial", "SEO", "Knowledge Product"],
  },
  {
    icon: "📖",
    title: "Full-Length Book",
    accent: "#0284c7",
    desc: "Complete books written, edited, designed, and formatted for Kindle, Apple Books, and print-on-demand.",
    tags: ["KDP", "ePub", "Print-Ready"],
  },
  {
    icon: "🏢",
    title: "Corporate Report",
    accent: "#38bdf8",
    desc: "Annual reports, white papers, and thought leadership documents designed to impress stakeholders.",
    tags: ["White Paper", "Annual Report", "B2B"],
  },
  {
    icon: "🛍️",
    title: "Product Ebook",
    accent: "#0ea5e9",
    desc: "Branded ebooks sold on Gumroad, Etsy, your own store — fully designed and ready to generate passive income.",
    tags: ["Digital Product", "Gumroad", "Passive Income"],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: "◎",
    title: "Discovery Call",
    color: "#38bdf8",
    desc: "We learn your topic, audience, goals, and tone. You share notes, outlines, or just an idea — we take it from there.",
  },
  {
    step: "02",
    icon: "◈",
    title: "Outline & Structure",
    color: "#0ea5e9",
    desc: "We build a chapter-by-chapter outline for your approval before a single word is written or designed.",
  },
  {
    step: "03",
    icon: "✦",
    title: "Writing & Editing",
    color: "#7dd3fc",
    desc: "Our writers craft the content in your voice. Two rounds of editing — structural and line-level — included.",
  },
  {
    step: "04",
    icon: "⬡",
    title: "Design & Layout",
    color: "#0284c7",
    desc: "Cover design + full interior layout in InDesign. Branded, beautiful, and formatted for your target platform.",
  },
  {
    step: "05",
    icon: "◇",
    title: "Publish & Deliver",
    color: "#38bdf8",
    desc: "We export all formats, handle KDP or platform submission if needed, and hand off every file you'll ever need.",
  },
];

const DELIVERABLES = [
  { icon: "🖊️", title: "Written Content",        accent: "#38bdf8", items: ["Expert-written in your voice","Researched & fact-checked","Proofread & copy-edited","Plagiarism-free guarantee"] },
  { icon: "🎨", title: "Cover Design",             accent: "#0ea5e9", items: ["Professional 3D mockup","Front, back & spine design","Kindle & print variants","High-res PNG + print PDF"] },
  { icon: "📐", title: "Interior Layout",          accent: "#7dd3fc", items: ["InDesign professional layout","Custom chapter headers","Branded typography & colors","Fully print-ready PDF"] },
  { icon: "📱", title: "Format Exports",           accent: "#0284c7", items: ["PDF (screen + print)","ePub for Kindle & iBooks","DOCX editable source","Fillable PDF (if workbook)"] },
  { icon: "🚀", title: "Publishing Support",       accent: "#38bdf8", items: ["KDP setup & submission","Gumroad product setup","Amazon listing copy","ISBN guidance if needed"] },
  { icon: "♻️", title: "Repurposing Assets",       accent: "#0ea5e9", items: ["3 social quote graphics","Email announcement copy","Landing page copy blurb","5 key excerpt pull-quotes"] },
];

const PLATFORMS = [
  { name: "Amazon KDP",    icon: "📦", desc: "Kindle + print-on-demand. We handle submission and optimize your listing.", accent: "#f59e0b" },
  { name: "Apple Books",   icon: "🍎", desc: "ePub formatted to Apple Books specs with full metadata.", accent: "#60a5fa" },
  { name: "Gumroad",       icon: "🛒", desc: "Direct sales setup — product page, pricing, and delivery automation.", accent: "#f43f5e" },
  { name: "Payhip",        icon: "💳", desc: "EU VAT-compliant digital product sales for European creators.", accent: "#a78bfa" },
  { name: "Teachable",     icon: "🎓", desc: "Companion workbooks integrated into your course platform.", accent: "#34d399" },
  { name: "Your Website",  icon: "🌐", desc: "Embeddable or hosted PDF delivery via any CMS or web platform.", accent: "#38bdf8" },
];

const EBOOK_SHOWCASES = [
  {
    title: "The Creator's Playbook",
    subtitle: "30-page Lead Magnet",
    pages: "30 pages",
    accent: "#38bdf8",
    category: "Personal Brand",
    result: "2,400 email signups in 30 days",
    image: "/images/work/ebook-creators.jpg",
    href: "/portfolio/creators-playbook",
  },
  {
    title: "Scale Your SaaS",
    subtitle: "Full-Length Business Book",
    pages: "180 pages",
    accent: "#0ea5e9",
    category: "Business",
    result: "#1 in category on Amazon KDP",
    image: "/images/work/ebook-saas.jpg",
    href: "/portfolio/scale-your-saas",
  },
  {
    title: "Mindful Morning Workbook",
    subtitle: "Fillable Course Workbook",
    pages: "60 pages",
    accent: "#7dd3fc",
    category: "Wellness",
    result: "$18k in first month on Gumroad",
    image: "/images/work/ebook-mindful.jpg",
    href: "/portfolio/mindful-morning",
  },
];

const PACKAGES = [
  {
    name: "Lead Magnet",
    price: "$349",
    timeline: "5–7 days",
    perfect: "Coaches & creators",
    accent: "#38bdf8",
    popular: false,
    features: [
      "Up to 20 pages",
      "Cover design included",
      "Professional layout",
      "PDF export",
      "2 revision rounds",
      "Social promo graphic",
    ],
  },
  {
    name: "Full Ebook",
    price: "$999",
    timeline: "2–3 weeks",
    perfect: "Courses & digital products",
    accent: "#0ea5e9",
    popular: true,
    features: [
      "Up to 80 pages",
      "Writing + editing included",
      "Cover + full interior design",
      "PDF + ePub + DOCX",
      "Unlimited revisions",
      "KDP / Gumroad setup",
      "5 social quote graphics",
    ],
  },
  {
    name: "Full-Length Book",
    price: "From $2,499",
    timeline: "4–8 weeks",
    perfect: "Authors & thought leaders",
    accent: "#7dd3fc",
    popular: false,
    features: [
      "80–200+ pages",
      "Full ghostwriting available",
      "Professional editing",
      "Print + digital formats",
      "Amazon KDP publishing",
      "Marketing assets kit",
      "ISBN support",
    ],
  },
];

const OTHER_SERVICES = [
  { label: "UI/UX Designing",   href: "/services/ui-ux-designing",   icon: "◎", accent: "#38bdf8" },
  { label: "Web Development",   href: "/services/web-development",   icon: "◇", accent: "#0ea5e9" },
  { label: "App Development",   href: "/services/app-development",   icon: "◈", accent: "#7dd3fc" },
  { label: "Graphics Designing",href: "/services/graphics-designing",icon: "✦", accent: "#0284c7" },
];

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

// ── Floating book pages canvas ──
function BookPagesCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Floating pages
    const pages = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      w: Math.random() * 30 + 16,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -(Math.random() * 0.3 + 0.1),
      rotation: (Math.random() - 0.5) * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      opacity: Math.random() * 0.18 + 0.04,
      lineCount: Math.floor(Math.random() * 4) + 3,
    }));

    // Floating dots (words)
    const dots = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.2 + 0.05),
      opacity: Math.random() * 0.15 + 0.03,
    }));

    const drawPage = (x, y, w, rot, opacity, lines) => {
      const h = w * 1.41; // A4 ratio
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = opacity;
      // Page body
      ctx.strokeStyle = "rgba(56,189,248,1)";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      // Text lines
      ctx.strokeStyle = "rgba(14,165,233,0.5)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < lines; i++) {
        const ly = -h / 2 + (h / (lines + 1)) * (i + 1);
        const lw = w * (0.5 + Math.random() * 0.4);
        ctx.beginPath();
        ctx.moveTo(-lw / 2, ly);
        ctx.lineTo(lw / 2, ly);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pages.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotSpeed;
        if (p.y < -60) { p.y = canvas.height + 60; p.x = Math.random() * canvas.width; }
        drawPage(p.x, p.y, p.w, p.rotation, p.opacity, p.lineCount);
      });
      dots.forEach(d => {
        d.y += d.speedY;
        if (d.y < -10) { d.y = canvas.height + 10; d.x = Math.random() * canvas.width; }
        ctx.fillStyle = `rgba(56,189,248,${d.opacity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ── 3D Book mock component ──
function BookMock({ accent, title, subtitle, category }) {
  return (
    <div style={{ perspective: "600px", width: "120px", flexShrink: 0 }}>
      <div style={{
        width: "120px", height: "160px",
        transform: "rotateY(-22deg)",
        transformStyle: "preserve-3d",
        position: "relative",
      }}>
        {/* Front cover */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(145deg, ${accent}30, rgba(5,15,31,0.95))`,
          border: `1px solid ${accent}40`,
          borderRadius: "3px 8px 8px 3px",
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "10px",
          boxShadow: `4px 4px 20px rgba(0,0,0,0.5), inset -2px 0 6px rgba(0,0,0,0.3)`,
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${accent}12 1px,transparent 1px)`, backgroundSize: "14px 14px", borderRadius: "3px 8px 8px 3px" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", color: accent, fontSize: ".5rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "4px", position: "relative", zIndex: 1 }}>{category}</span>
          <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 800, fontSize: ".68rem", lineHeight: 1.3, position: "relative", zIndex: 1 }}>{title}</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".52rem", marginTop: "3px", position: "relative", zIndex: 1 }}>{subtitle}</p>
        </div>
        {/* Spine */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "14px",
          background: accent,
          transform: "rotateY(90deg) translateZ(0px) translateX(-7px)",
          borderRadius: "2px 0 0 2px",
          opacity: 0.7,
        }} />
      </div>
    </div>
  );
}

export default function EbookServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [overviewRef,  overviewInView]  = useInView(0.1);
  const [typesRef,     typesInView]     = useInView(0.08);
  const [processRef,   processInView]   = useInView(0.08);
  const [delivRef,     delivInView]     = useInView(0.08);
  const [platRef,      platInView]      = useInView(0.1);
  const [showcaseRef,  showcaseInView]  = useInView(0.08);
  const [packagesRef,  packagesInView]  = useInView(0.08);
  const [othersRef,    othersInView]    = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .eb-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        .sl { opacity:0; transform:translateX(-26px); transition:opacity .75s ease,transform .75s ease; }
        .sl.show { opacity:1; transform:translateX(0); }
        .sr { opacity:0; transform:translateX(26px); transition:opacity .75s ease .1s,transform .75s ease .1s; }
        .sr.show { opacity:1; transform:translateX(0); }
        .type-card { transition:border-color .3s ease,transform .3s ease; }
        .type-card:hover { transform:translateY(-4px); border-color:rgba(56,189,248,.28)!important; }
        .plat-card { transition:border-color .3s ease,transform .3s ease; }
        .plat-card:hover { transform:translateY(-3px); border-color:rgba(56,189,248,.25)!important; }
        .showcase-card { transition:border-color .3s ease,transform .3s ease; }
        .showcase-card:hover { transform:translateY(-5px); }
        @keyframes priceGlow { 0%,100%{box-shadow:0 0 30px rgba(14,165,233,.15)} 50%{box-shadow:0 0 50px rgba(14,165,233,.3)} }
        .price-glow { animation:priceGlow 3.5s ease-in-out infinite; }
        .other-svc { transition:all .25s ease; }
        .other-svc:hover { border-color:rgba(56,189,248,.3)!important; background:rgba(14,165,233,.06)!important; transform:translateX(4px); }
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }
        @keyframes shimLine { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .shim-line { background:linear-gradient(90deg,transparent,#38bdf8,transparent); background-size:200% auto; animation:shimLine 3s linear infinite; }
      `}</style>

      <Navbar />

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "9rem", paddingBottom: "6rem" }}>
          <BookPagesCanvas />
          <div style={{ position: "absolute", inset: 0, background: "rgba(2,12,24,0.75)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "-5%", width: "40vw", height: "40vw", maxWidth: 480, background: "radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>Ebook Services</span>
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-[1fr_auto]">
              <div style={{ maxWidth: "760px" }}>
                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                  <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                    className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                    <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                    Ebook Services
                  </span>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                    <span className="text-white">Publish</span>{" "}
                    <span className="eb-grad">Knowledge</span><br />
                    <span className="text-white">That Sells.</span>
                  </h1>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "560px", marginBottom: "2.5rem" }}>
                    From a rough idea to a polished, published ebook — we handle writing, design, formatting, and launch. You share your expertise. We turn it into a product the world can buy.
                  </p>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap gap-4`} style={{ transitionDelay: ".32s" }}>
                  <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                    Publish My Ebook
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Link>
                  <Link href="/portfolio" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                    See Examples
                  </Link>
                </div>

                <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap items-center gap-6 mt-10`} style={{ transitionDelay: ".42s" }}>
                  {[["✍️","Ghostwriting Available"],["🎨","Pro Cover Design"],["📦","KDP Ready"],["⚡","7-Day Turnaround"]].map(([icon, label]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                      <span style={{ fontSize: ".9rem" }}>{icon}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.32)", fontSize: ".75rem" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero book stack — hidden on small screens */}
              <div className={`fu hidden lg:flex ${heroVisible ? "show" : ""} flex-col items-center gap-5`} style={{ transitionDelay: ".5s" }}>
                <BookMock accent="#38bdf8" title="The Creator's Playbook" subtitle="BlueWave Press" category="Personal Brand" />
                <BookMock accent="#0ea5e9" title="Scale Your SaaS" subtitle="BlueWave Press" category="Business" />
                <BookMock accent="#7dd3fc" title="Mindful Mornings" subtitle="BlueWave Press" category="Wellness" />
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
              <div className={`sl ${overviewInView ? "show" : ""}`}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  What We Do
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.7rem,3vw,2.5rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    You have the knowledge. We build the product.
                  </span>
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: ".92rem", marginBottom: "1.5rem" }}>
                  Most experts sit on a goldmine of knowledge that never becomes a product because writing and design feel overwhelming. We remove both barriers completely — handling everything from first draft to final file so you can focus on what you do best.
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", lineHeight: 1.8, fontSize: ".88rem", marginBottom: "1.75rem" }}>
                  Whether you come to us with a full manuscript, a rough outline, or just an idea — we'll produce a professional ebook that looks stunning, reads beautifully, and earns you passive income.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
                  {[
                    "Lead Magnets & Opt-in Guides",
                    "Online Course Companion Workbooks",
                    "Full-Length Published Books (KDP)",
                    "Corporate White Papers & Reports",
                    "How-To Guides & Tutorials",
                    "Branded Ebooks Sold on Your Store",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px #38bdf8", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", fontSize: ".88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right image */}
              <div className={`sr ${overviewInView ? "show" : ""}`}>
                {/* ────────────────────────────────────────────────────
                    OVERVIEW IMAGE
                    Replace with:
                    Recommended: ebook flat lay, open book,
                    Kindle mockup, or workspace shot. 1160×880px
                ──────────────────────────────────────────────────── */}
                    <Image src="/images/services/ebook-overview.jpg"
                      alt="Ebook Services at BlueWave"
                      width={580} height={440}
                      className="rounded-2xl object-cover w-full" />
               
            </div>
          </div>
          </div>
        </section>


        {/* ── 3. EBOOK TYPES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={typesRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: typesInView ? 1 : 0, transform: typesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Ebook Types
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Six types of ebooks</span><br /><span className="eb-grad">we publish to perfection</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.1rem" }}>
              {EBOOK_TYPES.map((t, i) => (
                <div key={t.title} className="type-card" style={{
                  opacity: typesInView ? 1 : 0,
                  transform: typesInView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s`,
                  background: "rgba(5,15,31,.75)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1.1rem", padding: "1.75rem", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${t.accent},transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".9rem" }}>
                    <div style={{ width: "2.6rem", height: "2.6rem", borderRadius: ".75rem", background: `${t.accent}12`, border: `1px solid ${t.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                      {t.icon}
                    </div>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: ".92rem" }}>{t.title}</h4>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".82rem", lineHeight: 1.7, marginBottom: "1rem" }}>{t.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: "'DM Sans',sans-serif", color: t.accent, background: `${t.accent}0e`, border: `1px solid ${t.accent}22`, fontSize: ".65rem", letterSpacing: ".05em", padding: ".2rem .65rem", borderRadius: "999px" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. PROCESS ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={processRef} style={{ opacity: processInView ? 1 : 0, transform: processInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Our Process
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                  <span className="eb-grad">Idea to published</span><br /><span className="text-white">in 5 clear steps</span>
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1.1rem", position: "relative" }}>
                <div className="hidden lg:block" style={{ position: "absolute", top: "1.5rem", left: "8%", right: "8%", height: "1px", zIndex: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(14,165,233,.05),rgba(14,165,233,.25) 50%,rgba(14,165,233,.05))" }} />
                  <div className="shim-line" style={{ position: "absolute", inset: 0 }} />
                </div>

                {PROCESS_STEPS.map((p, i) => (
                  <div key={p.step} style={{
                    opacity: processInView ? 1 : 0,
                    transform: processInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity .6s ease ${.1 + i * .1}s,transform .6s ease ${.1 + i * .1}s`,
                    background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.1)",
                    borderRadius: "1.1rem", padding: "1.5rem 1.1rem",
                    textAlign: "center", position: "relative", zIndex: 1,
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

        {/* ── 5. DELIVERABLES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={delivRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What You Get
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Everything to</span> <span className="eb-grad">write, design & sell</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              {DELIVERABLES.map((d, i) => (
                <div key={d.title} style={{
                  opacity: delivInView ? 1 : 0,
                  transform: delivInView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s`,
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1.1rem", padding: "1.6rem", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${d.accent},transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.1rem" }}>
                    <span style={{ fontSize: "1.3rem" }}>{d.icon}</span>
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

        {/* ── 6. PLATFORMS ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={platRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: platInView ? 1 : 0, transform: platInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Platform Support
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="eb-grad">Publish anywhere.</span><br /><span className="text-white">We handle the setup.</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
              {PLATFORMS.map((p, i) => (
                <div key={p.name} className="plat-card" style={{
                  opacity: platInView ? 1 : 0,
                  transform: platInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity .55s ease ${i * .07}s,transform .55s ease ${i * .07}s`,
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1rem", padding: "1.4rem",
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                }}>
                  <div style={{ width: "2.8rem", height: "2.8rem", borderRadius: ".75rem", background: `${p.accent}12`, border: `1px solid ${p.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.88)", fontWeight: 700, fontSize: ".88rem", marginBottom: ".3rem" }}>{p.name}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".78rem", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. SHOWCASE ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={showcaseRef} style={{ marginBottom: "3rem", opacity: showcaseInView ? 1 : 0, transform: showcaseInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-4">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Published Work
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="eb-grad">Ebooks we've</span> <span className="text-white">launched</span>
                </h2>
              </div>
              <Link href="/portfolio" style={{ fontFamily: "'DM Sans',sans-serif", color: "#38bdf8", fontSize: ".85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".4rem" }} className="hover:gap-2 transition-all">
                See all work <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
              {EBOOK_SHOWCASES.map((eb, i) => (
                <Link key={eb.title} href={eb.href} className="showcase-card" style={{
                  opacity: showcaseInView ? 1 : 0,
                  transform: showcaseInView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .65s ease ${i * .1}s,transform .65s ease ${i * .1}s`,
                  display: "block", textDecoration: "none",
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1.25rem", overflow: "hidden",
                }}>
                  {/* Cover area */}
                  <div style={{ height: "220px", background: `linear-gradient(135deg,rgba(5,15,31,.95),${eb.accent}18)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                     <Image src={eb.image} alt={eb.title} fill className="object-cover" />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,.04) 1px,transparent 1px)", backgroundSize: "100% 24px" }} />
                    {/* Mini book mock */}
                    <div style={{ width: "90px", height: "120px", borderRadius: "2px 8px 8px 2px", background: `linear-gradient(145deg,${eb.accent}28,rgba(5,15,31,.95))`, border: `1px solid ${eb.accent}45`, boxShadow: `4px 4px 20px rgba(0,0,0,.5)`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "8px", background: eb.accent, opacity: .5 }} />
                      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${eb.accent}10 1px,transparent 1px)`, backgroundSize: "10px 10px" }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: eb.accent, fontSize: ".42rem", letterSpacing: ".1em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>{eb.category}</span>
                      <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.85)", fontWeight: 800, fontSize: ".55rem", lineHeight: 1.3, position: "relative", zIndex: 1 }}>{eb.title}</p>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,rgba(5,15,31,.9),transparent)" }} />
                    {/* Pages badge */}
                    <div style={{ position: "absolute", top: ".85rem", right: ".85rem", background: "rgba(2,12,24,.85)", backdropFilter: "blur(6px)", border: `1px solid ${eb.accent}25`, borderRadius: "999px", padding: ".2rem .65rem" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: eb.accent, fontSize: ".65rem" }}>{eb.pages}</span>
                    </div>
                  </div>

                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: eb.accent, background: `${eb.accent}10`, border: `1px solid ${eb.accent}25`, fontSize: ".65rem", letterSpacing: ".06em", padding: ".2rem .65rem", borderRadius: "999px" }}>{eb.category}</span>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: "1rem", margin: ".65rem 0 .25rem" }}>{eb.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".78rem", marginBottom: ".85rem" }}>{eb.subtitle}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <span style={{ fontSize: ".8rem" }}>📈</span>
                      <span style={{ fontFamily: "'Syne',sans-serif", color: eb.accent, fontWeight: 600, fontSize: ".8rem" }}>{eb.result}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. PACKAGES ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={packagesRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: packagesInView ? 1 : 0, transform: packagesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Packages
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">From quick launch</span><br /><span className="eb-grad">to published author</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem", alignItems: "start" }}>
              {PACKAGES.map((pkg, i) => (
                <div key={pkg.name} className={pkg.popular ? "price-glow" : ""} style={{
                  opacity: packagesInView ? 1 : 0,
                  transform: packagesInView ? (pkg.popular ? "scale(1.03)" : "scale(1)") : "translateY(28px)",
                  transition: `opacity .65s ease ${i * .1}s,transform .65s ease ${i * .1}s`,
                  background: pkg.popular ? "linear-gradient(135deg,rgba(14,165,233,.1),rgba(5,15,31,.95))" : "rgba(5,15,31,.7)",
                  border: `1px solid ${pkg.popular ? "rgba(14,165,233,.35)" : "rgba(14,165,233,.1)"}`,
                  borderRadius: "1.35rem", padding: "2rem",
                  position: "relative", overflow: "hidden",
                }}>
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
            <p style={{ textAlign: "center", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.22)", fontSize: ".76rem", marginTop: "1.25rem" }}>All prices are starting points. Final quote after free discovery call.</p>
          </div>
        </section>

        {/* ── 9. OTHER SERVICES ── */}
        <section style={{ background: "var(--deep)", padding: "5rem 0" }}>
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

        {/* ── 10. CTA ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--wave-3)", fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Ready to publish?
            </p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-5xl">
              <span className="text-white">Your knowledge is</span><br /><span className="eb-grad">worth publishing.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
              Share your topic or idea — rough notes are fine. We'll reply with a full plan and quote within 24 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                Publish My Ebook
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href="/services" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.65)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                ← All Services
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}