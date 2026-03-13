"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// ABOUT PAGE — BlueWave Promotions
// app/about/page.jsx  (or pages/about.jsx)
//
// Sections:
//   1. Hero — cinematic page header with animated background
//   2. Our Story — split layout with image + narrative
//   3. Numbers — animated stat counters
//   4. Values — 6 core values in a stylish grid
//   5. Team — team member cards with image placeholders
//   6. Timeline — company milestones
//   7. CTA — closing call-to-action
// ============================================================

// ── Team members ──
const TEAM = [
  {
    name: "Alex Rivera",
    role: "Founder & Creative Director",
    bio: "10+ years shaping brands for startups and Fortune 500s. Obsessed with the space where strategy meets design.",
    // ── IMAGE GUIDE ──────────────────────────────────────────
    // Add headshot at /public/images/team/team-alex.jpg
    // Recommended: professional headshot, 400×400px square
    // ─────────────────────────────────────────────────────────
    image: "/images/team/team-alex.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#38bdf8",
    specialty: "Brand Strategy",
  },
  {
    name: "Jordan Kim",
    role: "Lead UI/UX Designer",
    bio: "Former product designer at two YC-backed startups. Believes every pixel should earn its place on the screen.",
    image: "/images/team/team-jordan.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#0ea5e9",
    specialty: "UI/UX Design",
  },
  {
    name: "Sam Okafor",
    role: "Head of Development",
    bio: "Full-stack engineer who writes clean, fast, scalable code. Next.js evangelist and coffee connoisseur.",
    image: "/images/team/team-sam.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#7dd3fc",
    specialty: "Web & App Dev",
  },
  {
    name: "Mia Chen",
    role: "Graphics & Brand Lead",
    bio: "Illustrator turned brand designer. Creates visual identities that feel alive and tell stories without words.",
    image: "/images/team/team-mia.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#0284c7",
    specialty: "Visual Design",
  },
  {
    name: "Damon Thomas",
    role: "Content & Ebook Specialist",
    bio: "Writer, editor, and layout designer who's helped 50+ coaches and creators publish ebooks that convert.",
    image: "/images/team/team-daniel.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#38bdf8",
    specialty: "Content & Ebooks",
  },
  {
    name: "Priya Nair",
    role: "Project Manager",
    bio: "Keeps every project on track and on time. The calm center in the creative storm. Clients love her.",
    image: "/images/team/team-priya.jpg",
    socials: { linkedin: "#", twitter: "#" },
    accent: "#0ea5e9",
    specialty: "Operations",
  },
];

// ── Core values ──
const VALUES = [
  {
    icon: "✦",
    title: "Craft Over Speed",
    desc: "We never rush quality. Every deliverable is refined until it's something we're genuinely proud of.",
    accent: "#38bdf8",
  },
  {
    icon: "◈",
    title: "Radical Transparency",
    desc: "No jargon, no black boxes. You know exactly what's happening, why, and when at every step.",
    accent: "#0ea5e9",
  },
  {
    icon: "⬡",
    title: "Client-First Thinking",
    desc: "Your goals shape every decision we make. We're invested in your success, not just your project.",
    accent: "#7dd3fc",
  },
  {
    icon: "◎",
    title: "Relentless Curiosity",
    desc: "We stay obsessively up-to-date so your brand always reflects the best of what's possible today.",
    accent: "#0284c7",
  },
  {
    icon: "❋",
    title: "Inclusive by Design",
    desc: "Accessibility isn't an afterthought — it's baked into every interface, layout, and interaction.",
    accent: "#38bdf8",
  },
  {
    icon: "◇",
    title: "Built to Last",
    desc: "We build scalable foundations, not short-term fixes. Your investment should grow with your business.",
    accent: "#0ea5e9",
  },
];

