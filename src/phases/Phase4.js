import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "conduct", title: "Behaviour on Client Sites", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "Excellent cleaning is the minimum. What separates a premier provider from a commodity cleaner is the experience the client has every time your team is on their site. Behaviour, communication, and the wow factor are not soft skills — they are revenue drivers." },
      { type: "heading", text: "Non-Negotiable Conduct Standards" },
      { type: "checklist", items: [
        "Full DVG uniform worn correctly at all times on site",
        "No personal phone use in client spaces — phones on silent, used in break areas only",
        "No eating or drinking in client offices, meeting rooms, or production areas",
        "No personal conversations conducted in areas where clients or client staff may hear",
        "Music or audio: not permitted during shifts (see Phase 6 — Earphone Policy)",
        "Client equipment (computers, phones, printers) must never be touched — unless specifically in scope",
        "Client documents, files, or personal items must never be moved unnecessarily",
        "Do not discuss client premises, staff, or business with anyone outside DVG",
      ]},
      { type: "callout", label: "PRINCIPLE", text: "Every item on this list exists because someone, somewhere, did it and lost the client. These are not theoretical rules — they are lessons paid for in lost contracts.", color: "red" },
    ]
  },
  {
    id: "invisible", title: "The Invisible Crew Principle", subtitle: "Section 2 of 5",
    content: [
      { type: "intro", text: "A DVG crew operates to a principle we call the Invisible Crew. The ideal DVG experience for a client is: they arrive to a perfectly clean site and would not know we had been there — except for the results." },
      { type: "heading", text: "What Invisible Means in Practice" },
      { type: "checklist", items: [
        "No unnecessary noise — doors closed quietly, equipment not dragged across floors",
        "No footprints, equipment marks, or scuff marks left on walls or skirting",
        "Everything returned to its exact original position — not approximate, exact",
        "No personal items left on site — not a cloth, not a glove, not a bag",
        "No chemical odour remaining after cleaning — the space smells neutral",
        "No visual evidence of your presence — only the results of your work",
      ]},
      { type: "callout", label: "THE TEST", text: "Walk back into the room after you have finished. Can you tell a cleaning crew was here? If yes — something is wrong. The only evidence should be the cleanliness itself.", color: "blue" },
    ]
  },
  {
    id: "scripts", title: "Communication & Client Scripts", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "On many commercial jobs, client staff will still be present on site. Every interaction you have represents DVG. The following scripts give you exactly what to say in the three most common situations." },
      { type: "heading", text: "Script 1: Greeting a Client" },
      { type: "callout", label: "SCRIPT", text: "Good [morning/afternoon]. I’m [Name] from DVG. We’re here for the scheduled clean today. We’ll try to stay out of your way — please let me know if there’s anything you’d like us to work around.", color: "blue" },
      { type: "heading", text: "Script 2: Asked About the Work" },
      { type: "callout", label: "SCRIPT", text: "We’re working through our standard clean today — [brief summary, e.g. floors, bins, and bathrooms]. We should be finished by [estimated time]. Is there anything specific you’d like us to focus on or avoid today?", color: "blue" },
      { type: "heading", text: "Script 3: Client Raises a Concern" },
      { type: "callout", label: "SCRIPT", text: "Thank you for letting me know. I’ll look at that area right away and make sure it’s sorted before we finish. I’ll also let my supervisor know so we can make sure it doesn’t happen again. Is there anything else I can help with?", color: "blue" },
      { type: "callout", label: "RULE", text: "Never be defensive. Never argue. Never blame another crew member or the previous shift. Acknowledge, act, and escalate. Every complaint is an opportunity to demonstrate the DVG standard.", color: "amber" },
    ]
  },
  {
    id: "escalation", title: "Escalation Protocol", subtitle: "Section 4 of 5",
    content: [
      { type: "intro", text: "Not every situation can be resolved on the spot. The escalation protocol tells you exactly what to do when a client interaction goes beyond your authority or comfort level." },
      { type: "table", title: "Escalation Actions", rows: [
        { area: "Task outside job scope", standard: "Acknowledge politely, do not agree or refuse. Say: ‘Let me check with my supervisor and come back to you.’" },
        { area: "Service complaint", standard: "Use complaint script, log in ConnectTeams, call supervisor immediately" },
        { area: "Aggressive or threatening staff", standard: "Leave the area, call supervisor immediately, do not engage" },
        { area: "Pricing or contract question", standard: "Refer to office: ‘Our client services team would be best placed to help with that.’" },
      ]},
      { type: "callout", label: "KEY PRINCIPLE", text: "You are never expected to handle an aggressive situation alone. Leaving the area is the correct response — not weakness. Your safety comes first. The supervisor handles escalation from there.", color: "red" },
      { type: "intro", text: "Notice the pattern in every escalation: acknowledge the person, take the correct immediate action, and involve your supervisor. You never agree to something outside your authority, and you never refuse a client to their face." },
    ]
  },
  {
    id: "wow", title: "Creating the Wow Experience", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "The Wow experience is made up of small, deliberate actions that go beyond the minimum standard. These are not extras — they are part of the DVG service. A client paying for a premier service is paying for a feeling as much as a result." },
      { type: "heading", text: "The Wow Checklist" },
      { type: "checklist", items: [
        "Chair tucked in neatly at every desk — consistent height and alignment",
        "Monitor screens wiped of fingerprints (where screens are accessible)",
        "Paper and stationery aligned neatly on desks — not scattered",
        "Cushions and soft furnishings in meeting rooms straightened and centred",
        "Bin returned to its exact position — not approximately, exactly",
        "Kitchen tea/coffee station wiped and items neatly arranged",
        "Toilet roll folded to a point on the first sheet after bathroom clean",
        "Hand soap bottles wiped and straightened on bathroom counters",
        "No smear, no trace, no evidence of our presence — only the results",
      ]},
      { type: "callout", label: "MINDSET", text: "Walk back into the room after you have finished and ask yourself: does this look like a premium result? If there is any doubt, it is not finished.", color: "green" },
      { type: "heading", text: "What You Will Practise" },
      { type: "intro", text: "Your Phase 4 practical session includes role-play client interaction scenarios (greeting, concern, scope request, and a challenging dissatisfied client) plus a cumulative 5-stage simulation where a client interaction is introduced during Stage 4 and you must handle it while maintaining job pace." },
      { type: "callout", label: "WHAT COMES NEXT", text: "After Phase 4, you move to Phase 5: Quality Control and Self-Inspection — where you learn to inspect your own work, identify faults before the client does, and apply the Zone Sign-Off protocol.", color: "green" },
    ]
  },
];

