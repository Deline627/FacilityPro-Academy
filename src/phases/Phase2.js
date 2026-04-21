import { useState, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "overview", title: "The 5-Stage Sequence", subtitle: "Section 1 of 5",
    content: [
      { type: "intro", text: "Aviation is the safest form of mass transport in history — not because pilots are superhuman, but because every action follows a verified sequence. DVG operates on the same principle. The 5-Stage Sequence is not a guideline. It is the procedure." },
      { type: "stages", items: [
        { num: "1", title: "Site Opening", desc: "Gain authorised access, establish presence, confirm readiness", color: "#2E75B6" },
        { num: "2", title: "Clock-In & Walkthrough", desc: "Log arrival, inspect entire site, identify variances before work begins", color: "#27AE60" },
        { num: "3", title: "Site Preparation", desc: "Set up equipment, assign crew roles, brief the team, set timer", color: "#D4800A" },
        { num: "4", title: "Service Delivery", desc: "Execute Dry and Wet workflows to DVG standard", color: "#C0392B" },
        { num: "5", title: "Final Walkthrough & Close", desc: "Inspect all areas, correct defects, submit forms, secure site, clock out", color: "#1B2A4A" },
      ]},
      { type: "callout", label: "SEQUENCE RULE", text: "No stage may be skipped or merged. Stage 4 cannot begin until Stage 3 is complete. Stage 5 cannot begin until Stage 4 is fully signed off. This sequence is the product.", color: "red" },
      { type: "heading", text: "Stage Transition Callouts" },
      { type: "intro", text: "Every transition between stages requires a verbal callout. This prevents stages from blurring together under time pressure. On solo jobs, you make the callout to yourself and log the transition time." },
      { type: "table", title: "Transition Callouts", rows: [
        { area: "Stage 1 → 2", standard: "Crew Lead: ‘Site open. Moving to walkthrough.’ — Crew: ‘Confirmed.’" },
        { area: "Stage 2 → 3", standard: "Crew Lead: ‘Walkthrough complete. Moving to preparation.’ — Crew: ‘Confirmed.’" },
        { area: "Stage 3 → 4", standard: "Crew Lead: ‘Preparation complete. Commencing service delivery.’ — Crew: ‘Confirmed. Dry lead ready. Wet lead ready.’" },
        { area: "Stage 4 → 5", standard: "Crew Lead: ‘Service delivery complete. Commencing final walkthrough.’ — Crew: ‘Confirmed.’" },
      ]},
      { type: "heading", text: "Challenge-and-Response Checklists" },
      { type: "intro", text: "On jobs with 2+ crew members, checklists use challenge-and-response: one person reads the item aloud, the other physically checks and confirms ‘Confirmed’ or ‘Not confirmed — [states issue].’ No item is ticked without physical verification. Ticking from memory is a procedure violation." },
    ]
  },
  {
    id: "stages12", title: "Stage 1: Site Opening & Stage 2: Walkthrough", subtitle: "Section 2 of 5",
    content: [
      { type: "heading", text: "Stage 1 — Site Opening" },
      { type: "intro", text: "The objective is to gain secure, authorised access and confirm the crew is present, equipped, and ready. This stage is about discipline — getting the basics right before anything else happens." },
      { type: "checklist", items: [
        "Arrive at the correct site address — confirmed against Eagle IO job sheet",
        "Use the correct access method (key safe / PIN / fob) and document in Eagle IO",
        "Confirm all crew members present and accounted for before entry",
        "Sign building access register if applicable",
        "Complete Eagle IO clock-in with site code immediately upon entering the building",
        "Park vehicle appropriately — not blocking access, signage, or emergency exits",
        "VERIFY: External door secured after entry — not propped open",
        "VERIFY: Eagle IO clock-in timestamp confirmed on screen",
      ]},
      { type: "heading", text: "Stage 2 — Clock-In and Walkthrough" },
      { type: "callout", label: "CRITICAL", text: "The walkthrough protects you. Any damage found after starting work but not documented before starting work will be assumed to have been caused by your crew. Walk the site — photograph everything.", color: "red" },
      { type: "intro", text: "Walk every room in scope. Check against the Eagle IO job sheet. Photograph any existing damage, stains, breakages, or hazards. Upload all photographs before commencing work." },
      { type: "heading", text: "Variance Decision Tree" },
      { type: "intro", text: "If the walkthrough reveals something unexpected, use this decision tree to determine the correct action:" },
      { type: "variance", items: [
        { level: "Low", type: "Minor cosmetic damage (scuffs, small stains)", action: "Photograph, log in Eagle IO, proceed" },
        { level: "Medium", type: "Area locked or inaccessible", action: "Log in Eagle IO, note affected tasks, proceed with remaining areas" },
        { level: "Medium", type: "Consumables insufficient", action: "Log in Eagle IO, notify supervisor, proceed with what’s available" },
        { level: "High", type: "Room layout significantly changed", action: "Contact supervisor BEFORE cleaning — scope may need revision" },
        { level: "High", type: "Floor type changed", action: "Contact supervisor — equipment and method may need to change" },
        { level: "Critical", type: "Safety hazard (flooding, electrical, structural)", action: "Invoke NO-GO protocol. Do not proceed. Contact supervisor immediately." },
      ]},
    ]
  },
  {
    id: "stage3", title: "Stage 3: Site Preparation", subtitle: "Section 3 of 5",
    content: [
      { type: "intro", text: "Stage 3 is the bridge between inspecting and executing. Everything that happens in Stage 4 depends on Stage 3 being done properly. Equipment staged, roles assigned, timer set, crew briefed." },
      { type: "checklist", items: [
        "Stage all equipment in the designated area — not in client corridors or offices",
        "Confirm all pre-filled chemical bottles are present, correctly labelled, and leak-free",
        "Lay out colour-coded cloths — all colours present and accounted for",
        "Assign crew roles: Dry lead and Wet lead confirmed",
        "Confirm job sequence — first room identified, route planned back-to-front",
        "Check vacuum is operational",
        "Prepare mop bucket with correct pre-filled floor cleaner",
        "Set the 10-minute warning timer based on allocated job time",
        "VERIFY: All crew members can state their assigned role and starting location",
      ]},
      { type: "heading", text: "Abort / No-Go Criteria" },
      { type: "intro", text: "The following conditions mean the job does not proceed. Contact your supervisor immediately. Do not commence cleaning until authorised." },
      { type: "table", title: "No-Go Conditions", rows: [
        { area: "Access failure", standard: "Site cannot be accessed using the documented method — do not force entry" },
        { area: "Safety hazard", standard: "Flooding, structural damage, gas smell, electrical fault — leave immediately" },
        { area: "Major layout change", standard: "Rooms reconfigured, floor type changed, areas inaccessible — get revised scope" },
        { area: "Critical equipment missing", standard: "No replacement available — do not improvise with client equipment" },
        { area: "Occupancy mismatch", standard: "Site occupied when it should be empty (or vice versa) — get instructions" },
      ]},
      { type: "callout", label: "NO-GO RULE", text: "A no-go decision is never wrong. It is always better to delay a job and get authorisation than to proceed into a situation that is unsafe or outside scope. No crew member will be penalised for making a no-go call in good faith.", color: "green" },
    ]
  },
  {
    id: "stage4", title: "Stage 4: Service Delivery", subtitle: "Section 4 of 5",
    content: [
      { type: "intro", text: "This is where the work happens. Stage 4 is the execution of both the Dry and Wet workflows in the correct sequence, to DVG standard, across all areas in scope. You covered the workflow basics in Phase 1 — now you execute them within the 5-Stage structure." },
      { type: "split", title: "The Two Workflows", left: {
        label: "DRY WORKFLOW", color: "#2E75B6",
        items: ["BINS: Empty all bins, reline correctly, wipe exteriors if soiled", "DUSTING: Top-down with blue cloth — shelving, desks, chair rails, skirting", "VACUUMING: Far end to exit, overlapping passes, edges and corners included"]
      }, right: {
        label: "WET WORKFLOW", color: "#27AE60",
        items: ["KITCHENS: Sanitise surfaces (GREEN cloth), 30s dwell time, clean sink, wipe appliances", "BATHROOMS: RED cloth for toilets (60s dwell), YELLOW for sinks/counters, mirrors last", "GLASS: White cloth, vertical passes, 45° angle check", "MOPPING: Always last — figure-8 motion, back to exit, change water between areas"]
      }},
      { type: "heading", text: "The 10-Minute Rule" },
      { type: "callout", label: "10-MINUTE RULE", text: "With 10 minutes remaining in the job window, all physical cleaning STOPS. The final 10 minutes are reserved exclusively for Stage 5 (Final Walkthrough). Cleaning that continues into Stage 5 time is a planning failure.", color: "amber" },
      { type: "intro", text: "During Stage 3, the Crew Lead calculates the target completion time and sets a timer. When the alarm sounds:" },
      { type: "checklist", items: [
        "Crew Lead calls: ‘Ten-minute mark. All cleaning stops. Moving to final walkthrough.’",
        "All crew members stop physical cleaning immediately",
        "If a critical task needs 2 more minutes maximum, complete it — otherwise proceed to Stage 5",
        "The timer is non-negotiable — it is set during Stage 3 and it is not extended",
      ]},
    ]
  },
  {
    id: "stage5", title: "Stage 5: Final Walkthrough & Close", subtitle: "Section 5 of 5",
    content: [
      { type: "intro", text: "Stage 5 is the quality gate. Nothing leaves your hands until every area passes the DVG Excellence Standard. This is where you prove the work, document the result, and secure the site." },
      { type: "checklist", items: [
        "Complete room-by-room inspection against the Excellence Standard",
        "Correct ALL defects before sign-off — do not leave a room with a known fault",
        "Remove all DVG equipment from the site — nothing left in client areas",
        "Return rooms to correct layout — furniture, bins in original positions",
        "Set lights, fans, heating to the state specified in the job notes",
        "Submit Eagle IO completion form with section sign-offs",
        "Complete Eagle IO clock-out",
        "Secure all access points — keys, fobs, codes handled per job instructions",
        "VERIFY: Every room passes the Excellence Standard — no exceptions",
        "VERIFY: Eagle IO clock-out timestamp confirmed on screen",
        "VERIFY: Site confirmed clear and secure before departure",
      ]},
      { type: "callout", label: "THE STANDARD", text: "If you would not be comfortable with your manager walking in immediately after you leave, the job is not finished. Stage 5 is where you confirm that standard has been met — not where you hope it has.", color: "blue" },
      { type: "heading", text: "What You Will Practise" },
      { type: "intro", text: "In your Phase 2 practical session, you will execute the full 5-Stage Sequence in a simulated environment. Your trainer will observe every stage transition callout, every checklist item, and every decision. You will also complete a blind SOP sequence test where you arrange 20 shuffled procedure cards into the correct order." },
      { type: "callout", label: "WHAT COMES NEXT", text: "After passing Phase 2, you move to Phase 3: Applied Crew Operations — where you execute the 5-Stage Sequence as part of a crew with role splitting, pace management, and the 10-minute rule under real time pressure.", color: "green" },
    ]
  },
];

