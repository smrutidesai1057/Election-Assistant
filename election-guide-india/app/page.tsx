import Link from "next/link";

const features = [
  {
    emoji: "🤖",
    title: "ElectBot AI Assistant",
    desc: "Ask anything about Indian elections — get clear, neutral, step-by-step answers powered by Gemini AI.",
    href: "/chat",
    color: "#FF9933",
  },
  {
    emoji: "📅",
    title: "Election Timeline",
    desc: "From Model Code of Conduct to swearing-in — visualize every step of the Indian election process.",
    href: "/timeline",
    color: "#2E5FCC",
  },
  {
    emoji: "✅",
    title: "Voter Readiness Checklist",
    desc: "Are you ready to vote? Check your voter ID, know your booth, and prepare for polling day.",
    href: "/checklist",
    color: "#138808",
  },
  {
    emoji: "🔔",
    title: "State-Wise Alerts",
    desc: "Get election alerts and important notifications filtered by your state.",
    href: "/alerts",
    color: "#9B59B6",
  },
  {
    emoji: "🎮",
    title: "Mock Election Simulator",
    desc: "Experience the full electoral journey — from nomination to forming a government — in a guided simulation.",
    href: "/simulator",
    color: "#E74C3C",
  },
  {
    emoji: "🧠",
    title: "Election Quiz",
    desc: "Test your knowledge of India's democratic system. How much do you really know?",
    href: "/quiz",
    color: "#F39C12",
  },
];

const stats = [
  { value: "96.8Cr+", label: "Registered Voters" },
  { value: "543", label: "Lok Sabha Seats" },
  { value: "1950", label: "Voter Helpline" },
  { value: "75+", label: "Years of Democracy" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "4rem 1.5rem",
        }}
      >
        {/* Background elements */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255, 153, 51, 0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,153,51,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "2%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(19,136,8,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div style={{ animation: "fadeInUp 0.8s ease forwards" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "50px",
                background: "rgba(255, 153, 51, 0.1)",
                border: "1px solid rgba(255, 153, 51, 0.25)",
                color: "#FF9933",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#138808",
                  boxShadow: "0 0 6px #138808",
                  animation: "pulse-glow 2s infinite",
                }}
              />
              Civic Education Platform · India
            </div>

            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "3.2rem",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Your Vote.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF9933 0%, #FFD700 50%, #FF9933 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your Voice.
              </span>
              <br />
              <span style={{ color: "#8BA3CC", fontWeight: 500, fontSize: "2.4rem" }}>
                Your Democracy.
              </span>
            </h1>

            <p
              style={{
                color: "#8BA3CC",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "520px",
              }}
            >
              India&apos;s most complete civic education platform. Understand elections,
              register to vote, simulate the electoral process, and talk to
              ElectBot — your AI guide to Indian democracy.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/chat" className="btn-primary">
                🤖 Ask ElectBot
              </Link>
              <Link href="/timeline" className="btn-secondary">
                📅 View Timeline
              </Link>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,153,51,0.1)",
              }}
            >
              {stats.map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      background:
                        "linear-gradient(135deg, #FF9933, #FFD700)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#4A6080", marginTop: "0.25rem" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Ashoka Chakra visual */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(11,42,107,0.6) 0%, rgba(5,13,31,0.8) 70%)",
                border: "2px solid rgba(255,153,51,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 60px rgba(255,153,51,0.1), inset 0 0 40px rgba(11,42,107,0.5)",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>🗳️</div>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#FF9933",
                  }}
                >
                  Jai Hind
                </div>
                <div style={{ color: "#8BA3CC", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  जय हिन्द
                </div>
              </div>
            </div>

            {/* Orbiting badges */}
            {[
              { top: "5%", left: "50%", label: "🗳️ EVM" },
              { top: "50%", left: "95%", label: "📋 EPIC" },
              { top: "90%", left: "50%", label: "🔢 VVPAT" },
              { top: "50%", left: "0%", label: "✅ NOTA" },
            ].map((badge, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: badge.top,
                  left: badge.left,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(10, 22, 40, 0.9)",
                  border: "1px solid rgba(255,153,51,0.25)",
                  borderRadius: "50px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#FF9933",
                  whiteSpace: "nowrap",
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            h1 { font-size: 2.2rem !important; }
          }
        `}</style>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(10,22,40,0.3)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-heading gradient-text" style={{ fontFamily: "Poppins, sans-serif" }}>
              Everything You Need
            </h2>
            <p className="section-sub">
              From first-time voter to election expert — we&apos;ve got you covered.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    height: "100%",
                    cursor: "pointer",
                    borderTop: `3px solid ${f.color}22`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: f.color,
                    }}
                  />
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.emoji}</div>
                  <h3
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#F0F4FF",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "#8BA3CC", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                  <div
                    style={{
                      marginTop: "1.25rem",
                      color: f.color,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .features-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .features-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "3rem 2rem",
            borderRadius: "24px",
            background: "rgba(10, 22, 40, 0.7)",
            border: "1px solid rgba(255, 153, 51, 0.2)",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, #FF9933 33%, #FFFFFF 33% 66%, #138808 66%)",
            }}
          />
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "1.8rem",
              marginBottom: "1rem",
              color: "#F0F4FF",
            }}
          >
            Meet ElectBot — Your AI Election Guide
          </h2>
          <p style={{ color: "#8BA3CC", marginBottom: "2rem", lineHeight: 1.7 }}>
            Ask ElectBot anything about Indian elections — voter registration,
            EVMs, polling process, your rights — and get clear, step-by-step answers in seconds.
          </p>
          <Link href="/chat" className="btn-primary" style={{ fontSize: "1rem" }}>
            Start Chatting with ElectBot 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,153,51,0.1)",
          padding: "2rem 1.5rem",
          textAlign: "center",
          color: "#4A6080",
          fontSize: "0.8rem",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          🗳️ <strong style={{ color: "#8BA3CC" }}>Election Guide India</strong> — Making democracy understandable for every citizen
        </div>
        <div>
          Data sourced from the{" "}
          <a
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FF9933", textDecoration: "none" }}
          >
            Election Commission of India
          </a>
          {" "}· Voter Helpline: 1950
        </div>
      </footer>
    </div>
  );
}
