import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "mindset", title: "The Self-Inspection Mindset", subtitle: "Section 1 of 4",
    content: [
      { type: "intro", text: "A quality-controlled crew member does not wait for a supervisor to find the fault. They find it themselves. Self-inspection is the discipline of inspecting your own work with the same critical eye as an external auditor." },
      { type: "callout", label: "STANDARD", text: "Every area you complete must be inspected before you leave it. Not after you have moved three rooms ahead. Not at the end of the job. Immediately. The moment you finish an area, turn around and inspect it as if you are seeing it for the first time.", color: "blue" },
      { type: "intro", text: "This mindset separates a competent cleaner from a quality-controlled operative. The cleaning itself is the task. The inspection is the standard. Without inspection, you are hoping the work is right. With inspection, you know." },
    ]
  },
  {
    id: "zone", title: "The Zone Sign-Off Protocol", subtitle: "Section 2 of 4",
    content: [
      { type: "intro", text: "DVG uses a Zone-and-Sign approach for self-inspection. Every zone (room or defined area) must be physically signed off by the operative who cleaned it before they move to the next zone." },
      { type: "heading", text: "How to Sign Off a Zone" },
      { type: "steps", items: [
        { num: "1", text: "Stand at the entry point of the completed zone — look in from the door" },
        { num: "2", text: "Run the Zone Inspection Checklist visually before entering" },
        { num: "3", text: "Walk the zone using the Wall-to-Wall Method: enter at one corner, walk the perimeter clockwise, inspect every surface at eye level and below" },
        { num: "4", text: "Check glass and mirrors at a 45-degree angle — not head-on" },
        { num: "5", text: "Crouch to check floor level — dust, smears, and mop streaks show differently from below" },
        { num: "6", text: "If all items pass: call out ‘[Zone name] signed off’ to your crew partner or mark your site map" },
        { num: "7", text: "If any item fails: correct it immediately before leaving the zone" },
      ]},
      { type: "callout", label: "SIGN-OFF RULE", text: "Zone sign-off is physical, not mental. On team jobs, the operative calls out ‘[Zone] signed off’ and their crew partner acknowledges. On solo jobs, the operative marks a tick on their laminated site map. A zone that has not been physically or verbally signed off has not been inspected.", color: "amber" },
      { type: "heading", text: "Zone Inspection Checklist" },
      { type: "checklist", items: [
        "VERIFY: All surfaces dust-free — no visible particles, no missed edges",
        "VERIFY: No product residue or streaks on any surface",
        "VERIFY: Glass and mirrors streak-free at 45-degree angle check",
        "VERIFY: Floors — no debris, no tracks, no mop streaks",
        "VERIFY: Bins — lined, wiped, returned to position",
        "VERIFY: All furniture returned to original position",
        "VERIFY: Lighting confirmed — switches returned to pre-clean state",
        "VERIFY: No equipment, cloths, or supplies left in the zone",
        "VERIFY: No odour of chemicals — space smells clean and neutral",
      ]},
    ]
  },
  {
    id: "faults", title: "Common Faults — Recognition & Correction", subtitle: "Section 3 of 4",
    content: [
      { type: "intro", text: "These are the seven most common quality faults found during inspections. You need to know how to spot each one and how to fix it correctly." },
      { type: "faultCards", items: [
        { fault: "Dusting streaks on surfaces", identify: "Wipe finger across surface — if finger picks up residue, it was not fully cleaned", correct: "Re-dust with dry microfibre — remove all residue" },
        { fault: "Vacuum tracks on carpet", identify: "Look across carpet at low angle — tracks appear as light/dark bands", correct: "Re-vacuum in consistent directional passes" },
        { fault: "Mop streaks on hard floor", identify: "View floor at low angle from entry point — streaks reflect differently", correct: "Re-mop affected area with clean, wrung mop head" },
        { fault: "Glass smears", identify: "View at 45 degrees in natural light", correct: "Re-clean with clean microfibre and light spray" },
        { fault: "Bin liner too loose", identify: "Liner slides into bin or billows above rim", correct: "Replace with correct size liner — press flat against bin interior" },
        { fault: "Chemical smell after sanitising", identify: "Strong chemical odour means insufficient buffing", correct: "Buff surface dry with clean cloth — residue is not acceptable" },
        { fault: "Missed corner/edge on vacuuming", identify: "Visual check from room entry — edges and corners show debris easily", correct: "Re-vacuum edge with crevice attachment" },
      ]},
    ]
  },
  {
    id: "benchmarks", title: "Quality Benchmarks & What You Will Practise", subtitle: "Section 4 of 4",
    content: [
      { type: "intro", text: "Each area type has a specific benchmark test that tells you objectively whether the standard has been met. These are not subjective — they are pass/fail tests you can perform in seconds." },
      { type: "table", title: "Benchmark Tests by Area", rows: [
        { area: "Desk / Hard Surface", standard: "White cloth wipe test — cloth must come away clean after wiping" },
        { area: "Floor (vacuumed)", standard: "Crouch test — no visible debris at floor level viewed from entry" },
        { area: "Floor (mopped)", standard: "Dry within 10 minutes — no pooling, uniform appearance" },
        { area: "Mirror / Glass", standard: "45-degree angle test in natural light — no streaks visible" },
        { area: "Bathroom fixture", standard: "Finger test on tap or handle — no smears or residue" },
        { area: "Kitchen surface", standard: "Visual and smell test — clean surface, neutral odour, no residue" },
        { area: "Bin", standard: "Lift liner to confirm correct fit — liner should not slide when bin is moved" },
      ]},
      { type: "heading", text: "What You Will Practise" },
      { type: "intro", text: "Your Phase 5 practical session is the most comprehensive in the programme. You will complete two exercises:" },
      { type: "table", title: "Phase 5 Exercises", rows: [
        { area: "Exercise 5A", standard: "Planted Fault Correction — a room with 10 planted faults. You must find and fix at least 8 using the Zone Sign-Off Protocol." },
        { area: "Exercise 5B", standard: "90-minute cumulative simulation — full 5-stage job with all skills from Phases 1–5. Trainer plants 3–5 faults. You must catch them during self-inspection." },
      ]},
      { type: "callout", label: "THE MOST IMPORTANT SKILL", text: "Self-inspection is the skill that makes every other skill count. Perfect cleaning with no inspection is a gamble. Good cleaning with rigorous inspection is a guaranteed standard. Phase 5 is where you learn to guarantee the result.", color: "green" },
      { type: "callout", label: "WHAT COMES NEXT", text: "After Phase 5, you move to Phase 6: Health and Safety — covering lone working, earphone policy, occupied site procedures, safe driving, and zero-tolerance policies.", color: "blue" },
    ]
  },
];

