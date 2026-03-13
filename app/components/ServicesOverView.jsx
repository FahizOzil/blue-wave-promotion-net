"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// SERVICES OVERVIEW SECTION — BlueWave Promotions
//
// Layout: Alternating large cards in a bento-grid style
// Each card has:
//   • Service icon (SVG)
//   • Title + description
//   • IMAGE PLACEHOLDER (replace with your service images)
//   • Key features list
//   • "Learn More" CTA link
// ============================================================

const SERVICES = [
  {
    id: "ui-ux-designing",
    title: "UI/UX Designing",
    tagline: "Interfaces people love to use",
    description:
      "We craft user-centered designs that balance beauty with function. From wireframes to high-fidelity prototypes, every pixel is intentional.",
    features: ["User Research & Personas", "Wireframing & Prototyping", "Design Systems", "Usability Testing"],
    href: "/services/ui-ux-designing",
    accent: "#38bdf8",
    // ─── IMAGE GUIDE ───────────────────────────────────────────
    // Recommended: screenshot of a UI design, Figma mockup,
    // or a device showing a beautiful app screen.
    // Size: 600×400px minimum. Place at /public/images/service-ui-ux.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/service-ui-ux.jpg",
    imageAlt: "UI UX Design showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    size: "large", // large card spans 2 cols
  },
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Fast, scalable, modern websites",
    description:
      "From landing pages to full-stack platforms — we build web experiences that perform, convert, and scale with your business.",
    features: ["Next.js & React", "E-commerce Solutions", "CMS Integration", "SEO Optimized"],
    href: "/services/web-development",
    accent: "#0ea5e9",
    // ─── IMAGE GUIDE ───────────────────────────────────────────
    // Recommended: browser mockup showing a website,
    // code editor screenshot, or a laptop with your work.
    // Size: 600×400px. Place at /public/images/service-web-dev.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/service-web-dev.jpg",
    imageAlt: "Web Development showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    size: "small",
  },
  {
    id: "app-development",
    title: "App Development",
    tagline: "iOS & Android that delight",
    description:
      "Native and cross-platform mobile apps built for performance. We handle everything from concept to App Store launch.",
    features: ["React Native & Flutter", "iOS & Android", "API Integration", "App Store Launch"],
    href: "/services/app-development",
    accent: "#7dd3fc",
    // ─── IMAGE GUIDE ───────────────────────────────────────────
    // Recommended: phone mockup showing your app screens,
    // or a flat lay of phones with UI.
    // Size: 600×400px. Place at /public/images/service-app-dev.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/service-app-dev.jpg",
    imageAlt: "App Development showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
      </svg>
    ),
    size: "small",
  },
  {
    id: "graphics-designing",
    title: "Graphics Designing",
    tagline: "Visuals that stop the scroll",
    description:
      "Logos, brand identities, social media graphics, and marketing materials — we create visuals that make your brand unforgettable.",
    features: ["Logo & Brand Identity", "Social Media Graphics", "Marketing Collateral", "Print Design"],
    href: "/services/graphics-designing",
    accent: "#0284c7",
    // ─── IMAGE GUIDE ───────────────────────────────────────────
    // Recommended: brand identity mockup, logo showcase,
    // or a flat lay of printed materials.
    // Size: 600×400px. Place at /public/images/service-graphics.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/service-graphics.jpg",
    imageAlt: "Graphics Design showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    size: "large",
  },
  {
    id: "ebook-services",
    title: "Ebook Services",
    tagline: "Publish with confidence",
    description:
      "Professional ebook writing, design, and formatting. From cover design to layout — we make your knowledge look as good as it reads.",
    features: ["Ebook Writing & Editing", "Cover Design", "Kindle & PDF Formatting", "Lead Magnet Ebooks"],
    href: "/services/ebook-services",
    accent: "#38bdf8",
    // ─── IMAGE GUIDE ───────────────────────────────────────────
    // Recommended: ebook cover mockup on a tablet/Kindle,
    // or a stack of ebook covers you've designed.
    // Size: 600×400px. Place at /public/images/service-ebook.jpg
    // ───────────────────────────────────────────────────────────
    image: "/images/service-ebook.jpg",
    imageAlt: "Ebook Services showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    size: "full",
  },
];

