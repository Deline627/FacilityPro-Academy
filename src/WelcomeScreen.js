export default function WelcomeScreen({ userName, onGetStarted }) {
  const firstName = userName ? userName.split(" ")[0] : "there";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f5f0",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .welcome-card {
          transition: transform 240ms ease-out, box-shadow 240ms ease-out;
          cursor: pointer;
          outline: none;
        }
        .welcome-card:hover, .welcome-card:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(27, 42, 74, 0.12), 0 2px 8px rgba(39, 174, 96, 0.08);
        }
        .welcome-card:focus-visible {
          outline: 2px solid #2E75B6;
          outline-offset: 2px;
        }
        .welcome-card:active { transform: translateY(-1px); }
        button:active { transform: scale(0.97); }
      `}</style>

      {/* Header */}
      <div style={{ background: "#1B2A4A", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: "#27AE60", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>DvG</div>
        <div>
          <div style={{ fontSize: 11, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>Welcome</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px 40px", maxWidth: 580, margin: "0 auto", width: "100%" }}>

        {/* Star icon */}
        <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #1B2A4A 0%, #2E4A6E 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "scaleIn 0.5s ease", boxShadow: "0 4px 16px rgba(27,42,74,0.2)" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 3L22.5 12L32 13.5L25 20.5L26.5 30L18 25.5L9.5 30L11 20.5L4 13.5L13.5 12L18 3Z" fill="#27AE60" /></svg>
        </div>

        {/* Welcome heading */}
        <div style={{ textAlign: "center", marginBottom: 12, animation: "fadeUp 0.5s ease 0.1s both" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A", marginBottom: 8, lineHeight: 1.2 }}>Welcome, {firstName}.</h1>
          <div style={{ width: 40, height: 3, background: "#27AE60", borderRadius: 2, margin: "0 auto 16px" }} />
        </div>

        {/* Intro text */}
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.75, textAlign: "center", maxWidth: 440, marginBottom: 32, animation: "fadeUp 0.5s ease 0.2s both" }}>
          You're about to begin the FacilityPro Academy Intermediate Programme. Here's how your training journey works:
        </p>

        {/* GET STARTED */}
        <button
          onClick={onGetStarted}
          style={{
            padding: "16px 52px",
            background: "linear-gradient(135deg, #27AE60 0%, #1A8C4E 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 4px 14px rgba(39,174,96,0.3)",
            animation: "fadeUp 0.5s ease 0.3s both",
            letterSpacing: "0.02em",
            marginBottom: 40,
          }}
        >
          Get Started
        </button>

        {/* Three journey cards */}
        <div style={{ display: "flex", gap: 14, width: "100%", marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>

          {/* Card 1: Online Training */}
          <div className="welcome-card" tabIndex={0} role="article" style={{ flex: "1 1 155px", maxWidth: 195, background: "#fffdf9", borderRadius: 18, padding: "28px 18px 24px", textAlign: "center", border: "1px solid #ede9e1", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", animation: "fadeUp 0.5s ease 0.4s both" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#e8f1fa", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="4" width="22" height="15" rx="2.5" stroke="#2E75B6" strokeWidth="2" fill="none" />
                <line x1="9" y1="23" x2="19" y2="23" stroke="#2E75B6" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="19" x2="14" y2="23" stroke="#2E75B6" strokeWidth="2" />
                <path d="M12 9L12 14L16.5 11.5L12 9Z" fill="#2E75B6" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Online Training</div>
            <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>Complete 8 modules at your own pace with quizzes to check your understanding.</div>
          </div>

          {/* Card 2: Practical Training */}
          <div className="welcome-card" tabIndex={0} role="article" style={{ flex: "1 1 155px", maxWidth: 195, background: "#fffdf9", borderRadius: 18, padding: "28px 18px 24px", textAlign: "center", border: "1px solid #ede9e1", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", animation: "fadeUp 0.5s ease 0.5s both" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#d4edda", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="5" stroke="#27AE60" strokeWidth="2" fill="none" />
                <path d="M6 24C6 20 9.6 17 14 17C18.4 17 22 20 22 24" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M18 8L20 10L24 6" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Practical Training</div>
            <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>Hands-on sessions with your trainer, applying what you've learned on real jobs.</div>
          </div>

          {/* Card 3: Test & Certification */}
          <div className="welcome-card" tabIndex={0} role="article" style={{ flex: "1 1 155px", maxWidth: 195, background: "#fffdf9", borderRadius: 18, padding: "28px 18px 24px", textAlign: "center", border: "1px solid #ede9e1", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", animation: "fadeUp 0.5s ease 0.6s both" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#fff3cd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="3" width="18" height="22" rx="2.5" stroke="#D4800A" strokeWidth="2" fill="none" />
                <path d="M11 11L13 13L17 9" stroke="#D4800A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="10" y1="17" x2="18" y2="17" stroke="#D4800A" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="20" x2="15" y2="20" stroke="#D4800A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Test & Certify</div>
            <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>Pass the written knowledge check and earn your DVG Intermediate Certification.</div>
          </div>

        </div>

        {/* Footer note */}
        <p style={{ fontSize: 15, color: "#666", marginTop: 8, textAlign: "center", lineHeight: 1.6, animation: "fadeIn 0.5s ease 0.8s both" }}>
          Your trainer tracks your progress throughout the programme.
        </p>
      </div>
    </div>
  );
}
