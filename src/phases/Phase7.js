import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "ownership", title: "The Ownership Mindset", subtitle: "Section 1 of 4",
    content: [
      { type: "intro", text: "Phase 7 marks the transition from a skilled operative to a replicable asset. The goal is to produce crew members who can train others to the same standard they have been trained to — and who take ownership of outcomes rather than waiting to be managed." },
      { type: "heading", text: "Ownership vs Employee Thinking" },
      { type: "comparison", items: [
        { employee: "‘I finished my tasks’", ownership: "‘Is the site at the standard it needs to be?’" },
        { employee: "‘Nobody told me about that’", ownership: "‘I noticed it — I flagged it’" },
        { employee: "‘That’s not my job’", ownership: "‘I can handle this or I know who to call’" },
        { employee: "‘I’ll tell the supervisor later’", ownership: "‘I logged it in ConnectTeams as soon as I saw it’" },
        { employee: "‘The other crew member missed that’", ownership: "‘We missed that — let me fix it before we leave’" },
        { employee: "‘I just follow instructions’", ownership: "‘I know the standard — I apply it without being asked’" },
      ]},
      { type: "callout", label: "MINDSET", text: "You are not just cleaning a building. You are representing DVG’s reputation on that site. Every single time. Every bin liner, every mopped floor, every interaction with a client’s staff member is a vote for or against renewing that contract.", color: "blue" },
    ]
  },
  {
    id: "training", title: "Training Others — The Train-by-Show Method", subtitle: "Section 2 of 4",
    content: [
      { type: "intro", text: "An intermediate-level DVG operative is expected to be able to onboard and guide a new starter through Phases 1–3 of this programme. You cannot effectively train others in something you do not fully own yourself." },
      { type: "heading", text: "The 5-Step Method" },
      { type: "steps", items: [
        { num: "1", text: "I do, you watch — Demonstrate the full task at standard pace, narrating each step" },
        { num: "2", text: "I do, you help — Repeat the task. New starter assists and asks questions" },
        { num: "3", text: "You do, I watch — New starter completes the task. You observe without intervening" },
        { num: "4", text: "You do, I check — New starter completes independently. You inspect the result using the Zone Checklist" },
        { num: "5", text: "You do, you check — New starter completes the task and conducts their own self-inspection before coming to you" },
      ]},
      { type: "heading", text: "Common Training Errors — Avoid These" },
      { type: "errorList", items: [
        { error: "Doing it for them instead of coaching", why: "Builds dependency, not skill" },
        { error: "Skipping the narration in Step 1", why: "They cannot replicate what they do not understand" },
        { error: "Moving to Step 3 before Step 2 is solid", why: "Rushing creates bad habits that take weeks to correct" },
        { error: "Correcting the result without explaining the standard", why: "They will repeat the same error" },
        { error: "Training to your own shortcuts", why: "Only teach the SOP as written. Shortcuts are learned later, after the standard is embedded" },
      ]},
    ]
  },
  {
    id: "supervisor", title: "Thinking Like a Supervisor", subtitle: "Section 3 of 4",
    content: [
      { type: "intro", text: "Supervisory thinking is not about authority — it is about awareness. A supervisor sees the whole job, not just their zone." },
      { type: "heading", text: "The Supervisor Lens — What to Ask on Every Job" },
      { type: "checklist", items: [
        "Are we on pace? Will we finish Stage 4 with 10 minutes for Stage 5?",
        "Is everyone in the right role? Is the Dry/Wet split working as planned?",
        "Is any crew member struggling? Do they need a task swap or support?",
        "Has anything changed on site since the walkthrough? Is there an unlogged issue?",
        "Is the standard being maintained, or are we rushing as the job nears completion?",
        "Is ConnectTeams up to date — are all logs, photos, and notes current?",
      ]},
      { type: "heading", text: "Escalation Readiness" },
      { type: "intro", text: "A Lead Crew Member must be able to handle these five situations without freezing or guessing:" },
      { type: "table", title: "Escalation Scenarios", rows: [
        { area: "Crew member sick mid-job", standard: "Reassign tasks, adjust pace plan, notify supervisor immediately" },
        { area: "Scope changes on arrival", standard: "Do not agree — notify supervisor, get written confirmation before proceeding" },
        { area: "Equipment failure mid-job", standard: "Log in ConnectTeams, assess if job can continue, notify supervisor" },
        { area: "Quality complaint from client", standard: "Use complaint script, log immediately, call supervisor" },
        { area: "Safety hazard identified", standard: "Stop work in affected area, place hazard marker, notify supervisor before continuing" },
      ]},
    ]
  },
  {
    id: "practical", title: "Your Final Exercises & Certification", subtitle: "Section 4 of 4",
    content: [
      { type: "intro", text: "Phase 7 is the final phase before certification. Your practical session tests whether you can lead, train, and make decisions under pressure — not just execute tasks." },
      { type: "heading", text: "The Three Final Exercises" },
      { type: "table", title: "Phase 7 Exercises", rows: [
        { area: "Exercise 7A", standard: "Shadow Supervision — You act as Crew Lead on a full job. Trainer observes silently. You manage walkthrough, role assignment, pace, and inspection." },
        { area: "Exercise 7B", standard: "Teach-Back — You teach one phase to a new starter using the Train-by-Show method. Pass standard: the new starter can complete the task independently." },
        { area: "Exercise 7C", standard: "Failure-Mode Scenarios — 3 scenario cards: crew no-show, equipment failure, client scope addition. You must give the correct escalation response for all 3." },
      ]},
      { type: "heading", text: "After Phase 7 — The Written Knowledge Check" },
      { type: "intro", text: "After passing all Phase 7 exercises, you sit the final written knowledge check covering all 7 training phases. The pass mark is 80% (48 out of 60 marks). If you do not pass, you receive targeted revision on the failed sections and are re-tested within one week." },
      { type: "callout", label: "CERTIFICATION", text: "Upon passing the written knowledge check, you are certified as a DVG Intermediate Operative. This means you are authorised to work independently, lead a crew, and train new starters through Phases 1–3. Your certification is recorded in ConnectTeams and the Programme Completion Record.", color: "green" },
      { type: "callout", label: "YOUR JOURNEY — COMPLETE", text: "Phase 0: Foundation → Phase 1: Standards → Phase 2: 5-Stage Sequence → Phase 3: Crew Operations → Phase 4: Customer Experience → Phase 5: Quality Control → Phase 6: Health & Safety → Phase 7: Leadership → Written Check → Certified Intermediate Operative", color: "blue" },
    ]
  },
];

