import { NextResponse } from "next/server";
import { ELECTBOT_SYSTEM_PROMPT } from "@/lib/electbot-prompt";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;
    
    // 1. CALL OUR KNOWLEDGE API
    const baseUrl = new URL(req.url).origin;
    const infoRes = await fetch(`${baseUrl}/api/info?q=${encodeURIComponent(lastUserMessage)}`);
    const infoData = await infoRes.json();

    // 2. CONSTRUCT DATA-DRIVEN RESPONSE
    let parts: string[] = [];
    
    if (infoData.faqs && infoData.faqs.length > 0) {
      infoData.faqs.slice(0, 2).forEach((f: any) => {
        parts.push(`❓ **${f.q}**\n${f.a}`);
      });
    }

    if (infoData.states && infoData.states.length > 0) {
      const s = infoData.states[0];
      parts.push(`📍 **State Info: ${s.name}**\n- Type: ${s.type}\n- Lok Sabha Seats: ${s.seats}\n- Next Assembly Election: ${s.next_election}`);
    } 
    
    if (infoData.constitutional && infoData.constitutional.length > 0) {
      const c = infoData.constitutional[0];
      parts.push(`⚖️ **Constitution: Article ${c.article}**\n**${c.title}**: ${c.detail}`);
    }

    if (infoData.forms && infoData.forms.length > 0) {
      const f = infoData.forms[0];
      parts.push(`📝 **Voter Form: ${f.id}**\nPurpose: ${f.purpose}\n\nApply at: voterportal.eci.gov.in`);
    }

    if (infoData.history && infoData.history.length > 0) {
      const h = infoData.history[0];
      parts.push(`📜 **History (${h.year})**\n**${h.event}**: ${h.detail}`);
    }

    if (infoData.terminology && infoData.terminology.length > 0) {
      const t = infoData.terminology[0];
      parts.push(`📖 **Term: ${t.term}**\n${t.definition}`);
    }

    let reply = parts.length > 0 
      ? parts.join("\n\n---\n\n") 
      : `🙏 Namaste! I'm ElectBot India. I have access to a live database of constitutional articles, election forms, state data, and history.\n\nTry asking me about:\n- "How to register?" (Form 6)\n- "What is Article 324?"\n- "Election history of 1947"`;

    // 3. TRY LIVE API (Optional enrichment)
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.length > 20) {
      try {
        const history: Message[] = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { 
                parts: [{ text: `${ELECTBOT_SYSTEM_PROMPT}\n\nUSE THIS CONTEXT DATA IF RELEVANT: ${JSON.stringify(infoData)}` }] 
              },
              contents: [...history, { role: "user", parts: [{ text: lastUserMessage }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) return NextResponse.json({ reply: aiReply });
        }
      } catch (err) {
        console.error("Live API failed, using internal API reply:", err);
      }
    }

    // Return the data-driven reply from our internal API
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
