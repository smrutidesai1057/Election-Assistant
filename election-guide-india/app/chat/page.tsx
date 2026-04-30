"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "How do I register to vote in India?",
  "What is an EVM and VVPAT?",
  "What is NOTA?",
  "What documents do I need to vote?",
  "How is the winning candidate declared?",
  "What is the Model Code of Conduct?",
  "What are my rights as a voter?",
];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "0.35rem", alignItems: "center", padding: "0.75rem 1rem" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#FF9933",
            opacity: 0.6,
            animation: `typing 1.2s ${i * 0.2}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.6; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  return (
    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
      {content}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "🙏 Namaste! I'm ElectBot — your AI guide to Indian elections and democracy.\n\nI can help you with:\n1️⃣ Voter Registration (Form 6 / EPIC)\n2️⃣ Understanding EVMs and ballots\n3️⃣ Election timelines and key dates\n4️⃣ What happens on polling day\n5️⃣ How votes are counted\n6️⃣ Forming the government after results\n7️⃣ Your rights as a voter\n\nWhat would you like to know today? Just type your question below, or pick a quick prompt! 👇",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "Sorry, I couldn't get a response. Please check your API key configuration.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Connection error. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "2rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF9933, #E6801A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 0 20px rgba(255,153,51,0.3)",
              }}
            >
              🤖
            </div>
            <div>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#F0F4FF" }}>
                ElectBot
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#138808", boxShadow: "0 0 6px #138808", display: "inline-block" }} />
                <span style={{ fontSize: "0.75rem", color: "#8BA3CC" }}>AI Election Guide · Powered by Gemini</span>
              </div>
            </div>
          </div>
          <p style={{ color: "#4A6080", fontSize: "0.8rem" }}>
            ⚡ Add your <code style={{ background: "rgba(255,153,51,0.1)", padding: "0.1rem 0.3rem", borderRadius: "4px", color: "#FF9933" }}>GEMINI_API_KEY</code> in <code style={{ background: "rgba(255,153,51,0.1)", padding: "0.1rem 0.3rem", borderRadius: "4px", color: "#FF9933" }}>.env</code> to activate live AI responses.
          </p>
        </div>

        {/* Quick prompts */}
        <div style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={loading}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: "50px",
                background: "rgba(255, 153, 51, 0.08)",
                border: "1px solid rgba(255, 153, 51, 0.2)",
                color: "#FF9933",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div
          style={{
            flex: 1,
            background: "rgba(10, 22, 40, 0.7)",
            border: "1px solid rgba(255, 153, 51, 0.12)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: "450px",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF9933, #E6801A)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}
                >
                  <MessageContent content={msg.content} />
                </div>
                {msg.role === "user" && (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(11, 42, 107, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                      border: "1px solid rgba(255,153,51,0.2)",
                    }}
                  >
                    👤
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF9933, #E6801A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  🤖
                </div>
                <div className="chat-bubble-bot">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid rgba(255, 153, 51, 0.1)",
              background: "rgba(10, 22, 40, 0.5)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ElectBot anything about Indian elections..."
                className="input-field"
                disabled={loading}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "12px",
                  background:
                    loading || !input.trim()
                      ? "rgba(255,153,51,0.3)"
                      : "linear-gradient(135deg, #FF9933, #E6801A)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "1rem",
                }}
              >
                {loading ? "..." : "➤"}
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: "center", color: "#4A6080", fontSize: "0.72rem", marginTop: "0.75rem" }}>
          ElectBot is strictly neutral and does not endorse any party or candidate. For official information, visit{" "}
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF9933", textDecoration: "none" }}>
            voters.eci.gov.in
          </a>{" "}
          or call 1950.
        </p>
      </div>
    </div>
  );
}
