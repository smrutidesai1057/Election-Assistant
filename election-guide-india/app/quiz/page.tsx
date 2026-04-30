"use client";
import { useState } from "react";

const questions = [
  {
    q: "What is the minimum age to vote in Indian general elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    answer: 1,
    explanation: "As per Article 326 of the Indian Constitution, every citizen who is 18 years of age or older is entitled to vote.",
  },
  {
    q: "What does EVM stand for?",
    options: ["Electronic Vote Monitor", "Electronic Voting Machine", "Electoral Verification Module", "Election Vote Manager"],
    answer: 1,
    explanation: "EVM stands for Electronic Voting Machine. India replaced paper ballots with EVMs to reduce fraud and speed up counting.",
  },
  {
    q: "What is NOTA?",
    options: ["None of the Above", "National Oath To Abstain", "No Official Ticket Allowed", "New Order of Total Abstinence"],
    answer: 0,
    explanation: "NOTA (None of the Above) allows voters to reject all candidates. It was introduced by the Supreme Court in 2013. However, the candidate with the most votes still wins even if NOTA gets the most votes.",
  },
  {
    q: "Which body conducts general elections in India?",
    options: ["Supreme Court of India", "Ministry of Home Affairs", "Election Commission of India", "Lok Sabha Secretariat"],
    answer: 2,
    explanation: "The Election Commission of India (ECI) is a constitutional body established under Article 324. It is responsible for administering all elections to Parliament and State Legislatures.",
  },
  {
    q: "What is VVPAT?",
    options: ["Voter Verified Paper Audit Trail", "Vote Verification Primary Audit Tool", "Verified Voter Paper Account Tracker", "Virtual Vote Paper Audit Terminal"],
    answer: 0,
    explanation: "VVPAT (Voter Verified Paper Audit Trail) is attached to EVMs. After pressing the EVM button, a paper slip showing your chosen candidate is displayed for 7 seconds, allowing you to verify your vote.",
  },
  {
    q: "What is Form 6 used for in Indian elections?",
    options: ["Filing a complaint against a candidate", "Applying for postal ballot", "Registering as a new voter", "Declaring election expenditure"],
    answer: 2,
    explanation: "Form 6 is used to apply for registration as a new voter in the Electoral Roll. It is submitted online at voters.eci.gov.in or to the Electoral Registration Officer.",
  },
  {
    q: "What is the Model Code of Conduct (MCC)?",
    options: ["A set of laws passed by Parliament", "Guidelines for voters on polling day", "Norms restricting political parties during election period", "Instructions for counting votes"],
    answer: 2,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the ECI that regulates the conduct of political parties and candidates during elections. It comes into force immediately after election dates are announced.",
  },
  {
    q: "Which article of the Indian Constitution guarantees universal adult franchise?",
    options: ["Article 14", "Article 21", "Article 326", "Article 370"],
    answer: 2,
    explanation: "Article 326 of the Constitution provides that elections to the Lok Sabha and State Assemblies shall be on the basis of adult suffrage — every citizen 18 years or older has the right to vote.",
  },
  {
    q: "What voting system does India use for Lok Sabha elections?",
    options: ["Proportional Representation", "First Past the Post (FPTP)", "Ranked Choice Voting", "Two-Round System"],
    answer: 1,
    explanation: "India uses the First Past the Post (FPTP) system — also called plurality voting. The candidate who gets the most votes in a constituency wins, even if it's not an absolute majority.",
  },
  {
    q: "What is the Voter Helpline number in India?",
    options: ["100", "112", "1800", "1950"],
    answer: 3,
    explanation: "1950 is the national Voter Helpline number. You can call it to check voter registration status, find your polling booth, report violations, or ask election-related questions.",
  },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [quizDone, setQuizDone] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q.answer;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const newAnswers = [...answers];
    newAnswers[currentQ] = i;
    setAnswers(newAnswers);
    if (i === q.answer) setScore(s => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizDone(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswers(Array(questions.length).fill(null));
    setQuizDone(false);
  };

  const pct = Math.round((score / questions.length) * 100);
  const grade = pct === 100 ? "🏆 Perfect Score!" : pct >= 80 ? "🎖️ Election Expert!" : pct >= 60 ? "📚 Good Knowledge" : pct >= 40 ? "📖 Keep Learning" : "🌱 Just Getting Started";
  const gradeColor = pct >= 80 ? "#FF9933" : pct >= 60 ? "#138808" : pct >= 40 ? "#2E5FCC" : "#8BA3CC";

  if (quizDone) {
    return (
      <div style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
            {pct === 100 ? "🏆" : pct >= 80 ? "🎖️" : pct >= 60 ? "🎓" : "📖"}
          </div>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>Quiz Complete!</h1>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "3rem", color: gradeColor, margin: "0.5rem 0" }}>
            {score}/{questions.length}
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 600, color: gradeColor, marginBottom: "0.5rem" }}>{grade}</div>
          <div className="progress-bar" style={{ maxWidth: "400px", margin: "1rem auto 2rem", height: "10px" }}>
            <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${gradeColor}, ${gradeColor}88)` }} />
          </div>

          {/* Answer review */}
          <div style={{ textAlign: "left", marginBottom: "2rem" }}>
            {questions.map((q2, i) => {
              const ans = answers[i];
              const correct = ans === q2.answer;
              return (
                <div key={i} style={{ marginBottom: "0.75rem", padding: "0.75rem 1rem", borderRadius: "10px", background: correct ? "rgba(19,136,8,0.08)" : "rgba(231,76,60,0.08)", border: `1px solid ${correct ? "rgba(19,136,8,0.25)" : "rgba(231,76,60,0.25)"}` }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: correct ? "#1aad0a" : "#E74C3C", marginBottom: "0.2rem" }}>
                    {correct ? "✓ Correct" : "✗ Incorrect"} — Q{i + 1}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#8BA3CC" }}>{q2.q}</div>
                  {!correct && <div style={{ fontSize: "0.78rem", color: "#4A6080", marginTop: "0.2rem" }}>Correct: {q2.options[q2.answer]}</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleRestart} className="btn-primary">🔄 Try Again</button>
            <a href="/chat" className="btn-secondary">🤖 Learn More with ElectBot</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <span className="badge badge-saffron" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>🧠 Election Quiz</span>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>
          Test Your Election{" "}
          <span style={{ background: "linear-gradient(135deg, #F39C12, #FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Knowledge</span>
        </h1>
        <p style={{ color: "#8BA3CC", marginBottom: "2rem", fontSize: "0.9rem" }}>
          {questions.length} questions · Indian elections · Instant explanations
        </p>

        {/* Progress */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#8BA3CC" }}>Question {currentQ + 1} of {questions.length}</span>
            <span style={{ fontSize: "0.8rem", color: "#FF9933", fontWeight: 600 }}>Score: {score}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(255,153,51,0.15)", borderRadius: "20px", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#FF9933", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            QUESTION {currentQ + 1}
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.5, marginBottom: "1.75rem", color: "#F0F4FF" }}>
            {q.q}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {q.options.map((opt, i) => {
              let borderColor = "rgba(255,153,51,0.15)";
              let bgColor = "rgba(255,255,255,0.03)";
              let color = "#F0F4FF";
              if (showResult) {
                if (i === q.answer) { borderColor = "#138808"; bgColor = "rgba(19,136,8,0.12)"; color = "#1aad0a"; }
                else if (i === selected && selected !== q.answer) { borderColor = "#E74C3C"; bgColor = "rgba(231,76,60,0.1)"; color = "#E74C3C"; }
                else { color = "#4A6080"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  style={{
                    padding: "1rem 1.25rem", borderRadius: "12px", border: `2px solid ${borderColor}`,
                    background: bgColor, color, fontSize: "0.9rem", cursor: showResult ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.2s ease", fontFamily: "Inter, sans-serif",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                  }}
                >
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {opt}
                  {showResult && i === q.answer && <span style={{ marginLeft: "auto" }}>✓</span>}
                  {showResult && i === selected && selected !== q.answer && <span style={{ marginLeft: "auto" }}>✗</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div style={{ background: isCorrect ? "rgba(19,136,8,0.08)" : "rgba(231,76,60,0.06)", border: `1px solid ${isCorrect ? "rgba(19,136,8,0.25)" : "rgba(231,76,60,0.2)"}`, borderRadius: "14px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", animation: "fadeInUp 0.3s ease" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: isCorrect ? "#1aad0a" : "#E74C3C", marginBottom: "0.5rem" }}>
              {isCorrect ? "✅ Correct!" : "❌ Not quite!"} — Here&apos;s why:
            </div>
            <p style={{ color: "#8BA3CC", fontSize: "0.85rem", lineHeight: 1.65 }}>{q.explanation}</p>
          </div>
        )}

        {showResult && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleNext} className="btn-primary">
              {currentQ < questions.length - 1 ? "Next Question →" : "See Results 🏁"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
