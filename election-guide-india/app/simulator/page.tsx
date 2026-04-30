"use client";
import { useState } from "react";
import Link from "next/link";

const ROLES = [
  { id: "voter", emoji: "🗳️", title: "First-Time Voter", desc: "Experience the complete voting journey for the first time — from registration to casting your vote." },
  { id: "candidate", emoji: "📋", title: "Candidate", desc: "Go through nomination, campaigning, and election night as a first-time political candidate." },
  { id: "officer", emoji: "⚖️", title: "Presiding Officer", desc: "Manage a polling booth — set up EVMs, verify voters, handle challenges, and seal the machines." },
];

type Role = "voter" | "candidate" | "officer";

interface Step {
  title: string;
  scenario: string;
  choices: { text: string; outcome: string; points: number }[];
}

const STEPS: Record<Role, Step[]> = {
  voter: [
    {
      title: "Step 1: Registration",
      scenario: "You just turned 18! You want to vote in the upcoming Lok Sabha election. What do you do first?",
      choices: [
        { text: "Visit voters.eci.gov.in and fill Form 6", outcome: "✅ Correct! You've successfully submitted your voter registration. Your EPIC will be processed within a few weeks.", points: 20 },
        { text: "Go to the polling station on election day and ask to be added", outcome: "❌ You cannot register at the booth on polling day. Registration must be done in advance via Form 6.", points: 0 },
        { text: "Wait for someone to register you automatically", outcome: "❌ Voter registration in India is not automatic. You must proactively apply using Form 6.", points: 0 },
      ],
    },
    {
      title: "Step 2: Preparing for Polling Day",
      scenario: "Election day is tomorrow! Your EPIC card is at home but your friend says you don't need it. What do you do?",
      choices: [
        { text: "Bring your EPIC card as primary ID", outcome: "✅ Excellent! EPIC (Voter ID) is the primary document for voting. Always carry it on polling day.", points: 20 },
        { text: "Go without any ID — your name is on the roll", outcome: "❌ You need a valid photo ID even if your name is on the electoral roll. Without ID, you may not be allowed to vote.", points: 0 },
        { text: "Bring your Aadhaar card as an alternative", outcome: "🟡 Acceptable! Aadhaar is one of 11 alternative documents accepted if you don't have your EPIC. But always try to bring EPIC first.", points: 10 },
      ],
    },
    {
      title: "Step 3: At the Polling Station",
      scenario: "You arrive at your polling booth. An unknown person offers to show you how to vote and come with you into the booth. What do you do?",
      choices: [
        { text: "Refuse firmly — the ballot is secret and private", outcome: "✅ Perfect! The secret ballot is your constitutional right. No one can accompany you into the voting booth or see your vote.", points: 20 },
        { text: "Accept their help — you're not sure how to use the EVM", outcome: "❌ This is voter intimidation. Report it to the Presiding Officer or call 1950. Only a companion of YOUR choice can help if you have a disability.", points: 0 },
        { text: "Ask the Presiding Officer for help instead", outcome: "✅ Correct! If you need assistance with the EVM, the Presiding Officer can explain. You can also ask for a companion if you have a physical disability.", points: 20 },
      ],
    },
    {
      title: "Step 4: Casting Your Vote",
      scenario: "You're in the voting booth with the EVM in front of you. You accidentally press the wrong button. What happens?",
      choices: [
        { text: "The vote is cast immediately — you cannot change it", outcome: "🟡 Partially correct. Once you press a button on the EVM, the vote is recorded immediately and cannot be changed. Be careful and deliberate.", points: 10 },
        { text: "Ask the Presiding Officer for a tendered ballot", outcome: "✅ If you genuinely made an error before the confirmation button (in some EVM models), inform the Presiding Officer. In standard Ballot Units, the vote is final once the button is pressed.", points: 20 },
        { text: "Press the button again to cancel your vote", outcome: "❌ You cannot cancel or re-vote on an EVM. Once pressed, the vote is recorded permanently.", points: 0 },
      ],
    },
    {
      title: "Step 5: After Voting",
      scenario: "You voted! Your friend calls and says exit polls show a particular party is winning and asks you to share who you voted for. What do you do?",
      choices: [
        { text: "Decline to share — your vote is a private matter", outcome: "✅ Excellent! The secret ballot is fundamental to democracy. You are never obligated to tell anyone — including family — how you voted.", points: 20 },
        { text: "Share freely — you're proud of your choice!", outcome: "🟡 That's your right! But remember you can always choose to keep it private. The secret ballot protects you from pressure or retaliation.", points: 10 },
        { text: "Share on social media to encourage others to vote similarly", outcome: "❌ Be careful! If the silence period is still active, sharing partisan content could violate the Model Code of Conduct. Also, encouraging specific choices could be coercion.", points: 0 },
      ],
    },
  ],
  candidate: [
    {
      title: "Step 1: Deciding to Run",
      scenario: "You want to contest the Lok Sabha election. What is your FIRST mandatory step?",
      choices: [
        { text: "File nomination papers (Form 2B) with the Returning Officer", outcome: "✅ Correct! The first formal step is filing your nomination with Form 2B, along with your affidavit (Form 26) declaring assets, liabilities, and criminal record.", points: 20 },
        { text: "Start a campaign rally immediately", outcome: "❌ Campaigning before filing nomination is premature and may violate the Model Code of Conduct. File nomination first!", points: 0 },
        { text: "Get party approval only — nothing else needed yet", outcome: "❌ Party approval alone is insufficient. You must formally file nomination papers regardless of party endorsement.", points: 0 },
      ],
    },
    {
      title: "Step 2: Filing Your Affidavit",
      scenario: "You have a minor criminal case pending from 5 years ago. Must you declare it in Form 26?",
      choices: [
        { text: "Yes — all pending criminal cases must be declared", outcome: "✅ Correct! The Supreme Court mandates full disclosure of all pending criminal cases in Form 26. Concealing them can lead to disqualification and legal action.", points: 20 },
        { text: "No — only convictions need to be declared, not pending cases", outcome: "❌ Wrong. Even pending cases must be declared. Voters have a right to know about their candidates' legal status.", points: 0 },
        { text: "Only if the case is related to election offences", outcome: "❌ All pending cases must be declared, not just election-related ones.", points: 0 },
      ],
    },
    {
      title: "Step 3: Campaigning",
      scenario: "Your rival candidate is spreading false information about you. What is the proper response?",
      choices: [
        { text: "File a complaint with the Election Commission on the helpline", outcome: "✅ Excellent! Report MCC violations to the ECI. You can also use the cVIGIL app. Avoid responding with false claims yourself.", points: 20 },
        { text: "Spread counter-information about your rival", outcome: "❌ Two wrongs don't make a right. Counter-campaigning with false information violates the MCC and could get your candidature cancelled.", points: 0 },
        { text: "Hold a press conference and ignore the complaint process", outcome: "🟡 You can hold a press conference to clarify facts, but also formally report the violation to the ECI for an official record.", points: 10 },
      ],
    },
    {
      title: "Step 4: Election Night",
      scenario: "Counting begins and your rival is leading by a small margin. What is your legal option?",
      choices: [
        { text: "Request a recount by filing an application to the Returning Officer", outcome: "✅ Correct! You can request a recount if the margin is very small. The Returning Officer has discretion to order a recount.", points: 20 },
        { text: "Declare victory anyway and rally supporters", outcome: "❌ Declaring victory before the official announcement is irresponsible and can incite unrest. Wait for the official result.", points: 0 },
        { text: "File an Election Petition in the High Court immediately", outcome: "🟡 An Election Petition can be filed in the High Court within 45 days of the result — but only after the official result is declared, not during counting.", points: 10 },
      ],
    },
  ],
  officer: [
    {
      title: "Step 1: Setting Up the Booth",
      scenario: "You arrive at your polling booth at 5:30 AM. What must you do before polls open at 7 AM?",
      choices: [
        { text: "Conduct a mock poll and seal the EVM with agents present", outcome: "✅ Correct! A mock poll of at least 50 votes must be conducted in front of polling agents before polls open. Then the EVM data is cleared and the machine is prepared for actual voting.", points: 20 },
        { text: "Just switch on the EVM and wait for voters to arrive", outcome: "❌ You must conduct a mandatory mock poll, show the result to agents (confirming 0 votes), clear data, and seal the machine before opening.", points: 0 },
        { text: "Wait for the District Collector's permission before setting up", outcome: "❌ Setup is done according to schedule. You don't need special permission on polling day — follow the ECI's Standard Operating Procedure.", points: 0 },
      ],
    },
    {
      title: "Step 2: Handling Voter Challenges",
      scenario: "A polling agent challenges a voter, claiming they are not who they say they are. What do you do?",
      choices: [
        { text: "Ask the challenged voter to fill Form 14 and verify identity carefully", outcome: "✅ Correct! The challenger must deposit ₹2 to challenge a voter. The voter fills Form 14 and you verify identity carefully. If the challenge is upheld, the voter cannot vote.", points: 20 },
        { text: "Immediately refuse to let the voter vote", outcome: "❌ You cannot refuse without following due process. The challenged voter has the right to defend their identity using Form 14.", points: 0 },
        { text: "Ignore the challenge and let the voter proceed", outcome: "❌ You must formally record and adjudicate the challenge. Ignoring it undermines the election process.", points: 0 },
      ],
    },
    {
      title: "Step 3: Closing the Polls",
      scenario: "It is 6 PM — closing time. There is still a long queue of voters outside. What is the correct action?",
      choices: [
        { text: "Issue numbered tokens to all voters in queue and let them all vote", outcome: "✅ Correct! All voters who are in line BEFORE closing time must be allowed to vote. Issue tokens so everyone knows their position.", points: 20 },
        { text: "Close the booth exactly at 6 PM — no exceptions", outcome: "❌ This is illegal. All voters present in the queue at closing time have the legal right to vote, regardless of how long it takes.", points: 0 },
        { text: "Let only 10 more voters in and close after that", outcome: "❌ You cannot arbitrarily limit remaining voters. Everyone in the queue at closing time must be accommodated.", points: 0 },
      ],
    },
    {
      title: "Step 4: Sealing & Handing Over EVMs",
      scenario: "After all voters have voted, what is the correct procedure for EVMs?",
      choices: [
        { text: "Press the Close button, seal the EVM, get agents to sign, and hand over to collection team", outcome: "✅ Perfect! Press Close on the Ballot Unit to prevent further voting, seal it with special tags, get signatures of polling agents on the seal, and hand to the designated team.", points: 20 },
        { text: "Switch off the EVM and transport it yourself to the counting centre", outcome: "❌ You must follow the proper chain of custody. EVMs are sealed, signed by agents, and handed to an authorised escort team — not carried individually.", points: 0 },
        { text: "Leave the EVM at the booth overnight for pickup", outcome: "❌ EVMs must be secured and handed over immediately under proper escort. Leaving them unguarded is a serious violation.", points: 0 },
      ],
    },
  ],
};

