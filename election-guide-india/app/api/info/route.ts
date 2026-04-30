import { NextResponse } from "next/server";
import { INDIAN_ELECTION_DATA } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) return NextResponse.json(INDIAN_ELECTION_DATA);

  // Helper to score a match based on keywords
  const score = (text: string, query: string) => {
    const keywords = query.split(/\s+/).filter(k => k.length > 2);
    if (keywords.length === 0) return text.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    
    let matches = 0;
    const lowerText = text.toLowerCase();
    keywords.forEach(k => {
      if (lowerText.includes(k.toLowerCase())) matches++;
    });
    return matches / keywords.length;
  };

  // Search in states
  const matchedStates = INDIAN_ELECTION_DATA.states.filter(s => 
    score(s.name, q) > 0.5 || s.name.toLowerCase().includes(q)
  );

  // Search in history
  const matchedHistory = INDIAN_ELECTION_DATA.history.filter(h => 
    score(h.event, q) > 0.3 || score(h.detail, q) > 0.3 || h.event.toLowerCase().includes(q)
  );

  // Search in terminology
  const matchedTerm = (INDIAN_ELECTION_DATA as any).terminology.filter((t: any) => 
    score(t.term, q) > 0.5 || score(t.definition, q) > 0.3 || t.term.toLowerCase().includes(q)
  );

  // Search in FAQs
  const matchedFaqs = (INDIAN_ELECTION_DATA as any).faqs.filter((f: any) => 
    score(f.q, q) > 0.4 || score(f.a, q) > 0.3 || f.q.toLowerCase().includes(q)
  );

  // Search in Constitutional/Legal/Forms/ElectionTypes
  const matchedConst = (INDIAN_ELECTION_DATA as any).constitutional.filter((c: any) => 
    c.article.includes(q) || score(c.title, q) > 0.4 || score(c.detail, q) > 0.3
  );
  const matchedLegal = (INDIAN_ELECTION_DATA as any).legal.filter((l: any) => 
    score(l.name, q) > 0.4 || score(l.focus, q) > 0.3
  );
  const matchedForms = (INDIAN_ELECTION_DATA as any).forms.filter((f: any) => 
    f.id.toLowerCase().includes(q) || score(f.purpose, q) > 0.4
  );
  const matchedElectionTypes = (INDIAN_ELECTION_DATA as any).election_types.filter((e: any) => 
    score(e.type, q) > 0.5 || score(e.body, q) > 0.4
  );

  return NextResponse.json({
    states: matchedStates,
    history: matchedHistory,
    terminology: matchedTerm,
    faqs: matchedFaqs,
    constitutional: matchedConst,
    legal: matchedLegal,
    forms: matchedForms,
    election_types: matchedElectionTypes,
    timestamp: new Date().toISOString(),
    source: "ElectBot India Expert Knowledge API"
  });
}
