import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English",    native: "English" },
  { code: "it", label: "Italian",    native: "Italiano" },
  { code: "fr", label: "French",     native: "Français" },
  { code: "de", label: "German",     native: "Deutsch" },
  { code: "es", label: "Spanish",    native: "Español" },
  { code: "ja", label: "Japanese",   native: "日本語" },
  { code: "zh", label: "Chinese",    native: "中文" },
  { code: "ar", label: "Arabic",     native: "العربية" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ko", label: "Korean",     native: "한국어" },
  { code: "ru", label: "Russian",    native: "Русский" },
  { code: "nl", label: "Dutch",      native: "Nederlands" },
];

const UI = {
  en: { sub: "Your AI companion for art exploration", prompt: "Choose your language", btn: "Begin exploration" },
  it: { sub: "Il tuo compagno AI per esplorare l'arte", prompt: "Scegli la tua lingua", btn: "Inizia l'esplorazione" },
  fr: { sub: "Votre compagnon IA pour explorer l'art", prompt: "Choisissez votre langue", btn: "Commencer" },
  de: { sub: "Ihr KI-Begleiter für Kunstexploration", prompt: "Wählen Sie Ihre Sprache", btn: "Erkundung beginnen" },
  es: { sub: "Tu compañero de IA para explorar el arte", prompt: "Elige tu idioma", btn: "Comenzar exploración" },
  ja: { sub: "アートを探索するAIコンパニオン", prompt: "言語を選択してください", btn: "探索を始める" },
  zh: { sub: "您的AI艺术探索伴侣", prompt: "选择您的语言", btn: "开始探索" },
};

export default function LanguageSelector({ onSelect }) {
  const [selected, setSelected] = useState("en");
  const [custom, setCustom]     = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const ui = UI[selected] || UI.en;

  const confirm = () => {
    if (showCustom && custom.trim()) {
      // custom language — code همون text، label هم همون text
      onSelect(custom.trim(), custom.trim());
    } else if (selected) {
      const lang = LANGUAGES.find(l => l.code === selected);
      onSelect(lang.code, lang.label);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
      background: "var(--bg-0)",
      overflowY: "auto",
    }}>
      {/* BG grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      <div style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div className="anim-up" style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "1px solid var(--border-2)",
            background: "var(--bg-1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            animation: "glow 3s ease infinite",
          }}>
            {/* <span className="serif" style={{ fontSize: 20, color: "var(--gold)" }}>G</span> */}
            <img src="/logo.png" alt="Gallery Guide" style={{ width: 20, height: 20, objectFit: "contain" }} />
          </div>
          <h1 className="serif-i anim-up-1" style={{ fontSize: "clamp(36px, 10vw, 52px)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1, marginBottom: 10 }}>
            Gallery Guide
          </h1>
          <p className="anim-up-2" style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 10, transition: "all 0.3s" }}>
            {ui.sub}
          </p>
          <div className="anim-up-2" style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div className="gold-line" />
          </div>
        </div>

        {/* Prompt */}
        <p className="anim-up-3" style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, textAlign: "center", transition: "all 0.3s" }}>
          {ui.prompt}
        </p>

        {/* Language grid */}
        <div className="anim-up-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { setSelected(lang.code); setShowCustom(false); }}
              style={{
                padding: "11px 8px",
                background: selected === lang.code ? "var(--gold-glow)" : "var(--bg-1)",
                border: `1px solid ${selected === lang.code ? "var(--border-2)" : "var(--border)"}`,
                borderRadius: "var(--r)",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div style={{ fontSize: 15, color: selected === lang.code ? "var(--gold)" : "var(--ink)", fontWeight: selected === lang.code ? 500 : 400 }}>
                {lang.native}
              </div>
              <div style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 2 }}>{lang.label}</div>
            </button>
          ))}
        </div>

        {/* Custom */}
        <div className="anim-up-3" style={{ marginBottom: 20 }}>
          {!showCustom ? (
            <button className="btn-ghost" onClick={() => { setShowCustom(true); setSelected(""); }} style={{ width: "100%", fontSize: 13 }}>
              Other language...
            </button>
          ) : (
            <input
              className="btn-ghost"
              autoFocus
              placeholder="Type your language..."
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && confirm()}
              style={{ width: "100%", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}
            />
          )}
        </div>

        {/* CTA */}
        <div className="anim-up-4">
          <button className="btn-gold" onClick={confirm} disabled={!selected && !custom.trim()} style={{ width: "100%", fontSize: 15 }}>
            {ui.btn} →
          </button>
        </div>

        <p className="anim-up-4" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 16, textAlign: "center" }}>
          Supports 50+ languages · Powered by AI
        </p>
      </div>
    </div>
  );
}