const QUIZ = [
  { q: "What is the difference between employee thinking and ownership thinking?", options: ["Ownership means doing more hours", "Ownership means taking responsibility for the outcome, not just the tasks", "They are the same thing", "Ownership means being the supervisor"], correct: 1 },
  { q: "What is Step 1 of the Train-by-Show method?", options: ["You do, I watch", "I do, you help", "I do, you watch — demonstrate at standard pace while narrating", "You do, you check"], correct: 2 },
  { q: "Why should you never skip the narration in Step 1?", options: ["It wastes time", "The new starter cannot replicate what they do not understand", "It is not required", "The supervisor will notice"], correct: 1 },
  { q: "What is the biggest risk of training to your own shortcuts?", options: ["You look unprofessional", "The new starter learns a non-standard method that may not work consistently", "Shortcuts are always better", "The supervisor will retrain them"], correct: 1 },
  { q: "What does the Supervisor Lens help you do?", options: ["See invisible problems", "Think about the whole job, not just your zone", "Replace the supervisor", "Work faster"], correct: 1 },
  { q: "A client arrives during Stage 2 and asks you to clean an extra room not on the job sheet. What do you do?", options: ["Clean it — the client is always right", "Refuse and explain it is not your job", "Do not agree or refuse — notify your supervisor and get written confirmation before proceeding", "Ignore the request"], correct: 2 },
  { q: "Your crew partner calls in sick mid-job. What is your first action?", options: ["Go home too", "Reassign tasks and adjust the pace plan, then notify your supervisor", "Skip the areas they were assigned", "Wait for instructions"], correct: 1 },
  { q: "In Exercise 7B (Teach-Back), what is the pass standard?", options: ["The trainer approves your presentation style", "You can recite the phase from memory", "The new starter can complete the assessed task independently after your teaching", "You finish within 30 minutes"], correct: 2 },
  { q: "What is the pass mark for the final written knowledge check?", options: ["60%", "70%", "80%", "90%"], correct: 2 },
  { q: "What does DVG Intermediate Certification authorise you to do?", options: ["Only clean supervised sites", "Work independently, lead a crew, and train new starters through Phases 1–3", "Become a manager", "Set your own schedule"], correct: 1 },
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
                <div style={{ flex: "0 0 28%", padding: "11px 14px", fontSize: 14, fontWeight: 600, color: "#1B2A4A", borderRight: "1px solid #e8e5de", lineHeight: 1.5 }}>{row.area}</div>
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
        if (block.type === "comparison") return (
          <div key={i} style={{ margin: "20px 0", border: "1px solid #d8d5ce", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", background: "#1B2A4A" }}>
              <div style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#ff8a8a", borderRight: "1px solid rgba(255,255,255,0.15)" }}>Employee Thinking</div>
              <div style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#90EE90" }}>Ownership Thinking</div>
            </div>
            {block.items.map((row, ri) => (
              <div key={ri} style={{ display: "flex", borderBottom: ri < block.items.length - 1 ? "1px solid #e8e5de" : "none", background: ri % 2 === 0 ? "#fafaf7" : "#fff" }}>
                <div style={{ flex: 1, padding: "10px 14px", fontSize: 14, color: "#791F1F", borderRight: "1px solid #e8e5de", lineHeight: 1.5 }}>{row.employee}</div>
                <div style={{ flex: 1, padding: "10px 14px", fontSize: 14, color: "#1A5C2E", lineHeight: 1.5, fontWeight: 500 }}>{row.ownership}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "errorList") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((item, ei) => (
              <div key={ei} style={{ padding: "10px 14px", borderBottom: ei < block.items.length - 1 ? "1px solid #f0ede6" : "none", background: ei % 2 === 0 ? "#fafaf7" : "#fff", borderRadius: ei === 0 ? "10px 10px 0 0" : ei === block.items.length - 1 ? "0 0 10px 10px" : 0, border: ei === 0 ? "1px solid #d8d5ce" : ei === block.items.length - 1 ? "1px solid #d8d5ce" : "0 1px solid #d8d5ce" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#C0392B", marginBottom: 3 }}>{item.error}</div>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{item.why}</div>
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
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 7 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your final practical session. You will lead a full job, teach a phase, and handle failure-mode scenarios. After passing, you sit the written knowledge check." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
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
  const colors = ["#27AE60", "#2E75B6", "#D4A017", "#FFD700", "#1B2A4A", "#8B5CF6", "#EC4899", "#FF6B6B"];
  const pieces = Array.from({ length: 80 }, (_, i) => ({ left: Math.random() * 100, delay: Math.random() * 2.5, dur: 2 + Math.random() * 3, size: 6 + Math.random() * 8, color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, isCircle: Math.random() > 0.5 }));
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: `${p.left}%`, top: -20, width: p.size, height: p.isCircle ? p.size : p.size * 1.5, background: p.color, borderRadius: p.isCircle ? "50%" : 2, transform: `rotate(${p.rot}deg)`, animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`, opacity: 0 }} />
      ))}
    </div>
  );
}

function CompletionScreen({ onReview, onBack }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease", position: "relative" }}>
      <Confetti />
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 40, color: "#1A5C2E", animation: "scaleIn 0.5s ease" }}>{"✓"}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>100%</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 7 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 12px" }}>You have completed the final pre-learning module of the FacilityPro Academy Intermediate Programme.</p>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand the ownership mindset, the Train-by-Show method, supervisory thinking, and how to handle escalation scenarios under pressure.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 7 practical session — the final practical", "You will lead a full job as Crew Lead (Exercise 7A)", "You will teach one phase to a new starter (Exercise 7B)", "You will handle 3 failure-mode scenarios (Exercise 7C)", "After passing, you sit the written knowledge check (80% to certify)"].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 4 ? "1px solid #f0ede6" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 4 ? "#d4edda" : "#e8f1fa", color: i === 4 ? "#1A5C2E" : "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i === 4 ? "★" : i + 1}</div>
            <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#e8f1fa", borderRadius: 10, padding: "14px 18px", maxWidth: 480, margin: "0 auto 24px", textAlign: "left" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>ALL PRE-LEARNING COMPLETE</div>
        <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>You have now completed all 8 pre-learning modules (Phase 0 through Phase 7). Your online theory journey is complete. What remains is your final practical session and the written knowledge check. Good luck.</div>
      </div>
      <button onClick={onReview} style={{ padding: "14px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Review Session</button>
      <button onClick={onBack} style={{ display: "block", margin: "16px auto 0", padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>← Back to Dashboard</button>
    </div>
  );
}

export default function Phase7({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 7 {"—"} Leadership & Replication</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete {"—"} you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "7"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 7: Leadership & Replication</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>The final phase. This module covers the ownership mindset, how to train others using the Train-by-Show method, supervisory thinking, and escalation readiness.</p>
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
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>FINAL PRE-LEARNING MODULE</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>This is the last online module before your final practical session and written knowledge check. Complete it and pass the quiz to unlock your certification pathway.</div></div>}
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
              <div style={{ fontSize: 13, color: "#D4800A", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>FINAL COMPREHENSION QUIZ</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 7 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_7_complete", "true"); if (onComplete) onComplete(7); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} onBack={onBack} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy {"·"} DVG Facilities Management {"·"} Phase 7 Pre-Learning Module {"·"} v4.0</div>
    </div>
  );
}
