"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// FOOTER — BlueWave Promotions
//
// Sections:
//   • Animated wave SVG top divider
//   • Brand column: logo + tagline + social links
//   • Services links column
//   • Company links column
//   • Newsletter signup column
//   • Bottom legal bar: copyright + policy links + "back to top"
// ============================================================

const FOOTER_SERVICES = [
  { label: "UI/UX Designing",   href: "/services/ui-ux-designing"  },
  { label: "Web Development",   href: "/services/web-development"  },
  { label: "App Development",   href: "/services/app-development"  },
  { label: "Graphics Designing",href: "/services/graphics-designing"},
  { label: "Ebook Services",    href: "/services/ebook-services"   },
];

const FOOTER_COMPANY = [
  { label: "Home",       href: "/"          },
  { label: "About Us",   href: "/about"     },
  { label: "Portfolio",  href: "/portfolio" },
  { label: "Blog",       href: "/blog"      },
  { label: "Contact",    href: "/contact"   },
];

const FOOTER_LEGAL = [
  { label: "Privacy Policy",   href: "/privacy-policy"   },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy",    href: "/cookie-policy"    },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/bluewavepromotions", // ← update
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/bluewavepromotions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/bluewavepromotions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/bluewavepromo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/15550000000", // ← update
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail]       = useState("");
  const [subState, setSubState] = useState("idle"); // idle | loading | success | error

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubState("error");
      return;
    }
    setSubState("loading");
    // ── INTEGRATE YOUR NEWSLETTER HANDLER HERE ──────────────
    // Options:
    //   • Mailchimp API
    //   • ConvertKit API
    //   • POST to /api/subscribe
    //
    // Example:
    // await fetch("/api/subscribe", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    //   headers: { "Content-Type": "application/json" },
    // });
    // ─────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 1200)); // remove when using real handler
    setSubState("success");
    setEmail("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --wave-1: #0ea5e9;
          --wave-3: #38bdf8;
          --deep:   #020c18;
          --deeper: #010810;
          --border: rgba(14,165,233,0.13);
        }

        /* Wave animations */
        @keyframes waveA {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveB {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .wave-a { animation: waveA 14s linear infinite; }
        .wave-b { animation: waveB 20s linear infinite; }
        .wave-c { animation: waveA 28s linear infinite; }

        /* Footer link hover */
        .footer-link {
          color: rgba(255,255,255,0.42);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-link:hover { color: #38bdf8; }
        .footer-link:hover .link-dot { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }

        /* Social hover */
        .footer-social {
          width: 2.25rem; height: 2.25rem;
          border-radius: 0.6rem;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.45);
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .footer-social:hover {
          background: rgba(14,165,233,0.12);
          border-color: rgba(56,189,248,0.35);
          color: #38bdf8;
          transform: translateY(-2px);
        }

        /* Newsletter input */
        .newsletter-input {
          background: rgba(5,15,31,0.8);
          border: 1px solid rgba(14,165,233,0.15);
          border-radius: 0.65rem;
          padding: 0.7rem 1rem;
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          outline: none;
          width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .newsletter-input:focus {
          border-color: rgba(56,189,248,0.45);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.07);
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.22); }

        /* Scroll to top */
        .back-top {
          width: 2.4rem; height: 2.4rem;
          border-radius: 0.65rem;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #38bdf8; cursor: pointer;
          transition: all 0.25s ease;
        }
        .back-top:hover {
          background: rgba(14,165,233,0.2);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(14,165,233,0.2);
        }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        /* Glow logo text */
        .logo-glow {
          text-shadow: 0 0 20px rgba(56,189,248,0.4);
        }

        /* Bottom bar divider */
        .bottom-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(14,165,233,0.18), transparent);
          margin-bottom: 1.5rem;
        }
      `}</style>

      <footer style={{ background: "var(--deeper)", position: "relative", overflow: "hidden" }}>

        {/* ================================================================
            ANIMATED WAVE DIVIDER (top)
            ================================================================ */}
        <div style={{ position: "relative", height: "80px", overflow: "hidden" }}>
          {/* Wave layer 1 */}
          <svg className="wave-a" style={{ position: "absolute", bottom: 0, width: "200%", height: "100%" }}
            viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,75 480,5 720,40 C960,75 1200,5 1440,40 L1440,80 L0,80 Z"
              fill="rgba(14,165,233,0.07)" />
            <path d="M0,40 C240,75 480,5 720,40 C960,75 1200,5 1440,40 L1440,80 L0,80 Z"
              transform="translate(720,0)" fill="rgba(14,165,233,0.07)" />
          </svg>
          {/* Wave layer 2 */}
          <svg className="wave-b" style={{ position: "absolute", bottom: 0, width: "200%", height: "70%" }}
            viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,65 720,0 1080,35 C1260,52 1380,20 1440,30 L1440,80 L0,80 Z"
              fill="rgba(2,132,199,0.06)" />
            <path d="M0,30 C360,65 720,0 1080,35 C1260,52 1380,20 1440,30 L1440,80 L0,80 Z"
              transform="translate(720,0)" fill="rgba(2,132,199,0.06)" />
          </svg>
          {/* Wave layer 3 */}
          <svg className="wave-c" style={{ position: "absolute", bottom: 0, width: "200%", height: "45%" }}
            viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C180,70 360,30 540,50 C720,70 900,25 1080,50 C1260,75 1380,35 1440,50 L1440,80 L0,80 Z"
              fill="rgba(56,189,248,0.04)" />
            <path d="M0,50 C180,70 360,30 540,50 C720,70 900,25 1080,50 C1260,75 1380,35 1440,50 L1440,80 L0,80 Z"
              transform="translate(720,0)" fill="rgba(56,189,248,0.04)" />
          </svg>
        </div>

        {/* ================================================================
            MAIN FOOTER GRID
            ================================================================ */}
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "3.5rem 1.5rem 0",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            paddingBottom: "3.5rem",
          }}>

            {/* ── COL 1: Brand ── */}
            <div style={{ gridColumn: "span 1", minWidth: 0 }}>

              {/* Logo */}
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.25rem" }}>
                {/* ────────────────────────────────────────────────────
                    LOGO PLACEHOLDER
                    Replace the div below with your real logo:

                    <Image
                      src="/images/logo.png"   ← your logo
                      alt="BlueWave Promotions"
                      width={40} height={40}
                      className="object-contain"
                    />
                ──────────────────────────────────────────────────── */}
                <div style={{
                  width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", flexShrink: 0,
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  boxShadow: "0 0 16px rgba(14,165,233,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.9rem",
                }}>BW</div>

                <div>
                  <p className="logo-glow" style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    color: "#38bdf8", fontSize: "1.05rem", lineHeight: 1,
                  }}>BlueWave</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)",
                    fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  }}>Promotions</p>
                </div>
              </Link>

              {/* Tagline */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.38)",
                fontSize: "0.82rem", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "240px",
              }}>
                Crafting digital experiences that make waves. Design · Development · Publishing.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="footer-social" title={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── COL 2: Services ── */}
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)",
                fontWeight: 700, fontSize: "0.88rem", marginBottom: "1.25rem",
                letterSpacing: "0.06em",
              }}>
                Services
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
                {FOOTER_SERVICES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      <span className="link-dot" style={{
                        width: "4px", height: "4px", borderRadius: "50%",
                        background: "rgba(56,189,248,0.3)", flexShrink: 0,
                        transition: "background 0.2s ease, box-shadow 0.2s ease",
                      }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COL 3: Company ── */}
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)",
                fontWeight: 700, fontSize: "0.88rem", marginBottom: "1.25rem",
                letterSpacing: "0.06em",
              }}>
                Company
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      <span className="link-dot" style={{
                        width: "4px", height: "4px", borderRadius: "50%",
                        background: "rgba(56,189,248,0.3)", flexShrink: 0,
                        transition: "background 0.2s ease, box-shadow 0.2s ease",
                      }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact quick info */}
              <div style={{ marginTop: "2rem" }}>
                <p style={{
                  fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)",
                  fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.85rem",
                  letterSpacing: "0.06em",
                }}>Contact</p>
                <a href="mailto:info@bluewavepromotions.com" // ← update
                  style={{
                    fontFamily: "'DM Sans', sans-serif", color: "#38bdf8",
                    fontSize: "0.8rem", textDecoration: "none", display: "block",
                    marginBottom: "0.4rem",
                  }}
                  className="hover:underline"
                >
                  info@bluewavepromotions.com
                </a>
                <a href="https://wa.me/15550000000" // ← update
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.38)",
                    fontSize: "0.8rem", textDecoration: "none",
                  }}
                  className="hover:text-sky-300 transition-colors"
                >
                  +1 (555) 000-0000 {/* ← update */}
                </a>
              </div>
            </div>

            {/* ── COL 4: Newsletter ── */}
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)",
                fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.5rem",
                letterSpacing: "0.06em",
              }}>
                Stay in the Loop
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)",
                fontSize: "0.78rem", lineHeight: 1.65, marginBottom: "1.25rem",
              }}>
                Tips on design, development &amp; digital growth — straight to your inbox. No spam, ever.
              </p>

              {/* Newsletter form */}
              {subState === "success" ? (
                <div style={{
                  background: "rgba(14,165,233,0.08)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  borderRadius: "0.75rem", padding: "1rem",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                }}>
                  <svg style={{ color: "#38bdf8", flexShrink: 0, width: "1.2rem", height: "1.2rem" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
                    You're subscribed! Welcome aboard 🌊
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubState("idle"); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  {subState === "error" && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#f87171", fontSize: "0.72rem" }}>
                      Please enter a valid email address.
                    </p>
                  )}
                  <button
                    onClick={handleSubscribe}
                    disabled={subState === "loading"}
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                      border: "none", borderRadius: "0.65rem",
                      padding: "0.7rem",
                      color: "white", fontFamily: "'Syne', sans-serif",
                      fontWeight: 700, fontSize: "0.82rem",
                      cursor: subState === "loading" ? "not-allowed" : "pointer",
                      opacity: subState === "loading" ? 0.7 : 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      transition: "all 0.25s ease",
                      boxShadow: "0 4px 14px rgba(14,165,233,0.25)",
                    }}
                    className={subState !== "loading" ? "hover:scale-[1.02] active:scale-[0.98]" : ""}
                  >
                    {subState === "loading" ? (
                      <>
                        <svg className="spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Trust note */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.2)",
                fontSize: "0.68rem", marginTop: "0.75rem",
                display: "flex", alignItems: "center", gap: "0.35rem",
              }}>
                🔒 No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* ================================================================
              BOTTOM LEGAL BAR
              ================================================================ */}
          <div style={{ paddingBottom: "2rem" }}>
            <div className="bottom-divider" />

            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "center", justifyContent: "space-between", gap: "1rem",
            }}>

              {/* Copyright */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)",
                fontSize: "0.78rem",
              }}>
                © {new Date().getFullYear()}{" "}
                <span style={{ color: "rgba(56,189,248,0.6)" }}>BlueWave Promotions LLC</span>
                {" "}· All rights reserved · bluewavepromotions.com
              </p>

              {/* Legal links */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
                {FOOTER_LEGAL.map((link) => (
                  <Link key={link.href} href={link.href} style={{
                    fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)",
                    fontSize: "0.75rem", textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                    className="hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Back to top */}
                <button onClick={scrollToTop} className="back-top" aria-label="Back to top">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}