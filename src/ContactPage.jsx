import { useState } from "react";

export default function ContactPage({ plan, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", museum: "", role: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.museum) return;
    
    // ایمیل به خودت — از EmailJS یا Formspree
    await fetch("https://formspree.io/f/mykvlwko", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, plan }),
    });
    
    setSent(true);
  };

  return (
    <>
      <style>{`
        .cp { min-height: 100dvh; background: #0A0906; display: flex; align-items: center; justify-content: center; padding: 40px 20px; font-family: 'Outfit', sans-serif; }
        .cp-box { width: 100%; max-width: 520px; }
        .cp-back { background: none; border: none; color: #6E6860; cursor: pointer; font-size: 13px; font-family: 'Outfit', sans-serif; margin-bottom: 40px; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .cp-back:hover { color: #C9A96E; }
        .cp-plan-badge { display: inline-block; padding: 4px 12px; border: 1px solid rgba(201,169,110,0.3); border-radius: 20px; font-size: 11px; color: #C9A96E; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
        .cp-title { font-family: 'Cormorant', serif; font-weight: 300; font-size: clamp(32px, 6vw, 48px); color: #F0EBE1; line-height: 1.1; margin-bottom: 8px; }
        .cp-title em { font-style: italic; color: #C9A96E; }
        .cp-sub { font-size: 14px; color: #B8B0A4; font-weight: 300; line-height: 1.7; margin-bottom: 40px; }
        .cp-field { margin-bottom: 16px; }
        .cp-label { display: block; font-size: 11px; color: #6E6860; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
        .cp-input { width: 100%; padding: 12px 16px; background: #161410; border: 1px solid rgba(201,169,110,0.14); border-radius: 2px; color: #F0EBE1; font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .cp-input:focus { border-color: rgba(201,169,110,0.4); }
        .cp-input::placeholder { color: #6E6860; }
        .cp-textarea { resize: vertical; min-height: 100px; }
        .cp-btn { width: 100%; margin-top: 8px; padding: 14px; background: #C9A96E; border: none; border-radius: 2px; color: #0A0906; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .cp-btn:hover { background: #D4B47A; }
        .cp-success { text-align: center; padding: 60px 20px; }
        .cp-success-icon { font-size: 48px; margin-bottom: 24px; display: block; }
        .cp-success-title { font-family: 'Cormorant', serif; font-size: 36px; font-style: italic; color: #F0EBE1; margin-bottom: 12px; }
        .cp-success-sub { font-size: 14px; color: #B8B0A4; line-height: 1.7; margin-bottom: 32px; }
      `}</style>

      <div className="cp">
        <div className="cp-box">
          <button className="cp-back" onClick={onBack}>← Back</button>

          {sent ? (
            <div className="cp-success">
              <span className="cp-success-icon">✦</span>
              <h2 className="cp-success-title">Thank you!</h2>
              <p className="cp-success-sub">
                We've received your request for the <strong style={{ color: "#C9A96E" }}>{plan}</strong> plan.<br />
                We'll be in touch within 1–2 business days.
              </p>
              <button className="cp-btn" onClick={onBack} style={{ maxWidth: 200, margin: "0 auto" }}>
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className="cp-plan-badge">{plan} Plan</div>
              <h1 className="cp-title">Let's get<br /><em>started.</em></h1>
              <p className="cp-sub">
                Fill in your details and we'll reach out within 1–2 business days 
                to set up your free pilot or answer any questions.
              </p>

              <div className="cp-field">
                <label className="cp-label">Your name *</label>
                <input className="cp-input" placeholder="Jane Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="cp-field">
                <label className="cp-label">Email address *</label>
                <input className="cp-input" type="email" placeholder="jane@museum.org" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="cp-field">
                <label className="cp-label">Museum / Gallery name *</label>
                <input className="cp-input" placeholder="The National Gallery" value={form.museum} onChange={e => setForm(p => ({ ...p, museum: e.target.value }))} />
              </div>
              <div className="cp-field">
                <label className="cp-label">Your role</label>
                <input className="cp-input" placeholder="Director, Curator, Digital Manager..." value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
              </div>
              <div className="cp-field">
                <label className="cp-label">Anything you'd like us to know?</label>
                <textarea className="cp-input cp-textarea" placeholder="Collection size, specific languages needed, timeline..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
              </div>

              <button className="cp-btn" onClick={handleSubmit}>
                Send Request →
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}