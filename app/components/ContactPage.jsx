"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


// ============================================================
// CONTACT PAGE — BlueWave Promotions
// app/contact/page.jsx
//
// Sections:
//   1. Hero        — animated wave rings + headline
//   2. Contact Grid — 3 info cards (Email / WhatsApp / Calendar)
//   3. Main Form   — full inquiry form with validation + success state
//   4. FAQ Strip   — 6 quick Q&As
//   5. Social Links
// ============================================================

// ── UPDATE THESE ──────────────────────────────────────────────
const CONTACT_EMAIL    = "info@bluewavepromotions.com";
const WHATSAPP_NUMBER  = "15550000000"; // digits only, no +
const CALENDAR_URL     = "https://calendly.com/bluewavepromotions"; // or your booking link
const RESPONSE_HOURS   = "24";
// ─────────────────────────────────────────────────────────────

const SERVICES = [
  "UI/UX Designing",
  "Web Development",
  "App Development",
  "Graphics Designing",
  "Ebook Services",
  "Not sure yet — need advice",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
];

const TIMELINES = [
  "ASAP (rush)",
  "Within 2 weeks",
  "Within a month",
  "1–3 months",
  "Flexible",
];

const FAQS = [
  {
    q: "How fast will you respond?",
    a: `We reply to every inquiry within ${RESPONSE_HOURS} hours on business days — usually much faster.`,
  },
  {
    q: "Do you work with clients worldwide?",
    a: "Yes. We've worked with clients across 18+ countries. We're async-friendly and communicate over email, Slack, or WhatsApp.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Absolutely. Every project starts with a free 30-minute discovery call so we can understand your needs and give you an accurate quote.",
  },
  {
    q: "Can I hire you for a single deliverable?",
    a: "Yes — we do one-off projects like a single logo, a landing page, or an ebook cover. No retainer required.",
  },
  {
    q: "What if I don't know my budget yet?",
    a: "No problem — just select 'Let's discuss' and tell us what you're trying to achieve. We'll help scope it and give you options.",
  },
  {
    q: "How do revisions work?",
    a: "Every project includes at least 2 revision rounds. Packages with 'unlimited revisions' mean we iterate until you're genuinely happy.",
  },
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

// ── Ripple rings canvas ──
function RippleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rings = Array.from({ length: 5 }, (_, i) => ({
      r: 60 + i * 80,
      opacity: 0.06 - i * 0.008,
      speed: 0.18 + i * 0.06,
      phase: i * ((Math.PI * 2) / 5),
    }));

    // Floating particles
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.2 + 0.05,
    }));

    let t = 0;
    const cx = () => canvas.width * 0.5;
    const cy = () => canvas.height * 0.38;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Pulsing rings
      rings.forEach((ring, i) => {
        const pulse = Math.sin(t * ring.speed + ring.phase) * 12;
        ctx.strokeStyle = `rgba(14,165,233,${ring.opacity + Math.sin(t + i) * 0.015})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx(), cy(), ring.r + pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Particles
      particles.forEach(p => {
        p.x += p.speedX / canvas.width;
        p.y += p.speedY / canvas.height;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        ctx.fillStyle = `rgba(56,189,248,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ── FAQ Item ──
function FAQItem({ faq, delay, visible }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`,
        background: open ? "rgba(14,165,233,.06)" : "rgba(5,15,31,.7)",
        border: `1px solid ${open ? "rgba(56,189,248,.25)" : "rgba(14,165,233,.1)"}`,
        borderRadius: "1rem",
        overflow: "hidden",
        transition2: "border-color .25s ease, background .25s ease",
        cursor: "pointer",
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.35rem", gap: "1rem" }}>
        <p style={{ fontFamily: "'Syne',sans-serif", color: open ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.72)", fontWeight: 600, fontSize: ".9rem", lineHeight: 1.4 }}>{faq.q}</p>
        <div style={{
          width: "1.75rem", height: "1.75rem", borderRadius: "50%", flexShrink: 0,
          background: open ? "rgba(14,165,233,.18)" : "rgba(255,255,255,.05)",
          border: `1px solid ${open ? "rgba(56,189,248,.3)" : "rgba(255,255,255,.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .25s ease",
        }}>
          <svg style={{ color: open ? "#38bdf8" : "rgba(255,255,255,.4)", width: ".85rem", height: ".85rem", transition: "transform .25s ease", transform: open ? "rotate(45deg)" : "rotate(0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 1.35rem 1.1rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", fontSize: ".85rem", lineHeight: 1.75 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [formRef, formInView]   = useInView(0.05);
  const [faqRef,  faqInView]    = useInView(0.08);
  const [socRef,  socInView]    = useInView(0.2);

  // Form state
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", timeline: "", message: "",
  });
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Your name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.service)        e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Tell us a bit about your project";
    return e;
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);

    // ── INTEGRATION POINT ─────────────────────────────────────
    // Replace this timeout with your actual form submission:
    //
    // Option A — Formspree:
    //   const res = await fetch("https://formspree.io/f/YOUR_ID", {
    //     method: "POST", headers: {"Content-Type":"application/json"},
    //     body: JSON.stringify(form),
    //   });
    //
    // Option B — EmailJS:
    //   await emailjs.send("SERVICE_ID","TEMPLATE_ID", form, "PUBLIC_KEY");
    //
    // Option C — Next.js API route:
    //   await fetch("/api/contact", {
    //     method: "POST", headers: {"Content-Type":"application/json"},
    //     body: JSON.stringify(form),
    //   });
    // ─────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: "100%", boxSizing: "border-box",
    background: focusedField === field ? "rgba(14,165,233,.06)" : "rgba(5,15,31,.8)",
    border: `1px solid ${errors[field] ? "#f87171" : focusedField === field ? "rgba(56,189,248,.45)" : "rgba(14,165,233,.15)"}`,
    borderRadius: ".75rem",
    color: "rgba(255,255,255,.82)",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: ".88rem",
    padding: ".75rem 1rem",
    outline: "none",
    transition: "border-color .2s ease, background .2s ease",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(14,165,233,.08)" : "none",
  });

  const labelStyle = { fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".75rem", marginBottom: ".35rem", display: "block", letterSpacing: ".04em" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --wave-1:#0ea5e9; --wave-3:#38bdf8; --deep:#020c18; --surface:#050f1f; --border:rgba(14,165,233,0.15); }
        .ct-grad { background:linear-gradient(135deg,#fff 20%,#38bdf8 55%,#0ea5e9 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fu { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
        .fu.show { opacity:1; transform:translateY(0); }
        select option { background:#050f1f; color:rgba(255,255,255,.82); }
        .info-card { transition:border-color .3s ease,transform .3s ease; }
        .info-card:hover { transform:translateY(-4px); border-color:rgba(56,189,248,.3)!important; }
        .soc-link { transition:all .25s ease; }
        .soc-link:hover { border-color:rgba(56,189,248,.35)!important; background:rgba(14,165,233,.07)!important; transform:translateY(-3px); }
        @keyframes wvA { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .wv-a { animation:wvA 16s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }
        .spinning { animation:spin .9s linear infinite; }
        @keyframes successPop { 0%{opacity:0;transform:scale(.9) translateY(16px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        .success-pop { animation:successPop .5s cubic-bezier(.34,1.56,.64,1) forwards; }
        .breadcrumb { font-family:'DM Sans',sans-serif; font-size:.75rem; color:rgba(255,255,255,.3); }
        .breadcrumb a { color:rgba(56,189,248,.6); text-decoration:none; }
        .breadcrumb a:hover { color:#38bdf8; }
        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
          -webkit-box-shadow:0 0 0 100px rgba(5,15,31,.95) inset !important;
          -webkit-text-fill-color:rgba(255,255,255,.82) !important;
        }
      `}</style>

      <main style={{ background: "var(--deep)", minHeight: "100vh" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: "9rem", paddingBottom: "5rem" }}>
          <RippleCanvas />
          <div style={{ position: "absolute", inset: 0, background: "rgba(2,12,24,.78)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div className={`fu ${heroVisible ? "show" : ""}`} style={{ marginBottom: "2rem" }}>
              <span className="breadcrumb"><Link href="/">Home</Link> / <span style={{ color: "rgba(255,255,255,.5)" }}>Contact</span></span>
            </div>

            <div style={{ maxWidth: "700px" }}>
              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".05s", marginBottom: "1.5rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Get In Touch
                </span>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".12s" }}>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem" }} className="text-5xl lg:text-7xl">
                  <span className="text-white">Let's Build</span><br />
                  <span className="ct-grad">Something Great</span><br />
                  <span className="text-white">Together.</span>
                </h1>
              </div>

              <div className={`fu ${heroVisible ? "show" : ""}`} style={{ transitionDelay: ".22s" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", lineHeight: 1.8, fontSize: "1rem", maxWidth: "500px" }}>
                  Share your project — a rough idea is plenty. We'll reply within {RESPONSE_HOURS} hours with a plan, timeline, and transparent price.
                </p>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50px", overflow: "hidden" }}>
            <svg className="wv-a" style={{ width: "200%", height: "100%", position: "absolute", bottom: 0 }} viewBox="0 0 1440 50" preserveAspectRatio="none">
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" fill="rgba(14,165,233,.05)" />
              <path d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,50 L0,50 Z" transform="translate(720,0)" fill="rgba(14,165,233,.05)" />
            </svg>
          </div>
        </section>

        {/* ── 2. INFO CARDS ── */}
        <section style={{ background: "var(--surface)", padding: "4rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.1rem" }}>
              {/* Email */}
              <a href={`mailto:${CONTACT_EMAIL}`} className="info-card" style={{ background: "rgba(5,15,31,.75)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "1.1rem", padding: "1.75rem", textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#38bdf8,transparent)" }} />
                <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: ".85rem", background: "rgba(56,189,248,.1)", border: "1px solid rgba(56,189,248,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <svg style={{ color: "#38bdf8", width: "1.2rem", height: "1.2rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".3rem" }}>Email Us</p>
                <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>{CONTACT_EMAIL}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".75rem" }}>Reply within {RESPONSE_HOURS} hours</p>
              </a>

              {/* WhatsApp */}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="info-card" style={{ background: "rgba(5,15,31,.75)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "1.1rem", padding: "1.75rem", textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#0ea5e9,transparent)" }} />
                <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: ".85rem", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <svg style={{ color: "#0ea5e9", width: "1.2rem", height: "1.2rem" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".3rem" }}>WhatsApp</p>
                <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>Message Us Directly</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".75rem" }}>Fastest way to reach us</p>
              </a>

              {/* Book a Call */}
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="info-card" style={{ background: "rgba(5,15,31,.75)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "1.1rem", padding: "1.75rem", textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#7dd3fc,transparent)" }} />
                <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: ".85rem", background: "rgba(125,211,252,.1)", border: "1px solid rgba(125,211,252,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <svg style={{ color: "#7dd3fc", width: "1.2rem", height: "1.2rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".3rem" }}>Free Discovery Call</p>
                <p style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>Book 30 Minutes</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", fontSize: ".75rem" }}>No commitment required</p>
              </a>
            </div>
          </div>
        </section>

        {/* ── 3. FORM ── */}
        <section style={{ background: "var(--deep)", padding: "5rem 0 6rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={formRef} style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start", opacity: formInView ? 1 : 0, transform: formInView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease, transform .7s ease" }} className="grid-cols-1 lg:grid-cols-[1fr_1.6fr]">

              {/* Left: intro */}
              <div className="hidden lg:block" style={{ position: "sticky", top: "6rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-6">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  Project Inquiry
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1, fontSize: "clamp(1.6rem,2.5vw,2.2rem)", marginBottom: "1.25rem" }}>
                  <span style={{ background: "linear-gradient(135deg,#fff 30%,#38bdf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Tell us about your project
                  </span>
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.4)", lineHeight: 1.8, fontSize: ".88rem", marginBottom: "2rem" }}>
                  Fill in what you know — there's no wrong answer. The more context you give us, the more tailored our response will be.
                </p>

                {/* Promise list */}
                <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                  {[
                    ["⚡", `Response within ${RESPONSE_HOURS} hours`],
                    ["💰", "Free quote, no strings attached"],
                    ["🤝", "Dedicated point of contact"],
                    ["🔒", "Your info stays private"],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                      <span style={{ fontSize: "1rem" }}>{icon}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", fontSize: ".85rem" }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative wave line */}
                <div style={{ marginTop: "2.5rem", height: "1px", background: "linear-gradient(90deg,rgba(14,165,233,.25),transparent)" }} />
              </div>

              {/* Right: form card */}
              <div style={{ background: "rgba(5,15,31,.8)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#38bdf8 40%,#0ea5e9 60%,transparent)" }} />

                {submitted ? (
                  /* ── SUCCESS STATE ── */
                  <div className="success-pop" style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "rgba(14,165,233,.12)", border: "2px solid rgba(56,189,248,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                      <svg style={{ color: "#38bdf8", width: "2rem", height: "2rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "rgba(255,255,255,.92)", marginBottom: ".75rem" }}>Message Sent!</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", lineHeight: 1.75, fontSize: ".9rem", maxWidth: "340px", margin: "0 auto 2rem" }}>
                      Thanks, {form.name.split(" ")[0]}! We've received your inquiry and will get back to you within {RESPONSE_HOURS} hours.
                    </p>
                    <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap", justifyContent: "center" }}>
                      <button onClick={() => { setSubmitted(false); setForm({ name:"",email:"",company:"",service:"",budget:"",timeline:"",message:"" }); }}
                        style={{ background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.2)", color: "rgba(255,255,255,.65)", fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", padding: ".75rem 1.5rem", borderRadius: ".75rem", cursor: "pointer" }}
                        className="hover:bg-sky-400/15 transition-all">
                        Send Another
                      </button>
                      <Link href="/portfolio" style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem", padding: ".75rem 1.5rem", borderRadius: ".75rem", textDecoration: "none" }}>
                        See Our Work
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* ── FORM FIELDS ── */
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,.88)", fontWeight: 700, fontSize: "1.05rem", marginBottom: ".25rem" }}>
                      Project Inquiry Form
                    </h3>

                    {/* Row 1: Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label style={labelStyle}>Your Name *</label>
                        <input
                          type="text" placeholder="Alex Johnson" value={form.name}
                          style={inputStyle("name")}
                          onChange={e => handleChange("name", e.target.value)}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                        />
                        {errors.name && <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f87171", fontSize: ".72rem", marginTop: ".3rem" }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input
                          type="email" placeholder="alex@example.com" value={form.email}
                          style={inputStyle("email")}
                          onChange={e => handleChange("email", e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                        />
                        {errors.email && <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f87171", fontSize: ".72rem", marginTop: ".3rem" }}>{errors.email}</p>}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label style={labelStyle}>Company / Brand <span style={{ color: "rgba(255,255,255,.2)" }}>(optional)</span></label>
                      <input
                        type="text" placeholder="Acme Inc." value={form.company}
                        style={inputStyle("company")}
                        onChange={e => handleChange("company", e.target.value)}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label style={labelStyle}>Service Needed *</label>
                      <select
                        value={form.service}
                        style={{ ...inputStyle("service"), appearance: "none", cursor: "pointer" }}
                        onChange={e => handleChange("service", e.target.value)}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f87171", fontSize: ".72rem", marginTop: ".3rem" }}>{errors.service}</p>}
                    </div>

                    {/* Row: Budget + Timeline */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label style={labelStyle}>Budget Range <span style={{ color: "rgba(255,255,255,.2)" }}>(optional)</span></label>
                        <select
                          value={form.budget}
                          style={{ ...inputStyle("budget"), appearance: "none", cursor: "pointer" }}
                          onChange={e => handleChange("budget", e.target.value)}
                          onFocus={() => setFocusedField("budget")}
                          onBlur={() => setFocusedField(null)}
                        >
                          <option value="">Select…</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Timeline <span style={{ color: "rgba(255,255,255,.2)" }}>(optional)</span></label>
                        <select
                          value={form.timeline}
                          style={{ ...inputStyle("timeline"), appearance: "none", cursor: "pointer" }}
                          onChange={e => handleChange("timeline", e.target.value)}
                          onFocus={() => setFocusedField("timeline")}
                          onBlur={() => setFocusedField(null)}
                        >
                          <option value="">Select…</option>
                          {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={labelStyle}>Project Details *</label>
                      <textarea
                        placeholder="Tell us about your project — what you need, what you've tried before, any reference brands or styles you like…"
                        value={form.message}
                        rows={5}
                        style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px", lineHeight: 1.65 }}
                        onChange={e => handleChange("message", e.target.value)}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.message && <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#f87171", fontSize: ".72rem", marginTop: ".3rem" }}>{errors.message}</p>}
                      <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.2)", fontSize: ".7rem", marginTop: ".35rem" }}>{form.message.length} / 1000 characters</p>
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      style={{
                        background: submitting ? "rgba(14,165,233,.3)" : "linear-gradient(135deg,#0ea5e9,#0284c7)",
                        color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".92rem",
                        padding: "1rem", borderRadius: ".85rem", border: "none",
                        cursor: submitting ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem",
                        boxShadow: submitting ? "none" : "0 0 24px rgba(14,165,233,.3)",
                        transition: "all .25s ease",
                      }}
                      className={submitting ? "" : "hover:scale-[1.02] hover:shadow-sky-400/20"}
                    >
                      {submitting ? (
                        <>
                          <svg className="spinning" style={{ width: "1.1rem", height: "1.1rem" }} fill="none" viewBox="0 0 24 24">
                            <circle style={{ opacity: .25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                            <path style={{ opacity: .75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.2)", fontSize: ".7rem", textAlign: "center", lineHeight: 1.6 }}>
                      By submitting you agree to our privacy policy. We never share your info with third parties.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. FAQ ── */}
        <section style={{ background: "var(--surface)", padding: "6rem 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={faqRef} style={{ opacity: faqInView ? 1 : 0, transform: faqInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span style={{ border: "1px solid var(--border)", background: "rgba(14,165,233,.07)", color: "var(--wave-3)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".12em" }}
                  className="inline-flex items-center gap-2 text-xs uppercase px-4 py-2 rounded-full mb-5">
                  <span style={{ background: "var(--wave-3)", boxShadow: "0 0 8px var(--wave-3)" }} className="w-1.5 h-1.5 rounded-full" />
                  FAQ
                </span>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.1 }} className="text-3xl lg:text-4xl">
                  <span className="ct-grad">Common questions</span><br /><span className="text-white">before you reach out</span>
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {FAQS.map((faq, i) => (
                  <FAQItem key={faq.q} faq={faq} delay={i * .06} visible={faqInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. SOCIAL LINKS ── */}
        <section style={{ background: "var(--deep)", padding: "5rem 0" }}>
          <div ref={socRef} style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center", opacity: socInView ? 1 : 0, transform: socInView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.25)", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Follow our work</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".85rem", justifyContent: "center" }}>
              {[
                // ── UPDATE SOCIAL URLS ──────────────────────────
                { label: "Instagram", icon: "📸", href: "https://instagram.com/bluewavepromotions", color: "#e1306c" },
                { label: "LinkedIn",  icon: "💼", href: "https://linkedin.com/company/bluewavepromotions", color: "#0077b5" },
                { label: "Facebook",  icon: "👥", href: "https://facebook.com/bluewavepromotions", color: "#1877f2" },
                { label: "Twitter/X", icon: "✦",  href: "https://x.com/bluewavepromo", color: "#38bdf8" },
                // ─────────────────────────────────────────────────
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="soc-link" style={{
                  display: "inline-flex", alignItems: "center", gap: ".6rem",
                  background: "rgba(5,15,31,.7)", border: "1px solid rgba(14,165,233,.1)",
                  borderRadius: ".875rem", padding: ".85rem 1.35rem", textDecoration: "none",
                }}>
                  <span style={{ fontSize: "1rem" }}>{s.icon}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", fontSize: ".85rem", fontWeight: 500 }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

    </>
  );
}