"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const PLATFORMS = [
  {
    id: "cross",
    label: "Cross-Platform",
    icon: "◈",
    accent: "#38bdf8",
    headline: "One codebase. Two stores. Full performance.",
    desc: "React Native and Flutter let us build iOS and Android apps simultaneously — without sacrificing quality. 80% faster to market, same native feel.",
    pros: ["Single codebase", "80% cost saving vs native", "Faster iterations", "Near-native performance", "Shared design system"],
    best: "Startups, MVPs, most business apps",
  },
  {
    id: "ios",
    label: "iOS (Swift)",
    icon: "◎",
    accent: "#0ea5e9",
    headline: "Premium iOS experiences built in Swift.",
    desc: "When you need the absolute best Apple platform experience — native SwiftUI apps with full access to iOS APIs, ARKit, HealthKit, and beyond.",
    pros: ["100% native performance", "Full iOS API access", "SwiftUI & UIKit", "ARKit & CoreML", "App Clip support"],
    best: "Premium apps, ARKit, HealthKit integrations",
  },
  {
    id: "android",
    label: "Android (Kotlin)",
    icon: "⬡",
    accent: "#7dd3fc",
    headline: "Android apps built right with Kotlin.",
    desc: "Native Android development with Kotlin and Jetpack Compose — for apps that leverage the full Google ecosystem and Android-specific capabilities.",
    pros: ["Native Android performance", "Jetpack Compose UI", "Google Play optimized", "Android-specific APIs", "Wear OS support"],
    best: "Google-integrated apps, enterprise Android",
  },
];

const APP_FEATURES = [
  { icon: "🔐", title: "Auth & Security",    desc: "OAuth, biometrics, 2FA, and enterprise-grade security built in." },
  { icon: "🔔", title: "Push Notifications", desc: "FCM & APNs integration for real-time user engagement." },
  { icon: "💳", title: "Payments",           desc: "Stripe, in-app purchases, subscriptions, and Apple/Google Pay." },
  { icon: "📍", title: "Maps & Location",    desc: "Real-time GPS, geofencing, and route optimization." },
  { icon: "📊", title: "Analytics",          desc: "Firebase, Mixpanel, or Amplitude — full user behavior tracking." },
  { icon: "☁️", title: "Backend & API",      desc: "Node.js or Firebase backend with real-time data sync." },
  { icon: "📷", title: "Camera & Media",     desc: "Photo capture, video recording, and media processing." },
  { icon: "🤖", title: "AI Features",        desc: "On-device ML, ChatGPT integration, and smart suggestions." },
];

const TECH_STACK = [
  { name: "React Native", cat: "Cross-Platform", color: "#61dafb", desc: "Our primary framework for cross-platform apps — fast, stable, and battle-tested at scale." },
  { name: "Flutter",      cat: "Cross-Platform", color: "#54c5f8", desc: "Google's UI toolkit for pixel-perfect apps with smooth 60fps animations on both platforms." },
  { name: "Swift",        cat: "iOS Native",     color: "#f05138", desc: "Apple's modern language for iOS development — performance, safety, and full API access." },
  { name: "Kotlin",       cat: "Android Native", color: "#7f52ff", desc: "The modern Android language with concise syntax and full Jetpack Compose support." },
  { name: "Firebase",     cat: "Backend",        color: "#ffca28", desc: "Real-time database, auth, cloud functions, and push notifications — all in one." },
  { name: "Expo",         cat: "Tooling",        color: "#000020", desc: "Accelerates React Native development with OTA updates and a managed build pipeline." },
  { name: "Node.js",      cat: "API",            color: "#84cc16", desc: "Backend API development for complex app logic, webhooks, and third-party integrations." },
  { name: "Stripe",       cat: "Payments",       color: "#6772e5", desc: "End-to-end payment integration — subscriptions, one-time, and in-app purchases." },
];

