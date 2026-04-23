import { useState } from "react";

const ALL_NAV = [
  { id: "home",    label: "Home",     icon: "⌂" },
  { id: "pathway", label: "Training", icon: "🎯" },
  { id: "sops",    label: "SOPs",     icon: "📖" },
  { id: "tools",   label: "Tools",    icon: "🛠" },
  { id: "zone",    label: "Zone",     icon: "💡" },
];

export function getNavForRole(role) {
  return ALL_NAV;
}

export function hasTrainerAccess(role) {
  return role === "Trainer" || role === "Supervisor";
}

const SOPS = [
  { title: "Dry General Cleaning",    icon: "🧹", desc: "Blue cloth, dusting sequence, left-to-right pattern, edges-first vacuuming", color: "#2E75B6", file: "/sops/dry-general-cleaning.html" },
  { title: "Kitchen Cleaning",        icon: "🍳", desc: "Green cloth, 30-second dwell time, 8-step process, sanitise all surfaces",   color: "#27AE60", file: "/sops/kitchen-cleaning.html" },
  { title: "Washroom Cleaning",       icon: "🚿", desc: "Red/Yellow/White cloths, 60-second dwell, high-to-low direction",             color: "#C0392B", file: "/sops/washroom-cleaning.html" },
  { title: "Glass & Mirror Cleaning", icon: "✨", desc: "White cloth, vertical passes, multi-angle inspection, no-streak standard",    color: "#6C63FF", file: "/sops/glass-mirror-cleaning.html" },
  { title: "Mopping",                 icon: "🧽", desc: "Final wet task, figure-8 technique, dirty water hard-stop, no re-entry rule", color: "#D4800A", file: "/sops/mopping.html" },
];

const TOOLS = [
  { title: "Pocket Reference Card",       icon: "📋", desc: "5-Stage Sequence, callout scripts, 10-minute rule, colour coding, dwell times, no-go criteria", file: "/tools/pocket-reference-card.pdf" },
  { title: "Dwell Time Reference Card",   icon: "⏱",  desc: "Full chemical/dwell time table with non-negotiable rules for every DVG-approved product",       file: "/tools/dwell-time-reference-card.pdf" },
  { title: "Reinforcement Card Template", icon: "📝", desc: "3 procedures, self-check questions, observation task, trainer sign-off",                         file: "/tools/reinforcement-card-template.pdf" },
  { title: "Field Execution Sheet",       icon: "📄", desc: "5-Stage DO/VERIFY checklists, variance decision tree, job info, sign-off section",               file: "/tools/field-execution-sheet.pdf" },
];

function ProgressBar({ pct, light }) {
  return (
    <div style={{ background: light ? "rgba(255,255,255,0.15)" : "#e8e5de", borderRadius: 8, height: 6, width: "100%", overflow: "hidden" }}>
      <div style={{ background: light ? "#fff" : "#1B2A4A", height: "100%", width: `${pct}%`, borderRadius: 8, transition: "width 0.5s ease" }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    available: { bg: "#e8f1fa", color: "#2E75B6", text: "Available" },
    complete:  { bg: "#d4edda", color: "#1A5C2E", text: "Complete"  },
    locked:    { bg: "#e8e5de", color: "#888",    text: "Locked"    },
  };
  const s = styles[status] || styles.locked;
  return <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color }}>{s.text}</span>;
}

function SOPViewer({ sop, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#000", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1B2A4A", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: sop.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{sop.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{sop.title}</div>
        </div>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          ✕ Close
        </button>
      </div>
      <iframe
        src={sop.file}
        title={sop.title}
        style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
      />
    </div>
  );
}

