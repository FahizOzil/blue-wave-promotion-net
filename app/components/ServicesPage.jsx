"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ============================================================
// SERVICES PAGE — BlueWave Promotions
// app/services/page.jsx
//
// Sections:
//   1. Hero — animated page header
//   2. Services Nav — sticky tab switcher
//   3. Service Detail Sections — one per service (full details)
//   4. Tools & Tech Stack
//   5. Process Steps
//   6. Pricing Tiers
//   7. FAQ
//   8. CTA
// ============================================================

const SERVICES = [
  {
    id: "ui-ux",
    slug: "ui-ux-designing",
    label: "UI/UX Design",
    tagline: "Interfaces people love",
    headline: "Design That Converts & Delights",
    description:
      "We craft user-centered digital experiences that balance beauty with function. Every screen is researched, tested, and refined until it feels effortless to use — because the best interfaces are the ones people don't even notice.",
    accent: "#38bdf8",
    // ── IMAGE GUIDE ────────────────────────────────────────────
    // Add a showcase image for this service.
    // Recommended: Figma mockup, device frame, or UI screenshot
    // Size: 900×600px — path: /public/images/services/ui-ux.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/services/ui-ux.jpg",
    deliverables: [
      "User Research & Persona Development",
      "Information Architecture & User Flows",
      "Low & High-Fidelity Wireframes",
      "Interactive Figma Prototypes",
      "Design System & Component Library",
      "Usability Testing & Iteration",
      "Developer Handoff (Zeplin / Figma)",
    ],
    tools: ["Figma", "FigJam", "Zeplin", "Maze", "Hotjar"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: "web-dev",
    slug: "web-development",
    label: "Web Development",
    tagline: "Fast, scalable, modern",
    headline: "Websites That Work as Hard as You Do",
    description:
      "From marketing sites to complex SaaS platforms, we build web experiences that load fast, rank well, and convert visitors into customers. Every project is built with clean code, modern frameworks, and your long-term growth in mind.",
    accent: "#0ea5e9",
    image: "/images/services/web-dev.jpg",
    deliverables: [
      "Custom Next.js / React Development",
      "E-Commerce (Shopify / WooCommerce)",
      "CMS Integration (Sanity, Contentful, WordPress)",
      "API & Third-Party Integrations",
      "Performance Optimization & Core Web Vitals",
      "SEO-Ready Architecture",
      "Ongoing Maintenance & Support",
    ],
    tools: ["Next.js", "React", "Tailwind CSS", "Node.js", "Vercel", "Shopify"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: "app-dev",
    slug: "app-development",
    label: "App Development",
    tagline: "iOS & Android, done right",
    headline: "Mobile Apps Built for Real Users",
    description:
      "We design and develop mobile apps that your users will actually enjoy using. From concept to App Store launch and beyond — we handle the full product lifecycle with the same care we'd give our own products.",
    accent: "#7dd3fc",
    image: "/images/services/app-dev.jpg",
    deliverables: [
      "iOS & Android App Development",
      "React Native & Flutter Builds",
      "UX-First Mobile Design",
      "Backend API Development",
      "Push Notifications & Analytics",
      "App Store Submission & Optimization",
      "Post-Launch Support & Updates",
    ],
    tools: ["React Native", "Flutter", "Expo", "Firebase", "Swift", "Kotlin"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
      </svg>
    ),
  },
  {
    id: "graphics",
    slug: "graphics-designing",
    label: "Graphics Design",
    tagline: "Visuals that stop the scroll",
    headline: "Brand Identity That Stands Out",
    description:
      "Your visual identity is your first impression — and it should be unforgettable. We create logos, brand systems, and marketing materials that communicate who you are before you say a single word.",
    accent: "#0284c7",
    image: "/images/services/graphics.jpg",
    deliverables: [
      "Logo Design & Brand Identity",
      "Brand Guidelines Document",
      "Social Media Templates (30–60 pieces)",
      "Marketing Collateral (flyers, banners, ads)",
      "Pitch Deck & Presentation Design",
      "Packaging Design",
      "Print-Ready Files",
    ],
    tools: ["Adobe Illustrator", "Photoshop", "InDesign", "Canva Pro", "Figma"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    id: "ebook",
    slug: "ebook-services",
    label: "Ebook Services",
    tagline: "Publish with confidence",
    headline: "Ebooks That Look as Good as They Read",
    description:
      "Turn your knowledge into a premium digital product. We handle everything from writing and editing to cover design, formatting, and publishing — so you can focus on sharing your expertise with the world.",
    accent: "#38bdf8",
    image: "/images/services/ebook.jpg",
    deliverables: [
      "Ebook Writing & Editing",
      "Professional Cover Design",
      "Interior Layout & Formatting",
      "Kindle / ePub / PDF Formatting",
      "Lead Magnet Ebook Creation",
      "Course Companion Workbooks",
      "KDP & Platform Publishing Setup",
    ],
    tools: ["Adobe InDesign", "Canva Pro", "Scrivener", "KDP", "Calibre"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const PRICING = [
  {
    tier: "Starter",
    price: "$499",
    period: "one-time",
    desc: "Perfect for solopreneurs and small businesses getting started.",
    features: [
      "1 service deliverable",
      "2 revision rounds",
      "7-day turnaround",
      "Email support",
      "Source files included",
    ],
    cta: "Get Started",
    accent: "#38bdf8",
    popular: false,
  },
  {
    tier: "Growth",
    price: "$1,499",
    period: "one-time",
    desc: "Most popular. For growing brands that need serious quality.",
    features: [
      "Up to 3 service deliverables",
      "Unlimited revisions",
      "14-day turnaround",
      "Priority support",
      "Source files + brand kit",
      "30-day post-delivery support",
    ],
    cta: "Start Your Project",
    accent: "#0ea5e9",
    popular: true,
  },
  {
    tier: "Scale",
    price: "Custom",
    period: "project",
    desc: "For established brands with complex, ongoing needs.",
    features: [
      "Full-scope project planning",
      "Dedicated project manager",
      "Custom timeline",
      "Slack channel access",
      "Monthly strategy calls",
      "SLA guarantee",
    ],
    cta: "Book a Call",
    accent: "#7dd3fc",
    popular: false,
  },
];

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A logo design takes 5–7 days, a full website 3–6 weeks, and a mobile app 8–16 weeks. We always provide a detailed timeline before starting.",
  },
  {
    q: "Do you work with clients outside the US?",
    a: "Absolutely. We work with clients across 18 countries. All communication is in English and we accommodate time zones flexibly.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "A brief or even just a rough idea is enough. We'll walk you through a discovery call to gather everything we need — no lengthy forms required.",
  },
  {
    q: "Do you offer ongoing support after delivery?",
    a: "Yes. All projects include at least 30 days of post-delivery support. Our Scale tier includes ongoing monthly partnerships.",
  },
  {
    q: "Can I hire you for just one part of a project?",
    a: "Of course. You can hire us for just the design, just the development, or just the ebook — whatever you need. No package forcing.",
  },
  {
    q: "How do revisions work?",
    a: "Starter includes 2 rounds. Growth includes unlimited revisions within scope. We want you to love the result — we won't stop until you do.",
  },
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

// ── FAQ item ──
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
        border: `1px solid ${open ? "rgba(56,189,248,0.25)" : "rgba(14,165,233,0.1)"}`,
        borderRadius: "0.875rem",
        overflow: "hidden",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, border-color 0.25s ease`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "1.25rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
          background: open ? "rgba(14,165,233,0.05)" : "rgba(5,15,31,0.6)",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.25s ease",
        }}
      >
        <span style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem" }}>
          {item.q}
        </span>
        <span style={{
          color: "#38bdf8", flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease", fontSize: "1.3rem", lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "200px" : "0",
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <p style={{
          padding: "0 1.5rem 1.25rem",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.85rem", lineHeight: 1.75,
          background: "rgba(5,15,31,0.4)",
        }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab]     = useState("ui-ux");
  const [navSticky, setNavSticky]     = useState(false);
  const navRef  = useRef(null);
  const sectRefs = useRef({});

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Sticky tab nav
  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        setNavSticky(navRef.current.getBoundingClientRect().top <= 80);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to service section
  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(`service-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --surface:#050f1f;
          --border: rgba(14,165,233,0.15);
        }

        .svc-gradient {
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

        /* Tab pill */
        .tab-pill {
          fontFamily: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s ease;
        }
        .tab-pill:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.15); }
        .tab-pill.active {
          background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.15));
          border-color: rgba(14,165,233,0.45);
          color: #38bdf8;
          box-shadow: 0 0 16px rgba(14,165,233,0.25);
        }

        /* Deliverable item */
        .del-item {
          display: flex; align-items: flex-start; gap: 0.65rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .del-item:last-child { border-bottom: none; }

        /* Tool badge */
        .tool-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          background: rgba(14,165,233,0.07);
          border: 1px solid rgba(14,165,233,0.18);
          color: rgba(255,255,255,0.6);
        }

        /* Pricing card popular glow */
        @keyframes pricingGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(14,165,233,0.15); }
          50%       { box-shadow: 0 0 50px rgba(14,165,233,0.28); }
        }
        .pricing-popular { animation: pricingGlow 3.5s ease-in-out infinite; }

        /* Wave scroll */
        @keyframes wvScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .wv-scroll { animation: wvScroll 16s linear infinite; }

        /* Section scroll offset for sticky nav */
        .service-section { scroll-margin-top: 150px; }
      `}</style>

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ================================================================
            1. HERO
            ================================================================ */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: "9rem", paddingBottom: "5rem" }}>
          {/* Bg orbs */}
          <div style={{
            position: "absolute", top: "-10%", right: "-8%",
            width: "45vw", height: "45vw", maxWidth: 540,
            background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
            pointerEvents: "none", borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(14,165,233,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px", pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className={`fade-up ${heroVisible ? "show" : ""}`}>
              <span style={{
                border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What We Do
              </span>
            </div>

            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.06, marginBottom: "1.25rem" }}
                className="text-5xl lg:text-7xl">
                <span className="text-white">Five Services.</span>
                <br />
                <span className="svc-gradient">One Team. Zero Compromise.</span>
              </h1>
            </div>

            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)",
                maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontSize: "1rem",
              }}>
                From the first wireframe to the final deployment — every service is delivered
                by senior specialists who care about the outcome as much as you do.
              </p>
            </div>

            <div className={`fade-up ${heroVisible ? "show" : ""} flex flex-wrap gap-3 justify-center`} style={{ transitionDelay: "0.3s" }}>
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  style={{
                    border: `1px solid ${s.accent}30`,
                    background: `${s.accent}0d`,
                    color: s.accent,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500,
                    padding: "0.5rem 1.1rem", borderRadius: "999px",
                    cursor: "pointer", transition: "all 0.2s ease",
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  }}
                  className="hover:scale-105"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50px", overflow: "hidden" }}>
            <svg className="wv-scroll" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }}
              viewBox="0 0 1440 50" preserveAspectRatio="none">
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" fill="rgba(14,165,233,0.05)" />
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" transform="translate(720,0)" fill="rgba(14,165,233,0.05)" />
            </svg>
          </div>
        </section>

        {/* ================================================================
            2. STICKY SERVICE NAV
            ================================================================ */}
        <div ref={navRef} style={{
          position: "sticky", top: "79px", zIndex: 40,
          background: navSticky ? "rgba(2,12,24,0.95)" : "rgba(5,15,31,0.8)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(14,165,233,0.1)",
          transition: "background 0.3s ease",
          padding: "0 1.5rem",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", overflowX: "auto", scrollbarWidth: "none" }}>
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.85rem 0", width: "max-content", minWidth: "100%" }}>
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`tab-pill ${activeTab === s.id ? "active" : ""}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================
            3. SERVICE DETAIL SECTIONS
            ================================================================ */}
        {SERVICES.map((service, si) => {
          const isEven = si % 2 === 0;
          return (
            <ServiceDetailSection key={service.id} service={service} isEven={isEven} setActiveTab={setActiveTab} />
          );
        })}

        {/* ================================================================
            4. PROCESS
            ================================================================ */}
        <ProcessSection />

        {/* ================================================================
            5. PRICING
            ================================================================ */}
        <PricingSection />

        {/* ================================================================
            6. FAQ
            ================================================================ */}
        <FaqSection />

        {/* ================================================================
            7. CTA
            ================================================================ */}
        <CtaSection />
      </main>
    </>
  );
}

