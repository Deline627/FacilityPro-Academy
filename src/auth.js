import { useState, useEffect } from "react";

export function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "", email: "", employeeId: "", role: "New Starter",
    password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "#fff",
    border: "1px solid #d8d5ce", borderRadius: 10, fontSize: 15,
    fontFamily: "inherit", color: "#333", outline: "none",
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: "#1B2A4A",
    marginBottom: 6, display: "block",
  };

  async function handleRegister() {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all required fields"); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match"); return;
    }
    try {
      const existing = await window.storage.get(`user:${form.email.toLowerCase()}`);
      if (existing) { setError("An account with this email already exists. Please log in."); return; }
    } catch (e) {}

    const userData = {
      name: form.name.trim(), email: form.email.toLowerCase().trim(),
      employeeId: form.employeeId.trim(), role: form.role,
      password: form.password, completedPhases: [],
      registeredAt: new Date().toISOString(),
    };
    await window.storage.set(`user:${userData.email}`, JSON.stringify(userData));
    await window.storage.set("current_session", JSON.stringify({ email: userData.email }));
    onLogin(userData);
  }

  async function handleLogin() {
    setError("");
    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password"); return;
    }
    try {
      const result = await window.storage.get(`user:${form.email.toLowerCase().trim()}`);
      const userData = JSON.parse(result.value);
      if (userData.password !== form.password) {
        setError("Incorrect password. Please try again."); return;
      }
      await window.storage.set("current_session", JSON.stringify({ email: userData.email }));
      onLogin(userData);
    } catch (e) {
      setError("No account found. Please register first.");
    }
  }

  async function handleForgot() {
    setError(""); setMsg("");
    if (!form.email.trim()) { setError("Please enter your email address"); return; }
    try {
      await window.storage.get(`user:${form.email.toLowerCase().trim()}`);
      setMsg("For now, use the Reset Password option below.");
      setMode("reset");
    } catch (e) {
      setError("No account found with this email.");
    }
  }

  async function handleReset() {
    setError("");
    if (!form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields"); return;
    }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    try {
      const result = await window.storage.get(`user:${form.email.toLowerCase().trim()}`);
      const userData = JSON.parse(result.value);
      userData.password = form.password;
      await window.storage.set(`user:${form.email.toLowerCase().trim()}`, JSON.stringify(userData));
      setMsg("Password reset successful. Please log in.");
      setMode("login");
      setForm(f => ({ ...f, password: "", confirmPassword: "" }));
    } catch (e) {
      setError("Error resetting password. Please try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        input:focus { border-color: #2E75B6 !important; box-shadow: 0 0 0 3px rgba(46,117,182,0.12); }
        select:focus { border-color: #2E75B6 !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ background: "#1B2A4A", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#27AE60", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>DVG</div>
        <div>
          <div style={{ fontSize: 11, color: "#b0c4de", fontWeight: 600, letterSpacing: "0.06em" }}>FACILITYPRO ACADEMY</div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>Training Platform</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
        <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.4s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 18, color: "#fff", fontWeight: 700 }}>DVG</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A", marginBottom: 6 }}>
              {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : mode === "forgot" ? "Forgot Password" : "Reset Password"}
            </h1>
            <p style={{ fontSize: 14, color: "#666" }}>
              {mode === "login" ? "Log in to continue your training" : mode === "register" ? "Set up your FacilityPro Academy profile" : mode === "forgot" ? "Enter your email to reset your password" : "Set a new password for your account"}
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", border: "1px solid #d8d5ce", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {msg && <div style={{ background: "#d4edda", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#1A5C2E", lineHeight: 1.5 }}>{msg}</div>}
            {error && <div style={{ background: "#fde8e8", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#C0392B", lineHeight: 1.5 }}>{error}</div>}

            {mode === "register" && (
              <>
                <label style={labelStyle}>Full Name <span style={{ color: "#C0392B" }}>*</span></label>
                <input style={{ ...inputStyle, marginBottom: 14 }} placeholder="e.g. John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <label style={labelStyle}>Email Address <span style={{ color: "#C0392B" }}>*</span></label>
                <input style={{ ...inputStyle, marginBottom: 14 }} type="email" placeholder="john.smith@dvg.co.uk" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <label style={labelStyle}>DVG Employee ID <span style={{ color: "#888", fontWeight: 400 }}>(if assigned)</span></label>
                <input style={{ ...inputStyle, marginBottom: 14 }} placeholder="e.g. DVG-0042" value={form.employeeId} onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))} />
                <label style={labelStyle}>Role</label>
                <select style={{ ...inputStyle, marginBottom: 14, cursor: "pointer" }} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  <option>New Starter</option>
                  <option>Operative</option>
                  <option>Crew Lead</option>
                  <option>Supervisor</option>
                  <option>Trainer</option>
                </select>
              </>
            )}

            {(mode === "login" || mode === "forgot" || mode === "reset") && (
              <>
                <label style={labelStyle}>Email Address</label>
                <input style={{ ...inputStyle, marginBottom: 14 }} type="email" placeholder="john.smith@dvg.co.uk" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </>
            )}

            {(mode === "login" || mode === "register" || mode === "reset") && (
              <>
                <label style={labelStyle}>{mode === "reset" ? "New Password" : "Password"} <span style={{ color: "#C0392B" }}>*</span></label>
                <input style={{ ...inputStyle, marginBottom: mode === "register" || mode === "reset" ? 14 : 20 }} type="password" placeholder={mode === "reset" ? "Enter new password" : "Enter password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </>
            )}

            {(mode === "register" || mode === "reset") && (
              <>
                <label style={labelStyle}>Confirm Password <span style={{ color: "#C0392B" }}>*</span></label>
                <input style={{ ...inputStyle, marginBottom: 20 }} type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} />
              </>
            )}

            <button
              onClick={() => { if (mode === "login") handleLogin(); else if (mode === "register") handleRegister(); else if (mode === "forgot") handleForgot(); else handleReset(); }}
              style={{ width: "100%", padding: "14px", background: "#1B2A4A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              {mode === "login" ? "Log In" : mode === "register" ? "Create Account" : mode === "forgot" ? "Send Reset Link" : "Reset Password"}
            </button>

            {mode === "login" && (
              <button onClick={() => { setMode("forgot"); setError(""); setMsg(""); }} style={{ width: "100%", padding: "10px", background: "none", border: "none", fontSize: 13, color: "#2E75B6", cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>
                Forgot your password?
              </button>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "#666" }}>
            {mode === "login" ? (
              <>{"Don't have an account? "}<button onClick={() => { setMode("register"); setError(""); setMsg(""); }} style={{ background: "none", border: "none", color: "#2E75B6", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Register</button></>
            ) : (
              <>{"Already have an account? "}<button onClick={() => { setMode("login"); setError(""); setMsg(""); }} style={{ background: "none", border: "none", color: "#2E75B6", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Log In</button></>
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "16px", fontSize: 12, color: "#999" }}>
        FacilityPro Academy · DVG Facilities Management · v4.0
      </div>
    </div>
  );
}

export function useSessionCheck() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await window.storage.get("current_session");
        if (session) {
          const email = JSON.parse(session.value).email;
          const userData = await window.storage.get(`user:${email}`);
          if (userData) setUser(JSON.parse(userData.value));
        }
      } catch (e) {}
      setLoading(false);
    }
    checkSession();
  }, []);

  return { user, setUser, loading };
}

export async function handleLogout(setUser) {
  try { await window.storage.delete("current_session"); } catch (e) {}
  setUser(null);
}

export async function savePhaseCompletion(userEmail, completedPhases) {
  try {
    const result = await window.storage.get(`user:${userEmail}`);
    if (result) {
      const userData = JSON.parse(result.value);
      userData.completedPhases = [...completedPhases];
      await window.storage.set(`user:${userEmail}`, JSON.stringify(userData));
    }
  } catch (e) {}
}
