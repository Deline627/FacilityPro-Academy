import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "excellence", title: "The DVG Excellence Standard", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "Excellence is not subjective at DVG. It is measurable. Every output you produce on a client site must meet the following standards before you leave the building." },
      { type: "table", title: "The 8 Areas of Excellence", rows: [
        { area: "Surfaces & Desks", standard: "Visually dust-free. No streaks, product residue, or missed edges" },
        { area: "Floors (Vacuumed)", standard: "No visible debris, lint, or tracks. Corners and edges included" },
        { area: "Floors (Mopped)", standard: "Streak-free, no pooling water, uniform sheen under light" },
        { area: "Glass & Partitions", standard: "Zero smears visible when viewed at an angle in natural light" },
        { area: "Bins", standard: "Liner replaced, bin exterior wiped, returned to correct position" },
        { area: "Kitchens", standard: "Surfaces sanitised, sink clean and dry, appliance exteriors wiped" },
        { area: "Bathrooms", standard: "Fixtures sanitised, mirrors streak-free, floors mopped, odour neutral" },
        { area: "General Odour", standard: "Space smells clean and neutral — not masked by heavy fragrance" },
      ]},
      { type: "callout", label: "THE STANDARD", text: "If you would not be comfortable with your manager inspecting this area immediately after you leave it, it is not finished. That is the only benchmark that matters.", color: "blue" },
    ]
  },
  {
    id: "workflows", title: "Cleaning Systems & Workflows", subtitle: "Section 2 of 5",
    content: [
      { type: "intro", text: "DVG operates two parallel workflow systems on every job. Understanding both is non-negotiable." },
      { type: "split", title: "The Dry/Wet Split System", left: {
        label: "DRY WORKFLOW", color: "#2E75B6",
        items: ["Sequence: Bins → Dusting → Vacuuming", "Equipment: Bin liners, microfibre cloths, vacuum", "Sanitising: Not required", "Completes first on most jobs"]
      }, right: {
        label: "WET WORKFLOW", color: "#27AE60",
        items: ["Sequence: Kitchens → Bathrooms → Glass → Mopping", "Equipment: Colour-coded cloths, mop & bucket, glass spray", "Sanitising: Required in Kitchens and Bathrooms", "Mopping is always the last task"]
      }},
      { type: "callout", label: "KEY RULE", text: "Mopping is always the final task. Mopping before glass or bathrooms are complete creates re-work and re-contamination.", color: "green" },
      { type: "heading", text: "Directional Rules" },
      { type: "principle", icon: "↓", title: "Top-Down", text: "Always clean from the highest surface to the lowest. Dust falls downward — cleaning floors before high surfaces means cleaning them twice." },
      { type: "principle", icon: "→", title: "Back-to-Front", text: "Start at the far end of the room and work toward the exit. This prevents walking over cleaned areas." },
    ]
  },
  {
    id: "equipment", title: "Equipment, Chemicals & Dwell Times", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "All chemicals are pre-filled at the Company Stock Depot. Crew members do not dilute chemicals on site. Over-application wastes product and damages surfaces. Under-application fails to sanitise." },
      { type: "table", title: "Chemical Usage", rows: [
        { area: "Multi-surface cleaner", standard: "Desks, counters, hard surfaces — NOT screens or glass" },
        { area: "Sanitiser / Disinfectant", standard: "Kitchen surfaces, bathroom fixtures, high-touch points — do NOT mix" },
        { area: "Glass cleaner", standard: "Windows, mirrors, partitions — NOT anti-glare screens" },
        { area: "Descaler", standard: "Limescale on taps, sinks, bowls — NOT stonework or chrome" },
        { area: "Floor cleaner (neutral)", standard: "All hard floor mopping — NOT carpet or wood" },
      ]},
      { type: "heading", text: "Dwell Time Standards" },
      { type: "intro", text: "Dwell time is the minimum contact time a sanitiser must remain wet on a surface before wiping. Wiping before dwell time expires means the surface has NOT been sanitised." },
      { type: "dwell", times: [
        { product: "Sanitiser / Disinfectant spray", time: "30 seconds", color: "#27AE60" },
        { product: "Bathroom disinfectant", time: "60 seconds", color: "#C0392B" },
        { product: "Descaler", time: "3 minutes", color: "#1B2A4A" },
      ]},
      { type: "callout", label: "RULE", text: "Do NOT wipe before dwell time expires. If the Dwell Time Card is missing, check the product label or contact your supervisor. Never guess.", color: "amber" },
    ]
  },
  {
    id: "colourcoding", title: "Colour Coding System", subtitle: "Section 4 of 5",
    content: [
      { type: "intro", text: "DVG uses a strict colour coding system for all cloths and equipment. This is a hygiene protocol, not a preference. Mixing colours is a disciplinary matter." },
      { type: "colours", items: [
        { colour: "RED", hex: "#C0392B", zone: "Toilets and urinals ONLY", detail: "Never use a red cloth on any other surface" },
        { colour: "YELLOW", hex: "#D4A017", zone: "Bathroom sinks, counters, fixtures", detail: "Excluding toilet — that is red only" },
        { colour: "GREEN", hex: "#27AE60", zone: "Kitchen surfaces, sinks, food-contact areas", detail: "All kitchen cleaning tasks" },
        { colour: "BLUE", hex: "#2E75B6", zone: "General — desks, offices, reception", detail: "Standard office surface cleaning" },
        { colour: "WHITE", hex: "#888888", zone: "Glass and screens only", detail: "Laundered between every job" },
      ]},
      { type: "callout", label: "HYGIENE ALERT", text: "A red cloth that enters a kitchen surface is a cross-contamination incident. All colour-coded equipment is inspected before and after every job.", color: "red" },
    ]
  },
  {
    id: "reporting", title: "Reporting & Eagle IO", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "Every DVG job generates a digital paper trail. This protects the business, the client, and proves the standard of your work. Eagle IO is DVG’s sole job management platform." },
      { type: "table", title: "Mandatory Reporting Events", rows: [
        { area: "Arriving on site", standard: "Clock in via Eagle IO with site code" },
        { area: "Pre-job damage", standard: "Photograph and log immediately before starting work" },
        { area: "Job completion", standard: "Submit completion form with section sign-offs" },
        { area: "Equipment fault", standard: "Log via Eagle IO — do not improvise with client equipment" },
        { area: "Client interaction", standard: "Log notes and notify supervisor immediately" },
        { area: "Injury or near-miss", standard: "Complete incident report before leaving site" },
      ]},
      { type: "callout", label: "THE GOLDEN RULE", text: "If it is not logged in Eagle IO, it did not happen. Verbal reports do not protect you, the team, or the company.", color: "blue" },
    ]
  },
];

