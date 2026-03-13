"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const BADGES = [
  { label: "UI/UX Design",       delay: "0s",    pos: "top-6 -left-10"   },
  { label: "Web Development",    delay: "0.15s", pos: "top-1/3 -left-14" },
  { label: "App Development",    delay: "0.3s",  pos: "bottom-16 -left-8"},
  { label: "Graphics Design",    delay: "0.45s", pos: "top-4 -right-10"  },
  { label: "Ebook Services",     delay: "0.6s",  pos: "bottom-8 -right-12"},
];

// ── Animated counter stats ──
const STATS = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 98,  suffix: "%", label: "Client Satisfaction" },
  { value: 5,   suffix:"+",  label: "Years Experience"   },
];

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCounter({ value, suffix, label, start }) {
  const count = useCounter(value, 1600, start);
  return (
    <div className="text-center">
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-3xl lg:text-4xl font-black"
      >
        {count}{suffix}
      </p>
      <p
        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}
        className="text-xs uppercase tracking-widest mt-1"
      >
        {label}
      </p>
    </div>
  );
}

// ── Bubble canvas background ──
function BubbleCanvas() {
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

    // Create bubbles
    const bubbles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        // drift upward
        b.y -= b.speed;
        b.x += b.drift;
        if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${b.opacity})`;
        ctx.fill();

        // glow ring on larger bubbles
        if (b.r > 1.8) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14,165,233,${b.opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Subtle connection lines between nearby bubbles
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const dx = bubbles[i].x - bubbles[j].x;
          const dy = bubbles[i].y - bubbles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(bubbles[i].x, bubbles[i].y);
            ctx.lineTo(bubbles[j].x, bubbles[j].y);
            ctx.strokeStyle = `rgba(14,165,233,${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Trigger counters when stats row enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Font imports (move to _document.js or layout.jsx head) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-2: #0284c7;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --mid:    #071428;
          --border: rgba(14,165,233,0.18);
        }

        /* ── Staggered reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Floating badge animation ── */
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-7px); }
        }
        .badge-float { animation: floatBadge 4s ease-in-out infinite; }

        /* ── Scroll indicator bounce ── */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1;   }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }
        .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

        /* ── Wave layers ── */
        @keyframes waveShift1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveShift2 {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .wave-layer-1 { animation: waveShift1 12s linear infinite; }
        .wave-layer-2 { animation: waveShift2 16s linear infinite; }
        .wave-layer-3 { animation: waveShift1 20s linear infinite; }

        /* ── Glow pulse on CTA ── */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(14,165,233,0.4), 0 0 40px rgba(14,165,233,0.15); }
          50%       { box-shadow: 0 0 30px rgba(56,189,248,0.6), 0 0 60px rgba(14,165,233,0.25); }
        }
        .glow-cta { animation: glowPulse 3s ease-in-out infinite; }

        /* ── Image shimmer ring ── */
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ring-rotate { animation: ringRotate 10s linear infinite; }

        /* ── Diagonal gradient text ── */
        .hero-title-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #ffffff 45%, #38bdf8 60%, #0ea5e9 80%, #7dd3fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ================================================================
          HERO WRAPPER
          ================================================================ */}
      <section
        style={{ background: "var(--deep)", minHeight: "100vh", position: "relative", overflow: "hidden" }}
        className="flex flex-col"
      >
        {/* ── Radial glow blobs ── */}
        <div
          style={{
            position: "absolute", top: "-10%", left: "-5%",
            width: "50vw", height: "50vw", maxWidth: 700,
            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "15%", right: "-8%",
            width: "45vw", height: "45vw", maxWidth: 600,
            background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Bubble canvas ── */}
        <BubbleCanvas />

        {/* ── Noise texture overlay (subtle grain) ── */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }}
        />

        {/* ================================================================
            MAIN CONTENT
            ================================================================ */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

            {/* ── LEFT: Text content ── */}
            <div className="flex flex-col gap-6">

              {/* Eyebrow tag */}
              <div
                className={`reveal ${visible ? "show" : ""}`}
                style={{ transitionDelay: "0s" }}
              >
                <span
                  style={{
                    border: "1px solid var(--border)",
                    background: "rgba(14,165,233,0.07)",
                    color: "var(--wave-3)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.12em",
                  }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full"
                >
                  {/* Animated dot */}
                  <span
                    style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                    className="w-1.5 h-1.5 rounded-full inline-block"
                  />
                  Digital Marketing &amp; Creative Agency
                </span>
              </div>

              {/* Main headline */}
              <div
                className={`reveal ${visible ? "show" : ""}`}
                style={{ transitionDelay: "0.12s" }}
              >
                <h1
                  style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.05 }}
                  className="text-5xl lg:text-6xl xl:text-7xl font-black"
                >
                  {/* Line 1 */}
                  <span className="block text-white">We Build</span>

                  {/* Line 2 — gradient accent */}
                  <span className="block hero-title-gradient">Digital</span>

                  {/* Line 3 */}
                  <span className="block text-white">Experiences</span>
                </h1>
              </div>

              {/* Sub-headline */}
              <div
                className={`reveal ${visible ? "show" : ""}`}
                style={{ transitionDelay: "0.24s" }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.55)",
                    maxWidth: "480px",
                    lineHeight: 1.75,
                  }}
                  className="text-base lg:text-lg"
                >
                  From pixel-perfect UI designs to powerful web &amp; app development —
                  BlueWave Promotions turns your vision into a brand that makes waves.
                </p>
              </div>

              {/* CTA buttons */}
              <div
                className={`reveal ${visible ? "show" : ""} flex flex-wrap gap-4 mt-2`}
                style={{ transitionDelay: "0.36s" }}
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  style={{
                    background: "linear-gradient(135deg, var(--wave-1), var(--wave-2))",
                    fontFamily: "'Syne', sans-serif",
                  }}
                  className="glow-cta inline-flex items-center gap-2.5 text-white font-bold text-sm px-7 py-4 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95"
                >
                  Start Your Project
                  {/* Arrow icon */}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/portfolio"
                  style={{
                    border: "1px solid var(--border)",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="inline-flex items-center gap-2.5 text-sm font-medium px-7 py-4 rounded-full hover:bg-white/5 hover:border-sky-400/40 transition-all duration-200"
                >
                  {/* Play icon */}
                  <span
                    style={{ background: "rgba(14,165,233,0.15)", border: "1px solid var(--border)" }}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 ml-0.5" style={{ color: "var(--wave-3)" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  View Our Work
                </Link>
              </div>

              {/* Trust badges */}
              <div
                className={`reveal ${visible ? "show" : ""} flex items-center gap-6 mt-2`}
                style={{ transitionDelay: "0.48s" }}
              >
                {/* Avatar stack placeholder */}
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        // ─────────────────────────────────────────
                        // AVATAR PLACEHOLDER
                        // Replace these divs with real client photos:
                        // <Image src={`/images/client-${i}.jpg`} ... />
                        // ─────────────────────────────────────────
                        background: `hsl(${200 + i * 20}, 70%, ${30 + i * 5}%)`,
                        border: "2px solid var(--deep)",
                        marginLeft: i === 1 ? 0 : "-10px",
                      }}
                      className="w-9 h-9 rounded-full"
                    />
                  ))}
                </div>
                <div>
                  <p
                    style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)" }}
                    className="text-sm font-semibold"
                  >
                    200+ Happy Clients
                  </p>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3" style={{ color: "#fbbf24" }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)" }}
                      className="text-xs ml-1"
                    >
                      5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Hero visual ── */}
            <div
              className={`reveal ${visible ? "show" : ""} relative flex items-center justify-center`}
              style={{ transitionDelay: "0.2s" }}
            >
              {/* Outer rotating dashed ring */}
              <div
                className="ring-rotate absolute"
                style={{
                  width: "min(500px, 88vw)",
                  height: "min(500px, 88vw)",
                  border: "1px dashed rgba(14,165,233,0.2)",
                  borderRadius: "50%",
                }}
              />

              {/* Inner glowing ring */}
              <div
                style={{
                  width: "min(420px, 75vw)",
                  height: "min(420px, 75vw)",
                  border: "1px solid rgba(56,189,248,0.15)",
                  borderRadius: "50%",
                  boxShadow: "0 0 60px rgba(14,165,233,0.08), inset 0 0 60px rgba(14,165,233,0.04)",
                }}
                className="absolute"
              />

              
                  {/* HERO IMAGE PLACEHOLDER
                  Replace the div below with your actual hero image: */}

                  <Image
                    src="/images/hero-main.jpg"  
                    alt="BlueWave Promotions"
                    width={420}
                    height={420}
                    className="object-cover rounded-3xl"
                    priority
                  />

                  {/* Recommended: a professional photo of your team,
                  a device mockup showcase, or an abstract visual
                  representing your brand (1:1 ratio works best) */}
               
             

              {/* ── Floating service badge pills ── */}
              {BADGES.map((badge, i) => (
                <div
                  key={badge.label}
                  className={`badge-float absolute ${badge.pos} hidden lg:flex`}
                  style={{ animationDelay: badge.delay }}
                >
                  <span
                    style={{
                      background: "rgba(5,15,31,0.92)",
                      border: "1px solid rgba(14,165,233,0.3)",
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "'DM Sans', sans-serif",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(14,165,233,0.1)",
                      whiteSpace: "nowrap",
                    }}
                    className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full"
                  >
                    <span
                      style={{ background: "var(--wave-3)", boxShadow: "0 0 6px var(--wave-3)" }}
                      className="w-1.5 h-1.5 rounded-full"
                    />
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================
              STATS ROW
              ================================================================ */}
          <div
            ref={statsRef}
            className={`reveal ${visible ? "show" : ""} mt-16 lg:mt-20`}
            style={{ transitionDelay: "0.55s" }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                background: "rgba(14,165,233,0.04)",
                backdropFilter: "blur(10px)",
              }}
              className="rounded-2xl px-8 py-6 grid grid-cols-3 gap-4 divide-x divide-white/5"
            >
              {STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} start={statsVisible} />
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================
            ANIMATED WAVE LAYERS (bottom)
            ================================================================ */}
        <div className="relative z-10 w-full overflow-hidden" style={{ height: "120px", marginTop: "-40px" }}>
          {/* Wave 1 — darkest, slowest */}
          <svg
            className="wave-layer-1 absolute bottom-0"
            style={{ width: "200%", height: "100%" }}
            viewBox="0 0 1440 120" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1440,20 1440,60 L1440,120 L0,120 Z"
              fill="rgba(14,165,233,0.06)"
            />
            <path
              d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1440,20 1440,60 L1440,120 L0,120 Z"
              transform="translate(720,0)"
              fill="rgba(14,165,233,0.06)"
            />
          </svg>

          {/* Wave 2 — mid opacity */}
          <svg
            className="wave-layer-2 absolute bottom-0"
            style={{ width: "200%", height: "85%" }}
            viewBox="0 0 1440 120" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,120 L0,120 Z"
              fill="rgba(2,132,199,0.08)"
            />
            <path
              d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,120 L0,120 Z"
              transform="translate(720,0)"
              fill="rgba(2,132,199,0.08)"
            />
          </svg>

          {/* Wave 3 — lightest, fastest */}
          <svg
            className="wave-layer-3 absolute bottom-0"
            style={{ width: "200%", height: "60%" }}
            viewBox="0 0 1440 120" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,50 C200,80 400,20 600,50 C800,80 1000,15 1200,50 C1320,70 1380,40 1440,50 L1440,120 L0,120 Z"
              fill="rgba(56,189,248,0.05)"
            />
            <path
              d="M0,50 C200,80 400,20 600,50 C800,80 1000,15 1200,50 C1320,70 1380,40 1440,50 L1440,120 L0,120 Z"
              transform="translate(720,0)"
              fill="rgba(56,189,248,0.05)"
            />
          </svg>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          <span
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
            className="text-[10px] uppercase"
          >
            Scroll
          </span>
          <div className="scroll-bounce">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}