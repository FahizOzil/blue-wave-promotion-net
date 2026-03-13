"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const GRAPHIC_SERVICES = [
  {
    icon: "◎",
    title: "Logo & Brand Identity",
    accent: "#38bdf8",
    desc: "Primary logo, variations, icon, wordmark, and a full brand guidelines document your whole team can use.",
    tags: ["Logo Design", "Brand Kit", "Guidelines"],
  },
  {
    icon: "✦",
    title: "Social Media Design",
    accent: "#0ea5e9",
    desc: "30–60 branded templates for Instagram, LinkedIn, Facebook, and Twitter — ready to post or customize.",
    tags: ["Reels Covers", "Carousels", "Story Templates"],
  },
  {
    icon: "◈",
    title: "Marketing Collateral",
    accent: "#7dd3fc",
    desc: "Flyers, banners, brochures, business cards, and every print-ready asset your campaigns need.",
    tags: ["Print", "Digital Ads", "Banners"],
  },
  {
    icon: "⬡",
    title: "Pitch Deck & Presentations",
    accent: "#0284c7",
    desc: "Investor decks and keynote presentations designed to captivate — with consistent layouts and on-brand visuals.",
    tags: ["PowerPoint", "Google Slides", "Keynote"],
  },
  {
    icon: "◇",
    title: "Packaging Design",
    accent: "#38bdf8",
    desc: "Product packaging that stands out on shelves and screens — boxes, labels, pouches, and unboxing experiences.",
    tags: ["Product Labels", "Box Design", "Mockups"],
  },
  {
    icon: "❋",
    title: "Illustration & Custom Art",
    accent: "#0ea5e9",
    desc: "Custom illustrations, icons, mascots, and infographics that give your brand a genuinely unique visual voice.",
    tags: ["Icons", "Infographics", "Mascots"],
  },
];

const DESIGN_STYLES = [
  {
    id: "modern",
    label: "Modern & Clean",
    accent: "#38bdf8",
    desc: "Sharp geometry, generous whitespace, and a confident typographic hierarchy. Timeless without being cold.",
    traits: ["Sans-serif typography", "Minimal color palettes", "Grid-based layouts", "Flat or subtle gradients"],
    palette: ["#020c18", "#0ea5e9", "#38bdf8", "#ffffff"],
  },
  {
    id: "minimal",
    label: "Ultra-Minimal",
    accent: "#ffffff",
    desc: "Less is more. Single typeface, a restrained palette, and every element earning its place on the canvas.",
    traits: ["Black & white focus", "Generous negative space", "Single accent color", "Editorial sensibility"],
    palette: ["#ffffff", "#e5e5e5", "#a3a3a3", "#0a0a0a"],
  },
  {
    id: "bold",
    label: "Bold & Expressive",
    accent: "#f97316",
    desc: "High contrast, big type, vibrant colors. Designed to be impossible to scroll past.",
    traits: ["Display typography", "High-contrast colors", "Dynamic composition", "Strong visual hierarchy"],
    palette: ["#f97316", "#ef4444", "#facc15", "#0a0a0a"],
  },
  {
    id: "retro",
    label: "Retro & Vintage",
    accent: "#d97706",
    desc: "Warm nostalgia meets modern craft. Texture, imperfection, and character baked into every element.",
    traits: ["Serif & display fonts", "Muted warm palettes", "Grain & texture overlays", "Badge & emblem formats"],
    palette: ["#d97706", "#92400e", "#fef3c7", "#1c1917"],
  },
  {
    id: "luxury",
    label: "Luxury & Premium",
    accent: "#a78bfa",
    desc: "Gold, deep navy, refined lettering, and negative space that whispers exclusivity and quality.",
    traits: ["Refined serif typography", "Gold & metallic accents", "Deep background tones", "Minimal ornamentation"],
    palette: ["#a78bfa", "#c4b5fd", "#1e1b4b", "#0f0a1e"],
  },
];

const FILE_DELIVERABLES = [
  { icon: "🖼️", format: "PNG & JPG",   desc: "Web & screen-ready exports at 2× and 3× resolutions." },
  { icon: "📐", format: "SVG",         desc: "Infinitely scalable vector files for logos and icons." },
  { icon: "📄", format: "PDF (Print)", desc: "CMYK, bleed-ready files for professional print." },
  { icon: "🎨", format: "AI / EPS",    desc: "Editable source files in Adobe Illustrator format." },
  { icon: "📊", format: "PPTX / Slides",desc: "Editable presentation files with your brand styles." },
  { icon: "📱", format: "Social Sizes", desc: "All major social platform dimensions pre-exported." },
];