// ── Service detail section ──
function ServiceDetailSection({ service, isEven, setActiveTab }) {
  const [ref, inView] = useInView(0.08);

  useEffect(() => {
    if (inView) setActiveTab(service.id);
  }, [inView]);

  return (
    <section
      id={`service-${service.id}`}
      className="service-section"
      style={{ background: isEven ? "var(--deep)" : "var(--surface)", padding: "5rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Faint bg accent */}
      <div style={{
        position: "absolute", [isEven ? "left" : "right"]: "-10%", top: "20%",
        width: "35vw", height: "35vw", maxWidth: 400,
        background: `radial-gradient(circle, ${service.accent}0d 0%, transparent 70%)`,
        pointerEvents: "none", borderRadius: "50%",
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Content — order flips on even */}
        <div style={{ order: isEven ? 1 : 2 }}>
          {/* Icon + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
            <div style={{
              width: "3.5rem", height: "3.5rem", borderRadius: "1rem", flexShrink: 0,
              background: `${service.accent}15`, border: `1px solid ${service.accent}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: service.accent,
            }}>
              {service.icon}
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", color: service.accent,
              fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              {service.tagline}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "1rem" }}>
            <span style={{
              background: `linear-gradient(135deg, #fff 30%, ${service.accent} 80%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {service.headline}
            </span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.48)",
            lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "2rem",
          }}>
            {service.description}
          </p>

          {/* Deliverables */}
          <div style={{
            background: "rgba(5,15,31,0.6)", border: "1px solid rgba(14,165,233,0.1)",
            borderRadius: "1rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem",
          }}>
            <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>
              WHAT YOU GET
            </p>
            {service.deliverables.map((d) => (
              <div key={d} className="del-item">
                <svg style={{ color: service.accent, width: "1rem", height: "1rem", flexShrink: 0, marginTop: "2px" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.83rem" }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Tools & Tech
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {service.tools.map((t) => (
                <span key={t} className="tool-badge">{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: `linear-gradient(135deg, ${service.accent}, #0284c7)`,
              color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: "0.88rem", padding: "0.85rem 1.75rem", borderRadius: "999px",
              textDecoration: "none",
              boxShadow: `0 0 22px ${service.accent}40`,
            }}
            className="hover:scale-105 transition-transform duration-200"
          >
            Start This Service
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Image side */}
        <div style={{ order: isEven ? 2 : 1 }}>
          {/* ──────────────────────────────────────────────────────
              SERVICE IMAGE PLACEHOLDER
              Replace with:
              <Image
                src={service.image}
                alt={service.headline}
                width={580} height={400}
                className="rounded-2xl object-cover w-full"
              />
          ────────────────────────────────────────────────────── */}
          <div style={{
            width: "100%", height: "380px", borderRadius: "1.5rem", overflow: "hidden",
            background: `linear-gradient(135deg, rgba(5,15,31,0.95), ${service.accent}18, rgba(5,15,31,0.85))`,
            border: `1px solid ${service.accent}20`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "10px",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `radial-gradient(${service.accent}15 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }} />
            <div style={{
              position: "relative", zIndex: 1, color: service.accent,
              opacity: 0.35,
            }}>
              {service.icon}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: `${service.accent}50`, fontSize: "0.75rem", position: "relative", zIndex: 1 }}>
              {service.image}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Process section ──
function ProcessSection() {
  const [ref, inView] = useInView(0.1);
  const steps = [
    { n: "01", t: "Discovery", d: "We learn your goals, audience, constraints, and vision in a focused call.", icon: "◎" },
    { n: "02", t: "Proposal",  d: "You receive a clear scope, timeline, and fixed price — no surprises ever.", icon: "◈" },
    { n: "03", t: "Creation",  d: "Our team executes with precision, sharing updates at every milestone.", icon: "✦" },
    { n: "04", t: "Review",    d: "You review, we refine. Revisions until you're completely satisfied.", icon: "◇" },
    { n: "05", t: "Delivery",  d: "Final files delivered with full documentation and handoff support.", icon: "⬡" },
  ];

  return (
    <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
            className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
            <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
            How It Works
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
            <span className="svc-gradient">Simple process,</span>{" "}
            <span className="text-white">exceptional results</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              background: "rgba(5,15,31,0.7)",
              border: "1px solid rgba(14,165,233,0.1)",
              borderRadius: "1.1rem", padding: "1.75rem 1.25rem",
              textAlign: "center", position: "relative",
            }}>
              <div style={{
                width: "3rem", height: "3rem", borderRadius: "50%", margin: "0 auto 1rem",
                background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.1))",
                border: "1px solid rgba(14,165,233,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "var(--wave-3)", fontSize: "1.1rem" }}>{s.icon}</span>
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", color: "var(--wave-3)", fontSize: "0.65rem", letterSpacing: "0.1em", fontWeight: 700 }}>STEP {s.n}</span>
              <h4 style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "0.95rem", margin: "0.35rem 0 0.5rem" }}>{s.t}</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.38)", fontSize: "0.78rem", lineHeight: 1.65 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing section ──
function PricingSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
            className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
            <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
            Pricing
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-5xl">
            <span className="text-white">Transparent pricing.</span>
            <br />
            <span className="svc-gradient">No hidden fees. Ever.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
          {PRICING.map((plan, i) => (
            <div key={plan.tier}
              className={plan.popular ? "pricing-popular" : ""}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? (plan.popular ? "scale(1.03)" : "scale(1)") : "translateY(32px)",
                transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
                background: plan.popular ? "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(5,15,31,0.95))" : "rgba(5,15,31,0.7)",
                border: `1px solid ${plan.popular ? "rgba(14,165,233,0.35)" : "rgba(14,165,233,0.1)"}`,
                borderRadius: "1.35rem", padding: "2rem",
                position: "relative", overflow: "hidden",
              }}
            >
              {plan.popular && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
              )}
              {plan.popular && (
                <span style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)",
                  color: "#38bdf8", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem", letterSpacing: "0.1em",
                  padding: "0.25rem 0.7rem", borderRadius: "999px",
                }}>MOST POPULAR</span>
              )}

              <p style={{ fontFamily: "'DM Sans', sans-serif", color: plan.accent, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                {plan.tier}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "2.5rem", color: "white" }}>{plan.price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>/ {plan.period}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {plan.desc}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <svg style={{ color: plan.accent, width: "0.9rem", height: "0.9rem", flexShrink: 0 }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" style={{
                display: "block", textAlign: "center", textDecoration: "none",
                background: plan.popular ? "linear-gradient(135deg, #0ea5e9, #0284c7)" : "rgba(14,165,233,0.08)",
                border: plan.popular ? "none" : `1px solid ${plan.accent}30`,
                color: plan.popular ? "white" : plan.accent,
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                padding: "0.85rem", borderRadius: "0.75rem",
                boxShadow: plan.popular ? "0 0 20px rgba(14,165,233,0.25)" : "none",
                transition: "all 0.2s ease",
              }} className="hover:opacity-90 hover:scale-[1.02]">
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.78rem", marginTop: "1.5rem" }}>
          All prices are starting points. Final quote after discovery call. Custom enterprise pricing available.
        </p>
      </div>
    </section>
  );
}

// ── FAQ section ──
function FaqSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "3rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)", color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
            className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
            <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
            FAQ
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl lg:text-5xl">
            <span className="text-white">Questions? </span>
            <span className="svc-gradient">We've got answers.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((f, i) => <FaqItem key={f.q} item={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── CTA section ──
function CtaSection() {
  const [ref, inView] = useInView(0.2);
  return (
    <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
      <div ref={ref} style={{
        maxWidth: "740px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--wave-3)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
          Ready to get started?
        </p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem" }} className="text-4xl lg:text-6xl">
          <span className="text-white">Your project starts</span>
          <br />
          <span className="svc-gradient">with one message.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", maxWidth: "440px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: "0.92rem" }}>
          Tell us what you need. We'll come back with a plan, a timeline, and a price — within 24 hours.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <Link href="/contact" style={{
            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
            color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: "0.9rem", padding: "1rem 2.25rem", borderRadius: "999px",
            textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,0.35)",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
          }} className="hover:scale-105 transition-transform duration-200">
            Start Your Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link href="/portfolio" style={{
            border: "1px solid rgba(14,165,233,0.22)", color: "rgba(255,255,255,0.7)",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
            padding: "1rem 2.25rem", borderRadius: "999px", textDecoration: "none",
            background: "rgba(14,165,233,0.04)",
          }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
            See Our Work First
          </Link>
        </div>
      </div>
    </section>
  );
}