const QUIZ = [
  { q: "How many stages are in the DVG cleaning sequence?", options: ["3", "4", "5", "7"], correct: 2 },
  { q: "What must happen at every stage transition?", options: ["A written report", "A verbal callout with crew confirmation", "A phone call to the supervisor", "A photograph uploaded to Eagle IO"], correct: 1 },
  { q: "What is the purpose of Stage 2 (Walkthrough)?", options: ["To start cleaning the dirtiest areas first", "To inspect the site and document existing conditions before work begins", "To set up equipment", "To brief the client on the schedule"], correct: 1 },
  { q: "Why must you photograph pre-existing damage during the walkthrough?", options: ["For social media", "Because the client requires it", "Because damage found after starting work will be assumed to be your fault", "To practice using Eagle IO"], correct: 2 },
  { q: "What is a ‘no-go’ decision?", options: ["Refusing to work overtime", "Deciding not to proceed with a job due to safety or scope issues", "Skipping a stage to save time", "Asking for a different site assignment"], correct: 1 },
  { q: "During Stage 3, what timer must the Crew Lead set?", options: ["A 5-minute break timer", "A 10-minute warning timer for the end of Stage 4", "A 30-minute lunch timer", "A 60-minute shift timer"], correct: 1 },
  { q: "What happens when the 10-minute timer sounds?", options: ["Take a break", "Speed up cleaning", "All cleaning stops — move to Final Walkthrough", "Call the supervisor"], correct: 2 },
  { q: "In challenge-and-response checklists, what is NOT acceptable?", options: ["Reading items aloud", "Physically checking each item", "Ticking items from memory without verification", "Saying ‘Not confirmed’ when something is wrong"], correct: 2 },
  { q: "What is the correct callout for Stage 3 → Stage 4?", options: ["‘Let’s start cleaning’", "‘Preparation complete. Commencing service delivery.’", "‘Moving to the next room’", "‘All clear’"], correct: 1 },
  { q: "In Stage 5, what must happen before you leave the site?", options: ["Nothing — just lock up", "Room-by-room inspection, defect correction, Eagle IO completion form, clock-out, and site secured", "Just submit the Eagle IO form", "Take a photo of the entrance"], correct: 1 },
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
        if (block.type === "stages") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((s, si) => (
              <div key={si} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>{s.num}</div>
                  {si < block.items.length - 1 && <div style={{ width: 2, height: 16, background: "#ddd", marginTop: 4 }} />}
                </div>
                <div style={{ paddingTop: 4 }}><div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>{s.title}</div><div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{s.desc}</div></div>
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
        if (block.type === "variance") return (
          <div key={i} style={{ margin: "20px 0", border: "1px solid #d8d5ce", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#1B2A4A", color: "#fff", padding: "11px 16px", fontSize: 14, fontWeight: 600 }}>Variance Decision Tree</div>
            {block.items.map((v, vi) => {
              const levelColors = { Low: { bg: "#d4edda", color: "#1A5C2E" }, Medium: { bg: "#fff3cd", color: "#7A6400" }, High: { bg: "#fde8e8", color: "#C0392B" }, Critical: { bg: "#C0392B", color: "#fff" } };
              const lc = levelColors[v.level];
              return (
                <div key={vi} style={{ display: "flex", alignItems: "stretch", borderBottom: vi < block.items.length - 1 ? "1px solid #e8e5de" : "none", background: vi % 2 === 0 ? "#fafaf7" : "#fff" }}>
                  <div style={{ width: 70, display: "flex", alignItems: "center", justifyContent: "center", background: lc.bg, flexShrink: 0 }}><span style={{ fontSize: 11, fontWeight: 700, color: lc.color, textTransform: "uppercase" }}>{v.level}</span></div>
                  <div style={{ flex: 1, padding: "10px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1B2A4A", marginBottom: 3 }}>{v.type}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{v.action}</div>
                  </div>
                </div>
              );
            })}
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
  const handleSelect = useCallback((idx) => { if (locked || answered) return; setLocked(true); setSelected(idx); setAnswered(true); if (idx === q.correct) setScore(s => s + 1); setTimeout(() => setLocked(false), 400); }, [locked, answered, q.correct]);
  function handleNext() { if (current < QUIZ.length - 1) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); setLocked(false); } else { setFinished(true); if (Math.round((score / QUIZ.length) * 100) >= 80) onComplete(score); } }
  const pct = Math.round((score / QUIZ.length) * 100); const passed = pct >= 80;
  if (finished) return (
    <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: passed ? "#d4edda" : "#fde8e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 42 }}>{passed ? "✓" : "✗"}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>{pct}%</div>
      <div style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>{score} of {QUIZ.length} correct</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: passed ? "#1A5C2E" : "#C0392B", marginBottom: 24 }}>{passed ? "Phase 2 Pre-Learning Complete" : "Not yet passed — 80% required"}</div>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>{passed ? "You are ready to attend your Phase 2 practical session. You will execute the full 5-Stage Sequence in a simulated environment." : "Review the sections you found difficult and retake the quiz. You need 8 out of 10 correct."}</div>
      {!passed && <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setLocked(false); }} style={{ marginTop: 24, padding: "14px 36px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Retake Quiz</button>}
    </div>
  );
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}><span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>QUESTION {current + 1} OF {QUIZ.length}</span><span style={{ fontSize: 13, color: "#555" }}>{score} correct so far</span></div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B2A4A", marginBottom: 20, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {q.options.map((opt, oi) => { let bg="#fff",border="1px solid #d8d5ce",col="#333"; if(answered){if(oi===q.correct){bg="#d4edda";border="2px solid #27AE60";col="#1A5C2E";}else if(oi===selected&&oi!==q.correct){bg="#fde8e8";border="2px solid #C0392B";col="#791F1F";}} return <button key={oi} onPointerDown={e=>{e.preventDefault();if(!answered&&!locked)handleSelect(oi);}} style={{textAlign:"left",padding:"16px 18px",background:bg,border,borderRadius:10,fontSize:15,color:col,cursor:answered?"default":"pointer",fontWeight:answered&&oi===q.correct?700:400,transition:"background 0.2s, border 0.2s",fontFamily:"inherit",touchAction:"manipulation",WebkitTapHighlightColor:"transparent",userSelect:"none"}}><span style={{fontWeight:700,marginRight:10,color:"#888"}}>{String.fromCharCode(65+oi)}</span> {opt}</button>; })}
      </div>
      {answered && <div style={{marginTop:20,textAlign:"right"}}><button onClick={handleNext} style={{padding:"14px 36px",background:"#1B2A4A",color:"#fff",border:"none",borderRadius:8,fontSize:15,fontWeight:600,cursor:"pointer"}}>{current<QUIZ.length-1?"Next Question":"See Results"}</button></div>}
    </div>
  );
}