const DELIVERABLES = [
  {
    icon: "📱",
    title: "App Design",
    accent: "#38bdf8",
    items: ["Figma UI design for all screens", "iOS & Android design guidelines", "Onboarding flow design", "Dark mode support"],
  },
  {
    icon: "⚙️",
    title: "Development",
    accent: "#0ea5e9",
    items: ["Full source code (you own it)", "Clean, documented codebase", "Unit & integration tests", "Git version control"],
  },
  {
    icon: "🔗",
    title: "Integrations",
    accent: "#7dd3fc",
    items: ["REST / GraphQL API setup", "Third-party SDK integration", "Payment gateway setup", "Analytics + crash reporting"],
  },
  {
    icon: "🚀",
    title: "Launch",
    accent: "#0284c7",
    items: ["App Store submission (iOS)", "Google Play submission", "ASO (App Store Optimization)", "Launch checklist & testing"],
  },
  {
    icon: "🛡️",
    title: "Post-Launch",
    accent: "#38bdf8",
    items: ["30-day bug fix support", "Performance monitoring", "User feedback review", "Update planning roadmap"],
  },
];

const CASE_STUDIES = [
  {
    title: "FitPulse",
    type: "Fitness Tracking App",
    result: "App Store rating: 3.2 → 4.7★",
    tags: ["React Native", "iOS", "Firebase"],
    image: "/images/work/work-fitpulse.jpg",
    accent: "#38bdf8",
    href: "/portfolio/fitpulse-app",
  },
  {
    title: "SwiftDeliver",
    type: "Last-Mile Delivery App",
    result: "20k downloads in first 3 months",
    tags: ["Flutter", "Android", "Maps API"],
    image: "/images/work/work-swiftdeliver.jpg",
    accent: "#0ea5e9",
    href: "/portfolio/swiftdeliver",
  },
  {
    title: "MediCare Patient App",
    type: "Healthcare Mobile App",
    result: "HIPAA compliant · 4.8★ rating",
    tags: ["Swift", "iOS", "HealthKit"],
    image: "/images/work/work-medicare.jpg",
    accent: "#7dd3fc",
    href: "/portfolio/medicare-portal",
  },
];

const PACKAGES = [
  {
    name: "MVP App",
    price: "$4,999",
    timeline: "6–8 weeks",
    perfect: "Startups & idea validation",
    accent: "#38bdf8",
    popular: false,
    features: [
      "iOS + Android (React Native)",
      "Up to 8 screens",
      "Auth + 1 API integration",
      "Firebase backend",
      "App Store submission",
      "30-day support",
    ],
  },
  {
    name: "Full App",
    price: "$12,999",
    timeline: "10–16 weeks",
    perfect: "Growth-stage products",
    accent: "#0ea5e9",
    popular: true,
    features: [
      "iOS + Android",
      "Unlimited screens",
      "Custom backend (Node.js)",
      "Payments + push + analytics",
      "Admin dashboard",
      "Dedicated PM",
      "90-day support",
    ],
  },
  {
    name: "Enterprise App",
    price: "Custom",
    timeline: "Custom",
    perfect: "Complex enterprise needs",
    accent: "#7dd3fc",
    popular: false,
    features: [
      "Native iOS + Android option",
      "Enterprise auth (SSO/LDAP)",
      "Offline-first architecture",
      "Custom API & microservices",
      "SLA + dedicated support",
      "Team training included",
    ],
  },
];

const OTHER_SERVICES = [
  { label: "UI/UX Designing",   href: "/services/ui-ux-designing",   icon: "◎", accent: "#38bdf8" },
  { label: "Web Development",   href: "/services/web-development",   icon: "◇", accent: "#0ea5e9" },
  { label: "Graphics Designing",href: "/services/graphics-designing",icon: "✦", accent: "#7dd3fc" },
  { label: "Ebook Services",    href: "/services/ebook-services",    icon: "⬡", accent: "#0284c7" },
];

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