// ── Timeline milestones ──
const TIMELINE = [
  {
    year: "2019",
    title: "Founded",
    desc: "BlueWave Promotions launched with one mission: make world-class digital design accessible to growing businesses.",
  },
  {
    year: "2020",
    title: "First 50 Clients",
    desc: "Reached our first milestone during a turbulent year — proving that remote-first creative work could thrive.",
  },
  {
    year: "2021",
    title: "App Dev Launch",
    desc: "Expanded into mobile app development, delivering our first React Native app to an e-commerce client.",
  },
  {
    year: "2022",
    title: "Ebook Division",
    desc: "Added our Ebook Services arm, helping coaches and creators publish premium digital products at scale.",
  },
  {
    year: "2023",
    title: "100+ Projects",
    desc: "Crossed the 100-project mark with a 98% client satisfaction score and zero missed deadlines.",
  },
  {
    year: "2024",
    title: "Global Reach",
    desc: "Now serving clients across 18 countries with a fully distributed, world-class creative team.",
  },
];

// ── InView hook ──
function useInView(threshold = 0.12) {
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

// ── Animated counter ──
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Team card ──
function TeamCard({ member, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s`,
        background: "rgba(5,15,31,0.7)",
        border: `1px solid ${hovered ? member.accent + "35" : "rgba(14,165,233,0.1)"}`,
        borderRadius: "1.25rem",
        overflow: "hidden",
        transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s, border-color 0.3s ease`,
      }}
    >
      {/* ── Photo area ── */}
      <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>

        {/* ────────────────────────────────────────────────────────
            TEAM MEMBER PHOTO
            Replace the placeholder div with:
*/}
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s ease" }}
            />
        {/* ────────────────────────────────────────────────────────  */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, rgba(5,15,31,0.9) 0%, ${member.accent}18 50%, rgba(5,15,31,0.8) 100%)`,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(${member.accent}18 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }} />
          {/* Initials */}
          {/* <div style={{
            width: "5rem", height: "5rem", borderRadius: "50%",
            background: `linear-gradient(135deg, ${member.accent}30, ${member.accent}10)`,
            border: `2px solid ${member.accent}35`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", zIndex: 1,
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "1.5rem", color: member.accent,
            }}>
              {member.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div> */}
          <p style={{
            position: "absolute", bottom: "0.75rem",
            fontFamily: "'DM Sans', sans-serif", color: `${member.accent}50`,
            fontSize: "0.65rem", zIndex: 1,
          }}>
            Add photo: {member.image}
          </p>
        </div>

        {/* Specialty badge */}
        <div style={{
          position: "absolute", top: "0.85rem", left: "0.85rem", zIndex: 2,
          background: "rgba(2,12,24,0.85)", backdropFilter: "blur(8px)",
          border: `1px solid ${member.accent}30`,
          borderRadius: "999px", padding: "0.25rem 0.7rem",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", color: member.accent,
            fontSize: "0.65rem", letterSpacing: "0.08em",
          }}>
            {member.specialty}
          </span>
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to top, rgba(5,15,31,1) 0%, transparent 100%)",
          zIndex: 1,
        }} />
      </div>

      {/* ── Card content ── */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
        <h3 style={{
          fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.92)",
          fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem",
        }}>
          {member.name}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", color: member.accent,
          fontSize: "0.75rem", marginBottom: "0.75rem",
          letterSpacing: "0.04em",
        }}>
          {member.role}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.42)",
          fontSize: "0.8rem", lineHeight: 1.65, marginBottom: "1rem",
        }}>
          {member.bio}
        </p>

        {/* Social links */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {Object.entries(member.socials).map(([platform, href]) => (
            <a key={platform} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                width: "2rem", height: "2rem", borderRadius: "0.5rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.35)", textDecoration: "none",
                transition: "all 0.2s ease", fontSize: "0.7rem",
              }}
              className="hover:border-sky-400/30 hover:text-sky-300 hover:bg-sky-400/10"
            >
              {platform === "linkedin" ? "in" : "𝕏"}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Value card ──
function ValueCard({ value, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
        background: "rgba(5,15,31,0.6)",
        border: "1px solid rgba(14,165,233,0.1)",
        borderRadius: "1.1rem",
        padding: "1.6rem",
        position: "relative", overflow: "hidden",
      }}
      className="group hover:border-sky-500/25 transition-all duration-300"
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${value.accent}, transparent)`,
        opacity: 0, transition: "opacity 0.4s ease",
      }} className="group-hover:opacity-100" />

      <span style={{
        fontSize: "1.6rem", color: value.accent,
        display: "block", marginBottom: "0.85rem",
        filter: `drop-shadow(0 0 8px ${value.accent}80)`,
      }}>{value.icon}</span>

      <h4 style={{
        fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)",
        fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem",
      }}>{value.title}</h4>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.42)",
        fontSize: "0.82rem", lineHeight: 1.7,
      }}>{value.desc}</p>
    </div>
  );
}

