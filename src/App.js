import { useState, useEffect } from "react";
import Phase0 from "./phases/Phase0";
import Phase1 from "./phases/Phase1";
import Phase2 from "./phases/Phase2";
import Phase3 from "./phases/Phase3";
import Phase4 from "./phases/Phase4";
import Phase5 from "./phases/Phase5";
import Phase6 from "./phases/Phase6";
import Phase7 from "./phases/Phase7";

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

const PHASES = [
  { num: 0, title: "Foundation", subtitle: "Who we are, the industry, chemicals & safety basics", component: Phase0 },
  { num: 1, title: "Foundations & Standardisation", subtitle: "The DVG excellence standard and cleaning workflows", component: Phase1 },
  { num: 2, title: "Pilot-Style SOP Execution", subtitle: "The complete 5-Stage Sequence end-to-end", component: Phase2 },
  { num: 3, title: "Applied Crew Operations", subtitle: "Running parallel workflows as a coordinated team", component: Phase3 },
  { num: 4, title: "Customer Experience Excellence", subtitle: "Professional client interactions on site", component: Phase4 },
  { num: 5, title: "Quality Control & Self-Inspection", subtitle: "DVG's 3-check system and defect correction", component: Phase5 },
  { num: 6, title: "Health & Safety", subtitle: "Lone working, site safety and zero-tolerance policies", component: Phase6 },
  { num: 7, title: "Leadership & Replication", subtitle: "The ownership mindset and training others", component: Phase7 },
];

function getCompleted() {
  return PHASES.map(p => localStorage.getItem(`fp_phase_${p.num}_complete`) === 'true');
}

export default function App() {
  const [currentPhase, setCurrentPhase] = useState(null);
  const [completed, setCompleted] = useState(getCompleted);

  useEffect(() => {
    if (currentPhase === null) setCompleted(getCompleted());
  }, [currentPhase]);

  function handleComplete() {
    setCompleted(getCompleted());
  }

  if (currentPhase !== null) {
    const PhaseComponent = PHASES[currentPhase].component;
    return (
      <div style={{ position: "relative" }}>
        <PhaseComponent
          onBack={() => setCurrentPhase(null)}
          onComplete={handleComplete}
        />
        <button
          onClick={() => setCurrentPhase(null)}
          style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 9999,
            background: "#1B2A4A", color: "#fff", border: "none",
            borderRadius: "50%", width: 52, height: 52, fontSize: 20,
            cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          title="Back to All Phases"
        >
          &#8962;
        </button>
      </div>
    );
  }

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / PHASES.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .phase-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.10) !important; }
        .phase-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      `}</style>

      <div style={{ background: "#1B2A4A", padding: "20px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.07em" }}>FACILITYPRO ACADEMY</div>
            <div style={{ fontSize: 18, color: "#fff", fontWeight: 700, marginTop: 2 }}>DVG Training Programme</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#b0c4de", marginBottom: 6 }}>{completedCount} of {PHASES.length} phases complete</div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 6, height: 6, width: 140, overflow: "hidden" }}>
              <div style={{ background: "#27AE60", height: "100%", width: `${progressPct}%`, borderRadius: 6, transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "28px", border: "1px solid #d8d5ce", marginBottom: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", margin: "0 0 8px" }}>Welcome to FacilityPro Academy</h1>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
            Complete each phase in order. Every phase has online pre-learning content followed by a comprehension quiz — you need <strong>80%</strong> to pass. Your progress is saved automatically.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {PHASES.map((phase, i) => {
            const isComplete = completed[i];
            const isNext = !isComplete && (i === 0 || completed[i - 1]);
            return (
              <div
                key={phase.num}
                className="phase-card"
                onClick={() => setCurrentPhase(i)}
                style={{
                  background: "#fff", borderRadius: 14, padding: "22px",
                  border: isComplete ? "2px solid #27AE60" : isNext ? "2px solid #2E75B6" : "1px solid #d8d5ce",
                  cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: isComplete ? "#27AE60" : isNext ? "#1B2A4A" : "#e8e5de",
                    color: isComplete || isNext ? "#fff" : "#888",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isComplete ? 20 : 16, fontWeight: 700, flexShrink: 0,
                  }}>
                    {isComplete ? "✓" : phase.num}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", padding: "4px 10px",
                    borderRadius: 20,
                    background: isComplete ? "#d4edda" : isNext ? "#e8f1fa" : "#f0ede6",
                    color: isComplete ? "#1A5C2E" : isNext ? "#0C447C" : "#888",
                  }}>
                    {isComplete ? "COMPLETE" : isNext ? "START NOW" : `PHASE ${phase.num}`}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A", marginBottom: 6 }}>
                  Phase {phase.num}: {phase.title}
                </div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.55 }}>{phase.subtitle}</div>
              </div>
            );
          })}
        </div>

        {completedCount > 0 && (
          <div style={{ marginTop: 32, background: "#fff", borderRadius: 14, padding: "22px 24px", border: "1px solid #d8d5ce", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>Overall Progress</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: completedCount === PHASES.length ? "#27AE60" : "#2E75B6" }}>{progressPct}%</div>
            </div>
            <div style={{ background: "#f0ede6", borderRadius: 8, height: 10, overflow: "hidden" }}>
              <div style={{ background: completedCount === PHASES.length ? "#27AE60" : "#2E75B6", height: "100%", width: `${progressPct}%`, borderRadius: 8, transition: "width 0.6s ease" }} />
            </div>
            {completedCount === PHASES.length && (
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 15, fontWeight: 600, color: "#1A5C2E" }}>
                All phases complete — you are ready for certification.
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px", fontSize: 13, color: "#999" }}>
        FacilityPro Academy · DVG Facilities Management · v4.0
      </div>
    </div>
  );
}
