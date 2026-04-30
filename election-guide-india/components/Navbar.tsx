"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "📅 Timeline" },
  { href: "/checklist", label: "✅ Checklist" },
  { href: "/alerts", label: "🔔 Alerts" },
  { href: "/simulator", label: "🎮 Simulator" },
  { href: "/quiz", label: "🧠 Quiz" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(5, 13, 31, 0.95)"
          : "rgba(5, 13, 31, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(255, 153, 51, 0.15)"
          : "1px solid transparent",
        padding: "0 1.5rem",
      }}
    >
      {/* Tricolor top stripe */}
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🗳️</span>
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  background:
                    "linear-gradient(135deg, #FF9933 0%, #FFD700 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                }}
              >
                Election Guide
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#8BA3CC",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                INDIA
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#FF9933" : "#8BA3CC",
                  background: isActive
                    ? "rgba(255, 153, 51, 0.1)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(255, 153, 51, 0.25)"
                    : "1px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "1px solid rgba(255,153,51,0.3)",
            borderRadius: "8px",
            color: "#FF9933",
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
            fontSize: "1rem",
            display: "none",
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,153,51,0.1)",
            padding: "1rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#FF9933" : "#8BA3CC",
                  background: isActive
                    ? "rgba(255, 153, 51, 0.1)"
                    : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