export default function AboutPage() {
  const [heroVisible, setHeroVisible]   = useState(false);
  const [storyRef, storyInView]         = useInView(0.12);
  const [statsRef, statsInView]         = useInView(0.3);
  const [timelineRef, timelineInView]   = useInView(0.08);
  const [ctaRef, ctaInView]             = useInView(0.2);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Counters
  const c1 = useCounter(200, 1600, statsInView);
  const c2 = useCounter(98,  1400, statsInView);
  const c3 = useCounter(18,  1200, statsInView);
  const c4 = useCounter(5,   1000, statsInView);

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

        .about-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 55%, #0ea5e9 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Hero letter reveal */
        .hero-word {
          display: inline-block;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-word.show { opacity: 1; transform: translateY(0); }

        /* Fade up generic */
        .fade-up {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }

        /* Slide left */
        .slide-left {
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-left.show { opacity: 1; transform: translateX(0); }

        /* Slide right */
        .slide-right {
          opacity: 0; transform: translateX(30px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        .slide-right.show { opacity: 1; transform: translateX(0); }

        /* Timeline dot pulse */
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(56,189,248,0); }
        }
        .timeline-dot { animation: dotPulse 2.5s ease-in-out infinite; }

        /* Floating orbs */
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(20px, -25px); }
        }
        .orb { animation: orbFloat 14s ease-in-out infinite; }
        .orb2 { animation: orbFloat 18s ease-in-out infinite reverse; }

        /* Wave animation */
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .wave-scroll { animation: waveScroll 16s linear infinite; }

        /* Stat number */
        .stat-num {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ================================================================
            1. PAGE HERO
            ================================================================ */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: "9rem", paddingBottom: "6rem" }}>

          {/* Orb backgrounds */}
          <div className="orb" style={{
            position: "absolute", top: "-5%", left: "-8%",
            width: "45vw", height: "45vw", maxWidth: 560,
            background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
            pointerEvents: "none", borderRadius: "50%",
          }} />
          <div className="orb2" style={{
            position: "absolute", bottom: "0", right: "-10%",
            width: "35vw", height: "35vw", maxWidth: 420,
            background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
            pointerEvents: "none", borderRadius: "50%",
          }} />

          {/* Dot grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(14,165,233,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px", pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1, textAlign: "center" }}>

            {/* Eyebrow */}
            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0s" }}>
              <span style={{
                border: "1px solid var(--border)",
                background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-7">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                  className="w-1.5 h-1.5 rounded-full" />
                Our Story
              </span>
            </div>

            {/* Headline — word-by-word reveal */}
            <h1 style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.08, marginBottom: "1.5rem" }}
              className="text-5xl lg:text-7xl font-black">
              {["The", "Team", "Behind"].map((word, i) => (
                <span key={word} className={`hero-word ${heroVisible ? "show" : ""} text-white`}
                  style={{ transitionDelay: `${0.1 + i * 0.1}s`, marginRight: "0.3em" }}>
                  {word}
                </span>
              ))}
              <br />
              {["Your", "Next", "Wave"].map((word, i) => (
                <span key={word}
                  className={`hero-word ${heroVisible ? "show" : ""} about-gradient`}
                  style={{ transitionDelay: `${0.4 + i * 0.1}s`, marginRight: "0.3em" }}>
                  {word}
                </span>
              ))}
            </h1>

            <div className={`fade-up ${heroVisible ? "show" : ""}`} style={{ transitionDelay: "0.7s" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "560px", margin: "0 auto",
                lineHeight: 1.8, fontSize: "1.05rem",
              }}>
                We're a team of designers, developers, and storytellers united by one belief —
                every brand deserves work that actually moves people.
              </p>
            </div>

            {/* Scroll cue */}
            <div className={`fade-up ${heroVisible ? "show" : ""} flex justify-center mt-12`}
              style={{ transitionDelay: "0.85s" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.2)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  style={{ animation: "bounce 2s ease-in-out infinite" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", overflow: "hidden" }}>
            <svg className="wave-scroll" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }}
              viewBox="0 0 1440 60" preserveAspectRatio="none">
              <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="rgba(14,165,233,0.05)" />
              <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" transform="translate(720,0)" fill="rgba(14,165,233,0.05)" />
            </svg>
          </div>
        </section>

        {/* ================================================================
            2. OUR STORY
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0", position: "relative" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={storyRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
              className="grid-cols-1 lg:grid-cols-2">

              {/* Left: image */}
              <div className={`slide-left ${storyInView ? "show" : ""}`}>
                <div style={{ position: "relative" }}>

                  {/* ────────────────────────────────────────────────────
                      STORY / OFFICE IMAGE
                      Replace with: */}
                      <Image src="/images/about-story.jpg"
                        alt="BlueWave team at work"
                        width={560} height={400}
                        className="rounded-2xl object-cover w-full" />
                    {/* //     Recommended: behind-the-scenes, team meeting,
                    //     or workspace photo. Size: 1120×800px
                    // ────────────────────────────────────────────────────  */}

                  {/* <div style={{
                    width: "100%", height: "400px",
                    background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(5,15,31,0.85), rgba(56,189,248,0.08))",
                    border: "1px solid rgba(14,165,233,0.18)",
                    borderRadius: "1.5rem",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "10px",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage: "radial-gradient(rgba(56,189,248,0.1) 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }} />
                    <svg style={{ color: "rgba(56,189,248,0.3)", width: "3rem", height: "3rem", position: "relative", zIndex: 1 }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p style={{ color: "rgba(56,189,248,0.4)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", position: "relative", zIndex: 1 }}>
                      Add story image: /images/about-story.jpg
                    </p>
                  </div> */}

                  {/* Floating accent card */}
                  <div style={{
                    position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
                    background: "rgba(5,15,31,0.95)",
                    border: "1px solid rgba(14,165,233,0.25)",
                    borderRadius: "1rem", padding: "1rem 1.25rem",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", lineHeight: 1 }}
                      className="stat-num">5+</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", marginTop: "0.25rem" }}>
                      Years of craft
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: story text */}
              <div className={`slide-right ${storyInView ? "show" : ""}`}>
                <span style={{
                  border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                  color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
                }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  How We Started
                </span>

                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}
                  className="text-3xl lg:text-4xl">
                  <span className="text-white">Born from a belief that</span>
                  <br />
                  <span className="about-gradient">great design should be accessible.</span>
                </h2>

                {[
                  "BlueWave Promotions was founded in 2019 with a simple frustration: too many great businesses were being held back by mediocre digital presence, and the agencies that could help them were either out of reach or out of touch.",
                  "We built BlueWave to be different — a studio where senior talent works on every project, where communication is always clear, and where the work is genuinely held to a high standard.",
                  "Today we're a fully distributed team of designers, developers, and content specialists serving clients across 18 countries. The mission hasn't changed — we just keep getting better at it.",
                ].map((para, i) => (
                  <p key={i} style={{
                    fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "1rem",
                  }}>{para}</p>
                ))}

                <Link href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: "0.88rem", padding: "0.85rem 1.75rem", borderRadius: "999px",
                  textDecoration: "none", marginTop: "0.5rem",
                  boxShadow: "0 0 22px rgba(14,165,233,0.3)",
                }} className="hover:scale-105 transition-transform duration-200">
                  Work With Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            3. STATS BAR
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "5rem 0" }}>
          <div ref={statsRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2rem",
              background: "rgba(14,165,233,0.04)",
              border: "1px solid rgba(14,165,233,0.12)",
              borderRadius: "1.5rem", padding: "3rem 2.5rem",
            }}>
              {[
                { n: c1, suffix: "+", label: "Projects Delivered", sub: "Since 2019" },
                { n: c2, suffix: "%", label: "Client Satisfaction", sub: "Average rating" },
                { n: c3, suffix: "",  label: "Countries Served",   sub: "Globally distributed" },
                { n: c4, suffix: "+", label: "Years of Experience", sub: "And counting" },
              ].map(({ n, suffix, label, sub }, i) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 1 }}
                    className="stat-num">
                    {n}{suffix}
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", fontWeight: 600, marginTop: "0.4rem" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.2rem" }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            4. CORE VALUES
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{
                border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                What We Stand For
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }}
                className="text-3xl lg:text-5xl">
                <span className="about-gradient">Values that drive</span>
                <br />
                <span className="text-white">every decision we make</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.1rem" }}>
              {VALUES.map((v, i) => <ValueCard key={v.title} value={v} index={i} />)}
            </div>
          </div>
        </section>

        {/* ================================================================
            5. TEAM
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{
                border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Meet the Team
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }}
                className="text-3xl lg:text-5xl">
                <span className="text-white">The people who</span>
                <br />
                <span className="about-gradient">make it happen</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)",
                maxWidth: "460px", margin: "1rem auto 0", lineHeight: 1.75, fontSize: "0.9rem",
              }}>
                Senior talent on every project — no juniors, no outsourcing. Just focused, passionate people doing their best work.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {TEAM.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
            </div>
          </div>
        </section>

        {/* ================================================================
            6. TIMELINE
            ================================================================ */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div ref={timelineRef} style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{
                border: "1px solid var(--border)", background: "rgba(14,165,233,0.07)",
                color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
              }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                Our Journey
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }}
                className="text-3xl lg:text-5xl">
                <span className="about-gradient">Milestones</span>{" "}
                <span className="text-white">that shaped us</span>
              </h2>
            </div>

            {/* Timeline items */}
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(14,165,233,0.3) 10%, rgba(14,165,233,0.3) 90%, transparent)",
                transform: "translateX(-50%)",
              }} />

              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={item.year}
                    style={{
                      opacity: timelineInView ? 1 : 0,
                      transform: timelineInView
                        ? "translateX(0)"
                        : `translateX(${isLeft ? "-30px" : "30px"})`,
                      transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
                      display: "flex",
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      marginBottom: "2.5rem",
                      position: "relative",
                    }}
                  >
                    {/* Content card */}
                    <div style={{
                      width: "calc(50% - 2rem)",
                      background: "rgba(5,15,31,0.7)",
                      border: "1px solid rgba(14,165,233,0.12)",
                      borderRadius: "1rem",
                      padding: "1.25rem 1.5rem",
                    }}>
                      <span style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: "0.75rem", color: "#38bdf8",
                        letterSpacing: "0.1em", display: "block", marginBottom: "0.35rem",
                      }}>{item.year}</span>
                      <h4 style={{
                        fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.9)",
                        fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem",
                      }}>{item.title}</h4>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)",
                        fontSize: "0.8rem", lineHeight: 1.65,
                      }}>{item.desc}</p>
                    </div>

                    {/* Center dot */}
                    <div className="timeline-dot" style={{
                      position: "absolute", left: "50%", top: "1.2rem",
                      transform: "translate(-50%, 0)",
                      width: "12px", height: "12px", borderRadius: "50%",
                      background: "#0ea5e9",
                      border: "2px solid rgba(56,189,248,0.5)",
                      zIndex: 2,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            7. CLOSING CTA
            ================================================================ */}
        <section style={{ background: "var(--deep)", padding: "6rem 0" }}>
          <div
            ref={ctaRef}
            style={{
              maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem",
              textAlign: "center",
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif", color: "var(--wave-3)",
              fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>
              Ready to ride the wave?
            </p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.5rem" }}
              className="text-4xl lg:text-6xl">
              <span className="text-white">Let's build your</span>
              <br />
              <span className="about-gradient">next big thing.</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)",
              maxWidth: "460px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: "0.95rem",
            }}>
              Whether you have a brief ready or just a rough idea — we'd love to hear from you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact" style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "0.9rem", padding: "1rem 2.25rem", borderRadius: "999px",
                textDecoration: "none", boxShadow: "0 0 28px rgba(14,165,233,0.35)",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }} className="hover:scale-105 transition-transform duration-200">
                Start a Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/portfolio" style={{
                border: "1px solid rgba(14,165,233,0.22)",
                color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem", padding: "1rem 2.25rem", borderRadius: "999px",
                textDecoration: "none", background: "rgba(14,165,233,0.04)",
              }} className="hover:bg-white/5 hover:text-white transition-all duration-200">
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}