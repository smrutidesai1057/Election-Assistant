"use client";
import { useState } from "react";

const stateAlerts: Record<string, { type: string; emoji: string; title: string; text: string; date: string }[]> = {
  "Uttar Pradesh": [
    { type: "URGENT", emoji: "🔴", title: "Voter List Revision Ongoing", text: "The Electoral Roll revision is currently active. Last date to add/correct your name is 15 May 2026. Visit voters.eci.gov.in immediately.", date: "Apr 29, 2026" },
    { type: "INFO", emoji: "🔵", title: "New Polling Booths Added", text: "50 new polling booths have been added across Lucknow district to reduce queue time. Check your new booth assignment.", date: "Apr 25, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Download e-EPIC Now", text: "Physical Voter ID? Download your digital e-EPIC from voters.eci.gov.in for faster booth entry.", date: "Apr 20, 2026" },
  ],
  "Maharashtra": [
    { type: "URGENT", emoji: "🔴", title: "Form 6 Deadline Approaching", text: "First-time voter? Submit Form 6 online before 30 April 2026 to be included in the updated electoral roll.", date: "Apr 28, 2026" },
    { type: "INFO", emoji: "🔵", title: "Special Camps for Senior Citizens", text: "BLOs (Booth Level Officers) will visit senior citizen residences in Mumbai and Pune to assist with registration.", date: "Apr 22, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Check Your Booth Address", text: "Multiple booths have been relocated in Pune West constituency. Verify your booth on the Voter Helpline App.", date: "Apr 18, 2026" },
  ],
  "Tamil Nadu": [
    { type: "INFO", emoji: "🔵", title: "Special Summary Revision", text: "Special summary revision underway. Voters who turned 18 after Jan 1 may now apply under new qualifying dates.", date: "Apr 26, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Voter Awareness Campaign", text: "ECI's SVEEP campaign conducting voter awareness drives at colleges across Chennai, Coimbatore, and Madurai.", date: "Apr 21, 2026" },
  ],
  "West Bengal": [
    { type: "URGENT", emoji: "🔴", title: "Address Update Required", text: "Voters who relocated since the last election must update their address (Form 8A) before 10 May 2026.", date: "Apr 27, 2026" },
    { type: "INFO", emoji: "🔵", title: "Postal Ballot Available for Seniors", text: "Voters aged 85+ and differently-abled voters can apply for postal ballots. Contact your Returning Officer.", date: "Apr 23, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Model Code of Conduct Active", text: "The MCC is currently in effect in West Bengal. Report violations at 1950 or cVIGIL app.", date: "Apr 15, 2026" },
  ],
  "Rajasthan": [
    { type: "INFO", emoji: "🔵", title: "BLO Camp Dates Announced", text: "BLO special camps will be held every Sunday in April–May across all 200 assembly constituencies.", date: "Apr 24, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Register on cVIGIL", text: "Download the cVIGIL app to report election violations — cash distribution, illegal banners, or voter intimidation.", date: "Apr 19, 2026" },
  ],
  "Karnataka": [
    { type: "URGENT", emoji: "🔴", title: "Overseas Voter Registration", text: "Indian citizens abroad can register as overseas voters using Form 6A. Deadline is May 1, 2026.", date: "Apr 26, 2026" },
    { type: "INFO", emoji: "🔵", title: "Youth Voter Drive", text: "ECI and Karnataka CEOs partnering with colleges to ensure all 18–19 year olds are registered before the next election.", date: "Apr 22, 2026" },
  ],
  "Delhi": [
    { type: "URGENT", emoji: "🔴", title: "Electoral Roll Final Publication", text: "Final electoral rolls published for all 70 Assembly constituencies. Verify your name at ceodelhi.gov.in", date: "Apr 28, 2026" },
    { type: "INFO", emoji: "🔵", title: "e-EPIC Week", text: "Delhi CEO is conducting e-EPIC distribution camps at all district offices this week.", date: "Apr 24, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Accessibility Facilities Notified", text: "All 13,000+ polling booths in Delhi will have wheelchair ramps, Braille EVMs, and volunteer helpers on polling day.", date: "Apr 20, 2026" },
  ],
  "Bihar": [
    { type: "INFO", emoji: "🔵", title: "New EVM Familiarization Drive", text: "Mock EVMs set up at panchayat offices across Bihar for first-time voters to practice before polling day.", date: "Apr 25, 2026" },
    { type: "REMINDER", emoji: "🟡", title: "Voter Slip Distribution", text: "Voter slips (Parchi) will be distributed by BLOs 48 hours before polling day. Keep your EPIC ready.", date: "Apr 21, 2026" },
  ],
};

