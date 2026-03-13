"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ============================================================
// TESTIMONIALS SECTION — BlueWave Promotions
//
// Layout:
//   • Top: Section header + large featured testimonial
//   • Middle: Auto-scrolling infinite marquee (2 rows, opposite dirs)
//   • Bottom: Trust bar (logos / platform ratings)
//   • Scroll-triggered reveals
// ============================================================

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Bloom Wellness Co.",
    rating: 5,
    text: "BlueWave completely transformed our brand identity. The logo, the color system, the social media templates — everything felt cohesive and premium. We've gotten so many compliments from clients!",
    service: "Graphics Design",
    // ── AVATAR GUIDE ──────────────────────────────────────────
    // Add client headshots at /public/images/avatars/avatar-1.jpg
    // Recommended: 80×80px circular crop, professional photo
    // ─────────────────────────────────────────────────────────
    avatar: "/images/avatars/avatar-1.jpg",
    featured: true,
    accent: "#38bdf8",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Founder",
    company: "NomadHQ",
    rating: 5,
    text: "Delivered our SaaS platform on time and on budget. The Next.js build is fast, clean, and scales perfectly. The team communicated every step of the way.",
    service: "Web Development",
    avatar: "/images/avatars/avatar-2.jpg",
    featured: false,
    accent: "#0ea5e9",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "FitPulse",
    rating: 5,
    text: "Our app UI went from outdated to stunning. The UX research they did saved us months of trial and error. User retention jumped 40% after the redesign.",
    service: "UI/UX Design",
    avatar: "/images/avatars/avatar-3.jpg",
    featured: false,
    accent: "#7dd3fc",
  },
  {
    id: 4,
    name: "Marcus Dean",
    role: "Business Coach",
    company: "Scale Academy",
    rating: 5,
    text: "My ebook looked like a cheap PDF before. BlueWave gave it a full makeover — the cover design alone has boosted my opt-in rate by 60%. Worth every penny.",
    service: "Ebook Services",
    avatar: "/images/avatars/avatar-4.jpg",
    featured: false,
    accent: "#0284c7",
  },
  {
    id: 5,
    name: "Leila Ramos",
    role: "Co-Founder",
    company: "Luxe Store",
    rating: 5,
    text: "Our Shopify store conversion rate doubled after the redesign. BlueWave understood our luxury brand positioning from day one. Outstanding work.",
    service: "Web Development",
    avatar: "/images/avatars/avatar-5.jpg",
    featured: false,
    accent: "#38bdf8",
  },
  {
    id: 6,
    name: "Tom Weston",
    role: "Product Manager",
    company: "SwiftDeliver",
    rating: 5,
    text: "The Flutter app they built for us is rock solid. App Store reviews went from 3.2 to 4.7 stars after launch. The team is meticulous about quality.",
    service: "App Development",
    avatar: "/images/avatars/avatar-6.jpg",
    featured: false,
    accent: "#0ea5e9",
  },
  {
    id: 7,
    name: "Aisha Nwosu",
    role: "Creative Director",
    company: "Atlas Travel",
    rating: 5,
    text: "60 social media templates delivered in one week. Everything was on-brand and ready to post. Our Instagram engagement tripled within a month.",
    service: "Graphics Design",
    avatar: "/images/avatars/avatar-7.jpg",
    featured: false,
    accent: "#7dd3fc",
  },
  {
    id: 8,
    name: "David Chen",
    role: "Healthcare CTO",
    company: "MediCare Group",
    rating: 5,
    text: "Accessibility was non-negotiable for us. BlueWave delivered a fully WCAG-compliant patient portal with a beautiful interface. Patients love it.",
    service: "UI/UX Design",
    avatar: "/images/avatars/avatar-8.jpg",
    featured: false,
    accent: "#0284c7",
  },
];

// Split into two rows for the marquee
const ROW_1 = TESTIMONIALS.filter((_, i) => i % 2 === 0);
const ROW_2 = TESTIMONIALS.filter((_, i) => i % 2 !== 0);

const FEATURED = TESTIMONIALS.find((t) => t.featured);

// ── Star rating component ──
function Stars({ count = 5, size = "sm" }) {
  const sz = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className={sz} style={{ color: "#fbbf24" }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Avatar placeholder ──
function Avatar({ src, name, size = 10 }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colors = ["#0ea5e9", "#38bdf8", "#0284c7", "#7dd3fc", "#0369a1"];
  const color = colors[name.length % colors.length];
  return (
    <div
      style={{
        width: `${size * 4}px`, height: `${size * 4}px`,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        border: `2px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* ── REPLACE WITH REAL AVATAR ──
          <Image src={src} alt={name} width={size*4} height={size*4}
            className="rounded-full object-cover" />
      ── PLACEHOLDER INITIALS BELOW ── */}
      <span style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: `${size * 1.4}px`, color: color,
      }}>
        {initials}
      </span>
    </div>
  );
}

// ── Marquee card (compact) ──
function MarqueeCard({ testimonial }) {
  return (
    <div
      style={{
        background: "rgba(5,15,31,0.8)",
        border: "1px solid rgba(14,165,233,0.1)",
        borderRadius: "1rem",
        padding: "1.25rem 1.5rem",
        width: "320px",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${testimonial.accent}60, transparent)`,
      }} />

      {/* Service tag */}
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
        color: testimonial.accent, background: `${testimonial.accent}12`,
        border: `1px solid ${testimonial.accent}25`,
        padding: "0.2rem 0.65rem", borderRadius: "999px",
        display: "inline-block", marginBottom: "0.75rem",
      }}>
        {testimonial.service}
      </span>

      {/* Stars */}
      <div className="mb-2"><Stars count={testimonial.rating} /></div>

      {/* Quote */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.82rem", lineHeight: 1.65,
        marginBottom: "1rem",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <Avatar src={testimonial.avatar} name={testimonial.name} size={8} />
        <div>
          <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)", fontSize: "0.82rem", fontWeight: 700 }}>
            {testimonial.name}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Infinite marquee row ──
function MarqueeRow({ items, reverse = false, speed = 40 }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
        background: "linear-gradient(to right, #020c18, transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
        background: "linear-gradient(to left, #020c18, transparent)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          animation: `marquee${reverse ? "Reverse" : "Forward"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeCard key={`${item.id}-${i}`} testimonial={item} />
        ))}
      </div>
    </div>
  );
}