const QUIZ = [
  { q: "When should you inspect an area you have cleaned?", options: ["At the end of the job", "When the supervisor arrives", "Immediately after completing it — before moving to the next zone", "Only if you think there might be a problem"], correct: 2 },
  { q: "What is the Zone Sign-Off Protocol?", options: ["A form the supervisor fills in", "A physical sign-off by the operative who cleaned the zone, before moving on", "A checklist completed at the end of the shift", "An automated system in ConnectTeams"], correct: 1 },
  { q: "In the Wall-to-Wall Method, how do you walk the zone?", options: ["Straight through the middle", "Enter at one corner, walk the perimeter clockwise, inspect every surface", "Only check the obvious areas", "Walk backwards from the exit"], correct: 1 },
  { q: "How should you check glass and mirrors?", options: ["Head-on from directly in front", "At a 45-degree angle in natural light", "From across the room", "Only when the client mentions it"], correct: 1 },
  { q: "How do you identify vacuum tracks on carpet?", options: ["Run your hand across it", "Look at it from directly above", "Look across the carpet at a low angle — tracks show as light/dark bands", "You can’t — they are invisible"], correct: 2 },
  { q: "What does the white cloth wipe test check?", options: ["Whether the cloth is clean", "Whether a desk or hard surface is properly dust-free", "Whether chemicals were used", "Whether the surface is dry"], correct: 1 },
  { q: "If a zone fails inspection, what must you do?", options: ["Note it for next time", "Tell your supervisor", "Correct it immediately before leaving the zone", "Move on and come back later"], correct: 2 },
  { q: "What does a strong chemical smell after sanitising indicate?", options: ["The surface is very clean", "Too much product was used or insufficient buffing", "The product is working correctly", "The room is well ventilated"], correct: 1 },
  { q: "On a team job, how do you sign off a zone?", options: ["Tick a mental checklist", "Call out ‘[Zone] signed off’ and your crew partner acknowledges", "Send a text message", "Wait for the Crew Lead to check"], correct: 1 },
  { q: "What is the benchmark test for a mopped floor?", options: ["Smells like floor cleaner", "Dry within 10 minutes — no pooling, uniform appearance", "Shiny and reflective", "No footprints visible"], correct: 1 },
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
            {block.items.map((item, ci) => {
              const isVerify = item.startsWith("VERIFY:");
              const displayText = isVerify ? item.substring(7).trim() : item;
              return (
                <div key={ci} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: ci < block.items.length - 1 ? "1px solid #f0ede6" : "none" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: isVerify ? "#e8f1fa" : "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: isVerify ? "#2E75B6" : "#1A5C2E", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{isVerify ? "V" : "✓"}</div>
                  <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{isVerify ? <><strong style={{ color: "#2E75B6" }}>VERIFY: </strong>{displayText}</> : displayText}</div>
                </div>
              );
            })}
          </div>
        );
        if (block.type === "steps") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((s, si) => (
              <div key={si} style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1B2A4A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{s.num}</div>
                  {si < block.items.length - 1 && <div style={{ width: 2, height: 12, background: "#ddd", marginTop: 4 }} />}
                </div>
                <div style={{ paddingTop: 6, fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{s.text}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "faultCards") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((f, fi) => (
              <div key={fi} style={{ borderRadius: 10, border: "1px solid #d8d5ce", marginBottom: 12, overflow: "hidden" }}>
                <div style={{ background: "#1B2A4A", color: "#fff", padding: "10px 14px", fontSize: 14, fontWeight: 600 }}>{f.fault}</div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6, marginBottom: 8 }}><strong style={{ color: "#D4800A" }}>How to spot it: </strong>{f.identify}</div>
                  <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6 }}><strong style={{ color: "#27AE60" }}>How to fix it: </strong>{f.correct}</div>
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
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 5 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your Phase 5 practical session. You will locate planted faults and complete the most comprehensive cumulative simulation in the programme." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
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
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 5 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand quality control and self-inspection: the Zone Sign-Off Protocol, common faults and corrections, and the benchmark tests that guarantee the DVG standard.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 5 practical session", "You will locate and correct 10 planted faults using the Zone Sign-Off Protocol", "You will complete a 90-minute cumulative simulation with self-inspection", "Know the 7 benchmark tests and all 7 common faults cold"].map((t, i) => (
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

export default function Phase5({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 5 {"—"} Quality Control & Self-Inspection</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete {"—"} you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "5"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 5: Quality Control & Self-Inspection</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers the self-inspection mindset, the Zone Sign-Off Protocol, how to identify and correct the 7 most common quality faults, and the benchmark tests for every area type.</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>4 sections + comprehension quiz {"·"} approximately 25{"–"}35 minutes</p>
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
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 5 practical session. You will need to know the Zone Sign-Off Protocol, all 7 common faults, and the benchmark tests.</div></div>}
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
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 5 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_5_complete", "true"); if (onComplete) onComplete(5); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy {"·"} DVG Facilities Management {"·"} Phase 5 Pre-Learning Module {"·"} v4.0</div>
    </div>
  );
}