function Confetti() { const colors=["#27AE60","#2E75B6","#D4A017","#C0392B","#1B2A4A","#8B5CF6","#EC4899"]; return <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:100,overflow:"hidden"}}>{Array.from({length:50},(_,i)=>{const p={left:Math.random()*100,delay:Math.random()*2,dur:2+Math.random()*2,size:6+Math.random()*6,color:colors[Math.floor(Math.random()*colors.length)],rot:Math.random()*360,shape:Math.random()>0.5};return <div key={i} style={{position:"absolute",left:`${p.left}%`,top:-20,width:p.size,height:p.shape?p.size:p.size*1.5,background:p.color,borderRadius:p.shape?"50%":2,transform:`rotate(${p.rot}deg)`,animation:`confettiFall ${p.dur}s ease-in ${p.delay}s forwards`,opacity:0}}/>;})}</div>; }

function CompletionScreen({ onReview }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease", position: "relative" }}>
      <Confetti />
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 40, color: "#1A5C2E", animation: "scaleIn 0.5s ease" }}>{"✓"}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>100%</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A5C2E", marginBottom: 12 }}>Phase 2 Pre-Learning Complete</h2>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>You now understand the 5-Stage Sequence that governs every DVG job. Your practical session will put this into action.</p>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #d8d5ce", textAlign: "left", maxWidth: 480, margin: "0 auto 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT TO DO NEXT</div>
        {["Attend your Phase 2 practical session", "You will execute the full 5-Stage Sequence in simulation", "Practise your stage transition callouts — you need them verbatim", "Your trainer will test you with a blind SOP sequence exercise"].map((t,i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0ede6" : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8f1fa", color: "#2E75B6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i+1}</div>
            <div style={{ fontSize: 14, color: "#3a3a3a", lineHeight: 1.6 }}>{t}</div>
          </div>
        ))}
      </div>
      <button onClick={onReview} style={{ padding: "14px 36px", background: "transparent", color: "#1B2A4A", border: "2px solid #1B2A4A", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Review Session</button>
    </div>
  );
}

