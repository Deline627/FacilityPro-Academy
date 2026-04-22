import { useState, useEffect } from "react";
import Phase0 from "./phases/Phase0";
import Phase1 from "./phases/Phase1";
import Phase2 from "./phases/Phase2";
import Phase3 from "./phases/Phase3";
import Phase4 from "./phases/Phase4";
import Phase5 from "./phases/Phase5";
import Phase6 from "./phases/Phase6";
import Phase7 from "./phases/Phase7";
import { AuthScreen, useSessionCheck, handleLogout, savePhaseCompletion } from "./auth";
import { HomePage, PathwayPage, SOPPage, ToolsPage, TrainerPage, BottomNav, hasTrainerAccess } from "./dashboard";

// Storage adapter — wraps localStorage with async API
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
  { id: 0, title: "Foundation",                        subtitle: "Who we are, the industry, chemicals & safety basics",       sectionCount: 6,  component: Phase0 },
  { id: 1, title: "Foundations & Standardisation",     subtitle: "The DVG excellence standard and cleaning workflows",         sectionCount: 7,  component: Phase1 },
  { id: 2, title: "Pilot-Style SOP Execution",         subtitle: "The complete 5-Stage Sequence end-to-end",                  sectionCount: 8,  component: Phase2 },
  { id: 3, title: "Applied Crew Operations",           subtitle: "Running parallel workflows as a coordinated team",          sectionCount: 6,  component: Phase3 },
  { id: 4, title: "Customer Experience Excellence",    subtitle: "Professional client interactions on site",                  sectionCount: 6,  component: Phase4 },
  { id: 5, title: "Quality Control & Self-Inspection", subtitle: "DVG's 3-check system and defect correction",                sectionCount: 7,  component: Phase5 },
  { id: 6, title: "Health & Safety",                   subtitle: "Lone working, site safety and zero-tolerance policies",     sectionCount: 6,  component: Phase6 },
  { id: 7, title: "Leadership & Replication",          subtitle: "The ownership mindset and training others",                 sectionCount: 5,  component: Phase7 },
];

function getCompletedSet(userData) {
  if (userData && userData.completedPhases) {
    return new Set(userData.completedPhases);
  }
  const set = new Set();
  PHASES.forEach(p => {
    if (localStorage.getItem(`fp_phase_${p.id}_complete`) === 'true') set.add(p.id);
  });
  return set;
}

export default function App() {
  const { user, setUser, loading } = useSessionCheck();
  const [activePhase, setActivePhase] = useState(null);
  const [page, setPage] = useState("home");
  const [completedPhases, setCompletedPhases] = useState(() => getCompletedSet(null));

  useEffect(() => {
    if (activePhase === null) setCompletedPhases(getCompletedSet(user));
  }, [activePhase, user]);

  async function handleComplete(phaseNum) {
    const newSet = new Set(getCompletedSet(user));
    newSet.add(phaseNum);
    setCompletedPhases(newSet);
    if (user) await savePhaseCompletion(user.email, [...newSet]);
  }

  function onLogin(userData) {
    setUser(userData);
    setCompletedPhases(getCompletedSet(userData));
  }

  function openPhase(phase) {
    setActivePhase(phase.id);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ fontSize: 15, color: "#555" }}>Loading...</div>
    </div>
  );

  if (!user) return <AuthScreen onLogin={onLogin} />;

  // Phase module view
  if (activePhase !== null) {
    const phase = PHASES.find(p => p.id === activePhase);
    const PhaseComponent = phase.component;
    return (
      <div style={{ position: "relative", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; }`}</style>
        <PhaseComponent
          onBack={() => setActivePhase(null)}
          onComplete={handleComplete}
        />
        <button
          onClick={() => setActivePhase(null)}
          style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 9999,
            background: "#1B2A4A", color: "#fff", border: "none",
            borderRadius: "50%", width: 52, height: 52, fontSize: 20,
            cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          title="Back to Dashboard"
        >
          &#8962;
        </button>
      </div>
    );
  }

  // Dashboard view
  function renderPage() {
    switch (page) {
      case "home":
        return (
          <HomePage
            user={user}
            completedPhases={completedPhases}
            setPage={setPage}
            openPhase={openPhase}
            allPhases={PHASES}
          />
        );
      case "pathway":
        return (
          <PathwayPage
            completedPhases={completedPhases}
            openPhase={openPhase}
            allPhases={PHASES}
          />
        );
      case "sops":
        return <SOPPage />;
      case "tools":
        return <ToolsPage />;
      case "trainer":
        return hasTrainerAccess(user.role) ? <TrainerPage /> : null;
      default:
        return null;
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#1B2A4A", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#27AE60", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>DVG</div>
          <div>
            <div style={{ fontSize: 11, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div>
            <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>DVG Training Programme</div>
          </div>
        </div>
        <button
          onClick={() => handleLogout(setUser)}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "7px 13px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          Log Out
        </button>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 16px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          {renderPage()}
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNav page={page} setPage={setPage} userRole={user.role} />
    </div>
  );
}