const TOOLS = [
  { name: "Illustrator", cat: "Vector Design",  color: "#ff9a00", desc: "Industry standard for logos, icons, and all vector-based graphic work." },
  { name: "Photoshop",   cat: "Photo & Raster", color: "#31a8ff", desc: "Photo manipulation, compositing, and rich visual effects for digital assets." },
  { name: "InDesign",    cat: "Print & Layout",  color: "#ff3366", desc: "Professional print layouts for brochures, decks, and publications." },
  { name: "Figma",       cat: "UI Graphics",     color: "#f24e1e", desc: "Digital-first design for social graphics, web banners, and UI elements." },
  { name: "Canva Pro",   cat: "Quick Delivery",  color: "#00c4cc", desc: "Template-based work for quick turnaround social and marketing assets." },
  { name: "After Effects",cat: "Motion",         color: "#9999ff", desc: "Animated logos, motion graphics, and social video content." },
];

const PACKAGES = [
  {
    name: "Brand Starter",
    price: "$399",
    timeline: "4–6 days",
    perfect: "New businesses",
    accent: "#38bdf8",
    popular: false,
    features: [
      "Logo (3 concepts, 1 chosen)",
      "2 color variations",
      "PNG, SVG, PDF export",
      "2 revision rounds",
      "Basic brand guidelines",
    ],
  },
  {
    name: "Full Brand Kit",
    price: "$1,299",
    timeline: "10–14 days",
    perfect: "Growing brands",
    accent: "#0ea5e9",
    popular: true,
    features: [
      "Logo + icon + wordmark",
      "Full brand guidelines doc",
      "30 social media templates",
      "Business card design",
      "Letterhead & email signature",
      "Unlimited revisions",
      "All source files",
    ],
  },
  {
    name: "Brand + Collateral",
    price: "$2,799",
    timeline: "3–4 weeks",
    perfect: "Established brands",
    accent: "#7dd3fc",
    popular: false,
    features: [
      "Everything in Full Brand Kit",
      "Pitch deck (20 slides)",
      "60 social media templates",
      "Packaging or merch design",
      "Custom illustrations (3)",
      "Priority support",
    ],
  },
];

