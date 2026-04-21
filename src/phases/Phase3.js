import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "drywet", title: "The Dry/Wet System in Practice", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "In Phase 1 you learned the Dry and Wet workflows. In Phase 2 you placed them inside the 5-Stage Sequence. Now you learn how to run them in parallel as a crew — splitting, coordinating, and re-merging without cross-contamination." },
      { type: "heading", text: "Solo Jobs (Single Operative)" },
      { type: "intro", text: "When working alone, complete the entire Dry workflow across all rooms before starting any Wet tasks. This prevents re-contamination from bin handling while sanitising is underway." },
      { type: "callout", label: "SOLO SEQUENCE", text: "All bins → All dusting → All vacuuming → Kitchens → Bathrooms → All glass → All mopping. Complete each task across the whole site before moving to the next.", color: "blue" },
      { type: "heading", text: "Two-Person Crew Split" },
      { type: "split", title: "How the Roles Divide", left: {
        label: "DRY LEAD (Crew Member A)", color: "#2E75B6",
        items: ["Bins (all rooms) first", "Dusting (all rooms) second", "Vacuuming (follows dusting)", "Assists mopping on large floors"]
      }, right: {
        label: "WET LEAD (Crew Member B)", color: "#27AE60",
        items: ["Begins kitchens once Dry Lead clears that zone", "Moves to bathrooms after kitchens complete", "Glass last — after all wet surfaces done", "Mopping — final task, follows through all zones"]
      }},
      { type: "callout", label: "COORDINATION RULE", text: "Wet Lead must never enter a room to mop until Dry Lead has vacuumed it. Mopping before vacuuming means mopping up dust. Use a verbal callout: ‘[Room] vacuumed and clear.’ — ‘Confirmed, moving in to mop.’", color: "amber" },
      { type: "heading", text: "Larger Crews (3+ Operatives)" },
      { type: "checklist", items: [
        "Crew Lead assigns one Dry Lead, one Wet Lead, and additional operatives to zones",
        "Additional operatives shadow either Dry or Wet lead and take overflow rooms",
        "Crew Lead floats: monitors pace, quality-checks, and removes bottlenecks",
        "No operative works on both Dry and Wet simultaneously — cross-contamination risk",
      ]},
    ]
  },
  {
    id: "opposite", title: "Opposite-Direction Workflow", subtitle: "Section 2 of 5",
    content: [
      { type: "intro", text: "The opposite-direction workflow is a precision technique used in corridor-heavy commercial environments. It eliminates the most common source of wasted time: re-cleaning areas you have already walked through." },
      { type: "heading", text: "The Method" },
      { type: "steps", items: [
        { num: "1", text: "Crew member A starts at Door 1 (left side of corridor) and moves right" },
        { num: "2", text: "Crew member B starts at Door N (right side of corridor) and moves left" },
        { num: "3", text: "Both work the same task (e.g. dusting) in opposite directions, meeting in the middle" },
        { num: "4", text: "Neither crew member ever steps into the other’s completed zone" },
        { num: "5", text: "On completing the pass, both pivot and take the next task back in reverse" },
      ]},
      { type: "callout", label: "EFFICIENCY GAIN", text: "Directional discipline alone reduces job time by 12–18% on multi-room sites. Every minute saved on a site is a minute of margin for quality.", color: "green" },
      { type: "intro", text: "This technique requires trust and communication. You must know where your partner is at all times. If you break the direction — for example, by doubling back through a cleaned zone to retrieve equipment — you risk re-contaminating the floor and undoing your partner’s work." },
    ]
  },
  {
    id: "rotation", title: "Weekly Role Rotation", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "At DVG, no crew member permanently owns either the Dry or Wet workflow. Role rotation is mandatory on a weekly cycle. This is not optional — it is how DVG builds complete operatives." },
      { type: "heading", text: "Why We Rotate" },
      { type: "checklist", items: [
        "Builds complete operatives — not specialists who cannot cover for each other",
        "Prevents skill gaps when a crew member is absent",
        "Ensures every crew member understands the full standard, not just their half",
        "Builds the leadership pipeline — you cannot supervise what you have not personally done",
      ]},
      { type: "heading", text: "The 4-Week Rotation Cycle" },
      { type: "table", title: "Rotation Schedule", rows: [
        { area: "Week 1", standard: "Dry Lead — Bins, Dusting, Vacuuming" },
        { area: "Week 2", standard: "Wet Lead — Kitchens, Bathrooms, Glass, Mopping" },
        { area: "Week 3", standard: "Dry Lead with coaching responsibility (guide a newer crew member)" },
        { area: "Week 4", standard: "Wet Lead with coaching responsibility" },
      ]},
      { type: "callout", label: "TRACKING", text: "Rotation is tracked in Eagle IO by the Crew Supervisor. Any deviation from the schedule must be approved and logged. ‘We always do it this way’ is not an acceptable reason to skip rotation.", color: "blue" },
    ]
  },
  {
    id: "time", title: "Efficiency & Time Management", subtitle: "Section 4 of 5",
    content: [
      { type: "intro", text: "Every job in Eagle IO includes an allocated time window. Before beginning Stage 4, the Crew Lead must calculate the target completion time and confirm it is achievable given the crew size." },
      { type: "heading", text: "Expected Output Rates" },
      { type: "table", title: "Target Output by Crew Size", rows: [
        { area: "1 operative", standard: "Approximately 250–350 sq ft per hour (standard commercial)" },
        { area: "2 operatives (split)", standard: "Approximately 500–650 sq ft per hour" },
        { area: "3 operatives (zoned)", standard: "Approximately 750–900 sq ft per hour" },
      ]},
      { type: "heading", text: "Pace Rules" },
      { type: "checklist", items: [
        "Do not rush quality — rushing produces re-work which takes longer than doing it right",
        "If you are falling behind pace, communicate to the Crew Lead immediately — not at the end",
        "If additional time is needed, the Crew Lead contacts the supervisor before the scheduled end time",
        "Never leave a job incomplete without supervisor authorisation",
      ]},
      { type: "callout", label: "THE 10-MINUTE RULE (REMINDER)", text: "With 10 minutes remaining, all cleaning stops. The Crew Lead calls: ‘Ten-minute mark. All cleaning stops. Moving to final walkthrough.’ This timer is set during Stage 3 and is non-negotiable.", color: "amber" },
    ]
  },
  {
    id: "practical", title: "Putting It All Together", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "Phase 3 is where everything from Phases 1 and 2 becomes real operational behaviour. You are no longer learning individual procedures — you are executing them as part of a crew, under time pressure, with real coordination demands." },
      { type: "heading", text: "What You Will Practise" },
      { type: "intro", text: "Your Phase 3 practical session includes two exercises that test your ability to apply everything you have learned so far:" },
      { type: "table", title: "Phase 3 Exercises", rows: [
        { area: "Exercise 3A", standard: "Split-Role Timed Job — Execute Stage 4 as a Dry/Wet pair with verbal coordination callouts, under the 10-minute rule" },
        { area: "Exercise 3B", standard: "Cumulative 5-Stage Simulation — Full job from site opening to close, with a simulated variance during walkthrough. All callouts, all checklists, challenge-and-response." },
      ]},
      { type: "callout", label: "CUMULATIVE STANDARD", text: "From Phase 3 onward, every simulation is cumulative. All standards from all previous phases apply in full. You will not be told which skills are being assessed — you are expected to apply them all, every time.", color: "red" },
      { type: "heading", text: "What You Need to Know Cold" },
      { type: "checklist", items: [
        "The solo job sequence (all Dry across all rooms, then all Wet)",
        "The 2-person split: who does what, and the coordination callout for zone transitions",
        "The opposite-direction technique for corridors and multi-room layouts",
        "The 4-week rotation cycle and why it exists",
        "The target output rates for 1, 2, and 3-person crews",
        "The 10-minute rule — including the exact callout script",
      ]},
      { type: "callout", label: "WHAT COMES NEXT", text: "After Phase 3, you move to Phase 4: Customer Experience Excellence — where you learn how to manage client interactions, handle complaints, and deliver the ‘invisible crew’ standard that protects DVG’s reputation.", color: "green" },
    ]
  },
];

