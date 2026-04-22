import { useState, useRef, useCallback } from "react";

// Storage adapter — replaces artifact storage with localStorage
window.storage = {
  get: async (key) => {
    const value = localStorage.getItem(key);
    if (value === null) throw new Error('Key not found');
    return { key, value };
  },
  set: async (key, value) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    return { key, value };
  },
  delete: async (key) => {
    localStorage.removeItem(key);
    return { key, deleted: true };
  },
  list: async (prefix) => {
    const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
    return { keys };
  }
};

const SECTIONS = [
  {
    id: "welcome", title: "Welcome to DVG", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "Welcome to DVG Facilities Management. Before you begin your operational training, this module gives you the foundation knowledge you need — who we are, what we do, how we work, and the science behind the products you will use every day." },
      { type: "heading", text: "What DVG Does" },
      { type: "intro", text: "We are a specialist provider of Soft Facilities Management and Hygiene services. We support our clients with their cleaning and soft management needs in and across Hampshire." },
      { type: "split", title: "Our Services", left: {
        label: "COMMERCIAL SERVICES", color: "#1B2A4A",
        items: ["Facility Cleaning", "Decontamination Cleaning", "Soft FM", "General Building Maintenance"]
      }, right: {
        label: "OTHER SERVICES", color: "#27AE60",
        items: ["Domestic Cleaning", "Construction Cleaning", "Specialist Cleaning", "Ad-hoc Services"]
      }},
      { type: "heading", text: "The Clients We Work With" },
      { type: "intro", text: "Our commercial clients provide professional services to their own customers. When we clean their premises, we are protecting their reputation as well as our own." },
      { type: "table", title: "Client Sectors", rows: [
        { area: "Commercial", standard: "Aviation, IT Services, Design & Construction, Logistics" },
        { area: "Domestic", standard: "Property Managers, Estate Agents, Property Developers" },
      ]},
      { type: "callout", label: "KEY PRINCIPLE", text: "Every site you enter represents a client relationship. The standard of your work directly affects whether that client stays with DVG. You are not just cleaning a building — you are protecting a contract.", color: "blue" },
    ]
  },
  {
    id: "industry", title: "The Cleaning Industry", subtitle: "Section 2 of 5",
    content: [
      { type: "intro", text: "The UK cleaning industry employs 1.47 million people. It contributes significantly to the UK’s GDP and provides substantial employment opportunities. Understanding the industry you work in helps you see your role in context." },
      { type: "heading", text: "Types of Cleaning" },
      { type: "intro", text: "There are many different types of cleaning within the industry. The majority are categorised by the cleaning activity itself or by the client type — domestic or commercial." },
      { type: "grid", items: [
        { label: "Deep Cleaning", desc: "Intensive, thorough clean beyond daily maintenance" },
        { label: "Commercial Cleaning", desc: "Offices, retail, corporate environments" },
        { label: "Sanitisation Services", desc: "Infection control and hygiene-critical environments" },
        { label: "Kitchen Cleaning", desc: "Food preparation areas, commercial kitchens" },
        { label: "Construction Cleaning", desc: "Post-build clean, builder’s clean" },
        { label: "Domestic Cleaning", desc: "Residential properties, private homes" },
      ]},
      { type: "heading", text: "How DVG Trains" },
      { type: "intro", text: "DVG uses a blended approach to training — mixing online theory, on-site practical training, external certifications, and systems training to prepare you with everything you need." },
      { type: "timeline", stages: [
        { period: "Week 0–2", title: "Online Theory", desc: "This platform — foundation knowledge, SOP pre-learning, comprehension quizzes" },
        { period: "Week 2–6", title: "On-Site Training", desc: "Practical sessions with a certified trainer, exercises, and assessments (Phases 1–7)" },
        { period: "Week 6–8", title: "External & Systems", desc: "External certifications, ConnectTeams training, final assessment, and certification" },
      ]},
      { type: "callout", label: "WHERE YOU ARE NOW", text: "You are in the online theory stage. This Phase 0 module gives you the foundation. After completing it, you will begin Phase 1 — which has its own online pre-learning module followed by a practical session with your trainer.", color: "green" },
    ]
  },
  {
    id: "chemicals", title: "Cleaning Chemicals — The Fundamentals", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "Before you learn which specific chemicals DVG uses (that comes in Phase 1), you need to understand what cleaning chemicals are, how they work, and why using the correct one matters." },
      { type: "heading", text: "The Four Categories" },
      { type: "intro", text: "Although there are many cleaning products on the market, most formulas fall into one of four distinct categories. It is critical to use the correct agent for the task." },
      { type: "fourCards", cards: [
        { title: "Detergents", color: "#2E75B6", what: "Cleaning agents in liquid form that remove dirt, grease, and stains from surfaces using surfactants.", when: "Basic cleaning tasks — washing dishes, laundry, cleaning floors.", not: "Does NOT sanitise or disinfect. Not for silk, wool, or pH-sensitive surfaces like marble." },
        { title: "Degreasers", color: "#D4800A", what: "Agents that remove oil, fats, and proteins. Higher pH = more effective at cutting through oil.", when: "Oily spots, baked-on carbonised messes, oven cleaning, kitchen grease.", not: "Will not remove water-based stains like coffee or red wine." },
        { title: "Disinfectants & Sanitisers", color: "#C0392B", what: "Products that kill germs and bacteria. Sanitisers lower germ count to a safe level. Disinfectants kill a broader range.", when: "High-touch areas — countertops, door handles, light switches, toilet handles.", not: "Surfaces only — never on people. Must observe dwell time before wiping." },
        { title: "Acids", color: "#1B2A4A", what: "Cleaning solutions with a pH of 6 or lower. Found in bathroom cleaners for removing calcium and scale.", when: "Mineral deposits, rust stains, limescale on taps, sinks, and bowls.", not: "Not for gentle surfaces or bright colours. Avoid acids that are too harsh for the surface." },
      ]},
      { type: "callout", label: "IMPORTANT", text: "In Phase 1, you will learn exactly which DVG-approved chemicals to use, where, and for how long (dwell times). This section gives you the foundation — Phase 1 gives you the operational rules.", color: "amber" },
    ]
  },
  {
    id: "safety", title: "Chemical Safety & Hazard Awareness", subtitle: "Section 4 of 5",
    content: [
      { type: "intro", text: "Every cleaning chemical carries some level of risk. Understanding pH, hazard symbols, and basic safety controls is essential before you handle any product on site." },
      { type: "heading", text: "Understanding pH" },
      { type: "intro", text: "pH stands for ‘potential hydrogen’. It measures how acidic or alkaline a chemical is when mixed with water. This matters because using the wrong pH on the wrong surface causes damage." },
      { type: "phScale" },
      { type: "heading", text: "Hazard Pictograms" },
      { type: "intro", text: "These symbols appear on chemical product labels. You must be able to recognise them and understand what they mean before handling any product." },
      { type: "hazards", items: [
        { symbol: "☢", name: "Corrosive", desc: "Can cause severe burns to skin and eyes. Wear gloves and eye protection." },
        { symbol: "☣", name: "Toxic / Acute Toxicity", desc: "Harmful or fatal if inhaled, swallowed, or absorbed through skin." },
        { symbol: "⚠", name: "Health Hazard", desc: "May cause irritation, allergic reactions, or other health effects." },
        { symbol: "\uD83D\uDD25", name: "Flammable", desc: "Can catch fire easily. Keep away from heat, sparks, and open flame." },
        { symbol: "✖", name: "Hazardous to Environment", desc: "Toxic to aquatic life. Do not pour down drains." },
      ]},
      { type: "heading", text: "Basic Safety Controls" },
      { type: "checklist", items: [
        "Avoid or minimise contact with harmful substances and minimise leaks and spills",
        "Store cleaning products safely — upright, sealed, in designated areas",
        "Use personal protective equipment: gloves, aprons, eye protection",
        "Practice good hand care — wash properly, dry thoroughly, use skin cream regularly",
        "Keep the workplace well ventilated when using chemicals",
        "Never mix chemicals — this can create dangerous reactions",
        "Read the product label before first use — every time",
      ]},
      { type: "callout", label: "RULE", text: "If you are unsure about a chemical, do not use it. Ask your supervisor. Guessing with chemicals puts you and others at risk.", color: "red" },
    ]
  },
  {
    id: "fivestage", title: "The 5-Stage Sequence — Preview", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "Every DVG job follows the same 5-Stage Sequence. You will learn this in detail during Phase 2, but understanding the overview now will help everything else make sense." },
      { type: "stages", items: [
        { num: "1", title: "Site Opening", desc: "Gain authorised access, sign in, clock in via ConnectTeams. Secure the entry point.", color: "#2E75B6" },
        { num: "2", title: "Walkthrough", desc: "Inspect the entire site before any cleaning. Photograph damage. Log variances.", color: "#27AE60" },
        { num: "3", title: "Preparation", desc: "Set up equipment, assign crew roles, confirm the job plan, set the 10-minute timer.", color: "#D4800A" },
        { num: "4", title: "Service Delivery", desc: "Execute the Dry workflow (bins, dusting, vacuuming) then the Wet workflow (kitchens, bathrooms, glass, mopping).", color: "#C0392B" },
        { num: "5", title: "Final Walkthrough & Close", desc: "Inspect every area, correct defects, submit completion form, clock out, secure site.", color: "#1B2A4A" },
      ]},
      { type: "callout", label: "THE SEQUENCE RULE", text: "No stage may be skipped or merged. This sequence is executed in order, every time, on every site. You will practise it extensively during your practical training sessions.", color: "blue" },
      { type: "heading", text: "What Comes Next" },
      { type: "intro", text: "After completing this Phase 0 module, you will move to Phase 1: Foundations and Standardisation. Phase 1 has its own online pre-learning module (like this one) followed by practical sessions with your trainer. Each phase builds on the previous one — there are 7 phases in total plus a final written knowledge check." },
      { type: "callout", label: "YOUR JOURNEY", text: "Phase 0 (this module) → Phase 1: Foundations → Phase 2: SOP Execution → Phase 3: Crew Operations → Phase 4: Customer Experience → Phase 5: Quality Control → Phase 6: Health & Safety → Phase 7: Leadership → Written Check → Certified Operative", color: "green" },
    ]
  },
];