const OTHER_SERVICES = [
  { label: "UI/UX Designing",  href: "/services/ui-ux-designing",  icon: "◎", accent: "#38bdf8" },
  { label: "Web Development",  href: "/services/web-development",  icon: "◇", accent: "#0ea5e9" },
  { label: "App Development",  href: "/services/app-development",  icon: "◈", accent: "#7dd3fc" },
  { label: "Ebook Services",   href: "/services/ebook-services",   icon: "⬡", accent: "#0284c7" },
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

// ── Animated color splash canvas ──
function ColorSplash() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const blobs = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 120 + 50,
      speedX: (Math.random() - 0.5) * 0.22,
      speedY: (Math.random() - 0.5) * 0.18,
      color: [
        "rgba(56,189,248,",
        "rgba(14,165,233,",
        "rgba(2,132,199,",
        "rgba(125,211,252,",
        "rgba(14,165,233,",
      ][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.07 + 0.02,
    }));

    // Ink drop shapes
    const drops = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.25 + 0.05,
      color: ["rgba(56,189,248,","rgba(14,165,233,","rgba(125,211,252,"][Math.floor(Math.random() * 3)],
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: Math.random() * 0.2 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Blobs
      blobs.forEach(b => {
        b.x += b.speedX; b.y += b.speedY;
        if (b.x < -150) b.x = canvas.width + 150;
        if (b.x > canvas.width + 150) b.x = -150;
        if (b.y < -150) b.y = canvas.height + 150;
        if (b.y > canvas.height + 150) b.y = -150;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `${b.color}${b.opacity})`);
        grad.addColorStop(1, `${b.color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ink drops
      drops.forEach(d => {
        d.x += d.speedX; d.y += d.speedY;
        if (d.y > canvas.height + 20) { d.y = -20; d.x = Math.random() * canvas.width; }
        ctx.fillStyle = `${d.color}${d.opacity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
        // Tail
        ctx.strokeStyle = `${d.color}${d.opacity * 0.4})`;
        ctx.lineWidth = d.size * 0.4;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.speedX * 8, d.y - d.speedY * 8);
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export default function GraphicsDesigningPage() {
  const [heroVisible, setHeroVisible]     = useState(false);
  const [activeStyle, setActiveStyle]     = useState(DESIGN_STYLES[0]);
  const [activeTool, setActiveTool]       = useState(TOOLS[0]);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [overviewRef,   overviewInView]   = useInView(0.1);
  const [servicesRef,   servicesInView]   = useInView(0.08);
  const [stylesRef,     stylesInView]     = useInView(0.1);
  const [delivRef,      delivInView]      = useInView(0.08);
  const [portfolioRef,  portfolioInView]  = useInView(0.06);
  const [toolsRef,      toolsInView]      = useInView(0.1);
  const [packagesRef,   packagesInView]   = useInView(0.08);
  const [othersRef,     othersInView]     = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .gfx-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        .sl { opacity:0; transform:translateX(-26px); transition:opacity .75s ease,transform .75s ease; }
        .sl.show { opacity:1; transform:translateX(0); }
        .sr { opacity:0; transform:translateX(26px); transition:opacity .75s ease .1s,transform .75s ease .1s; }
        .sr.show { opacity:1; transform:translateX(0); }

        .style-tab { font-family:'DM Sans',sans-serif; font-size:.78rem; font-weight:500; padding:.48rem 1.1rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; white-space:nowrap; transition:all .22s ease; }
        .style-tab:hover { color:rgba(255,255,255,.75); border-color:rgba(255,255,255,.18); }
        .style-tab.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 14px rgba(14,165,233,.2); }

        .tool-chip { font-family:'DM Sans',sans-serif; font-size:.78rem; font-weight:500; padding:.45rem 1rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; white-space:nowrap; transition:all .22s ease; }
        .tool-chip:hover { color:rgba(255,255,255,.75); border-color:rgba(255,255,255,.18); }
        .tool-chip.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 14px rgba(14,165,233,.2); }

        .svc-card { transition:border-color .3s ease,transform .3s ease; }
        .svc-card:hover { transform:translateY(-4px); border-color:rgba(56,189,248,.25)!important; }

        .port-thumb { transition:transform .3s ease,border-color .3s ease; }
        .port-thumb:hover { transform:scale(1.03); border-color:rgba(56,189,248,.35)!important; }

        @keyframes priceGlow { 0%,100%{box-shadow:0 0 30px rgba(14,165,233,.15)} 50%{box-shadow:0 0 50px rgba(14,165,233,.3)} }
        .price-glow { animation:priceGlow 3.5s ease-in-out infinite; }

        .other-svc { transition:all .25s ease; }
        .other-svc:hover { border-color:rgba(56,189,248,.3)!important; background:rgba(14,165,233,.06)!important; transform:translateX(4px); }

        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }

        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }

        /* Palette swatch hover */
        .palette-dot { transition:transform .2s ease; cursor:default; }
        .palette-dot:hover { transform:scale(1.25); }
      `}</style>

      
      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "9rem", paddingBottom: "6rem" }}>
          <ColorSplash />

          {/* Dark overlay so text stays readable */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(2,12,24,0.72)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb">
                <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>Graphics Designing</span>
              </span>
            </div>

            <div style={{ maxWidth: "820px" }}>
              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Graphics Designing
                </span>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                  <span className="text-white">Visuals That</span><br />
                  <span className="gfx-grad">Stop the Scroll</span><br />
                  <span className="text-white">& Start Conversations.</span>
                </h1>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "560px", marginBottom: "2.5rem" }}>
                  From logo to full brand identity, social templates to packaging — we design visuals that tell your story before a single word is read. Bold, refined, or anything in between.
                </p>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap gap-4`} style={{ transitionDelay: ".32s" }}>
                <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                  Start Your Brand
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link href="/portfolio" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                  See Design Work
                </Link>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap items-center gap-6 mt-10`} style={{ transitionDelay: ".42s" }}>
                {[["🎨","Adobe CC Expert"],["📐","Print + Digital"],["⚡","Fast Turnaround"],["✅","Source Files Included"]].map(([icon, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                    <span style={{ fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.32)", fontSize: ".75rem" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave */}
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
                  What We Create
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.7rem,3vw,2.5rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Your brand has a story. We make it visible.
                  </span>
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: ".92rem", marginBottom: "1.75rem" }}>
                  Good graphics aren't decoration — they're communication. Every color, curve, and typeface carries meaning. We design with intention, crafting visual identities that your audience immediately understands and remembers.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
                  {[
                    "Logo Design & Full Brand Identity",
                    "Social Media Graphics & Templates",
                    "Marketing Collateral & Print",
                    "Pitch Decks & Presentations",
                    "Packaging & Label Design",
                    "Custom Illustrations & Icons",
                    "Infographics & Data Visuals",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px #38bdf8", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", fontSize: ".88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div >
                {/* ────────────────────────────────────────────────────
                    OVERVIEW IMAGE
                    Replace with:
                    Recommended: brand identity flat lay, design
                    process photo, or portfolio collage. 1160×880px
                ──────────────────────────────────────────────────── */}
                    <Image src="/images/services/graphics-overview.jpg"
                      alt="Graphics Design at BlueWave"
                      width={580} height={440}
                      className="rounded-2xl object-cover w-full" />
                      
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. GRAPHIC SERVICES GRID ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={servicesRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: servicesInView ? 1 : 0, transform: servicesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Services Included
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Six ways we make</span><br />
                <span className="gfx-grad">your brand unforgettable</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.1rem" }}>
              {GRAPHIC_SERVICES.map((s, i) => (
                <div key={s.title} className="svc-card" style={{
                  opacity: servicesInView ? 1 : 0,
                  transform: servicesInView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s`,
                  background: "rgba(5,15,31,.75)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1.1rem", padding: "1.75rem",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Top accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${s.accent},transparent)` }} />

                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".9rem" }}>
                    <div style={{ width: "2.6rem", height: "2.6rem", borderRadius: ".75rem", background: `${s.accent}14`, border: `1px solid ${s.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: s.accent, fontSize: "1.1rem", filter: `drop-shadow(0 0 5px ${s.accent}70)` }}>{s.icon}</span>
                    </div>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: ".92rem" }}>{s.title}</h4>
                  </div>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".82rem", lineHeight: 1.7, marginBottom: "1rem" }}>{s.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", color: s.accent, background: `${s.accent}0e`, border: `1px solid ${s.accent}22`, fontSize: ".65rem", letterSpacing: ".05em", padding: ".2rem .65rem", borderRadius: "999px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. DESIGN STYLES SELECTOR ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div ref={stylesRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: stylesInView ? 1 : 0, transform: stylesInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>

            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Design Style
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">We design in</span> <span className="gfx-grad">your aesthetic</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".88rem", maxWidth: "440px", margin: ".75rem auto 0", lineHeight: 1.7 }}>
                Explore the design styles we work in — tell us which speaks to your brand and we'll run with it.
              </p>
            </div>

            {/* Style tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".55rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {DESIGN_STYLES.map(s => (
                <button key={s.id} onClick={() => setActiveStyle(s)} className={`style-tab ${activeStyle.id === s.id ? "active" : ""}`}>{s.label}</button>
              ))}
            </div>

            {/* Active style card */}
            <div style={{ maxWidth: "780px", margin: "0 auto", background: "rgba(5,15,31,.85)", border: `1px solid ${activeStyle.accent}28`, borderRadius: "1.5rem", padding: "2.25rem", transition: "border-color .3s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${activeStyle.accent},transparent)` }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.92)", fontWeight: 800, fontSize: "1.2rem", marginBottom: ".65rem", marginTop: ".25rem" }}>{activeStyle.label}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", fontSize: ".88rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>{activeStyle.desc}</p>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.28)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".6rem" }}>Characteristics</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    {activeStyle.traits.map(t => (
                      <li key={t} style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: activeStyle.accent, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.55)", fontSize: ".82rem" }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.28)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".75rem" }}>Signature Palette</p>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem" }}>
                    {activeStyle.palette.map((c, i) => (
                      <div key={i} className="palette-dot" style={{ flex: 1, height: "48px", borderRadius: ".6rem", background: c, border: "1px solid rgba(255,255,255,.1)", boxShadow: i === 0 ? `0 0 16px ${c}50` : "none", transition: "box-shadow .3s ease" }} />
                    ))}
                  </div>

                  <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: `linear-gradient(135deg,${activeStyle.accent === "#ffffff" ? "#0ea5e9" : activeStyle.accent},#0284c7)`, color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", padding: ".75rem 1.5rem", borderRadius: "999px", textDecoration: "none" }} className="hover:scale-105 transition-transform duration-200">
                    I want this style
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FILE DELIVERABLES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={delivRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                File Formats
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Every format.</span> <span className="gfx-grad">Every platform.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".88rem", maxWidth: "440px", margin: ".75rem auto 0", lineHeight: 1.7 }}>
                You own every file — print-ready, web-ready, and fully editable source files included.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "1rem" }}>
              {FILE_DELIVERABLES.map((d, i) => (
                <div key={d.format} style={{
                  opacity: delivInView ? 1 : 0,
                  transform: delivInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s`,
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1rem", padding: "1.5rem",
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.85)", fontWeight: 700, fontSize: ".88rem", marginBottom: ".3rem" }}>{d.format}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".78rem", lineHeight: 1.6 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. PORTFOLIO STRIP ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0", overflow: "hidden" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={portfolioRef} style={{ marginBottom: "2.5rem", opacity: portfolioInView ? 1 : 0, transform: portfolioInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-4">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Recent Work
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="gfx-grad">Brand work</span> <span className="text-white">we're proud of</span>
                </h2>
              </div>
              <Link href="/portfolio" style={{ fontFamily: "'DM Sans',sans-serif", color: "#38bdf8", fontSize: ".85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".4rem" }} className="hover:gap-2 transition-all">
                View full portfolio <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>

            {/* 3×3 Thumbnail grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".85rem" }}>
              {[
                { label: "Logo Design",        accent: "#38bdf8", size: "large",  image: "/images/work/gfx-logo.jpg" },
                { label: "Social Templates",   accent: "#0ea5e9", size: "small",  image: "/images/work/gfx-social.jpg" },
                { label: "Brand Guidelines",   accent: "#7dd3fc", size: "small",  image: "/images/work/gfx-brand.jpg" },
                // { label: "Packaging Design",   accent: "#0284c7", size: "small",  image: "/images/work/gfx-packaging.jpg" },
                { label: "Pitch Deck",         accent: "#38bdf8", size: "large",  image: "/images/work/gfx-deck.jpg" },
                { label: "Illustration",       accent: "#0ea5e9", size: "small",  image: "/images/work/gfx-illustration.jpg" },
                { label: "Business Card",      accent: "#7dd3fc", size: "small",  image: "/images/work/gfx-card.jpg" },
                { label: "Marketing Banner",   accent: "#38bdf8", size: "small",  image: "/images/work/gfx-banner.jpg" },
                { label: "Brand Identity",     accent: "#0284c7", size: "small",  image: "/images/work/gfx-identity.jpg" },
              ].map((item, i) => (
                <div key={i} className="port-thumb" style={{
                  opacity: portfolioInView ? 1 : 0,
                  transform: portfolioInView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .55s ease ${i * .06}s,transform .55s ease ${i * .06}s`,
                  height: i === 0 || i === 4 ? "240px" : "160px",
                  borderRadius: "1rem", overflow: "hidden",
                  background: `linear-gradient(135deg,rgba(5,15,31,.95),${item.accent}18)`,
                  border: "1px solid rgba(14,165,233,.12)",
                  position: "relative",
                  cursor: "pointer",
                }}>
                  <Image src={item.image} alt={item.label} fill className="object-cover" /> ──
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${item.accent}15 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,15,31,.85) 0%,transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: ".85rem", left: ".85rem" }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.7)", fontSize: ".7rem", background: "rgba(2,12,24,.75)", backdropFilter: "blur(6px)", border: `1px solid ${item.accent}25`, padding: ".2rem .65rem", borderRadius: "999px" }}>{item.label}</span>
                  </div>
                  <div style={{ position: "absolute", top: ".75rem", right: ".75rem", width: "20px", height: "20px", borderRadius: "50%", background: item.accent, opacity: 0.25 }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. TOOLS ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div ref={toolsRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: toolsInView ? 1 : 0, transform: toolsInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Tools We Use
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="gfx-grad">Full Adobe CC suite</span><br /><span className="text-white">and beyond</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {TOOLS.map(t => (
                <button key={t.name} onClick={() => setActiveTool(t)} className={`tool-chip ${activeTool.name === t.name ? "active" : ""}`}>{t.name}</button>
              ))}
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "1.25rem", padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", flexShrink: 0, background: `${activeTool.color}20`, border: `1px solid ${activeTool.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", color: activeTool.color, fontWeight: 800, fontSize: ".68rem" }}>{activeTool.name.slice(0,2)}</span>
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
                <span className="text-white">Simple pricing,</span><br /><span className="gfx-grad">serious results</span>
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
              Ready to look the part?
            </p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-5xl">
              <span className="text-white">Your brand deserves</span><br /><span className="gfx-grad">to be remembered.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
              Share your vision — a rough idea is enough. We'll come back with concepts and a quote within 24 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                Start Your Brand
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
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