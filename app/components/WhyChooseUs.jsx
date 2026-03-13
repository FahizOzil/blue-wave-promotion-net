"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// WHY CHOOSE US SECTION — BlueWave Promotions
//
// Layout:
//   • Left: Big headline + description + team image placeholder
//   • Right: Reason cards with animated icons + numbers
//   • Bottom: Process timeline (4 steps)
//   • Scroll-triggered reveal animations throughout
// ============================================================

const REASONS = [
  {
    number: "01",
    title: "Results-Driven Approach",
    description:
      "Every decision we make is tied to your goals. We measure success by your growth — not just deliverables.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    accent: "#38bdf8",
  },
  {
    number: "02",
    title: "End-to-End Under One Roof",
    description:
      "Design, development, graphics, ebooks — no agency-hopping. One team, one vision, seamless execution.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    accent: "#0ea5e9",
  },
  {
    number: "03",
    title: "Transparent Communication",
    description:
      "No black boxes. You get regular updates, clear timelines, and direct access to your project team at every stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    accent: "#7dd3fc",
  },
  {
    number: "04",
    title: "Pixel-Perfect Quality",
    description:
      "We obsess over details. Every pixel, line of code, and word is crafted to the highest standard before it reaches you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    accent: "#0284c7",
  },
  {
    number: "05",
    title: "On-Time Delivery",
    description:
      "Deadlines are sacred. We plan meticulously and execute efficiently so your launch day is never a question mark.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: "#38bdf8",
  },
  {
    number: "06",
    title: "Long-Term Partnership",
    description:
      "We don't disappear after launch. Our clients grow with us — ongoing support, updates, and strategy included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    accent: "#0ea5e9",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We learn your goals, audience, and vision in a focused strategy session.",
    icon: "◎",
  },
  {
    step: "02",
    title: "Strategy & Proposal",
    desc: "You receive a clear scope, timeline, and pricing — no surprises.",
    icon: "◈",
  },
  {
    step: "03",
    title: "Design & Build",
    desc: "Our team executes with precision, sharing progress updates throughout.",
    icon: "✦",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "We go live together and stay by your side with ongoing care.",
    icon: "⬡",
  },
];

// ── Reusable intersection observer hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ── Reason card ──
function ReasonCard({ reason, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s`,
        background: "rgba(5,15,31,0.6)",
        border: "1px solid rgba(14,165,233,0.1)",
        borderRadius: "1.25rem",
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
      className="group hover:border-sky-500/25 transition-all duration-400"
    >
      {/* Corner number watermark */}
      <span
        style={{
          position: "absolute", top: "1rem", right: "1.25rem",
          fontFamily: "'Syne', sans-serif",
          fontSize: "3.5rem", fontWeight: 800,
          color: `${reason.accent}08`,
          lineHeight: 1,
          userSelect: "none",
          transition: "color 0.4s ease",
        }}
        className="group-hover:!text-sky-400/10"
      >
        {reason.number}
      </span>

      {/* Icon */}
      <div
        style={{
          width: "2.75rem", height: "2.75rem",
          background: `${reason.accent}12`,
          border: `1px solid ${reason.accent}25`,
          borderRadius: "0.875rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: reason.accent,
          marginBottom: "1rem",
          transition: "transform 0.3s ease, background 0.3s ease",
        }}
        className="group-hover:scale-110 group-hover:bg-sky-400/15"
      >
        {reason.icon}
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "rgba(255,255,255,0.92)",
          fontWeight: 700, fontSize: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {reason.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.85rem",
          lineHeight: 1.7,
        }}
      >
        {reason.description}
      </p>

      {/* Bottom accent line on hover */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${reason.accent}, transparent)`,
          opacity: 0, transition: "opacity 0.4s ease",
        }}
        className="group-hover:opacity-100"
      />
    </div>
  );
}

