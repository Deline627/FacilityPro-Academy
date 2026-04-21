import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "lone", title: "Lone Working", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "Health and safety is not a box-ticking exercise at DVG — it is a condition of employment. Every crew member is responsible for their own safety, the safety of their teammates, and the safety of everyone present on any site we service." },
      { type: "heading", text: "What Lone Working Means" },
      { type: "intro", text: "Lone working means being the sole DVG operative on a site or in a building. This carries specific responsibilities. It is not the same as simply working without a supervisor present." },
      { type: "checklist", items: [
        "Always inform your supervisor before beginning a lone working assignment — confirm site access, expected duration, and a check-in time",
        "Your mobile phone must be charged and accessible at all times — not in your bag, not on silent",
        "Complete clock-in and clock-out via ConnectTeams as normal — this is your digital presence record",
        "If you feel unsafe at any point — leave the site, secure it if possible, and call your supervisor immediately",
        "Do not use headphones or earphones while lone working — you must remain fully aware of your surroundings",
        "Report any incident, near-miss, or unusual occurrence to your supervisor before leaving the site",
      ]},
      { type: "callout", label: "SAFETY FIRST", text: "If you feel unsafe, leave. You do not need permission to leave an unsafe environment. Secure the site if you can, then call your supervisor from a safe location. No job is worth your personal safety.", color: "red" },
    ]
  },
  {
    id: "team", title: "Team Working & Earphone Policy", subtitle: "Section 2 of 5",
    content: [
      { type: "intro", text: "When working as part of a crew, communication and situational awareness are safety requirements — not optional. A crew member who cannot hear their teammates or respond to a site hazard is a liability to themselves and others." },
      { type: "callout", label: "EARPHONE / HEADPHONE POLICY", text: "Earphones and headphones are NOT permitted during any DVG shift. This applies on site, in common areas, in stairwells, and in car parks. The only exception is hands-free calls made with one ear free, in a non-public area of the site, and with supervisor awareness.", color: "red" },
      { type: "heading", text: "Team Working Safety Rules" },
      { type: "checklist", items: [
        "Always know where your team members are on site — check in verbally when moving between areas",
        "Never leave a site without confirming all crew members are present and accounted for",
        "If a teammate appears unwell, distressed, or impaired — stop work and notify the supervisor immediately. Do not attempt to manage it yourself",
        "Manual handling tasks (heavy equipment, mop buckets, bags) must be shared where possible — never strain to complete a lift alone",
      ]},
    ]
  },
  {
    id: "occupied", title: "Working on Occupied Sites", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "Some DVG contracts require cleaning during occupied hours — while the client’s staff, customers, or members of the public are present on site. This requires a higher level of care, professionalism, and hazard awareness." },
      { type: "checklist", items: [
        "Always place wet floor signs before mopping any area — remove only once the floor is completely dry",
        "Do not block corridors, fire exits, or stairwells with equipment at any time",
        "Chemical use on occupied sites must be minimal and well-ventilated — inform nearby occupants before applying strong-smelling products",
        "Vacuum cleaners, trolleys, and mop buckets must be positioned against walls — never in the centre of walkways",
        "If an occupant asks you to stop or move, comply immediately — then notify your supervisor so the scope can be adjusted",
      ]},
      { type: "callout", label: "OCCUPIED SITE PRINCIPLE", text: "On an occupied site, you are sharing the space with people who are working, visiting, or passing through. Every piece of equipment you place and every product you use becomes their hazard if you are not careful. Think like an occupant, not just a cleaner.", color: "amber" },
    ]
  },
  {
    id: "driving", title: "Safe Driving & Zero Tolerance", subtitle: "Section 4 of 5",
    content: [
      { type: "heading", text: "Safe Driving and Crew Transport" },
      { type: "intro", text: "DVG crew members frequently travel between sites. The same duty of care that applies on site applies on the road." },
      { type: "checklist", items: [
        "Mobile phones must not be used while driving — texting or app use at the wheel is a disciplinary matter",
        "All passengers must wear seatbelts at all times — the driver confirms this before moving off",
        "Equipment must be secured in the vehicle before travel — loose items are a hazard in transit",
        "Do not travel if you feel unsafe in the vehicle or are concerned about the driver’s fitness — contact your supervisor immediately",
      ]},
      { type: "heading", text: "Alcohol, Drugs, and Personal Conduct" },
      { type: "callout", label: "ZERO TOLERANCE", text: "DVG operates a zero-tolerance policy on alcohol and drug use. Attending a shift under the influence of alcohol or any non-prescribed substance is gross misconduct and grounds for immediate dismissal. This includes the morning after heavy consumption where impairment may still be present.", color: "red" },
      { type: "checklist", items: [
        "If you suspect a colleague is impaired — do not confront them directly. Remove yourself and contact your supervisor immediately",
        "Prescribed medication that may affect your ability to work safely must be declared to your supervisor before the shift — this is confidential, not disciplinary",
        "Professional conduct is expected at all times — aggressive, abusive, or threatening behaviour will not be tolerated",
      ]},
    ]
  },
  {
    id: "practical", title: "H&S in Practice — What You Will Be Tested On", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "Phase 6 is not just about knowing the policies — it’s about applying them under real job conditions. Your practical session tests whether you can spot and respond to safety hazards while maintaining your operational standard." },
      { type: "heading", text: "Exercise 6A: Scenario Cards" },
      { type: "intro", text: "Your trainer will present four scenario cards. You must identify the correct response for each, matching the specific policy from this phase:" },
      { type: "table", title: "The 4 Scenarios", rows: [
        { area: "Scenario 1", standard: "You are lone working and feel unsafe after hearing unexpected noise in the building" },
        { area: "Scenario 2", standard: "A crew member is wearing earphones on an occupied site and claims they can still hear" },
        { area: "Scenario 3", standard: "The driver on your crew seems drowsy and distracted before setting off to the next site" },
        { area: "Scenario 4", standard: "A colleague’s behaviour suggests they may be under the influence of alcohol" },
      ]},
      { type: "heading", text: "Exercise 6B: Cumulative Simulation with H&S Integration" },
      { type: "intro", text: "You will execute a full 5-stage job with all cumulative skills. During the simulation, the trainer introduces two safety hazards — one during Stage 2 (walkthrough) and one during Stage 4 (service delivery). You must identify and respond correctly without any prompting from the trainer." },
      { type: "callout", label: "NO PROMPTING RULE", text: "The trainer will not hint, gesture, or direct your attention toward any hazard. If you miss it, it is recorded as a fail. You must identify hazards through your own observation during the normal job flow. This tests whether safety awareness is embedded in your behaviour, not just your knowledge.", color: "red" },
      { type: "callout", label: "WHAT COMES NEXT", text: "After Phase 6, you move to Phase 7: Leadership and Replication — the final phase. You will learn the ownership mindset, how to train others using the Train-by-Show method, and how to think like a supervisor.", color: "green" },
    ]
  },
];

