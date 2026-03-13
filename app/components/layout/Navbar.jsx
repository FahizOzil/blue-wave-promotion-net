"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ============================================================
// SERVICES DROPDOWN DATA
// Add/remove services here as needed
// ============================================================
const services = [
  {
    label: "UI/UX Designing",
    href: "/services/ui-ux-designing",
    icon: "✦", // Replace with your icon component if using lucide-react or heroicons
    desc: "User-centered design experiences",
  },
  {
    label: "Web Development",
    href: "/services/web-development",
    icon: "⬡",
    desc: "Modern, scalable web solutions",
  },
  {
    label: "App Development",
    href: "/services/app-development",
    icon: "◈",
    desc: "iOS & Android applications",
  },
  {
    label: "Graphics Designing",
    href: "/services/graphics-designing",
    icon: "◉",
    desc: "Brand visuals that stand out",
  },
  {
    label: "Ebook Services",
    href: "/services/ebook-services",
    icon: "◎",
    desc: "Professional digital publications",
  },
];

// ============================================================
// NAV LINKS
// ============================================================
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // ── Scroll detection: adds glass background after scrolling ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close dropdown when clicking outside ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ============================================================
          GLOBAL STYLES
          Inject once at app root or in globals.css instead
          ============================================================ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --wave-1: #0ea5e9;   /* sky-500  – primary accent */
          --wave-2: #0284c7;   /* sky-600  – hover         */
          --wave-3: #38bdf8;   /* sky-400  – glow          */
          --deep:   #020c18;   /* near-black ocean deep    */
          --surface:#050f1f;   /* card / navbar bg         */
          --border: rgba(14,165,233,0.18);
        }

        /* Wave shimmer on active link */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .wave-text {
          background: linear-gradient(90deg, #fff 0%, var(--wave-3) 40%, #fff 60%, var(--wave-1) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        /* Dropdown slide-in */
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .dropdown-animate { animation: dropIn 0.22s ease forwards; }

        /* Mobile menu slide */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-animate { animation: slideDown 0.28s ease forwards; }

        /* Glow dot on service icon */
        .service-icon-glow {
          text-shadow: 0 0 10px var(--wave-3), 0 0 20px var(--wave-1);
        }

        /* Underline sweep on nav links */
        .nav-link-sweep {
          position: relative;
        }
        .nav-link-sweep::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, var(--wave-1), var(--wave-3));
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link-sweep:hover::after { width: 100%; }
      `}</style>

      {/* ============================================================
          NAVBAR WRAPPER
          ============================================================ */}
      <nav
        style={{
          fontFamily: "'Syne', sans-serif",
          background: scrolled
            ? "rgba(5,15,31,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
        className="fixed top-0 left-0 w-full z-50"
      >
        {/* ── Inner container ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">

          {/* ============================================================
              LOGO
              Place your logo image at: /public/images/logo.png
              or replace <img> with <Image> from next/image
              ============================================================ */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* OPTION A – image logo (uncomment when you have the file) */}
            {/* <Image
              src="/images/logo.png"   // ← PUT YOUR LOGO HERE
              alt="BlueWave Promotions"
              width={44}
              height={44}
              className="object-contain"
            /> */}

            {/* OPTION B – text logo (remove once real logo is ready) */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--wave-1), var(--wave-3))",
                boxShadow: "0 0 18px rgba(56,189,248,0.5)",
              }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
            >
              BW
            </div>

            <div className="leading-none">
              <span
                style={{ color: "var(--wave-3)", letterSpacing: "0.04em" }}
                className="block text-lg font-bold"
              >
                BlueWave
              </span>
              <span
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em" }}
                className="block text-[10px] uppercase tracking-widest"
              >
                Promotions
              </span>
            </div>
          </Link>

          {/* ============================================================
              DESKTOP NAV LINKS
              ============================================================ */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Left nav links */}
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}
                className="nav-link-sweep text-sm font-medium hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* ── SERVICES DROPDOWN ── */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                style={{
                  color: servicesOpen ? "var(--wave-3)" : "rgba(255,255,255,0.75)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="nav-link-sweep flex items-center gap-1.5 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                Services
                {/* Chevron rotates when open */}
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ── Dropdown Panel ── */}
              {servicesOpen && (
                <div
                  className="dropdown-animate absolute top-full left-1/2 mt-4 w-72 rounded-2xl overflow-hidden"
                  style={{
                    transform: "translateX(-50%)",
                    background: "rgba(5,15,31,0.97)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(14,165,233,0.08)",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{ background: "linear-gradient(90deg, var(--wave-1), var(--wave-3))" }}
                    className="h-0.5 w-full"
                  />

                  <div className="p-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3.5 px-4 py-3 rounded-xl group transition-all duration-200 hover:bg-white/5"
                      >
                        {/* Icon */}
                        <span
                          style={{ color: "var(--wave-3)" }}
                          className="service-icon-glow text-lg w-6 text-center group-hover:scale-110 transition-transform"
                        >
                          {service.icon}
                        </span>

                        {/* Text */}
                        <div>
                          <p
                            style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Syne', sans-serif" }}
                            className="text-sm font-semibold group-hover:text-sky-300 transition-colors"
                          >
                            {service.label}
                          </p>
                          <p
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)" }}
                            className="text-xs mt-0.5"
                          >
                            {service.desc}
                          </p>
                        </div>

                        {/* Arrow on hover */}
                        <svg
                          className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                          style={{ color: "var(--wave-3)" }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div
                    style={{ borderTop: "1px solid var(--border)" }}
                    className="px-6 py-3"
                  >
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      style={{ color: "var(--wave-3)", fontFamily: "'DM Sans', sans-serif" }}
                      className="text-xs font-medium flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
                    >
                      View all services
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right nav links */}
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}
                className="nav-link-sweep text-sm font-medium hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ============================================================
              CTA BUTTON (desktop)
              ============================================================ */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Email link */}
            <a
              href="mailto:info@bluewavepromotions.com"
              style={{
                color: "var(--wave-3)",
                fontFamily: "'DM Sans', sans-serif",
                borderColor: "var(--border)",
              }}
              className="text-xs border rounded-full px-4 py-2 hover:bg-white/5 transition-all duration-200"
            >
              info@bluewavepromotions.com
            </a>

            {/* Get Started button */}
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, var(--wave-1), var(--wave-2))",
                boxShadow: "0 0 20px rgba(14,165,233,0.35)",
                fontFamily: "'Syne', sans-serif",
              }}
              className="text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 hover:shadow-sky-400/40 transition-all duration-200 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* ============================================================
              MOBILE HAMBURGER
              ============================================================ */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              style={{ background: mobileOpen ? "var(--wave-3)" : "white" }}
              className="block w-6 h-0.5 rounded transition-all duration-300"
              style={{
                background: "white",
                transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "none",
                transition: "all 0.3s ease",
              }}
            />
            <span
              style={{
                background: "white",
                opacity: mobileOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }}
              className="block w-6 h-0.5 rounded"
            />
            <span
              style={{
                background: "white",
                transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "none",
                transition: "all 0.3s ease",
              }}
              className="block w-6 h-0.5 rounded"
            />
          </button>
        </div>

        {/* ============================================================
            MOBILE MENU
            ============================================================ */}
        {mobileOpen && (
          <div
            className="mobile-animate lg:hidden"
            style={{
              background: "rgba(5,15,31,0.98)",
              borderTop: "1px solid var(--border)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">

              {/* Nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}
                  className="text-sm font-medium py-3 border-b border-white/5 hover:text-sky-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Services label */}
              <p
                style={{ color: "var(--wave-3)", fontFamily: "'Syne', sans-serif", letterSpacing: "0.1em" }}
                className="text-xs uppercase font-bold mt-4 mb-2"
              >
                Our Services
              </p>

              {/* Service links */}
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}
                  className="flex items-center gap-3 text-sm py-2.5 hover:text-sky-300 transition-colors"
                >
                  <span style={{ color: "var(--wave-3)" }} className="text-base">{service.icon}</span>
                  {service.label}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "linear-gradient(135deg, var(--wave-1), var(--wave-2))",
                  fontFamily: "'Syne', sans-serif",
                }}
                className="mt-4 text-white text-sm font-semibold px-6 py-3 rounded-full text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}