export default function WhyChooseUs() {
  const [leftRef, leftInView]       = useInView(0.15);
  const [processRef, processInView] = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --surface:#050f1f;
          --border: rgba(14,165,233,0.15);
        }

        .wcu-title-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 60%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Process step connector line */
        .process-line {
          position: absolute;
          top: 1.75rem;
          left: calc(50% + 1.75rem);
          right: calc(-50% + 1.75rem);
          height: 1px;
          background: linear-gradient(90deg, rgba(14,165,233,0.4), rgba(14,165,233,0.1));
        }

        @keyframes shimmerLine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-line {
          background: linear-gradient(90deg, transparent 0%, #38bdf8 50%, transparent 100%);
          background-size: 200% auto;
          animation: shimmerLine 3s linear infinite;
        }

        @keyframes floatTeam {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .float-team { animation: floatTeam 6s ease-in-out infinite; }

        /* Stagger reveal */
        .reveal-left {
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-left.show { opacity: 1; transform: translateX(0); }
      `}</style>

      <section
        style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}
        className="py-24 lg:py-32"
      >
        {/* ── Background decoration ── */}
        <div style={{
          position: "absolute", top: "20%", left: "-15%",
          width: "50vw", height: "50vw", maxWidth: 600,
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none", borderRadius: "50%",
        }} />
        {/* Horizontal divider lines */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* ================================================================
              TOP: Left text + Right grid
              ================================================================ */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20 lg:mb-28">

            {/* ── LEFT COLUMN ── */}
            <div
              ref={leftRef}
              className={`reveal-left ${leftInView ? "show" : ""}`}
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
                  className="w-1.5 h-1.5 rounded-full" />
                Why BlueWave
              </span>

              {/* Headline */}
              <h2
                style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.08 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6"
              >
                <span className="text-white">The Agency</span>
                <br />
                <span className="wcu-title-gradient">That Actually</span>
                <br />
                <span className="text-white">Delivers.</span>
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8, maxWidth: "460px",
                }}
                className="text-base mb-8"
              >
                We're not just another agency. We're a team of digital craftspeople
                obsessed with making your brand stand out in a crowded market — and
                keeping you ahead of the wave.
              </p>

              {/* Mini stats row */}
              <div className="flex gap-8 mb-10">
                {[
                  { n: "200+", l: "Projects" },
                  { n: "98%",  l: "Satisfaction" },
                  { n: "5★",   l: "Rated" },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem",
                      background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{n}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</p>
                  </div>
                ))}
              </div>

              {/* ────────────────────────────────────────────────────────
                  TEAM / ABOUT IMAGE PLACEHOLDER
                  Replace the div below with your actual image: */}

                  <Image
                    src="/images/team-photo.jpg"  
                    alt="BlueWave Promotions Team"
                    width={520}
                    height={320}
                    className="object-cover rounded-2xl w-full"
                  />

                  {/* Recommended: team photo, workspace, or a behind-the-scenes
                  shot. Size: 1040×640px minimum.
              ────────────────────────────────────────────────────────  */}
        
            
            </div>

            {/* ── RIGHT COLUMN: Reason cards grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REASONS.map((reason, i) => (
                <ReasonCard key={reason.number} reason={reason} index={i} />
              ))}
            </div>
          </div>

          {/* ================================================================
              PROCESS TIMELINE
              ================================================================ */}
          <div
            ref={processRef}
            style={{
              opacity: processInView ? 1 : 0,
              transform: processInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "var(--wave-3)", fontSize: "0.75rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                How We Work
              </p>
              <h3
                style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 800 }}
                className="text-2xl lg:text-3xl"
              >
                From Idea to Launch —{" "}
                <span style={{
                  background: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>4 Simple Steps</span>
              </h3>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">

              {/* Connecting line (desktop only) */}
              <div
                className="hidden lg:block absolute"
                style={{
                  top: "1.75rem", left: "12.5%", right: "12.5%", height: "1px",
                  background: "linear-gradient(90deg, rgba(14,165,233,0.05), rgba(14,165,233,0.3) 50%, rgba(14,165,233,0.05))",
                }}
              >
                <div className="shimmer-line absolute inset-0" />
              </div>

              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.step}
                  style={{
                    opacity: processInView ? 1 : 0,
                    transform: processInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Step circle */}
                  <div
                    style={{
                      width: "3.5rem", height: "3.5rem",
                      background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.1))",
                      border: "1px solid rgba(14,165,233,0.3)",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1rem",
                      boxShadow: "0 0 20px rgba(14,165,233,0.1)",
                    }}
                  >
                    <span style={{ color: "var(--wave-3)", fontSize: "1.2rem" }}>{step.icon}</span>
                  </div>

                  {/* Step number badge */}
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: "var(--wave-3)", fontSize: "0.7rem",
                      letterSpacing: "0.1em", fontWeight: 700,
                      display: "block", marginBottom: "0.4rem",
                    }}
                  >
                    STEP {step.step}
                  </span>

                  <h4
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 700, fontSize: "0.95rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.8rem", lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA below process */}
            <div className="text-center mt-14">
              <Link
                href="/contact"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 0 28px rgba(14,165,233,0.3)",
                }}
                className="inline-flex items-center gap-2.5 text-white font-bold text-sm px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Let's Start Your Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}