const QUIZ = [
  { q: "What type of services does DVG primarily provide?", options: ["IT support", "Soft FM and Hygiene services", "Construction management", "Security services"], correct: 1 },
  { q: "How many people does the UK cleaning industry employ?", options: ["470,000", "870,000", "1.47 million", "2.1 million"], correct: 2 },
  { q: "What are the four categories of cleaning chemicals?", options: ["Sprays, liquids, gels, powders", "Detergents, degreasers, disinfectants, acids", "Bleach, soap, polish, solvent", "Sanitisers, polishers, strippers, sealers"], correct: 1 },
  { q: "What does pH measure?", options: ["Temperature of a chemical", "How acidic or alkaline a chemical is", "How strong a chemical smells", "How quickly a chemical evaporates"], correct: 1 },
  { q: "A pH of 7 means the substance is:", options: ["Very acidic", "Very alkaline", "Neutral", "Corrosive"], correct: 2 },
  { q: "Detergents are good for basic cleaning but they do NOT:", options: ["Remove dirt", "Remove grease", "Sanitise or disinfect", "Come in liquid form"], correct: 2 },
  { q: "When should you use a degreaser?", options: ["To remove coffee stains", "To sanitise a bathroom", "To remove oil, grease, or baked-on residue", "To clean glass"], correct: 2 },
  { q: "What should you do if you are unsure about a chemical?", options: ["Try a small amount first", "Ask your supervisor", "Read online reviews", "Use the strongest one available"], correct: 1 },
  { q: "How many stages are in the DVG job sequence?", options: ["3", "4", "5", "7"], correct: 2 },
  { q: "Which stage always comes last in the DVG sequence?", options: ["Service Delivery", "Preparation", "Site Opening", "Final Walkthrough and Close"], correct: 3 },
];

