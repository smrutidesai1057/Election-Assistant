export const INDIAN_ELECTION_DATA = {
  constitutional: [
    { article: "324", title: "Superintendence and Control", detail: "Vests control of elections in the Election Commission of India (ECI)." },
    { article: "326", title: "Universal Adult Suffrage", detail: "Every citizen aged 18+ has the right to vote." },
    { article: "329", title: "Bar to interference by courts", detail: "Bars courts from interfering in electoral matters mid-process." },
  ],
  legal: [
    { name: "Representation of the People Act, 1950", focus: "Voter registration and delimitation." },
    { name: "Representation of the People Act, 1951", focus: "Conduct of elections and candidate qualifications." },
    { name: "Delimitation Act, 2002", focus: "Redrawing constituency boundaries." },
  ],
  forms: [
    { id: "Form 6", purpose: "New voter registration" },
    { id: "Form 6A", purpose: "Overseas/NRI voter registration" },
    { id: "Form 6B", purpose: "Aadhaar linking with voter ID" },
    { id: "Form 7", purpose: "Objection or deletion of name" },
    { id: "Form 8", purpose: "Correction, address change, or ID replacement" },
  ],
  election_types: [
    { type: "Lok Sabha", body: "Lower House of Parliament", frequency: "Every 5 years", seats: 543 },
    { type: "Rajya Sabha", body: "Upper House of Parliament", frequency: "Staggered (1/3 every 2 years)", seats: 245 },
    { type: "Vidhan Sabha", body: "State Legislative Assembly", frequency: "Every 5 years per state" },
    { type: "Local Body", body: "Panchayats & Municipal Corporations", frequency: "Every 5 years" },
  ],
  states: [
    { name: "Andhra Pradesh", seats: 25, type: "State", next_election: "2024" },
    { name: "Arunachal Pradesh", seats: 2, type: "State", next_election: "2024" },
    { name: "Assam", seats: 14, type: "State", next_election: "2026" },
    { name: "Bihar", seats: 40, type: "State", next_election: "2025" },
    { name: "Uttar Pradesh", seats: 80, type: "State", next_election: "2027" },
    { name: "Maharashtra", seats: 48, type: "State", next_election: "2024" },
    { name: "West Bengal", seats: 42, type: "State", next_election: "2026" },
    // ... other states can be added as needed
  ],
  history: [
    { year: 1857, event: "First War of Independence", detail: "Uprising against the rule of the British East India Company." },
    { year: 1947, event: "Independence and Partition", detail: "India gained independence on August 15. Jawaharlal Nehru became the first PM." },
    { year: 1950, event: "Constitution of India", detail: "India became a Republic on Jan 26. Dr. Rajendra Prasad was the first President." },
    { year: 1951, event: "First General Elections", detail: "World's largest democratic exercise at the time. Sukumar Sen was the first CEC." },
    { year: 1982, event: "First Use of EVMs", detail: "EVMs were first used in a by-election in Kerala." },
    { year: 2024, event: "Largest Election in History", detail: "968 million eligible voters across 7 phases." },
  ],
  terminology: [
    { term: "EPIC", definition: "Electors Photo Identity Card (Voter ID)." },
    { term: "MCC", definition: "Model Code of Conduct guidelines for parties and candidates." },
    { term: "NOTA", definition: "None Of The Above — a protest vote option." },
    { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail for EVM verification." },
    { term: "Indelible Ink", definition: "Purple ink made from Silver Nitrate applied to the left index finger." },
  ],
  faqs: [
    { q: "What is the legal voting age?", a: "18 years as on the qualifying date." },
    { q: "How to register as an NRI?", a: "Fill Form 6A on the voter portal. You must be present in person to vote." },
    { q: "What is the ECI helpline?", a: "The national voter helpline number is 1950." },
    { q: "Can I vote without a Voter ID?", a: "Yes, if your name is on the electoral roll, you can use Aadhaar, PAN, Passport, or DL as alternative ID." },
  ]
};