const states = Object.keys(stateAlerts).sort();
const typeStyles: Record<string, { bg: string; border: string; color: string; label: string }> = {
  URGENT: { bg: "rgba(231,76,60,0.08)", border: "rgba(231,76,60,0.25)", color: "#E74C3C", label: "URGENT" },
  INFO: { bg: "rgba(46,95,204,0.08)", border: "rgba(46,95,204,0.25)", color: "#6699FF", label: "INFO" },
  REMINDER: { bg: "rgba(243,156,18,0.08)", border: "rgba(243,156,18,0.25)", color: "#F39C12", label: "REMINDER" },
};

export default function AlertsPage() {
  const [selectedState, setSelectedState] = useState("Delhi");

  const alerts = stateAlerts[selectedState] || [];

  return (
    <div>
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>🔔 State-Wise Alerts</span>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.2rem", marginBottom: "0.75rem" }}>
            Election Alerts by{" "}
            <span style={{ background: "linear-gradient(135deg, #2E5FCC, #6699FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              State
            </span>
          </h1>
          <p style={{ color: "#8BA3CC", marginBottom: "2rem", lineHeight: 1.7 }}>
            Select your state to see relevant election notifications, deadlines, and civic alerts.
          </p>

          {/* State selector */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8BA3CC", marginBottom: "0.5rem", fontWeight: 500 }}>
              Select Your State
            </label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              style={{
                background: "rgba(10,22,40,0.8)", border: "1px solid rgba(255,153,51,0.2)", borderRadius: "12px",
                color: "#F0F4FF", padding: "0.75rem 1.25rem", fontSize: "0.95rem", width: "100%", maxWidth: "360px",
                outline: "none", cursor: "pointer", fontFamily: "Inter, sans-serif",
                appearance: "none", WebkitAppearance: "none",
              }}
            >
              {states.map(s => <option key={s} value={s} style={{ background: "#0A1628" }}>{s}</option>)}
            </select>
          </div>

          {/* Alert count summary */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {["URGENT", "INFO", "REMINDER"].map(type => {
              const count = alerts.filter(a => a.type === type).length;
              const s = typeStyles[type];
              return (
                <div key={type} style={{ padding: "0.5rem 1rem", borderRadius: "10px", background: s.bg, border: `1px solid ${s.border}`, display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: s.color }}>{count}</span>
                  <span style={{ fontSize: "0.8rem", color: s.color, fontWeight: 600 }}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Alert cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {alerts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#4A6080", background: "rgba(10,22,40,0.6)", borderRadius: "16px", border: "1px solid rgba(255,153,51,0.08)" }}>
                No alerts available for this state yet.
              </div>
            ) : (
              alerts.map((alert, i) => {
                const s = typeStyles[alert.type];
                return (
                  <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "16px", padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{alert.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: "50px", background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>{s.label}</span>
                          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#F0F4FF" }}>{alert.title}</h3>
                        </div>
                        <p style={{ color: "#8BA3CC", fontSize: "0.85rem", lineHeight: 1.65 }}>{alert.text}</p>
                        <div style={{ marginTop: "0.5rem", fontSize: "0.72rem", color: "#4A6080" }}>📅 {alert.date} · {selectedState}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem", padding: "1.25rem", background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,153,51,0.1)", borderRadius: "14px" }}>
            <p style={{ color: "#8BA3CC", fontSize: "0.83rem" }}>
              For official state election office contacts and notifications, visit{" "}
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF9933", textDecoration: "none" }}>eci.gov.in</a>
              {" "}| Voter Helpline:{" "}
              <strong style={{ color: "#FF9933" }}>1950</strong>
              {" "}| Have questions?{" "}
              <a href="/chat" style={{ color: "#FF9933", textDecoration: "none" }}>Ask ElectBot →</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
