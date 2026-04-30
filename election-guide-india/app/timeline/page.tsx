import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indian Election Timeline | Election Guide India",
  description: "Visualize the complete Indian election timeline from announcement to swearing-in.",
};

const timelineEvents = [
  {
    emoji: "📢", title: "Election Announcement", phase: "Phase 0",
    description: "The ECI announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately — restricting ruling parties from making new policy announcements.",
    details: ["ECI announces date, phases, and schedule", "Model Code of Conduct takes effect instantly", "No new government schemes allowed", "Election observers are deployed"],
    color: "#FF9933", bg: "rgba(255,153,51,0.08)", border: "rgba(255,153,51,0.25)",
  },
  {
    emoji: "📋", title: "Nomination Period", phase: "Phase 1",
    description: "Candidates file nomination papers with the Returning Officer. Each must submit Form 2B with a security deposit and declare criminal records, assets, and liabilities.",
    details: ["File Form 2B with Returning Officer", "Security deposit: ₹25,000 (General), ₹12,500 (SC/ST)", "Declare criminal record, assets (Form 26)", "Open for 7–10 days"],
    color: "#2E5FCC", bg: "rgba(46,95,204,0.08)", border: "rgba(46,95,204,0.25)",
  },
  {
    emoji: "🔍", title: "Scrutiny & Withdrawal", phase: "Phase 2–3",
    description: "The Returning Officer checks all nominations for eligibility. Candidates can then withdraw within 2 days. The final candidate list with party symbols is published.",
    details: ["Returning Officer validates all papers", "Invalid nominations rejected", "2-day window to withdraw candidature", "Party symbols allotted; final list published"],
    color: "#9B59B6", bg: "rgba(155,89,182,0.08)", border: "rgba(155,89,182,0.25)",
  },
  {
    emoji: "📣", title: "Campaign Period", phase: "Phase 4",
    description: "Candidates and parties campaign via rallies, ads, and door-to-door visits. ECI monitors expenditure. Campaigning ends 48 hours before polling (Silence Period).",
    details: ["Rallies, advertisements, roadshows", "Spending limit: ₹95 lakh per Lok Sabha candidate", "ECI monitors Model Code of Conduct", "Silence period 48 hours before polling"],
    color: "#F39C12", bg: "rgba(243,156,18,0.08)", border: "rgba(243,156,18,0.25)",
  },
  {
    emoji: "🗳️", title: "Polling Day", phase: "Phase 5",
    description: "Voters cast votes on EVMs. Polls typically run 7 AM–6 PM. Each vote is verified via VVPAT slip visible for 7 seconds. EVMs are sealed and stored securely.",
    details: ["Polling stations open 7 AM – 6 PM", "Identity verified with EPIC or 11 alternatives", "Vote on EVM; VVPAT slip shown for 7 seconds", "EVMs sealed after polling"],
    color: "#138808", bg: "rgba(19,136,8,0.08)", border: "rgba(19,136,8,0.25)",
  },
  {
    emoji: "🔢", title: "Counting Day", phase: "Phase 6",
    description: "Postal ballots counted first from 8 AM. EVMs are randomly mixed before counting in the presence of candidates' agents. Returning Officer declares the winner.",
    details: ["Postal ballots counted first", "EVMs randomized before counting", "Counting done constituency-wise", "Winner declared and gets Election Certificate"],
    color: "#2980B9", bg: "rgba(41,128,185,0.08)", border: "rgba(41,128,185,0.25)",
  },
  {
    emoji: "🎖️", title: "Government Formation", phase: "Phase 7",
    description: "President invites the majority party/coalition leader to form the government. The Prime Minister is sworn in by the President at Rashtrapati Bhavan.",
    details: ["President invites majority party leader", "Floor test may be required", "PM and Cabinet sworn in by President", "New Parliament session called"],
    color: "#FF9933", bg: "rgba(255,153,51,0.08)", border: "rgba(255,153,51,0.25)",
  },
];

export default function TimelinePage() {
  return (
    <div>
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span className="badge badge-saffron" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>📅 Complete Timeline</span>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.2rem", marginBottom: "0.75rem" }}>
            Indian Election{" "}
            <span style={{ background: "linear-gradient(135deg, #FF9933, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Timeline
            </span>
          </h1>
          <p style={{ color: "#8BA3CC", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            From election announcement to government formation — every phase of India&apos;s democratic process, explained clearly.
          </p>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "22px", top: "50px", bottom: "50px", width: "2px", background: "linear-gradient(180deg, #FF9933, #2E5FCC, #138808)", opacity: 0.25 }} />
            {timelineEvents.map((event, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", position: "relative" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: event.bg, border: `2px solid ${event.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0, zIndex: 1, boxShadow: `0 0 16px ${event.color}22` }}>
                  {event.emoji}
                </div>
                <div style={{ flex: 1, background: "rgba(10,22,40,0.7)", border: `1px solid ${event.border}`, borderRadius: "16px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "50px", background: event.bg, color: event.color, border: `1px solid ${event.border}` }}>{event.phase}</span>
                    <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#F0F4FF" }}>{event.title}</h2>
                  </div>
                  <p style={{ color: "#8BA3CC", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>{event.description}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {event.details.map((d, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#8BA3CC" }}>
                        <span style={{ color: event.color }}>▸</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "1.5rem", background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "16px", marginTop: "1rem" }}>
            <p style={{ color: "#8BA3CC", fontSize: "0.85rem" }}>
              For official schedules visit{" "}
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF9933", textDecoration: "none" }}>eci.gov.in</a>
              {" "}| Have questions?{" "}
              <a href="/chat" style={{ color: "#FF9933", textDecoration: "none" }}>Ask ElectBot →</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