const QUIZ = [
  { q: "What is the Invisible Crew principle?", options: ["Work as fast as possible", "The client should not know you were there — except for the results", "Hide from client staff", "Only clean when no one is watching"], correct: 1 },
  { q: "Which of these is NOT acceptable on a client site?", options: ["Wearing full uniform", "Using your phone in a break area", "Having a personal conversation in a client corridor", "Logging a report in ConnectTeams"], correct: 2 },
  { q: "When greeting a client, what should you include?", options: ["Your full employment history", "Your name, that you are from DVG, and what you are there to do", "A detailed list of every task", "Nothing — avoid talking to clients"], correct: 1 },
  { q: "A client raises a concern about a missed area. What do you do first?", options: ["Explain why it was missed", "Blame the previous crew", "Thank them and say you will address it right away", "Tell them to call the office"], correct: 2 },
  { q: "A client asks you to clean an area not on the job sheet. What do you say?", options: ["‘Yes, no problem’", "‘That’s not my job’", "‘Let me check with my supervisor and come back to you’", "‘You’ll need to pay extra’"], correct: 2 },
  { q: "A client staff member becomes aggressive. What is the correct response?", options: ["Argue your position firmly", "Leave the area and call your supervisor immediately", "Ignore them and keep cleaning", "Ask them to calm down"], correct: 1 },
  { q: "Which Wow Checklist item involves bathroom details?", options: ["Aligning stationery", "Folding toilet roll to a point on the first sheet", "Tucking in chairs", "Wiping monitors"], correct: 1 },
  { q: "What should the room look like after a DVG clean?", options: ["Obviously freshly cleaned with chemical smell", "Premium result with no evidence of your presence", "Good enough for the price", "Clean but with equipment still staged"], correct: 1 },
  { q: "What should you NEVER do in response to a complaint?", options: ["Acknowledge the concern", "Log it in ConnectTeams", "Blame another crew member or the previous shift", "Notify your supervisor"], correct: 2 },
  { q: "A client asks about pricing. What do you say?", options: ["Give them your best estimate", "‘Our client services team would be best placed to help with that’", "‘I don’t know’", "Offer a discount"], correct: 1 },
];