export default function Phase2({ onBack, onComplete }) {
  const [view, setView] = useState("welcome"); const [currentSection, setCurrentSection] = useState(0); const [completedSections, setCompletedSections] = useState(new Set()); const [quizPassed, setQuizPassed] = useState(false); const contentRef = useRef(null);
  const totalSteps = SECTIONS.length + 1;
  const progress = quizPassed ? 100 : view === "welcome" ? 0 : view === "quiz" ? (completedSections.size / totalSteps) * 100 : ((currentSection + (completedSections.has(currentSection) ? 1 : 0)) / totalSteps) * 100;
  function completeSection() { setCompletedSections(prev => new Set([...prev, currentSection])); if (currentSection < SECTIONS.length - 1) { setCurrentSection(currentSection + 1); if (contentRef.current) contentRef.current.scrollTop = 0; } else { if (quizPassed) setView("complete"); else setView("quiz"); } }
  function goToSection(idx) { setCurrentSection(idx); setView("learning"); if (contentRef.current) contentRef.current.scrollTop = 0; }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{from{transform:scale(0)}to{transform:scale(1)}}@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}button:hover{opacity:0.88}*{box-sizing:border-box}`}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div><div style={{ fontSize: 13, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div><div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2 }}>Phase 2 — Pilot-Style SOP Execution</div></div>
        {view !== "welcome" && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{Math.round(progress)}%</span><div style={{ width: 80 }}><ProgressBar pct={progress} /></div></div>}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {view === "welcome" && (
          <div style={{ textAlign: "center", padding: "50px 20px", animation: "fadeUp 0.5s ease" }}>
            {quizPassed && <div style={{ background: "#d4edda", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{"✓"}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#1A5C2E" }}>Module complete — you have already passed</span></div>}
            <div style={{ width: 72, height: 72, borderRadius: 16, background: quizPassed ? "#27AE60" : "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, color: "#fff", fontWeight: 700 }}>{quizPassed ? "✓" : "2"}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Phase 2: Pilot-Style SOP Execution</h1>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 8px" }}>This module covers the 5-Stage Cleaning Sequence — the structured procedure that governs every DVG job. Stage transitions, checklists, the variance decision tree, and the 10-minute rule.</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>5 sections + comprehension quiz · approximately 35–45 minutes</p>
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
            {!quizPassed && <div style={{ marginTop: 32, padding: "14px 18px", background: "#e8f1fa", borderRadius: 10, textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: "#0C447C", letterSpacing: "0.04em", marginBottom: 4 }}>PRE-SESSION REQUIREMENT</div><div style={{ fontSize: 14, color: "#333", lineHeight: 1.65 }}>Complete this module and pass the quiz before attending your Phase 2 practical session. You will need to know the 5-Stage Sequence and all transition callouts.</div></div>}
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
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 24 }}>Phase 2 Knowledge Check</h2>
              <QuizView onComplete={() => { setQuizPassed(true); setView("complete"); localStorage.setItem("fp_phase_2_complete", "true"); if (onComplete) onComplete(2); }} />
            </div>
          </div>
        )}
        {view === "complete" && <CompletionScreen onReview={() => { setCurrentSection(0); setView("learning"); }} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#777" }}>FacilityPro Academy · DVG Facilities Management · Phase 2 Pre-Learning Module · v4.0</div>
    </div>
  );
}