export default function SimulatorPage() {
  const [phase, setPhase] = useState<"intro" | "role" | "game" | "done">("intro");
  const [role, setRole] = useState<Role | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showOutcome, setShowOutcome] = useState(false);

  const steps = role ? STEPS[role] : [];
  const currentStep = steps[stepIndex];
  const maxScore = steps.length * 20;
  const pct = role ? Math.round((totalScore / maxScore) * 100) : 0;

  const handleSelect = (i: number) => {
    if (showOutcome) return;
    setSelected(i);
    setTotalScore(t => t + currentStep.choices[i].points);
    setShowOutcome(true);
  };

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(s => s + 1);
      setSelected(null);
      setShowOutcome(false);
    } else {
      setPhase("done");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setRole(null);
    setStepIndex(0);
    setSelected(null);
    setTotalScore(0);
    setShowOutcome(false);
  };

  if (phase === "intro") {
    return (
      <div style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span className="badge badge-saffron" style={{ marginBottom: "1rem", display: "inline-flex" }}>🎮 Interactive Simulation</span>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.2rem", marginBottom: "1rem" }}>
            Mock Election{" "}
            <span style={{ background: "linear-gradient(135deg, #E74C3C, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Simulator
            </span>
          </h1>
          <p style={{ color: "#8BA3CC", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Experience the Indian election process from different perspectives. Make real decisions and learn from the outcomes. Choose your role to begin!
          </p>
          <button onClick={() => setPhase("role")} className="btn-primary" style={{ fontSize: "1rem" }}>
            🚀 Start Simulation
          </button>
        </div>
      </div>
    );
  }

  if (phase === "role") {
    return (
      <div style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.8rem", marginBottom: "0.5rem", textAlign: "center" }}>
            Choose Your Role
          </h2>
          <p style={{ color: "#8BA3CC", textAlign: "center", marginBottom: "2rem" }}>Each role gives you a different perspective on Indian democracy.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => { setRole(r.id as Role); setPhase("game"); }}
                style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "16px", padding: "1.75rem 1.25rem", cursor: "pointer", transition: "all 0.2s ease", textAlign: "center", fontFamily: "Inter, sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,153,51,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,153,51,0.15)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{r.emoji}</div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F0F4FF", marginBottom: "0.5rem" }}>{r.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#8BA3CC", lineHeight: 1.5 }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const grade = pct === 100 ? "🏆 Perfect!" : pct >= 75 ? "🎖️ Excellent!" : pct >= 50 ? "📚 Good Job" : "📖 Keep Learning";
    const gradeColor = pct >= 75 ? "#FF9933" : pct >= 50 ? "#138808" : "#8BA3CC";
    const roleLabel = ROLES.find(r => r.id === role)?.title || "";
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{pct >= 75 ? "🏆" : pct >= 50 ? "🎓" : "📖"}</div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>Simulation Complete!</h2>
          <div style={{ fontSize: "0.9rem", color: "#8BA3CC", marginBottom: "1rem" }}>Role: <strong style={{ color: "#FF9933" }}>{roleLabel}</strong></div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "3rem", color: gradeColor }}>{totalScore}/{maxScore}</div>
          <div style={{ fontSize: "1.2rem", color: gradeColor, fontWeight: 600, marginBottom: "0.5rem" }}>{grade}</div>
          <div className="progress-bar" style={{ maxWidth: "360px", margin: "1rem auto 2rem", height: "10px" }}>
            <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${gradeColor}, ${gradeColor}88)` }} />
          </div>
          <p style={{ color: "#8BA3CC", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            {pct >= 75 ? "You have a strong understanding of the Indian election process! You're ready to participate confidently in democracy." : "Good effort! Review the areas you missed and try again. Every step toward civic knowledge makes our democracy stronger."}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleRestart} className="btn-primary">🔄 Try Again</button>
            <Link href="/chat" className="btn-secondary">🤖 Ask ElectBot</Link>
          </div>
        </div>
      </div>
    );
  }

  // Game phase
  return (
    <div style={{ padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#4A6080", display: "block", marginBottom: "0.25rem" }}>
              Role: <strong style={{ color: "#FF9933" }}>{ROLES.find(r => r.id === role)?.title}</strong>
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: "28px", height: "6px", borderRadius: "3px", background: i < stepIndex ? "#138808" : i === stepIndex ? "#FF9933" : "rgba(255,255,255,0.08)", transition: "all 0.3s ease" }} />
              ))}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", color: "#4A6080" }}>Score</div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#FF9933" }}>{totalScore}</div>
          </div>
        </div>

        {/* Scenario card */}
        <div style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "20px", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#FF9933", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            {currentStep.title}
          </div>
          <p style={{ fontSize: "1rem", color: "#F0F4FF", lineHeight: 1.7, marginBottom: "1.75rem", fontWeight: 500 }}>
            {currentStep.scenario}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {currentStep.choices.map((choice, i) => {
              const isSelected = selected === i;
              const pts = choice.points;
              let borderColor = "rgba(255,153,51,0.15)";
              let bgColor = "rgba(255,255,255,0.03)";
              if (showOutcome && isSelected) {
                borderColor = pts === 20 ? "#138808" : pts === 10 ? "#F39C12" : "#E74C3C";
                bgColor = pts === 20 ? "rgba(19,136,8,0.1)" : pts === 10 ? "rgba(243,156,18,0.08)" : "rgba(231,76,60,0.08)";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showOutcome}
                  style={{
                    padding: "1rem 1.25rem", borderRadius: "12px", border: `2px solid ${borderColor}`,
                    background: bgColor, color: "#F0F4FF", fontSize: "0.9rem",
                    cursor: showOutcome ? "default" : "pointer", textAlign: "left",
                    transition: "all 0.2s ease", fontFamily: "Inter, sans-serif", lineHeight: 1.5,
                  }}
                >
                  {choice.text}
                  {showOutcome && isSelected && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: pts === 20 ? "#1aad0a" : pts === 10 ? "#F39C12" : "#E74C3C" }}>
                      {pts > 0 ? `+${pts} pts` : "0 pts"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Outcome feedback */}
        {showOutcome && selected !== null && (
          <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "14px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", animation: "fadeInUp 0.3s ease" }}>
            <p style={{ color: "#8BA3CC", fontSize: "0.88rem", lineHeight: 1.65 }}>
              {currentStep.choices[selected].outcome}
            </p>
          </div>
        )}

        {showOutcome && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleNext} className="btn-primary">
              {stepIndex < steps.length - 1 ? "Next Scenario →" : "View Results 🏁"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