function ProgressBar({ pct }) { return <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, height: 6, width: "100%", overflow: "hidden" }}><div style={{ background: "#fff", height: "100%", width: `${pct}%`, borderRadius: 8, transition: "width 0.5s ease" }} /></div>; }

function SectionContent({ section }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {section.content.map((block, i) => {
        if (block.type === "intro") return <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: "#3a3a3a", marginBottom: 20 }}>{block.text}</p>;
        if (block.type === "heading") return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", margin: "28px 0 12px" }}>{block.text}</h3>;
        if (block.type === "callout") {
          const colors = { blue: { bg: "#e8f1fa", border: "#2E75B6", label: "#0C447C" }, green: { bg: "#d4edda", border: "#27AE60", label: "#1A5C2E" }, amber: { bg: "#fff3cd", border: "#D4A017", label: "#7A6400" }, red: { bg: "#fde8e8", border: "#C0392B", label: "#791F1F" } };
          const c = colors[block.color] || colors.blue;
          return <div key={i} style={{ background: c.bg, borderLeft: `4px solid ${c.border}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "20px 0" }}><div style={{ fontSize: 12, fontWeight: 700, color: c.label, letterSpacing: "0.05em", marginBottom: 6 }}>{block.label}</div><div style={{ fontSize: 14, color: "#2a2a2a", lineHeight: 1.65 }}>{block.text}</div></div>;
        }
        if (block.type === "table") return (
          <div key={i} style={{ margin: "20px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
            {block.title && <div style={{ background: "#1B2A4A", color: "#fff", padding: "11px 16px", fontSize: 14, fontWeight: 600 }}>{block.title}</div>}
            {block.rows.map((row, j) => (
              <div key={j} style={{ display: "flex", borderBottom: j < block.rows.length - 1 ? "1px solid #e8e5de" : "none", background: j % 2 === 0 ? "#fafaf7" : "#fff" }}>
                <div style={{ flex: "0 0 30%", padding: "11px 14px", fontSize: 14, fontWeight: 600, color: "#1B2A4A", borderRight: "1px solid #e8e5de", lineHeight: 1.5 }}>{row.area}</div>
                <div style={{ flex: 1, padding: "11px 14px", fontSize: 14, color: "#444", lineHeight: 1.6 }}>{row.standard}</div>
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
        return null;
      })}
    </div>
  );
}

function QuizView({ onComplete }) {
  const [current, setCurrent] = useState(0); const [selected, setSelected] = useState(null); const [answered, setAnswered] = useState(false); const [score, setScore] = useState(0); const [finished, setFinished] = useState(false); const [locked, setLocked] = useState(false);
  const q = QUIZ[current];
  const handleSelect = useCallback((idx) => { if (locked || answered) return; setLocked(true); setSelected(idx); setAnswered(true); if (idx === q.correct) setScore(s => s + 1); setTimeout(() => setLocked(false), 800); }, [locked, answered, q.correct]);
  function handleNext() { if (current < QUIZ.length - 1) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); setLocked(false); } else { setFinished(true); if (Math.round((score / QUIZ.length) * 100) >= 80) onComplete(score); } }
  const pct = Math.round((score / QUIZ.length) * 100); const passed = pct >= 80;
  if (finished) return (
    <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: passed ? "#d4edda" : "#fde8e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 42 }}>{passed ? "✓" : "✗"}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>{pct}%</div>
      <div style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>{score} of {QUIZ.length} correct</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 4 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your Phase 4 practical session. You will role-play client interactions and complete a cumulative simulation with live client scenarios." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
      {!passed && <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setLocked(false); }} style={{ marginTop: 24, padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Retake Quiz</button>}
    </div>
  );
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}><span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>QUESTION {current + 1} OF {QUIZ.length}</span><span style={{ fontSize: 13, color: "#555" }}>{score} correct so far</span></div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", marginBottom: 20, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {q.options.map((opt, oi) => { let bg = "#fff", border = "1px solid #d8d5ce", col = "#333"; if (answered) { if (oi === q.correct) { bg = "#d4edda"; border = "2px solid #27AE60"; col = "#1A5C2E"; } else if (oi === selected && oi !== q.correct) { bg = "#fde8e8"; border = "2px solid #C0392B"; col = "#791F1F"; } } return <button key={oi} onPointerDown={e => { e.preventDefault(); if (!answered && !locked) handleSelect(oi); }} style={{ textAlign: "left", padding: "16px 18px", background: bg, border, borderRadius: 10, fontSize: 15, color: col, cursor: answered ? "default" : "pointer", fontWeight: answered && oi === q.correct ? 700 : 400, transition: "background 0.2s, border 0.2s", fontFamily: "inherit", touchAction: "manipulation", WebkitTapHighlightColor: "transparent", userSelect: "none" }}><span style={{ fontWeight: 700, marginRight: 10, color: "#888" }}>{String.fromCharCode(65 + oi)}</span> {opt}</button>; })}
      </div>
      {answered && <div style={{ marginTop: 20, textAlign: "right" }}><button onClick={handleNext} style={{ padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{current < QUIZ.length - 1 ? "Next Question" : "See Results"}</button></div>}
    </div>
  );
}

function Confetti() {
  const colors = ["#27AE60", "#2E75B6", "#D4A017", "#C0392B", "#1B2A4A", "#8B5CF6", "#EC4899"];
  const pieces = Array.from({ length: 50 }, (_, i) => ({ left: Math.random() * 100, delay: Math.random() * 2, dur: 2 + Math.random() * 2, size: 6 + Math.random() * 6, color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, isCircle: Math.random() > 0.5 }));
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: `${p.left}%`, top: -20, width: p.size, height: p.isCircle ? p.size : p.size * 1.5, background: p.color, borderRadius: p.isCircle ? "50%" : 2, transform: `rotate(${p.rot}deg)`, animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`, opacity: 0 }} />
      ))}
    </div>
  );
}