// ── Floating phone frames canvas ──
function PhoneCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const phones = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      w: Math.random() * 22 + 12,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.15 + 0.04,
      rotation: (Math.random() - 0.5) * 0.3,
      rotSpeed: (Math.random() - 0.5) * 0.005,
    }));

    const drawPhone = (x, y, w, opacity, rot) => {
      const h = w * 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(14,165,233,${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const r = w * 0.18;
      ctx.moveTo(-w/2 + r, -h/2);
      ctx.lineTo(w/2 - r, -h/2);
      ctx.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
      ctx.lineTo(w/2, h/2 - r);
      ctx.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
      ctx.lineTo(-w/2 + r, h/2);
      ctx.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
      ctx.lineTo(-w/2, -h/2 + r);
      ctx.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
      ctx.closePath();
      ctx.stroke();
      // Home bar
      ctx.beginPath();
      ctx.moveTo(-w * 0.2, h/2 - w * 0.18);
      ctx.lineTo(w * 0.2, h/2 - w * 0.18);
      ctx.strokeStyle = `rgba(56,189,248,${opacity * 0.8})`;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phones.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotSpeed;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -80) p.y = canvas.height + 80;
        if (p.y > canvas.height + 80) p.y = -80;
        drawPhone(p.x, p.y, p.w, p.opacity, p.rotation);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8, pointerEvents: "none" }} />;
}