// ── Intersection observer hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ── Individual service card ──
function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const isLarge = service.size === "large";
  const isFull  = service.size === "full";

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        gridColumn: isFull ? "1 / -1" : isLarge ? "span 2" : "span 1",
        background: "rgba(5,15,31,0.7)",
        border: "1px solid rgba(14,165,233,0.12)",
        borderRadius: "1.5rem",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        position: "relative",
      }}
      className="group hover:border-sky-500/30 transition-all duration-500"
    >
      {/* Top accent glow on hover */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
        className="group-hover:opacity-100"
      />

      <div className={`flex ${isFull ? "flex-col lg:flex-row" : isLarge ? "flex-col md:flex-row" : "flex-col"} h-full`}>

        {/* ── Content side ── */}
        <div className={`flex flex-col justify-between p-7 lg:p-8 ${isFull ? "lg:w-1/2" : isLarge ? "md:w-1/2" : ""} flex-1`}>
          {/* Top */}
          <div>
            {/* Icon */}
            <div
              style={{
                background: `rgba(${service.accent === "#38bdf8" ? "56,189,248" : service.accent === "#0ea5e9" ? "14,165,233" : service.accent === "#7dd3fc" ? "125,211,252" : "2,132,199"},0.1)`,
                border: `1px solid ${service.accent}22`,
                color: service.accent,
              }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
            >
              {service.icon}
            </div>

            {/* Tagline */}
            <p
              style={{ color: service.accent, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}
              className="text-xs uppercase font-medium mb-2"
            >
              {service.tagline}
            </p>

            {/* Title */}
            <h3
              style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.95)" }}
              className="text-2xl lg:text-3xl font-bold mb-3"
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}
              className="text-sm mb-6"
            >
              {service.description}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2 mb-8">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5">
                  <span
                    style={{ background: service.accent, boxShadow: `0 0 6px ${service.accent}` }}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  />
                  <span
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)" }}
                    className="text-sm"
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href={service.href}
            style={{
              color: service.accent,
              border: `1px solid ${service.accent}33`,
              fontFamily: "'Syne', sans-serif",
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full w-fit hover:bg-white/5 transition-all duration-200 group/btn"
          >
            Explore Service
            <svg
              className="w-4 h-4 -translate-x-0.5 group-hover/btn:translate-x-1 transition-transform duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── Image side ── */}
        <div
          className={`relative overflow-hidden ${
            isFull   ? "lg:w-1/2 min-h-64 lg:min-h-0" :
            isLarge  ? "md:w-1/2 min-h-56 md:min-h-0" :
                       "min-h-48"
          }`}
          style={{ flexShrink: 0 }}
        >
          
              {/* SERVICE IMAGE PLACEHOLDER
              Once you have your images, replace the placeholder div with: */}

              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

            {/* Make sure to add sizes prop for performance:
               sizes="(max-width: 768px) 100vw, 50vw"
           ────────────────────────────────────────────────────────────  */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, rgba(5,15,31,0.9) 0%, ${service.accent}18 50%, rgba(5,15,31,0.7) 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {/* Decorative grid lines */}
            <div
              style={{
                position: "absolute", inset: 0, opacity: 0.08,
                backgroundImage: `linear-gradient(${service.accent} 1px, transparent 1px), linear-gradient(90deg, ${service.accent} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Image icon placeholder */}
            {/* <svg
              style={{ color: `${service.accent}50`, position: "relative", zIndex: 1 }}
              className="w-12 h-12"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg> */}
            {/* <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: `${service.accent}60`,
                position: "relative", zIndex: 1,
                fontSize: "11px",
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              Add image: {service.image}
            </p> */}
          </div>

          {/* Gradient overlay blending image into card */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(${
                isFull || isLarge
                  ? "to right, rgba(5,15,31,0.7) 0%, transparent 40%"
                  : "to top, rgba(5,15,31,0.8) 0%, transparent 50%"
              })`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ServicesOverview() {
  const [headerRef, headerInView] = useInView(0.2);

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

        /* Bento grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .services-grid > *[style*="span 2"] { grid-column: span 2; }
          .services-grid > *[style*="-1"] { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
          .services-grid > * { grid-column: 1 !important; }
        }

        /* Section title gradient */
        .section-title-gradient {
          background: linear-gradient(135deg, #fff 30%, #38bdf8 70%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Floating orb animation */
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        .orb-drift { animation: orbDrift 18s ease-in-out infinite; }
      `}</style>

      <section
        style={{ background: "var(--deep)", position: "relative", overflow: "hidden" }}
        className="py-24 lg:py-32"
      >
        {/* ── Background orbs ── */}
        <div className="orb-drift" style={{
          position: "absolute", top: "10%", right: "-10%",
          width: "40vw", height: "40vw", maxWidth: 500,
          background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
        }} />
        <div className="orb-drift" style={{
          position: "absolute", bottom: "5%", left: "-8%",
          width: "35vw", height: "35vw", maxWidth: 450,
          background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
          animationDelay: "-9s",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* ── Section header ── */}
          <div
            ref={headerRef}
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            {/* Eyebrow */}
            <span
              style={{
                border: "1px solid var(--border)",
                background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.12em",
              }}
              className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6"
            >
              <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                className="w-1.5 h-1.5 rounded-full inline-block" />
              What We Offer
            </span>

            {/* Headline */}
            <h2
              style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-black mb-5"
            >
              <span className="section-title-gradient">Services Built</span>
              <br />
              <span className="text-white">to Make You Shine</span>
            </h2>

            {/* Sub */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
              className="text-base lg:text-lg"
            >
              From design to development to publishing — everything your digital brand
              needs, under one roof.
            </p>
          </div>

          {/* ── Bento grid of service cards ── */}
          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA strip ── */}
          <div
            style={{
              marginTop: "3rem",
              border: "1px solid var(--border)",
              background: "rgba(14,165,233,0.04)",
              borderRadius: "1.5rem",
              padding: "2rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 700, fontSize: "1.15rem" }}>
                Not sure which service you need?
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                Let's talk — we'll find the perfect solution for your goals.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                fontFamily: "'Syne', sans-serif",
                boxShadow: "0 0 24px rgba(14,165,233,0.3)",
              }}
              className="inline-flex items-center gap-2 text-white text-sm font-bold px-6 py-3.5 rounded-full hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            >
              Book a Free Consultation
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