const QUIZ = [
  { q: "What is the first thing you should do if you feel unsafe while lone working?", options: ["Call a colleague", "Continue working but stay alert", "Leave the site, secure it if possible, and call your supervisor", "Wait until the end of your shift"], correct: 2 },
  { q: "What is DVG’s earphone policy?", options: ["Earphones are fine if the volume is low", "One earphone is permitted at all times", "Earphones are NOT permitted during any shift — with one specific exception for hands-free calls", "Earphones are only banned on occupied sites"], correct: 2 },
  { q: "What is the one permitted exception to the earphone policy?", options: ["Listening to podcasts while vacuuming", "Hands-free calls with one ear free, in a non-public area, with supervisor awareness", "Using noise-cancelling headphones in loud environments", "Wearing earbuds during breaks"], correct: 1 },
  { q: "Before mopping on an occupied site, what must you always do?", options: ["Ask the occupants to leave", "Place wet floor signs", "Mop quickly so no one slips", "Wait until everyone has gone home"], correct: 1 },
  { q: "Where should equipment be positioned on an occupied site?", options: ["In the centre of the room for easy access", "Against walls — never in the centre of walkways", "Wherever is most convenient", "In the car park"], correct: 1 },
  { q: "What does DVG’s zero-tolerance policy cover?", options: ["Being late to shifts", "Alcohol and drug use — including morning-after impairment", "Using the wrong colour cloth", "Taking personal phone calls"], correct: 1 },
  { q: "If you suspect a colleague is impaired by alcohol, what should you do?", options: ["Confront them directly", "Ignore it and keep working", "Remove yourself from the situation and contact your supervisor immediately", "Ask other colleagues what they think"], correct: 2 },
  { q: "Who is responsible for confirming all passengers are wearing seatbelts?", options: ["Each passenger individually", "The supervisor", "The driver", "Nobody — it’s optional"], correct: 2 },
  { q: "In Exercise 6B, what happens if the trainer has to prompt you to notice a hazard?", options: ["You get partial credit", "It counts as a pass with a note", "It is recorded as an automatic fail of the H&S component", "The trainer repeats the scenario"], correct: 2 },
  { q: "If prescribed medication may affect your ability to work safely, what must you do?", options: ["Take it after the shift instead", "Declare it to your supervisor before the shift — this is confidential, not disciplinary", "Only declare it if you feel impaired", "Nothing — it’s your private medical matter"], correct: 1 },
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
                <div style={{ flex: "0 0 25%", padding: "11px 14px", fontSize: 14, fontWeight: 600, color: "#1B2A4A", borderRight: "1px solid #e8e5de", lineHeight: 1.5 }}>{row.area}</div>
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
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 6 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your Phase 6 practical session. You will respond to H&S scenario cards and complete a simulation with embedded safety hazards." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
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
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 6 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand DVG{"'"}s health and safety requirements: lone working, earphone policy, occupied site procedures, safe driving, and the zero-tolerance policy.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 6 practical session", "You will respond to 4 H&S scenario cards with your group", "You will complete a cumulative simulation with embedded safety hazards", "Know every policy in this module — your responses must match the exact DVG standard"].map((t, i) => (
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

export default function Phase6({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 6 {"—"} Health & Safety</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete {"—"} you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "6"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 6: Health & Safety</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers lone working procedures, the earphone policy, occupied site safety, safe driving, and DVG{"'"}s zero-tolerance policy on alcohol and drugs.</p>
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
                <div style={{ fontSize: 15, color: "#333" }}>{quizPassed ? "Comprehension Quiz — Passed" : "Comprehension Quiz (80% to pass)"}</div>
              </div>
            </div>
            <button onClick={() => { setView(quizPassed ? "complete" : "learning"); setCurrentSection(0); }} style={{ marginTop: 32, padding: "14px 48px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{quizPassed ? "View Completion" : "Begin Module"}</button>
            {quizPassed && <button onClick={() => { setCurrentSection(0); setView("learning"); }} style={{ display: "block", margin: "12px auto 0", padding: "12px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Review Session</button>}
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 6 practical session. You must know every policy and the correct response for every scenario.</div></div>}
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
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 6 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_6_complete", "true"); if (onComplete) onComplete(6); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy {"·"} DVG Facilities Management {"·"} Phase 6 Pre-Learning Module {"·"} v4.0</div>
    </div>
  );
}