export default function AppDevPage() {
  const [heroVisible, setHeroVisible]     = useState(false);
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);
  const [activeTech, setActiveTech]       = useState(TECH_STACK[0]);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [overviewRef,  overviewInView]  = useInView(0.1);
  const [platRef,      platInView]      = useInView(0.08);
  const [techRef,      techInView]      = useInView(0.1);
  const [featRef,      featInView]      = useInView(0.08);
  const [delivRef,     delivInView]     = useInView(0.08);
  const [casesRef,     casesInView]     = useInView(0.08);
  const [packagesRef,  packagesInView]  = useInView(0.08);
  const [othersRef,    othersInView]    = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .app-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        .sl { opacity:0; transform:translateX(-26px); transition:opacity .75s ease,transform .75s ease; }
        .sl.show { opacity:1; transform:translateX(0); }
        .sr { opacity:0; transform:translateX(26px);  transition:opacity .75s ease .1s,transform .75s ease .1s; }
        .sr.show { opacity:1; transform:translateX(0); }
        .plat-tab { font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:500; padding:.5rem 1.25rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; transition:all .22s ease; white-space:nowrap; }
        .plat-tab:hover { color:rgba(255,255,255,.75); border-color:rgba(255,255,255,.18); }
        .plat-tab.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 14px rgba(14,165,233,.2); }
        .tech-chip { font-family:'DM Sans',sans-serif; font-size:.78rem; font-weight:500; padding:.45rem 1rem; border-radius:999px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); color:rgba(255,255,255,.45); cursor:pointer; white-space:nowrap; transition:all .22s ease; }
        .tech-chip:hover { color:rgba(255,255,255,.75); border-color:rgba(255,255,255,.18); }
        .tech-chip.active { background:rgba(14,165,233,.15); border-color:rgba(56,189,248,.45); color:#38bdf8; box-shadow:0 0 14px rgba(14,165,233,.2); }
        @keyframes priceGlow { 0%,100%{box-shadow:0 0 30px rgba(14,165,233,.15)} 50%{box-shadow:0 0 50px rgba(14,165,233,.3)} }
        .price-glow { animation:priceGlow 3.5s ease-in-out infinite; }
        .case-card { transition:border-color .3s ease,transform .3s ease; }
        .case-card:hover { transform:translateY(-4px); }
        .feat-card { transition:border-color .3s ease,transform .3s ease; }
        .feat-card:hover { transform:translateY(-3px); border-color:rgba(56,189,248,.25)!important; }
        .other-svc { transition:all .25s ease; }
        .other-svc:hover { border-color:rgba(56,189,248,.3)!important; background:rgba(14,165,233,.06)!important; transform:translateX(4px); }
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }
      `}</style>


      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "9rem", paddingBottom: "6rem" }}>
          <PhoneCanvas />
          <div style={{ position: "absolute", top: "5%", right: "-8%", width: "50vw", height: "50vw", maxWidth: 600, background: "radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>App Development</span></span>
            </div>

            <div style={{ maxWidth: "820px" }}>
              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  App Development
                </span>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                  <span className="text-white">Apps Users</span><br />
                  <span className="app-grad">Actually Love.</span>
                </h1>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "580px", marginBottom: "2.5rem" }}>
                  iOS, Android, or both — we design and develop mobile apps that feel native, perform beautifully, and launch on time. From concept to App Store, we handle the full product lifecycle.
                </p>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap gap-4`} style={{ transitionDelay: ".32s" }}>
                <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                  Build My App <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link href="/portfolio" style={{ border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", padding: ".95rem 2rem", borderRadius: "999px", textDecoration: "none", background: "rgba(14,165,233,.04)" }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                  View App Work
                </Link>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""} flex flex-wrap items-center gap-6 mt-10`} style={{ transitionDelay: ".42s" }}>
                {[["📱","iOS & Android"],["⚡","Native Performance"],["🛡️","HIPAA / GDPR Ready"],["🚀","App Store Launch"]].map(([icon, label]) => (
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
              {/* Right image first on mobile */}
              <div className={`sr ${overviewInView ? "show" : ""}`} style={{ order: 2 }}>
                {/* ────────────────────────────────────────────────────
                    OVERVIEW IMAGE
                    Replace with:
                    Recommended: phone mockup flat lay, multi-device
                    screenshot, or team working on app. 1160×880px
                ──────────────────────────────────────────────────── */}
                    <Image src="/images/services/app-dev-overview.jpg"
                      alt="App Development at BlueWave"
                      width={580} height={440}
                      className="rounded-2xl object-cover w-full" />
                      
              </div>

              {/* Left content */}
              <div className={`sl ${overviewInView ? "show" : ""}`} style={{ order: 1 }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  What We Build
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.7rem,3vw,2.5rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    From MVP to market-leading product.
                  </span>
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: ".92rem", marginBottom: "1.75rem" }}>
                  We don't just write code — we build products. Our app development process combines UX thinking, engineering craft, and business strategy so your app doesn't just launch — it grows.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                  {["Consumer Apps (iOS & Android)","B2B SaaS Mobile Apps","Marketplace & On-Demand Apps","Healthcare & Fitness Apps","Fintech & Payment Apps","E-Commerce Mobile Apps","Internal Enterprise Tools"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 6px #0ea5e9", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", fontSize: ".88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. PLATFORMS ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div ref={platRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: platInView ? 1 : 0, transform: platInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Platform Choice
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="app-grad">Right platform,</span><br /><span className="text-white">right recommendation</span>
              </h2>
            </div>

            {/* Platform tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setActivePlatform(p)} className={`plat-tab ${activePlatform.id === p.id ? "active" : ""}`}>
                  <span style={{ marginRight: ".4rem" }}>{p.icon}</span>{p.label}
                </button>
              ))}
            </div>

            {/* Active platform detail */}
            <div style={{ maxWidth: "800px", margin: "0 auto", background: "rgba(5,15,31,.85)", border: `1px solid ${activePlatform.accent}30`, borderRadius: "1.5rem", padding: "2.5rem", transition: "border-color .3s ease" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${activePlatform.accent},transparent)`, borderRadius: "2px" }} />
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 800, fontSize: "1.3rem", marginBottom: ".75rem", marginTop: ".5rem" }}>{activePlatform.headline}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", lineHeight: 1.8, fontSize: ".9rem", marginBottom: "1.75rem" }}>{activePlatform.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".75rem" }}>Key Advantages</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    {activePlatform.pros.map(p => (
                      <li key={p} style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
                        <svg style={{ color: activePlatform.accent, width: ".85rem", height: ".85rem", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.58)", fontSize: ".82rem" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: `${activePlatform.accent}08`, border: `1px solid ${activePlatform.accent}18`, borderRadius: "1rem", padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem" }}>Best For</p>
                  <p style={{ fontFamily: "'Syne',sans-serif", color: activePlatform.accent, fontWeight: 600, fontSize: ".88rem", lineHeight: 1.5 }}>{activePlatform.best}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. TECH STACK ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div ref={techRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", opacity: techInView ? 1 : 0, transform: techInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease,transform .7s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Tech Stack
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Tools that</span> <span className="app-grad">power great apps</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {TECH_STACK.map(t => (
                <button key={t.name} onClick={() => setActiveTech(t)} className={`tech-chip ${activeTech.name === t.name ? "active" : ""}`}>{t.name}</button>
              ))}
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "1.25rem", padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", flexShrink: 0, background: `${activeTech.color}18`, border: `1px solid ${activeTech.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", color: activeTech.color, fontWeight: 700, fontSize: ".7rem" }}>{activeTech.name.slice(0,3)}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".4rem" }}>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: "1rem" }}>{activeTech.name}</h4>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".7rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", padding: ".15rem .6rem", borderRadius: "999px" }}>{activeTech.cat}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.48)", fontSize: ".87rem", lineHeight: 1.7 }}>{activeTech.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. APP FEATURES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={featRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: featInView ? 1 : 0, transform: featInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                App Features
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="app-grad">Everything your app</span><br /><span className="text-white">could ever need</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
              {APP_FEATURES.map((f, i) => (
                <div key={f.title} className="feat-card" style={{
                  opacity: featInView ? 1 : 0,
                  transform: featInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity .6s ease ${i * .07}s,transform .6s ease ${i * .07}s`,
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: "1rem", padding: "1.4rem",
                }}>
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: ".75rem" }}>{f.icon}</span>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.88)", fontWeight: 700, fontSize: ".9rem", marginBottom: ".4rem" }}>{f.title}</h4>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.4)", fontSize: ".8rem", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. DELIVERABLES ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={delivRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What You Get
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">Full ownership.</span> <span className="app-grad">Zero handoff drama.</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.1rem" }}>
              {DELIVERABLES.map((d, i) => (
                <div key={d.title} style={{
                  opacity: delivInView ? 1 : 0, transform: delivInView ? "translateY(0)" : "translateY(28px)",
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

        {/* ── 7. CASE STUDIES ── */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={casesRef} style={{ marginBottom: "3rem", opacity: casesInView ? 1 : 0, transform: casesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-4">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  App Work
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="app-grad">Apps we've</span> <span className="text-white">shipped</span>
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

        {/* ── 8. PACKAGES ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={packagesRef} style={{ textAlign: "center", marginBottom: "3.5rem", opacity: packagesInView ? 1 : 0, transform: packagesInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease,transform .7s ease" }}>
              <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                App Packages
              </span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
                <span className="text-white">From MVP to</span> <span className="app-grad">enterprise scale</span>
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
                    {pkg.timeline !== "Custom" && <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.35)", fontSize: ".75rem" }}>⏱ {pkg.timeline}</span>}
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
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--wave-3)", fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Ready to ship your app?</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-5xl">
              <span className="text-white">Your app idea</span><br /><span className="app-grad">deserves to exist.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
              Share your concept — rough or detailed. We'll respond with a plan, timeline, and quote within 24 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,.35)", display: "inline-flex", alignItems: "center", gap: ".5rem" }} className="hover:scale-105 transition-transform duration-200">
                Build My App <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
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