"use client";
import { useState } from "react";

const checklistItems = [
  { id: 1, category: "Registration", emoji: "📋", title: "Check Voter Registration Status", desc: "Verify your name is on the Electoral Roll at voters.eci.gov.in", link: "https://voters.eci.gov.in" },
  { id: 2, category: "Registration", emoji: "🪪", title: "Have Your Voter ID (EPIC) Ready", desc: "Ensure your EPIC card is not expired or damaged. Download e-EPIC from the portal." },
  { id: 3, category: "Registration", emoji: "📍", title: "Know Your Polling Station", desc: "Find your assigned booth at voters.eci.gov.in using your EPIC number.", link: "https://voters.eci.gov.in" },
  { id: 4, category: "Documents", emoji: "🪪", title: "Prepare Alternate ID (if needed)", desc: "If EPIC is unavailable, prepare one of: Aadhaar, Passport, PAN, Driving Licence, MNREGA Job Card, Bank Passbook with photo." },
  { id: 5, category: "Knowledge", emoji: "📰", title: "Research Your Candidates", desc: "Check candidates' declared assets and criminal records on affidavit.eci.gov.in", link: "https://affidavit.eci.gov.in" },
  { id: 6, category: "Knowledge", emoji: "🗳️", title: "Understand the EVM", desc: "Know how to use an Electronic Voting Machine. Press the button next to your chosen candidate." },
  { id: 7, category: "Knowledge", emoji: "✅", title: "Learn About NOTA", desc: "If you don't support any candidate, you can choose NOTA (None of the Above) — the last option on the EVM." },
  { id: 8, category: "Day-of", emoji: "⏰", title: "Plan Your Voting Time", desc: "Polls are typically open 7 AM – 6 PM. Avoid peak hours (9–11 AM). You cannot be turned away if you arrive before closing time." },
  { id: 9, category: "Day-of", emoji: "🧾", title: "Pick Up Your Voter Slip", desc: "Collect the voter slip (Parchi) from your party's booth agent or download it from the voter helpline app." },
  { id: 10, category: "Day-of", emoji: "👁️", title: "Know Your Rights at the Booth", desc: "You have the right to a secret ballot. No one can watch you vote or pressurize you. Report intimidation at 1950." },
  { id: 11, category: "Day-of", emoji: "♿", title: "Check Accessibility Options", desc: "Wheelchair access, assisted voting, and Braille EVMs are available at all booths. Contact your ERO for help." },
  { id: 12, category: "After", emoji: "📣", title: "Follow Results Responsibly", desc: "Follow results from official ECI sources. Don't spread unverified results on social media." },
];

const categories = ["All", "Registration", "Documents", "Knowledge", "Day-of", "After"];

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState("All");

  const toggle = (id: number) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };

  const filtered = activeCategory === "All" ? checklistItems : checklistItems.filter(i => i.category === activeCategory);
  const totalChecked = checklistItems.filter(i => checked.has(i.id)).length;
  const pct = Math.round((totalChecked / checklistItems.length) * 100);

  const readinessLabel = pct === 100 ? "🎉 Fully Ready!" : pct >= 75 ? "👍 Almost Ready" : pct >= 50 ? "📖 Learning..." : pct >= 25 ? "🚀 Getting Started" : "⭕ Not Started";
  const readinessColor = pct === 100 ? "#138808" : pct >= 75 ? "#FF9933" : pct >= 50 ? "#2E5FCC" : "#8BA3CC";

  return (
    <div>
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span className="badge badge-green" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>✅ Voter Readiness</span>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.2rem", marginBottom: "0.75rem" }}>
            Are You Ready to{" "}
            <span style={{ background: "linear-gradient(135deg, #138808, #1aad0a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Vote?
            </span>
          </h1>
          <p style={{ color: "#8BA3CC", marginBottom: "2rem", lineHeight: 1.7 }}>
            Check off each item to track your voter readiness. Your progress is saved in this session.
          </p>

          {/* Progress card */}
          <div style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "16px", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: "#8BA3CC" }}>{totalChecked} of {checklistItems.length} completed</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: readinessColor }}>{pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${readinessColor}, ${readinessColor}88)` }} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: readinessColor }}>{readinessLabel}</div>
              <div style={{ fontSize: "0.75rem", color: "#4A6080" }}>Voter Readiness Score</div>
            </div>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.4rem 1rem", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 600, border: "1px solid",
                  borderColor: activeCategory === cat ? "#FF9933" : "rgba(255,153,51,0.15)",
                  background: activeCategory === cat ? "rgba(255,153,51,0.12)" : "transparent",
                  color: activeCategory === cat ? "#FF9933" : "#8BA3CC",
                  cursor: "pointer", transition: "all 0.2s ease", fontFamily: "Inter, sans-serif",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map(item => {
              const done = checked.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`checklist-item ${done ? "done" : ""}`}
                >
                  <div style={{ width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${done ? "#138808" : "rgba(255,153,51,0.3)"}`, background: done ? "#138808" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease", fontSize: "0.8rem" }}>
                    {done && "✓"}
                  </div>
                  <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: done ? "#8BA3CC" : "#F0F4FF", textDecoration: done ? "line-through" : "none", marginBottom: "0.25rem" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#4A6080", lineHeight: 1.5 }}>{item.desc}</div>
                    {item.link && !done && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "0.75rem", color: "#FF9933", textDecoration: "none", marginTop: "0.25rem", display: "inline-block" }}>
                        Open official site →
                      </a>
                    )}
                  </div>
                  <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "50px", background: "rgba(255,153,51,0.08)", color: "#FF9933", border: "1px solid rgba(255,153,51,0.15)", flexShrink: 0 }}>
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem", color: "#4A6080", fontSize: "0.8rem" }}>
            Have questions about any item?{" "}
            <a href="/chat" style={{ color: "#FF9933", textDecoration: "none" }}>Ask ElectBot →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