function CompletionScreen({ onReview }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease", position: "relative" }}>
      <Confetti />
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 40, color: "#1A5C2E", animation: "scaleIn 0.5s ease" }}>{"✓"}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>100%</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 4 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand the customer experience standard: professional conduct, the Invisible Crew principle, client communication scripts, and the Wow Checklist.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 4 practical session", "You will role-play client interaction scenarios with your trainer", "You will complete a cumulative simulation with a live client scenario during Stage 4", "Memorise the three client scripts and the escalation protocol"].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0ede6" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8f1fa", color: "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{t}</div>
          </div>
        ))}
      </div>
      <button onClick={onReview} style={{ padding: "14px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Review Session</button>
    </div>
  );
}

export default function Phase4({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 4 {"—"} Customer Experience Excellence</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete {"—"} you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "4"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 4: Customer Experience Excellence</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers professional conduct, the Invisible Crew principle, client communication scripts, the escalation protocol, and the Wow Checklist that delivers the DVG premium standard.</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>5 sections + comprehension quiz {"·"} approximately 25{"–"}35 minutes</p>
            <div style={{ textAlign: "left", margin: "0 auto", maxWidth: 420 }}>
              {SECTIONS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < SECTIONS.length - 1 ? "1px solid #e8e5de" : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: completedSections.has(i) ? "#d4edda" : "#e8f1fa", color: completedSections.has(i) ? "#1A5C2E" : "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{completedSections.has(i) ? "✓" : i + 1}</div>
                  <div style={{ fontSize: 15, color: "#333" }}>{s.title}</div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: quizPassed ? "#d4edda" : "#fff3cd", color: quizPassed ? "#1A5C2E" : "#7A6400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{quizPassed ? "✓" : "Q"}</div>
                <div style={{ fontSize: 15, color: "#333" }}>{quizPassed ? "Comprehension Quiz {'—'} Passed" : "Comprehension Quiz (80% to pass)"}</div>
              </div>
            </div>
            <button onClick={() => { setView(quizPassed ? "complete" : "learning"); setCurrentSection(0); }} style={{ marginTop: 32, padding: "14px 48px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{quizPassed ? "View Completion" : "Begin Module"}</button>
            {quizPassed && <button onClick={() => { setCurrentSection(0); setView("learning"); }} style={{ display: "block", margin: "12px auto 0", padding: "12px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Review Session</button>}
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 4 practical session. You will need to know the client scripts and escalation protocol.</div></div>}
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
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 4 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_4_complete", "true"); if (onComplete) onComplete(4); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy {"·"} DVG Facilities Management {"·"} Phase 4 Pre-Learning Module {"·"} v4.0</div>
    </div>
  );
}