// ── InView hook ──
function useInView(threshold = 0.15) {
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

export default function TestimonialsSection() {
  const [headerRef, headerInView] = useInView(0.2);
  const [featuredRef, featuredInView] = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --surface:#050f1f;
          --border: rgba(14,165,233,0.15);
        }

        @keyframes marqueeForward {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .testi-title-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 60%, #0ea5e9 95%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Big quote mark */
        .quote-mark {
          font-size: 8rem;
          line-height: 0.7;
          color: rgba(56,189,248,0.12);
          font-family: Georgia, serif;
          user-select: none;
          position: absolute;
          top: 1.5rem;
          left: 2rem;
        }

        /* Reveal */
        .t-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .t-reveal.show { opacity: 1; transform: translateY(0); }

        /* Featured card pulse border */
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0); }
          50%       { box-shadow: 0 0 0 6px rgba(56,189,248,0.06); }
        }
        .featured-pulse { animation: borderPulse 4s ease-in-out infinite; }

        /* Platform rating badge */
        .platform-badge:hover {
          border-color: rgba(56,189,248,0.3);
          background: rgba(14,165,233,0.07);
        }
      `}</style>

      <section
        style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}
        className="py-24 lg:py-32"
      >
        {/* BG decorations */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
        }} />
        <div style={{
          position: "absolute", top: "15%", left: "-12%",
          width: "45vw", height: "45vw", maxWidth: 550,
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-10%",
          width: "35vw", height: "35vw", maxWidth: 400,
          background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
        }} />

        {/* ================================================================
            HEADER + FEATURED TESTIMONIAL
            ================================================================ */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">

          {/* Header */}
          <div
            ref={headerRef}
            className={`t-reveal ${headerInView ? "show" : ""} text-center mb-14`}
          >
            <span style={{
              border: "1px solid var(--border)",
              background: "rgba(14,165,233,0.07)",
              color: "var(--wave-3)",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.12em",
            }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
              <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                className="w-1.5 h-1.5 rounded-full" />
              Client Stories
            </span>

            <h2
              style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.08 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-black mb-4"
            >
              <span className="testi-title-gradient">Real Results,</span>
              <br />
              <span className="text-white">Real People</span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "480px", margin: "0 auto", lineHeight: 1.75,
              fontSize: "0.95rem",
            }}>
              Don't take our word for it — here's what our clients say after working with BlueWave Promotions.
            </p>
          </div>

          {/* ── Featured testimonial ── */}
          <div
            ref={featuredRef}
            className={`t-reveal ${featuredInView ? "show" : ""} featured-pulse`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div style={{
              background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(5,15,31,0.9) 50%, rgba(56,189,248,0.05) 100%)",
              border: "1px solid rgba(14,165,233,0.22)",
              borderRadius: "1.75rem",
              padding: "3rem lg:3.5rem",
              position: "relative", overflow: "hidden",
              maxWidth: "820px", margin: "0 auto",
            }}
              className="p-8 lg:p-14"
            >
              {/* Big decorative quote mark */}
              <span className="quote-mark">"</span>

              {/* Grid lines */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.04,
                backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Stars */}
                <div className="mb-5">
                  <Stars count={5} size="lg" />
                </div>

                {/* Quote */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}>
                  "{FEATURED.text}"
                </p>

                {/* Author row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <Avatar src={FEATURED.avatar} name={FEATURED.name} size={14} />
                    <div>
                      <p style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 700, fontSize: "1rem" }}>
                        {FEATURED.name}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
                        {FEATURED.role} · {FEATURED.company}
                      </p>
                    </div>
                  </div>

                  {/* Service badge */}
                  <span style={{
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    color: "#38bdf8",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem", letterSpacing: "0.1em",
                    padding: "0.4rem 1rem", borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}>
                    {FEATURED.service}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            INFINITE MARQUEE ROWS
            ================================================================ */}
        <div className="flex flex-col gap-4 mb-16">
          <MarqueeRow items={ROW_1} reverse={false} speed={38} />
          <MarqueeRow items={ROW_2} reverse={true}  speed={45} />
        </div>

        {/* ================================================================
            PLATFORM TRUST BAR
            ================================================================ */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div style={{
            border: "1px solid rgba(14,165,233,0.12)",
            borderRadius: "1.25rem",
            padding: "1.75rem 2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            background: "rgba(5,15,31,0.5)",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
              marginRight: "0.5rem",
            }}>
              Rated 5★ on
            </p>

            {/* Platform badges */}
            {[
              { name: "Google",   stars: "5.0", reviews: "47 reviews"  },
              { name: "Clutch",   stars: "5.0", reviews: "31 reviews"  },
              { name: "Fiverr",   stars: "5.0", reviews: "120 reviews" },
              { name: "Upwork",   stars: "5.0", reviews: "89 reviews"  },
            ].map((platform) => (
              <div
                key={platform.name}
                className="platform-badge"
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.75rem",
                  padding: "0.6rem 1.1rem",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.82rem", fontWeight: 700 }}>
                    {platform.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Stars count={5} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.68rem" }}>
                      {platform.reviews}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}