const QUIZ = [
  { q: "How many areas are in the DVG Excellence Standard?", options: ["6", "7", "8", "10"], correct: 2 },
  { q: "What is the correct Dry Workflow sequence?", options: ["Dusting → Bins → Vacuuming", "Bins → Vacuuming → Dusting", "Bins → Dusting → Vacuuming", "Vacuuming → Dusting → Bins"], correct: 2 },
  { q: "Which task is always the LAST in the Wet Workflow?", options: ["Glass cleaning", "Bathroom sanitising", "Kitchen cleaning", "Mopping"], correct: 3 },
  { q: "What does ‘Top-Down’ mean?", options: ["Clean the top floor first", "Clean from the highest surface to the lowest", "Start with the most important task", "Work from the entrance downward"], correct: 1 },
  { q: "What is the minimum dwell time for bathroom disinfectant?", options: ["15 seconds", "30 seconds", "60 seconds", "3 minutes"], correct: 2 },
  { q: "Which colour cloth is used for toilets?", options: ["Yellow", "Green", "Blue", "Red"], correct: 3 },
  { q: "What colour cloth is used for kitchen surfaces?", options: ["Blue", "Green", "Red", "White"], correct: 1 },
  { q: "What happens if you use a RED cloth on a kitchen surface?", options: ["Nothing — it works the same", "It is a cross-contamination incident", "You just need to rewash it", "The supervisor is notified"], correct: 1 },
  { q: "When must you clock in via Eagle IO?", options: ["After setting up equipment", "Before starting cleaning", "Immediately upon entering the building", "When the supervisor confirms"], correct: 2 },
  { q: "What is the Golden Rule of Reporting?", options: ["Report to your supervisor verbally", "Only log serious incidents", "If it is not in Eagle IO, it did not happen", "Complete reports at the end of the week"], correct: 2 },
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
                <div style={{ flex: "0 0 35%", padding: "11px 14px", fontSize: 14, fontWeight: 600, color: "#1B2A4A", borderRight: "1px solid #e8e5de", lineHeight: 1.5 }}>{row.area}</div>
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
                <div key={si} style={{ flex: "1 1 280px", borderRadius: 10, overflow: "hidden", border: "1px solid #d8d5ce" }}>
                  <div style={{ background: side.color, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>{side.label}</div>
                  <div style={{ padding: "12px 14px" }}>
                    {side.items.map((item, ii) => <div key={ii} style={{ fontSize: 14, color: "#3a3a3a", padding: "6px 0", borderBottom: ii < side.items.length - 1 ? "1px solid #f0ede6" : "none", lineHeight: 1.55 }}>{item}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        if (block.type === "principle") return (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", margin: "16px 0", padding: "14px 16px", background: "#fafaf7", borderRadius: 10, border: "1px solid #e8e5de" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1B2A4A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{block.icon}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>{block.title}</div>
              <div style={{ fontSize: 14, color: "#444", lineHeight: 1.65 }}>{block.text}</div>
            </div>
          </div>
        );
        if (block.type === "dwell") return (
          <div key={i} style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
            {block.times.map((t, ti) => (
              <div key={ti} style={{ flex: "1 1 160px", textAlign: "center", padding: "18px 12px", borderRadius: 10, border: `2px solid ${t.color}`, background: "#fff" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: t.color }}>{t.time}</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.4 }}>{t.product}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "colours") return (
          <div key={i} style={{ margin: "20px 0", border: "1px solid #d8d5ce", borderRadius: 10, overflow: "hidden" }}>
            {block.items.map((c, ci) => (
              <div key={ci} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 14px", borderBottom: ci < block.items.length - 1 ? "1px solid #e8e5de" : "none", background: ci % 2 === 0 ? "#fafaf7" : "#fff" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.hex, border: c.colour === "WHITE" ? "2px solid #bbb" : "none", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.hex === "#888888" ? "#333" : c.hex }}>{c.colour}</div>
                  <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.4 }}>{c.zone}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{c.detail}</div>
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
    if (current < QUIZ.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setLocked(false);
    } else {
      setFinished(true);
      const finalPct = ((score + (selected === q.correct ? 0 : 0)) / QUIZ.length) * 100;
      if (finalPct >= 80) onComplete(score);
    }
  }

  const finalScore = score;
  const pct = Math.round((finalScore / QUIZ.length) * 100);
  const passed = pct >= 80;

  if (finished) return (
    <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: passed ? "#d4edda" : "#fde8e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 42 }}>
        {passed ? "✓" : "✗"}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>{pct}%</div>
      <div style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>{finalScore} of {QUIZ.length} correct</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>
        {passed ? "Phase 1 Pre-Learning Complete" : "Not yet passed — 80% required"}
      </div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
        {passed ? "You are ready to attend your Phase 1 practical session. Your completion has been recorded." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct to proceed."}
      </div>
      {!passed && <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setLocked(false); }} style={{ marginTop: 24, padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Retake Quiz</button>}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: "#555", fontWeight: 600, letterSpacing: "0.03em" }}>QUESTION {current + 1} OF {QUIZ.length}</span>
        <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{score} correct so far</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", marginBottom: 20, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {q.options.map((opt, oi) => {
          let bg = "#fff";
          let border = "1px solid #d8d5ce";
          let col = "#333";
          if (answered) {
            if (oi === q.correct) { bg = "#d4edda"; border = "2px solid #27AE60"; col = "#1A5C2E"; }
            else if (oi === selected && oi !== q.correct) { bg = "#fde8e8"; border = "2px solid #C0392B"; col = "#791F1F"; }
          }
          return (
            <button key={oi} onPointerDown={(e) => { e.preventDefault(); if (!answered && !locked) handleSelect(oi); }} style={{ textAlign: "left", padding: "16px 18px", background: bg, border, borderRadius: 10, fontSize: 15, color: col, cursor: answered ? "default" : "pointer", fontWeight: answered && oi === q.correct ? 700 : 400, transition: "background 0.2s, border 0.2s", fontFamily: "inherit", touchAction: "manipulation", WebkitTapHighlightColor: "transparent", userSelect: "none", WebkitUserSelect: "none" }}>
              <span style={{ fontWeight: 700, marginRight: 10, color: "#888" }}>{String.fromCharCode(65 + oi)}</span> {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <button onClick={handleNext} style={{ padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {current < QUIZ.length - 1 ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}

function Confetti() {
  const colors = ["#27AE60", "#2E75B6", "#D4A017", "#C0392B", "#1B2A4A", "#8B5CF6", "#EC4899"];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`,
          top: -20,
          width: p.size,
          height: p.shape === "rect" ? p.size * 1.5 : p.size,
          background: p.color,
          borderRadius: p.shape === "circle" ? "50%" : 2,
          transform: `rotate(${p.rotation}deg)`,
          animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

function CompletionScreen({ onReview, score }) {
  const [showConfetti, setShowConfetti] = useState(true);
  return (
    <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease", position: "relative" }}>
      {showConfetti && <Confetti />}
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 40, color: "#1A5C2E", animation: "scaleIn 0.5s ease" }}>{"✓"}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>100%</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 1 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>Congratulations! You have completed the Phase 1 theory module and passed the comprehension quiz. You are ready to attend your practical session.</p>

      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {[
          "Attend your scheduled Phase 1 practical session",
          "Your trainer will verify your completion at the start",
          "The practical session covers Exercises 1A, 1B, and 1C",
          "Bring your Pocket Reference Card — your trainer will issue one if you do not have it",
        ].map((text, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0ede6" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8f1fa", color: "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{text}</div>
          </div>
        ))}
      </div>

      <button onClick={onReview} style={{ padding: "14px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
        Review Session
      </button>
    </div>
  );
}

export default function Phase1({ onBack, onComplete }) {
  const [view, setView] = useState("welcome");
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [quizPassed, setQuizPassed] = useState(false);
  const contentRef = useRef(null);

  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;

  function completeSection() {
    setCompletedSections(prev => new Set([...prev, currentSection]));
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } else {
      if (quizPassed) {
        setView("complete");
      } else {
        setView("quiz");
      }
    }
  }

  function goToSection(idx) {
    setCurrentSection(idx);
    setView("learning");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }

  function handleQuizComplete(s) {
    setQuizPassed(true);
    setView("complete");
    localStorage.setItem("fp_phase_1_complete", "true");
    if (onComplete) onComplete(1);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
        button:hover { opacity: 0.88; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div>
          <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 1 — Foundations & Standardisation</div>
        </div>
        {view !== "welcome" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span>
            <div style={{ width: 80 }}><ProgressBar pct={progress} /></div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>

        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && (
              <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{"✓"}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete — you have already passed this quiz</span>
              </div>
            )}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "1"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 1: Foundations & Standardisation</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers the DVG Excellence Standard, cleaning workflows, equipment and chemicals, colour coding, and reporting requirements.</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>5 sections + comprehension quiz · approximately 30–40 minutes</p>

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

            <button onClick={() => { setView(quizPassed ? "complete" : "learning"); setCurrentSection(0); }} style={{ marginTop: 32, padding: "14px 48px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {quizPassed ? "View Completion" : "Begin Module"}
            </button>

            {quizPassed && (
              <button onClick={() => { setCurrentSection(0); setView("learning"); }} style={{ display: "block", margin: "12px auto 0", padding: "12px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Review Session
              </button>
            )}

            {!quizPassed && (
              <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div>
                <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 1 practical session. Your trainer will verify your completion at the start of the session.</div>
              </div>
            )}
          </div>
        )}

        {view === "learning" && (
          <div style={{ padding: "24px 0 40px", animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {SECTIONS.map((s, i) => (
                <button key={i} onClick={() => goToSection(i)} style={{ width: i === currentSection ? 28 : 10, height: 10, borderRadius: 5, background: completedSections.has(i) ? "#27AE60" : i === currentSection ? "#1B2A4A" : "#ccc", border: "none", cursor: "pointer", transition: "all 0.3s" }} title={s.title} />
              ))}
              <div style={{ width: 10, height: 10, borderRadius: 5, background: quizPassed ? "#27AE60" : "#ccc" }} title="Quiz" />
            </div>

            <div ref={contentRef} style={{ background: "#fff", borderRadius: 14, padding: "32px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #d8d5ce" }}>
              <div style={{ fontSize: 13, color: "#2E75B6", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>{SECTIONS[currentSection].subtitle}</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>{SECTIONS[currentSection].title}</h2>
              <SectionContent section={SECTIONS[currentSection]} />

              <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid #e8e5de" }}>
                {currentSection > 0 ? (
                  <button onClick={() => goToSection(currentSection - 1)} style={{ padding: "12px 24px", background: "transparent", color: "#555", border: "1px solid #ccc", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Previous</button>
                ) : <div />}
                <button onClick={completeSection} style={{ padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {currentSection < SECTIONS.length - 1 ? "Continue" : (quizPassed ? "View Completion" : "Take the Quiz")}
                </button>
              </div>
            </div>
          </div>
        )}

        {view === "quiz" && !quizPassed && (
          <div style={{ padding: "24px 0 40px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {SECTIONS.map((s, i) => (
                <button key={i} onClick={() => goToSection(i)} style={{ width: 10, height: 10, borderRadius: 5, background: completedSections.has(i) ? "#27AE60" : "#ccc", border: "none", cursor: "pointer" }} title={s.title} />
              ))}
              <div style={{ width: 28, height: 10, borderRadius: 5, background: "#D4A017" }} title="Quiz" />
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "32px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #d8d5ce" }}>
              <div style={{ fontSize: 13, color: "#D4800A", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>COMPREHENSION QUIZ</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 1 Knowledge Check</h2>
              <QuizView onComplete={handleQuizComplete} />
            </div>
          </div>
        )}

        {view === "complete" && (
          <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>
        FacilityPro Academy · DVG Facilities Management · Phase 1 Pre-Learning Module · v4.0
      </div>
    </div>
  );
}