const QUIZ = [
  { q: "On a solo job, what is the correct sequence?", options: ["Alternate between Dry and Wet in each room", "Complete all Dry tasks across all rooms, then all Wet tasks", "Start with mopping, then vacuum", "Choose whichever workflow is faster"], correct: 1 },
  { q: "In a 2-person crew, who starts kitchen cleaning?", options: ["Dry Lead", "Wet Lead", "Whoever finishes first", "Both together"], correct: 1 },
  { q: "What must Wet Lead confirm before mopping a room?", options: ["That the client has left", "That Dry Lead has vacuumed it", "That 30 minutes have passed", "That the supervisor approves"], correct: 1 },
  { q: "What is the verbal callout when a room is ready for mopping?", options: ["‘Room done’", "‘[Room] vacuumed and clear’ — ‘Confirmed, moving in to mop’", "‘Next room please’", "No callout needed"], correct: 1 },
  { q: "In the opposite-direction technique, what do the two crew members do?", options: ["Work the same room together", "Start at opposite ends and work toward the middle", "One cleans, one inspects", "Take turns on each room"], correct: 1 },
  { q: "By how much can directional discipline reduce job time?", options: ["5–8%", "12–18%", "25–30%", "It doesn’t save time"], correct: 1 },
  { q: "Why does DVG rotate roles weekly?", options: ["To keep things interesting", "To build complete operatives who can cover any role", "Because the union requires it", "To punish underperformers"], correct: 1 },
  { q: "What is the expected output rate for a 2-person crew?", options: ["100–200 sq ft/hour", "250–350 sq ft/hour", "500–650 sq ft/hour", "1000+ sq ft/hour"], correct: 2 },
  { q: "If you are falling behind pace, when should you tell the Crew Lead?", options: ["At the end of the job", "During the final walkthrough", "Immediately when you realise", "Only if you can’t finish at all"], correct: 2 },
  { q: "From Phase 3 onward, what standard applies to all simulations?", options: ["Only the current phase is assessed", "Only Phases 2 and 3", "All standards from all previous phases apply in full", "The trainer decides what to assess"], correct: 2 },
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
        if (block.type === "split") return (
          <div key={i} style={{ margin: "20px 0" }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1B2A4A", marginBottom: 12 }}>{block.title}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[block.left, block.right].map((side, si) => (
                <div key={si} style={{ flex: "1 1 280px", borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
                  <div style={{ background: side.color, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>{side.label}</div>
                  <div style={{ padding: "12px 14px" }}>{side.items.map((item, ii) => <div key={ii} style={{ fontSize: 14, color: "#3a3a3a", padding: "6px 0", borderBottom: ii < side.items.length - 1 ? "1px solid #f0ede6" : "none", lineHeight: 1.55 }}>{item}</div>)}</div>
                </div>
              ))}
            </div>
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
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 3 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your Phase 3 practical session. You will execute split-role operations and a cumulative 5-stage simulation." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
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
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 3 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand crew operations {"—"} how to split roles, coordinate with your partner, manage pace, and execute under time pressure.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 3 practical session", "You will execute a split-role timed job as a Dry/Wet pair", "You will complete a full cumulative 5-stage simulation", "Practise your coordination callouts — you need them automatic"].map((t, i) => (
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

export default function Phase3({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 3 {"—"} Applied Crew Operations</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete — you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "3"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 3: Applied Crew Operations</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers how to work as a crew — the Dry/Wet split system, role assignment, opposite-direction technique, weekly rotation, and time management under real job pressure.</p>
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
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 3 practical session. You will need to understand crew splitting, coordination callouts, and the rotation system.</div></div>}
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
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 3 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_3_complete", "true"); if (onComplete) onComplete(3); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy {"·"} DVG Facilities Management {"·"} Phase 3 Pre-Learning Module {"·"} v4.0</div>
    </div>
  );
}