function ViewDownloadButtons({ file, label }) {
  function handleView() {
    window.open(file, "_blank", "noopener,noreferrer");
  }
  function handleDownload() {
    const a = document.createElement("a");
    a.href = file;
    const ext = file.split(".").pop();
    a.download = label + "." + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
      <button
        onClick={handleView}
        style={{ flex: 1, padding: "8px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
      >
        View
      </button>
      <button
        onClick={handleDownload}
        style={{ flex: 1, padding: "8px", background: "#fff", color: "#1B2A4A", border: "1px solid #1B2A4A", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
      >
        Download
      </button>
    </div>
  );
}

export function HomePage({ user, completedPhases, setPage, openPhase, allPhases }) {
  const nextPhase = allPhases.find(p => !completedPhases.has(p.id));
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #2E4A6E 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 20, color: "#fff" }}>
        <div style={{ fontSize: 12, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>WELCOME BACK</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: "#c8d6e5" }}>{user.role}{user.employeeId ? ` · ${user.employeeId}` : ""}</div>
        <div style={{ fontSize: 13, color: "#c8d6e5", marginTop: 4 }}>{completedPhases.size} of {allPhases.length} modules complete</div>
        <div style={{ marginTop: 12 }}><ProgressBar pct={(completedPhases.size / allPhases.length) * 100} light /></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { page: "pathway", icon: "🎯", label: "Training",   sub: nextPhase ? `Phase ${nextPhase.id}` : "All done!" },
          { page: "sops",    icon: "📖", label: "SOPs",       sub: "5 references" },
          { page: "tools",   icon: "🛠",  label: "Field Tools", sub: "Cards & sheets" },
        ].map(item => (
          <button key={item.page} onClick={() => setPage(item.page)} style={{ background: "#fff", border: "1px solid #d8d5ce", borderRadius: 12, padding: "16px 14px", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{item.sub}</div>
          </button>
        ))}
        {hasTrainerAccess(user.role) && (
          <button onClick={() => setPage("trainer")} style={{ background: "#fff", border: "1px solid #d8d5ce", borderRadius: 12, padding: "16px 14px", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>🎓</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>Trainer Hub</div>
            <div style={{ fontSize: 12, color: "#666" }}>Restricted</div>
          </button>
        )}
      </div>

      {nextPhase && (
        <button onClick={() => openPhase(nextPhase)} style={{ width: "100%", background: "linear-gradient(135deg, #27AE60 0%, #1A8C4E 100%)", borderRadius: 14, padding: "18px 20px", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 4 }}>CONTINUE TRAINING</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Phase {nextPhase.id}: {nextPhase.title}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{nextPhase.sectionCount} sections · Quiz · Tap to start</div>
        </button>
      )}
    </div>
  );
}

export function PathwayPage({ completedPhases, openPhase, allPhases }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>Training Pathway</h2>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>Complete each phase in order. Pass the quiz to unlock the next.</p>
      {allPhases.map((phase, i) => {
        const isComplete  = completedPhases.has(phase.id);
        const isAvailable = !isComplete && (phase.id === 0 || completedPhases.has(phase.id - 1));
        const isLocked    = !isComplete && !isAvailable;
        return (
          <div key={i} onClick={() => isAvailable && openPhase(phase)} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${isLocked ? "#e8e5de" : "#d8d5ce"}`, padding: "14px 16px", marginBottom: 10, opacity: isLocked ? 0.55 : 1, cursor: isAvailable ? "pointer" : "default" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: isComplete ? "#27AE60" : isLocked ? "#ccc" : "#1B2A4A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                {isComplete ? "✓" : phase.id}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: isLocked ? "#999" : "#1B2A4A" }}>Phase {phase.id}: {phase.title}</div>
                <div style={{ fontSize: 12, color: isLocked ? "#bbb" : "#666", lineHeight: 1.4, marginTop: 2 }}>{phase.subtitle}</div>
              </div>
              <StatusBadge status={isComplete ? "complete" : isAvailable ? "available" : "locked"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SOPPage() {
  const [selectedSOP, setSelectedSOP] = useState(null);
  return (
    <>
      {selectedSOP && <SOPViewer sop={selectedSOP} onClose={() => setSelectedSOP(null)} />}
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>SOP Library</h2>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>Tap any card to open the full visual SOP guide.</p>
        {SOPS.map((sop, i) => (
          <div key={i} onClick={() => setSelectedSOP(sop)} style={{ background: "#fff", borderRadius: 12, border: "1px solid #d8d5ce", padding: "14px 16px", marginBottom: 10, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: sop.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{sop.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>{sop.title}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.4, marginTop: 2 }}>{sop.desc}</div>
              </div>
              <div style={{ fontSize: 18, color: "#ccc" }}>›</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ToolsPage() {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>Field Tools Hub</h2>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>View or download quick-reference tools for mobile use.</p>
      {TOOLS.map((tool, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid #d8d5ce", padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{tool.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 3 }}>{tool.title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{tool.desc}</div>
              <ViewDownloadButtons file={tool.file} label={tool.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TrainerPage() {
  const items = [
    { title: "Train the Trainer Module",    desc: "8-section certification guide with observation checklist",          status: "Available",   file: "/trainer/Train_the_Trainer_Module_v4.pdf"         },
    { title: "Version Control Protocol",    desc: "11-section document control system",                               status: "Available",   file: "/trainer/Version_Control_Protocol_v4.pdf"         },
    { title: "Training Tracker Explainer",  desc: "How to use the 5-sheet tracker — facilitator guide",              status: "Available",   file: "/trainer/DVG_Training_Tracker_Explainer_v4.pdf"   },
    { title: "Training Tracker (Excel)",    desc: "Trainee progress, phase detail, remediation log, dashboard",       status: "Available",   file: "/trainer/DVG_Training_Tracker_v4.xlsx"            },
    { title: "Training Manual v4",          desc: "Complete 7-phase training manual — trainer reference copy",        status: "Available",   file: "/trainer/FacilityPro_Academy_Training_Manual_v4.pdf" },
    { title: "Calibration Videos",         desc: "Correct delivery examples",                                        status: "Coming Soon", file: null },
    { title: "Update Briefings",            desc: "Change notifications",                                             status: "Coming Soon", file: null },
  ];
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #0F1D33 100%)", borderRadius: 14, padding: "20px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>RESTRICTED ACCESS</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Trainer Hub</div>
        <div style={{ fontSize: 13, color: "#c8d6e5", lineHeight: 1.5 }}>For certified trainers and training supervisors only.</div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid #d8d5ce", padding: "14px 16px", marginBottom: 8, opacity: item.status === "Coming Soon" ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1B2A4A" }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{item.desc}</div>
              {item.status === "Available" && item.file && (
                <ViewDownloadButtons file={item.file} label={item.title} />
              )}
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: item.status === "Available" ? "#d4edda" : "#fff3cd", color: item.status === "Available" ? "#1A5C2E" : "#7A6400", flexShrink: 0, marginLeft: 12 }}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const WEEKLY_CONTENT = [
  {
    week: 1, title: "Chemical Fundamentals", phase: "Phase 0",
    desc: "There are four categories of cleaning chemicals: detergents, degreasers, disinfectants, and acids. Each has a specific purpose. Using the wrong category on the wrong surface causes damage or leaves the job incomplete.",
    tip: "On your next job, check the label of every chemical you use. Can you name which of the four categories it falls into?",
    quiz: "What does a pH of 7 mean?",
    answer: "Neutral — like water. Below 7 is acidic, above 7 is alkaline."
  },
  {
    week: 2, title: "Dwell Time Discipline", phase: "Phase 1",
    desc: "Dwell time is the minimum contact time a chemical needs on a surface to work. Kitchen sanitiser needs 30 seconds. Bathroom disinfectant needs 60 seconds. Spraying and immediately wiping means the product did not do its job.",
    tip: "This week, consciously count every dwell time. Set a timer on your phone if needed. Are you really waiting the full 30 or 60 seconds?",
    quiz: "What is the minimum dwell time for bathroom disinfectant?",
    answer: "60 seconds. Applied with RED cloth, wait a full minute before wiping."
  },
  {
    week: 3, title: "Stage Transition Callouts", phase: "Phase 2",
    desc: "Every transition between stages requires a verbal callout. This prevents stages from blurring together under time pressure. On solo jobs, you still make the callout to yourself and log the transition time.",
    tip: "On your next job, make every stage transition callout clearly and wait for confirmation before proceeding. If working solo, say it out loud.",
    quiz: "What is the correct callout for Stage 3 to Stage 4?",
    answer: "'Preparation complete. Commencing service delivery.' Crew responds: 'Confirmed. Dry lead ready. Wet lead ready.'"
  },
  {
    week: 4, title: "Crew Coordination Callouts", phase: "Phase 3",
    desc: "Wet Lead must never enter a room to mop until Dry Lead has vacuumed it. Mopping before vacuuming means mopping up dust. The coordination callout prevents this.",
    tip: "When working in a pair this week, use the verbal handoff every single time: '[Room] vacuumed and clear.' — 'Confirmed, moving in to mop.'",
    quiz: "Why must Wet Lead wait for Dry Lead to finish vacuuming before mopping?",
    answer: "Because mopping before vacuuming means mopping up dust — the floor will not be clean."
  },
  {
    week: 5, title: "The Invisible Crew Standard", phase: "Phase 4",
    desc: "The ideal DVG experience for a client is: they arrive to a perfectly clean site and would not know we had been there — except for the results. No noise, no marks, no items left behind.",
    tip: "Before leaving each room this week, stop and ask: can I tell a cleaning crew was here? If yes — find what is giving it away and fix it.",
    quiz: "What should you do if a client raises a concern about a missed area?",
    answer: "Thank them, say you will address it right away, and let your supervisor know. Never be defensive, never blame."
  },
  {
    week: 6, title: "Zone Sign-Off Precision", phase: "Phase 5",
    desc: "Every zone must be physically signed off before you move on. Stand at the entry point, run the 9-point checklist visually, walk the perimeter clockwise, and check glass at 45 degrees.",
    tip: "After completing each room this week, stop at the doorway. Run the checklist. Call out the sign-off. Make it automatic — not something you think about, something you do.",
    quiz: "What is the Wall-to-Wall inspection method?",
    answer: "Enter at one corner, walk the perimeter clockwise, inspect every surface at eye level and below."
  },
  {
    week: 7, title: "Lone Working Safety", phase: "Phase 6",
    desc: "When lone working, your phone must be charged and accessible at all times — not in your bag, not on silent. No earphones. If you feel unsafe, leave the site immediately and call your supervisor.",
    tip: "Before your next lone working shift, confirm three things: phone charged above 80%, supervisor knows your schedule and check-in time, and you know the site exit routes.",
    quiz: "What is the first thing you should do if you feel unsafe while lone working?",
    answer: "Leave the site, secure it if possible, and call your supervisor from a safe location."
  },
  {
    week: 8, title: "Ownership Thinking", phase: "Phase 7",
    desc: "Ownership thinking means treating every site as if your own business depends on it. The difference between 'I finished my tasks' and 'Is the site at the standard it needs to be?' is the difference between an employee and an owner.",
    tip: "On your next job, before clocking out, ask yourself the Supervisor Lens questions: Are we on pace? Is the standard maintained? Is ConnectTeams up to date? Would I be comfortable if the client walked in right now?",
    quiz: "What is the difference between employee thinking and ownership thinking?",
    answer: "Employee thinking focuses on completing assigned tasks. Ownership thinking focuses on the outcome — is the standard met, regardless of whose task it was."
  },
];

const LAUNCH_DATE = new Date("2026-04-23");

function getCurrentWeekIndex() {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeks = Math.floor((Date.now() - LAUNCH_DATE.getTime()) / msPerWeek);
  return ((weeks % 8) + 8) % 8;
}

export function ReinforcementZonePage() {
  const [revealed, setRevealed] = useState(false);
  const idx = getCurrentWeekIndex();
  const current = WEEKLY_CONTENT[idx];
  const next = WEEKLY_CONTENT[(idx + 1) % 8];

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ background: "linear-gradient(135deg, #27AE60 0%, #1A8C4E 100%)", borderRadius: 14, padding: "20px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>WEEK {current.week} OF 8</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Reinforcement Zone</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>Weekly micro-learning — self-reflection, no scoring.</div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#27AE60", letterSpacing: "0.08em", marginBottom: 8 }}>THIS WEEK</div>
      <div style={{ background: "#fff", borderRadius: 14, border: "2px solid #27AE60", padding: "18px 16px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{current.title}</div>
            <div style={{ fontSize: 12, color: "#27AE60", fontWeight: 600, marginTop: 2 }}>Reinforces: {current.phase}</div>
          </div>
          <div style={{ background: "#27AE60", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 10 }}>Week {current.week}</div>
        </div>

        <div style={{ fontSize: 13, color: "#444", lineHeight: 1.65, marginBottom: 14 }}>{current.desc}</div>

        <div style={{ background: "#f0faf4", borderRadius: 10, padding: "12px 14px", marginBottom: 14, borderLeft: "3px solid #27AE60" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1A8C4E", letterSpacing: "0.06em", marginBottom: 4 }}>THIS WEEK'S ACTION</div>
          <div style={{ fontSize: 13, color: "#333", lineHeight: 1.55 }}>{current.tip}</div>
        </div>

        <div style={{ background: "#f7f5f0", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A", letterSpacing: "0.06em", marginBottom: 6 }}>QUICK CHECK</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1B2A4A", lineHeight: 1.5, marginBottom: 12 }}>{current.quiz}</div>
          {!revealed ? (
            <button onClick={() => setRevealed(true)} style={{ background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
              Reveal Answer
            </button>
          ) : (
            <div style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #d4edda" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#27AE60", letterSpacing: "0.06em", marginBottom: 4 }}>ANSWER</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.55 }}>{current.answer}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.08em", marginBottom: 8 }}>NEXT WEEK</div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e5de", padding: "14px 16px", opacity: 0.65 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>{next.title}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>Reinforces: {next.phase}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#999", background: "#f0f0f0", padding: "3px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 10 }}>Week {next.week}</div>
        </div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 8, fontStyle: "italic" }}>Opens next week</div>
      </div>
    </div>
  );
}

export function BottomNav({ page, setPage, userRole }) {
  const navItems = getNavForRole(userRole);
  return (
    <div style={{ background: "#fff", borderTop: "1px solid #e0ddd6", display: "flex", justifyContent: "space-around", padding: "6px 0 10px", flexShrink: 0 }}>
      {navItems.map(n => (
        <button key={n.id} onClick={() => setPage(n.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 1, padding: "4px 6px", fontFamily: "inherit", minWidth: 48 }}>
          <div style={{ fontSize: 18, opacity: page === n.id ? 1 : 0.4 }}>{n.icon}</div>
          <div style={{ fontSize: 10, fontWeight: page === n.id ? 700 : 500, color: page === n.id ? "#1B2A4A" : "#999" }}>{n.label}</div>
          {page === n.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#27AE60" }} />}
        </button>
      ))}
    </div>
  );
}
