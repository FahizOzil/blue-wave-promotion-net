"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// CONTACT SECTION — BlueWave Promotions
//
// Layout:
//   • Left: Contact info cards + social links + map placeholder
//   • Right: Full contact form with validation + success state
//   • Bottom: Quick-contact strip (email / WhatsApp / call)
// ============================================================

const SERVICES_OPTIONS = [
  "UI/UX Designing",
  "Web Development",
  "App Development",
  "Graphics Designing",
  "Ebook Services",
  "Not Sure (Let's Talk)",
];

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Let's Discuss",
];

const CONTACT_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Us",
    // ── UPDATE WITH YOUR REAL EMAIL ──
    value: "info@bluewavepromotions.com",
    href: "mailto:info@bluewavepromotions.com",
    accent: "#38bdf8",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Call / WhatsApp",
    // ── UPDATE WITH YOUR REAL PHONE ──
    value: "+1 (555) 000-0000",
    href: "https://wa.me/15550000000",
    accent: "#0ea5e9",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    accent: "#7dd3fc",
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    // ── UPDATE WITH YOUR REAL INSTAGRAM ──
    href: "https://instagram.com/bluewavepromotions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/bluewavepromotions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/bluewavepromotions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/bluewavepromo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
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

// ── Form field wrapper ──
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ color: "#f87171", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem" }}>
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle = {
  background: "rgba(5,15,31,0.7)",
  border: "1px solid rgba(14,165,233,0.15)",
  borderRadius: "0.75rem",
  padding: "0.8rem 1rem",
  color: "rgba(255,255,255,0.85)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.88rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

export default function ContactSection() {
  const [leftRef, leftInView]   = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors]   = useState({});
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.service)        e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    // ── INTEGRATE YOUR FORM HANDLER HERE ──────────────────────
    // Options:
    //   • Formspree:  POST to https://formspree.io/f/YOUR_ID
    //   • EmailJS:    emailjs.sendForm(...)
    //   • API route:  POST to /api/contact
    //
    // Example with fetch:
    // await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // ──────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 1500)); // remove this line when using real handler
    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  };

  const focusStyle = (field) =>
    focused === field
      ? { ...inputStyle, borderColor: "rgba(56,189,248,0.5)", boxShadow: "0 0 0 3px rgba(14,165,233,0.08)" }
      : errors[field]
      ? { ...inputStyle, borderColor: "rgba(248,113,113,0.4)" }
      : inputStyle;

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

        .contact-title-gradient {
          background: linear-gradient(135deg, #fff 20%, #38bdf8 60%, #0ea5e9 95%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .c-reveal-left {
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .c-reveal-left.show { opacity: 1; transform: translateX(0); }

        .c-reveal-right {
          opacity: 0; transform: translateX(28px);
          transition: opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s;
        }
        .c-reveal-right.show { opacity: 1; transform: translateX(0); }

        /* Select arrow */
        select option { background: #050f1f; color: white; }

        /* Loading spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }

        /* Success checkmark */
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .check-pop { animation: checkPop 0.5s ease forwards; }

        /* Social hover */
        .social-btn:hover { border-color: rgba(56,189,248,0.35) !important; background: rgba(14,165,233,0.1) !important; color: #38bdf8 !important; }

        /* Quick contact strip */
        .quick-card:hover { border-color: rgba(56,189,248,0.3) !important; background: rgba(14,165,233,0.06) !important; }

        /* Map placeholder */
        @keyframes mapPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        .map-dot { animation: mapPulse 2.5s ease-in-out infinite; }
      `}</style>

      <section
        style={{ background: "var(--deep)", position: "relative", overflow: "hidden" }}
        className="py-24 lg:py-32"
      >
        {/* BG decorations */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "-12%", borderRadius: "50%",
          width: "40vw", height: "40vw", maxWidth: 500,
          background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "-10%", borderRadius: "50%",
          width: "35vw", height: "35vw", maxWidth: 400,
          background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* ── Section header ── */}
          <div className="text-center mb-16">
            <span style={{
              border: "1px solid var(--border)",
              background: "rgba(14,165,233,0.07)",
              color: "var(--wave-3)",
              fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em",
            }} className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
              <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }}
                className="w-1.5 h-1.5 rounded-full" />
              Get In Touch
            </span>
            <h2
              style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.08 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-black"
            >
              <span className="contact-title-gradient">Let's Build</span>
              <br />
              <span className="text-white">Something Great</span>
            </h2>
          </div>

          {/* ================================================================
              MAIN GRID: LEFT info + RIGHT form
              ================================================================ */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT COLUMN ── */}
            <div ref={leftRef} className={`c-reveal-left ${leftInView ? "show" : ""} flex flex-col gap-6`}>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontSize: "0.95rem",
              }}>
                Ready to start your next project? Fill in the form or reach out directly —
                we respond within 24 hours and love a good brief.
              </p>

              {/* Contact info cards */}
              <div className="flex flex-col gap-3">
                {CONTACT_CARDS.map((card) => (
                  <div key={card.label}
                    style={{
                      background: "rgba(5,15,31,0.7)",
                      border: "1px solid rgba(14,165,233,0.1)",
                      borderRadius: "1rem", padding: "1rem 1.25rem",
                      display: "flex", alignItems: "center", gap: "1rem",
                    }}
                  >
                    <div style={{
                      width: "2.5rem", height: "2.5rem", flexShrink: 0,
                      background: `${card.accent}12`, border: `1px solid ${card.accent}22`,
                      borderRadius: "0.75rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: card.accent,
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {card.label}
                      </p>
                      {card.href ? (
                        <a href={card.href} style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem" }}
                          className="hover:text-sky-300 transition-colors">
                          {card.value}
                        </a>
                      ) : (
                        <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem" }}>
                          {card.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Follow Us
                </p>
                <div className="flex gap-2.5 flex-wrap">
                  {SOCIALS.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="social-btn"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "0.65rem",
                        padding: "0.5rem 0.9rem",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                        transition: "all 0.25s ease", textDecoration: "none",
                      }}>
                      {s.icon}
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────────
                  MAP PLACEHOLDER
                  Replace with a real Google Maps embed or Mapbox component:

                  <iframe
                    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                    width="100%" height="220"
                    style={{ border: 0, borderRadius: "1rem" }}
                    allowFullScreen loading="lazy"
                  />

                  Or use next/dynamic with Mapbox GL JS for a custom map.
              ──────────────────────────────────────────────────────────── */}
              <div style={{
                width: "100%", height: "200px",
                background: "rgba(5,15,31,0.7)",
                border: "1px solid rgba(14,165,233,0.12)",
                borderRadius: "1rem",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "10px",
                position: "relative", overflow: "hidden",
              }}>
                {/* Animated dot grid */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(rgba(14,165,233,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }} />
                {/* Map pin */}
                <div className="map-dot" style={{ position: "relative", zIndex: 1 }}>
                  <svg style={{ color: "rgba(56,189,248,0.6)", width: "2rem", height: "2rem" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(56,189,248,0.4)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>
                  Embed your map here
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: "0.65rem", position: "relative", zIndex: 1 }}>
                  bluewavepromotions.com
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Form ── */}
            <div ref={rightRef} className={`c-reveal-right ${rightInView ? "show" : ""}`}>
              <div style={{
                background: "rgba(5,15,31,0.8)",
                border: "1px solid rgba(14,165,233,0.15)",
                borderRadius: "1.5rem",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
                  background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
                }} />

                {/* ── SUCCESS STATE ── */}
                {success ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                    <div className="check-pop" style={{
                      width: "4.5rem", height: "4.5rem", borderRadius: "50%",
                      background: "rgba(14,165,233,0.12)",
                      border: "2px solid rgba(14,165,233,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg className="w-8 h-8" style={{ color: "#38bdf8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                        Message Sent!
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                        Thanks for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      style={{
                        border: "1px solid rgba(14,165,233,0.25)",
                        color: "#38bdf8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                        background: "rgba(14,165,233,0.05)",
                        padding: "0.6rem 1.5rem", borderRadius: "999px", cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* ── FORM ── */
                  <div className="flex flex-col gap-5">
                    <div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", color: "white", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.3rem" }}>
                        Start Your Project
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
                        Fill in the details and we'll be in touch shortly.
                      </p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Your Name *" error={errors.name}>
                        <input
                          type="text" placeholder="John Smith"
                          value={form.name} onChange={set("name")}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                          style={focusStyle("name")}
                        />
                      </Field>
                      <Field label="Email Address *" error={errors.email}>
                        <input
                          type="email" placeholder="john@company.com"
                          value={form.email} onChange={set("email")}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                          style={focusStyle("email")}
                        />
                      </Field>
                    </div>

                    {/* Phone */}
                    <Field label="Phone / WhatsApp" error={errors.phone}>
                      <input
                        type="tel" placeholder="+1 (555) 000-0000"
                        value={form.phone} onChange={set("phone")}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                        style={focusStyle("phone")}
                      />
                    </Field>

                    {/* Service + Budget */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Service Needed *" error={errors.service}>
                        <select
                          value={form.service} onChange={set("service")}
                          onFocus={() => setFocused("service")} onBlur={() => setFocused("")}
                          style={{ ...focusStyle("service"), appearance: "none", cursor: "pointer" }}
                        >
                          <option value="">Select a service</option>
                          {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Budget Range" error={errors.budget}>
                        <select
                          value={form.budget} onChange={set("budget")}
                          onFocus={() => setFocused("budget")} onBlur={() => setFocused("")}
                          style={{ ...focusStyle("budget"), appearance: "none", cursor: "pointer" }}
                        >
                          <option value="">Select budget</option>
                          {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                    </div>

                    {/* Message */}
                    <Field label="Project Details *" error={errors.message}>
                      <textarea
                        placeholder="Tell us about your project, goals, and any ideas you have..."
                        rows={4} value={form.message} onChange={set("message")}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                        style={{ ...focusStyle("message"), resize: "vertical", minHeight: "110px" }}
                      />
                    </Field>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        background: loading
                          ? "rgba(14,165,233,0.4)"
                          : "linear-gradient(135deg, #0ea5e9, #0284c7)",
                        boxShadow: loading ? "none" : "0 0 24px rgba(14,165,233,0.3)",
                        fontFamily: "'Syne', sans-serif",
                        color: "white", fontWeight: 700, fontSize: "0.9rem",
                        padding: "0.9rem", borderRadius: "0.85rem",
                        border: "none", cursor: loading ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                        transition: "all 0.25s ease",
                        transform: loading ? "scale(1)" : undefined,
                      }}
                      className={loading ? "" : "hover:scale-[1.02] active:scale-[0.98]"}
                    >
                      {loading ? (
                        <>
                          <svg className="spinner w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send My Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", textAlign: "center" }}>
                      🔒 Your information is private and never shared.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================================================================
              QUICK CONTACT STRIP
              ================================================================ */}
          <div style={{ marginTop: "4rem" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)",
              fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
              textAlign: "center", marginBottom: "1rem",
            }}>
              Prefer a quicker route?
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: "✉",
                  title: "Email Directly",
                  sub: "info@bluewavepromotions.com", // ← update
                  href: "mailto:info@bluewavepromotions.com",
                  accent: "#38bdf8",
                },
                {
                  icon: "💬",
                  title: "WhatsApp Us",
                  sub: "Chat with our team now",
                  href: "https://wa.me/15550000000", // ← update with real number
                  accent: "#0ea5e9",
                },
                {
                  icon: "📅",
                  title: "Book a Call",
                  sub: "Schedule a free 30-min call",
                  href: "/book-call", // ← link to Calendly or booking page
                  accent: "#7dd3fc",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="quick-card"
                  style={{
                    display: "flex", alignItems: "center", gap: "0.9rem",
                    background: "rgba(5,15,31,0.6)",
                    border: "1px solid rgba(14,165,233,0.1)",
                    borderRadius: "1rem", padding: "1.1rem 1.25rem",
                    textDecoration: "none", transition: "all 0.25s ease",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.85rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", marginTop: "0.15rem" }}>
                      {item.sub}
                    </p>
                  </div>
                  <svg style={{ color: item.accent, marginLeft: "auto", flexShrink: 0 }}
                    className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}