function ProgressBar({ pct }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, height: 6, width: "100%", overflow: "hidden" }}>
      <div style={{ background: "#fff", height: "100%", width: `${pct}%`, borderRadius: 8, transition: "width 0.5s ease" }} />
    </div>
  );
}

function SectionContent({ section }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {section.content.map((block, i) => {
        if (block.type === "intro") return <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: "#3a3a3a", marginBottom: 20 }}>{block.text}</p>;
        if (block.type === "heading") return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", margin: "28px 0 12px" }}>{block.text}</h3>;
        if (block.type === "table") return (
          <div key={i} style={{ margin: "20px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
            {block.title && <div style={{ background: "#1B2A4A", color: "#fff", padding: "11px 16px", fontSize: 14, fontWeight: 600 }}>{block.title}</div>}
            {block.rows.map((row, j) => (
              <div key={j} style={{ display: "flex", borderBottom: j < block.rows.length - 1 ? "1px solid #e8e5de" : "none", background: j % 2 === 0 ? "#fafaf7" : "#fff" }}>
                <div style={{ flex: "0 0 30%", padding: "11px 14px", fontSize: 14, fontWeight: 600, color: "#1B2A4A", borderRight: "1px solid #e8e5de" }}>{row.area}</div>
                <div style={{ flex: 1, padding: "11px 14px", fontSize: 14, color: "#444", lineHeight: 1.6 }}>{row.standard}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "callout") {
          const colors = { blue: { bg: "#e8f1fa", border: "#2E75B6", label: "#0C447C" }, green: { bg: "#d4edda", border: "#27AE60", label: "#1A5C2E" }, amber: { bg: "#fff3cd", border: "#D4A017", label: "#7A6400" }, red: { bg: "#fde8e8", border: "#C0392B", label: "#791F1F" } };
          const c = colors[block.color] || colors.blue;
          return (
            <div key={i} style={{ background: c.bg, borderLeft: `4px solid ${c.border}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "20px 0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.label, letterSpacing: "0.05em", marginBottom: 6 }}>{block.label}</div>
              <div style={{ fontSize: 14, color: "#2a2a2a", lineHeight: 1.65 }}>{block.text}</div>
            </div>
          );
        }
        if (block.type === "split") return (
          <div key={i} style={{ margin: "20px 0" }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1B2A4A", marginBottom: 12 }}>{block.title}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[block.left, block.right].map((side, si) => (
                <div key={si} style={{ flex: "1 1 260px", borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
                  <div style={{ background: side.color, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>{side.label}</div>
                  <div style={{ padding: "12px 14px" }}>
                    {side.items.map((item, ii) => <div key={ii} style={{ fontSize: 14, color: "#3a3a3a", padding: "6px 0", borderBottom: ii < side.items.length - 1 ? "1px solid #f0ede6" : "none", lineHeight: 1.55 }}>{item}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        if (block.type === "grid") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, margin: "20px 0" }}>
            {block.items.map((item, gi) => (
              <div key={gi} style={{ padding: "14px", background: "#fafaf7", borderRadius: 10, border: "1px solid #e8e5de" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1B2A4A", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "timeline") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.stages.map((s, si) => (
              <div key={si} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1B2A4A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{s.period.split("–")[0] || s.period}</div>
                  {si < block.stages.length - 1 && <div style={{ width: 2, flex: 1, background: "#ddd", marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <div style={{ fontSize: 12, color: "#2E75B6", fontWeight: 600, marginBottom: 2 }}>{s.period}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1B2A4A", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "fourCards") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, margin: "20px 0" }}>
            {block.cards.map((card, ci) => (
              <div key={ci} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
                <div style={{ background: card.color, color: "#fff", padding: "10px 14px", fontSize: 14, fontWeight: 700 }}>{card.title}</div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6, marginBottom: 10 }}><strong style={{ color: "#1B2A4A" }}>What:</strong> {card.what}</div>
                  <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6, marginBottom: 10 }}><strong style={{ color: "#27AE60" }}>Use when:</strong> {card.when}</div>
                  <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6 }}><strong style={{ color: "#C0392B" }}>Do NOT:</strong> {card.not}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "phScale") return (
          <div key={i} style={{ margin: "20px 0", padding: "20px", background: "#fafaf7", borderRadius: 10, border: "1px solid #e8e5de" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#C0392B" }}>ACIDIC (0)</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>NEUTRAL (7)</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#2E75B6" }}>ALKALINE (14)</span>
            </div>
            <div style={{ height: 24, borderRadius: 12, background: "linear-gradient(to right, #e74c3c, #e67e22, #f1c40f, #2ecc71, #3498db, #2980b9, #8e44ad)", marginBottom: 12 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666" }}>
              <span>Battery acid</span><span>Vinegar</span><span>Water</span><span>Baking soda</span><span>Bleach</span>
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: "#444", lineHeight: 1.6 }}>
              A pH of 0 is very acidic. A pH of 7 is neutral (like water). A pH of 14 is very alkaline. Most cleaning products sit between pH 3 and pH 12. Using a product with the wrong pH on a surface can cause damage — for example, acid on marble dissolves the stone.
            </div>
          </div>
        );
        if (block.type === "hazards") return (
          <div key={i} style={{ margin: "20px 0", border: "1px solid #d8d5ce", borderRadius: 10, overflow: "hidden" }}>
            {block.items.map((h, hi) => (
              <div key={hi} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderBottom: hi < block.items.length - 1 ? "1px solid #e8e5de" : "none", background: hi % 2 === 0 ? "#fafaf7" : "#fff" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "#fde8e8", border: "2px solid #C0392B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{h.symbol}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>{h.name}</div>
                  <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "checklist") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((item, ci) => (
              <div key={ci} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: ci < block.items.length - 1 ? "1px solid #f0ede6" : "none" }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#1A5C2E", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{"✓"}</div>
                <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "stages") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((s, si) => (
              <div key={si} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>{s.num}</div>
                  {si < block.items.length - 1 && <div style={{ width: 2, height: 16, background: "#ddd", marginTop: 4 }} />}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}

function QuizView({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false);
  const q = QUIZ[current];

  const handleSelect = useCallback((idx) => {
    if (locked || answered) return;
    setLocked(true);
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
    setTimeout(() => setLocked(false), 400);
  }, [locked, answered, q.correct]);

  function handleNext() {
    if (current < QUIZ.length - 1) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); setLocked(false); }
    else { setFinished(true); if (Math.round((score / QUIZ.length) * 100) >= 80) onComplete(score); }
  }

  const pct = Math.round((score / QUIZ.length) * 100);
  const passed = pct >= 80;

  if (finished) return (
    <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: passed ? "#d4edda" : "#fde8e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 42 }}>{passed ? "✓" : "✗"}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>{pct}%</div>
      <div style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>{score} of {QUIZ.length} correct</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 0 Foundation Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to move to Phase 1: Foundations & Standardisation. Your trainer has been notified." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
      {!passed && <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setLocked(false); }} style={{ marginTop: 24, padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Retake Quiz</button>}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>QUESTION {current + 1} OF {QUIZ.length}</span>
        <span style={{ fontSize: 13, color: "#555" }}>{score} correct so far</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", marginBottom: 20, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {q.options.map((opt, oi) => {
          let bg = "#fff", border = "1px solid #d8d5ce", col = "#333";
          if (answered) { if (oi === q.correct) { bg = "#d4edda"; border = "2px solid #27AE60"; col = "#1A5C2E"; } else if (oi === selected && oi !== q.correct) { bg = "#fde8e8"; border = "2px solid #C0392B"; col = "#791F1F"; } }
          return <button key={oi} onPointerDown={(e) => { e.preventDefault(); if (!answered && !locked) handleSelect(oi); }} style={{ textAlign: "left", padding: "16px 18px", background: bg, border, borderRadius: 10, fontSize: 15, color: col, cursor: answered ? "default" : "pointer", fontWeight: answered && oi === q.correct ? 700 : 400, transition: "background 0.2s, border 0.2s", fontFamily: "inherit", touchAction: "manipulation", WebkitTapHighlightColor: "transparent", userSelect: "none" }}><span style={{ fontWeight: 700, marginRight: 10, color: "#888" }}>{String.fromCharCode(65 + oi)}</span> {opt}</button>;
        })}
      </div>
      {answered && <div style={{ marginTop: 20, textAlign: "right" }}><button onClick={handleNext} style={{ padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{current < QUIZ.length - 1 ? "Next Question" : "See Results"}</button></div>}
    </div>
  );
}

function Confetti() {
  const colors = ["#27AE60", "#2E75B6", "#D4A017", "#C0392B", "#1B2A4A", "#8B5CF6", "#EC4899"];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {Array.from({ length: 50 }, (_, i) => { const p = { left: Math.random() * 100, delay: Math.random() * 2, dur: 2 + Math.random() * 2, size: 6 + Math.random() * 6, color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, shape: Math.random() > 0.5 }; return <div key={i} style={{ position: "absolute", left: `${p.left}%`, top: -20, width: p.size, height: p.shape ? p.size : p.size * 1.5, background: p.color, borderRadius: p.shape ? "50%" : 2, transform: `rotate(${p.rot}deg)`, animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`, opacity: 0 }} />; })}
    </div>
  );
}

function CompletionScreen({ onReview, onBack }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease", position: "relative" }}>
      <Confetti />
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 40, color: "#1A5C2E", animation: "scaleIn 0.5s ease" }}>{"✓"}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>100%</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 0 Foundation Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>Congratulations! You have completed the Foundation module. You now have the context and knowledge to begin the FacilityPro Academy Intermediate Programme.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Begin Phase 1: Foundations & Standardisation (online pre-learning)", "Complete the Phase 1 quiz to unlock your first practical session", "Your trainer will confirm your session date and time", "Bring your enthusiasm — Phase 1 includes hands-on exercises from day one"].map((text, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0ede6" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8f1fa", color: "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{text}</div>
          </div>
        ))}
      </div>
      <button onClick={onReview} style={{ padding: "14px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Review Session</button>
      <button onClick={onBack} style={{ display: "block", margin: "16px auto 0", padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>← Back to Dashboard</button>
    </div>
  );
}

export default function Phase0({ onBack, onComplete }) {
  const [view, setView] = useState("welcome");
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [quizPassed, setQuizPassed] = useState(false);
  const contentRef = useRef(null);

  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;

  function completeSection() {
    setCompletedSections(prev => new Set([...prev, currentSection]));
    if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; }
    else { if (quizPassed) setView("complete"); else setView("quiz"); }
  }

  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes confettiFall { 0% { opacity: 1; transform: translateY(0) rotate(0deg); } 100% { opacity: 0; transform: translateY(100vh) rotate(720deg); } }
        button:hover { opacity: 0.88; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div>
          <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>{"Phase 0 — Foundation"}</div>
        </div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete — you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "0"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 0: Foundation</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>Welcome to DVG. This module covers who we are, the cleaning industry, chemical fundamentals, safety awareness, and a preview of the 5-Stage system you will use on every job.</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>5 sections + comprehension quiz · approximately 25–35 minutes</p>
            <div style={{ textAlign: "left", margin: "0 auto", maxWidth: 420 }}>
              {SECTIONS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < SECTIONS.length - 1 ? "1px solid #e8e5de" : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: completedSections.has(i) ? "#d4edda" : "#e8f1fa", color: completedSections.has(i) ? "#1A5C2E" : "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{completedSections.has(i) ? "✓" : i + 1}</div>
                  <div style={{ fontSize: 15, color: "#333" }}>{s.title}</div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: quizPassed ? "#d4edda" : "#fff3cd", color: quizPassed ? "#1A5C2E" : "#7A6400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{quizPassed ? "✓" : "Q"}</div>
                <div style={{ fontSize: 15, color: "#333" }}>{quizPassed ? "Comprehension Quiz — Passed" : "Comprehension Quiz (80% to pass)"}</div>
              </div>
            </div>
            <button onClick={() => { setView(quizPassed ? "complete" : "learning"); setCurrentSection(0); }} style={{ marginTop: 32, padding: "14px 48px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{quizPassed ? "View Completion" : "Begin Module"}</button>
            {quizPassed && <button onClick={() => { setCurrentSection(0); setView("learning"); }} style={{ display: "block", margin: "12px auto 0", padding: "12px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Review Session</button>}
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>YOUR STARTING POINT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module before beginning Phase 1. This gives you the foundation knowledge every DVG team member needs. No prior cleaning experience required.</div></div>}
          </div>
        )}
        {view === "learning" && (
          <div style={{ padding: "24px 0 40px", animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {SECTIONS.map((s, i) => <button key={i} onClick={() => goToSection(i)} style={{ width: i === currentSection ? 28 : 10, height: 10, borderRadius: 5, background: completedSections.has(i) ? "#27AE60" : i === currentSection ? "#1B2A4A" : "#ccc", border: "none", cursor: "pointer", transition: "all 0.3s" }} title={s.title} />)}
              <div style={{ width: 10, height: 10, borderRadius: 5, background: quizPassed ? "#27AE60" : "#ccc" }} />
            </div>
            <div ref={contentRef} style={{ background: "#fff", borderRadius: 14, padding: "32px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #d8d5ce" }}>
              <div style={{ fontSize: 13, color: "#2E75B6", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>{SECTIONS[currentSection].subtitle}</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>{SECTIONS[currentSection].title}</h2>
              <SectionContent section={SECTIONS[currentSection]} />
              <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid #e8e5de" }}>
                {currentSection > 0 ? <button onClick={() => goToSection(currentSection - 1)} style={{ padding: "12px 24px", background: "transparent", color: "#555", border: "1px solid #ccc", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Previous</button> : <div />}
                <button onClick={completeSection} style={{ padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{currentSection < SECTIONS.length - 1 ? "Continue" : (quizPassed ? "View Completion" : "Take the Quiz")}</button>
              </div>
            </div>
          </div>
        )}
        {view === "quiz" && !quizPassed && (
          <div style={{ padding: "24px 0 40px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {SECTIONS.map((s, i) => <button key={i} onClick={() => goToSection(i)} style={{ width: 10, height: 10, borderRadius: 5, background: completedSections.has(i) ? "#27AE60" : "#ccc", border: "none", cursor: "pointer" }} title={s.title} />)}
              <div style={{ width: 28, height: 10, borderRadius: 5, background: "#D4A017" }} />
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "32px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #d8d5ce" }}>
              <div style={{ fontSize: 13, color: "#D4800A", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>COMPREHENSION QUIZ</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 0 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_0_complete", "true"); if (onComplete) onComplete(0); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} onBack={onBack} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy · DVG Facilities Management · Phase 0 Foundation Module · v4.0</div>
    </div>
  );
}
