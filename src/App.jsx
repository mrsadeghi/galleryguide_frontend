import { useState, useRef, useEffect } from "react";
import LanguageSelector from "./components/LanguageSelector";
import Sidebar from "./components/Sidebar";
import MessageBubble from "./components/MessageBubble";
import InputBar from "./components/InputBar";
import { useVoice } from "./hooks/useVoice";

// const API = "http://localhost:8008";
const API = "https://galleryguide-production.up.railway.app";

const SUGGESTIONS = {
  en: ["Tell me about the Mona Lisa", "Who was Michelangelo?", "What is the Birth of Venus?", "Compare Leonardo and Raphael"],
  it: ["Dimmi della Monna Lisa", "Chi era Michelangelo?", "Cos'è la Nascita di Venere?"],
  fr: ["Parlez-moi de la Joconde", "Qui était Michel-Ange?", "Qu'est-ce que la Naissance de Vénus?"],
  de: ["Erzähl mir von der Mona Lisa", "Wer war Michelangelo?"],
  es: ["Cuéntame sobre la Mona Lisa", "¿Quién fue Miguel Ángel?"],
  ja: ["モナ・リザについて教えてください", "ミケランジェロとは誰ですか？"],
  zh: ["告诉我关于蒙娜丽莎的事", "米开朗基罗是谁？"],
};

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

function EmptyState({ suggestions, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: "24px 16px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 className="serif-i anim-up" style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1, marginBottom: 8 }}>
          Explore the Masters
        </h2>
        <p className="anim-up-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>
          Renaissance Art · Guided by AI
        </p>
      </div>

      <div className="gold-line anim-up-1" />

      <p className="anim-up-2" style={{ fontSize: 13, color: "var(--ink-3)", textAlign: "center", maxWidth: 300, lineHeight: 1.7 }}>
        Ask about paintings, artists, or techniques.<br />Upload an image to identify any artwork.
      </p>

      {/* Horizontal scroll suggestions on mobile */}
<div className="anim-up-3" style={{ 
          display: "flex", 
          gap: 8, 
          flexWrap: "wrap", 
          justifyContent: "center",
          width: "100%", 
          maxWidth: 500 
        }}>        {suggestions.map(s => (
          <button key={s} onClick={() => onSelect(s)} style={{
            padding: "8px 14px", flexShrink: 0,
            background: "var(--bg-1)", border: "1px solid var(--border)",
            borderRadius: 24, color: "var(--ink-3)",
            cursor: "pointer", fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
            WebkitTapHighlightColor: "transparent",
          }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [langCode, setLangCode]       = useState(null);
  const [langLabel, setLangLabel]     = useState("English");
  const [chats, setChats]             = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile]     = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [speakingId, setSpeakingId]   = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // id of chat to delete

  const messagesEndRef = useRef(null);
  const isMobile = useIsMobile();
  const voiceLang = langCode?.length === 2 ? langCode : "en";
  const { isListening, isSpeaking, startListening, stopListening, speak, stopSpeaking } = useVoice(voiceLang);
  const activeChat = chats.find(c => c.id === activeChatId);
  const suggestions = SUGGESTIONS[langCode] || SUGGESTIONS.en;

  // بعد از state ها اضافه کن
  useEffect(() => {
    if (!langCode) return;
    fetch(`${API}/sessions`)
      .then(r => r.json())
      .then(sessions => {
        if (sessions.length > 0) {
          setChats(sessions.map(s => ({ id: s.id, title: s.title, messages: [] })));
          setActiveChatId(sessions[0].id);
        }
      })
      .catch(() => {});
  }, [langCode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const handleLangSelect = (code, label) => {
    setLangCode(code);
    setLangLabel(label || code);
    createChat();
  };

  const createChat = () => {
    const id = String(Date.now());
    setChats(p => [{ id, title: "New conversation", messages: [], isLocal: true }, ...p]);
    setActiveChatId(id);
    setImagePreview(null);
    setImageFile(null);
  };

  const updateChats = (id, messages, title) =>
    setChats(p => p.map(c => c.id === id ? { ...c, messages, title: title || c.title } : c));

  const sendMessage = async () => {
    if (!input.trim() && !imageFile) return;
    setLoading(true);

    const userMsg = { role: "user", content: input, image: imagePreview };
    const updated = [...(activeChat?.messages || []), userMsg];
    updateChats(activeChatId, updated);
    const q = input;
    setInput(""); setImagePreview(null);

    try {
      let res;
      if (imageFile) {
        const fd = new FormData(); fd.append("file", imageFile); setImageFile(null);
        res = await fetch(`${API}/image-search-stream`, { method: "POST", body: fd });
      } else {
        console.log("Sending with session_id:", String(activeChatId));
        res = await fetch(`${API}/chat-stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            question: q, 
            session_id: String(activeChatId),
            language: langCode || "en" 
          }),
        });
      }
      await processStream(res, updated);
    } catch {
      updateChats(activeChatId, [...updated, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const processStream = async (res, updatedMsgs) => {
    const reader = res.body.getReader();
    const dec    = new TextDecoder();
    let content = "", sources = [], hasArtwork = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      for (const line of dec.decode(value).split("\n")) {
        if (!line.startsWith("data: ")) continue;
        try {
          const d = JSON.parse(line.slice(6));
          if (d.type === "sources") { sources = d.sources || []; hasArtwork = d.has_artwork || false; }
          else if (d.type === "text") {
            content += d.content;
            setChats(prev => prev.map(c => {
              if (c.id !== activeChatId) return c;
              const msgs = [...c.messages];
              const am = { role: "assistant", content, sources, hasArtwork };
              if (msgs[msgs.length - 1]?.role === "assistant") msgs[msgs.length - 1] = am;
              else msgs.push(am);
              return { ...c, messages: msgs };
            }));
          } else if (d.type === "done") {
            const title = updatedMsgs[0]?.content?.slice(0, 40) || "New conversation";
            setChats(prev => prev.map(c => {
              if (c.id !== activeChatId) return c;
              const msgs = [...c.messages];
              if (msgs[msgs.length - 1]?.role === "assistant")
                msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], hasArtwork };
              return { ...c, messages: msgs, title, isLocal: false };
            }));
          }
        } catch (_) {}
      }
    }
  };
  const deleteChat = async (id) => {
    try {
      await fetch(`${API}/sessions/${id}`, { method: "DELETE" });
    } catch {}
    setChats(p => p.filter(c => c.id !== id));
    if (activeChatId === id) {
      const remaining = chats.filter(c => c.id !== id);
      if (remaining.length > 0) setActiveChatId(remaining[0].id);
      else createChat();
    }
  };

  const handleSelectChat = async (id) => {
    setActiveChatId(id);
    const chat = chats.find(c => c.id === id);
    if (chat && chat.messages.length === 0) {
      try {
        const r = await fetch(`${API}/sessions/${id}/messages`);
        const msgs = await r.json();
        // آپدیت messages با hasArtwork درست
        const enriched = msgs.map(m => ({
          ...m,
          hasArtwork: m.role === "assistant" && m.sources?.length > 0 && !!m.sources[0]?.image_url,
          sources: m.sources || [],
        }));
        setChats(prev => prev.map(c => c.id === id ? { ...c, messages: enriched } : c));
      } catch {}
    }
  };

  const handleKeyDown = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const handleImageUpload = e => {
    const file = e.target.files[0]; if (!file) return;
    setImageFile(file);
    const r = new FileReader(); r.onload = ev => setImagePreview(ev.target.result); r.readAsDataURL(file);
  };

  if (!langCode) return <LanguageSelector onSelect={handleLangSelect} />;

  const showSidebar = !isMobile || sidebarOpen;

  return (
    <div style={{ display: "flex", height: "100dvh", flexDirection: "column", background: "var(--bg-0)", overflow: "hidden" }}>

      {/* Header */}
      <header style={{
        background: "var(--bg-1)", borderBottom: "1px solid var(--border)",
        padding: "0 12px", height: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Hamburger on mobile */}
          <button className="icon-btn" onClick={() => setSidebarOpen(p => !p)} style={{ fontSize: 20 }}>☰</button>
          <div style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--border-2)", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="serif" style={{ fontSize: 13, color: "var(--gold)" }}>G</span>
          </div>
          <span className="serif-i" style={{ fontSize: isMobile ? 16 : 18, color: "var(--ink)" }}>Gallery Guide</span>
          {!isMobile && (
            <span style={{ fontSize: 10, color: "var(--gold-dim)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Renaissance
            </span>
          )}
        </div>

        {!isMobile && (
          <nav style={{ display: "flex", gap: "1.25rem" }}>
            {["Explore", "Collections", "About"].map(item => (
              <span key={item} style={{ fontSize: 13, color: "var(--ink-3)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--gold)"}
                onMouseLeave={e => e.target.style.color = "var(--ink-3)"}
              >{item}</span>
            ))}
          </nav>
        )}

        {isMobile && (
          <button className="btn-gold" onClick={createChat} style={{ padding: "6px 12px", fontSize: 12 }}>+ New</button>
        )}
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

        {/* Sidebar — drawer on mobile, fixed on desktop */}
        {showSidebar && (
          <Sidebar
            chats={chats.filter(c => !c.isLocal || c.messages.length > 0)}
            activeChatId={activeChatId}
            onNew={createChat}
            language={langLabel}
            isMobile={isMobile}
            onDelete={id => setConfirmDelete(id)}
            onSelect={handleSelectChat}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: isMobile ? "16px 12px" : "24px 32px",
            display: "flex", flexDirection: "column",
            gap: isMobile ? "16px" : "20px",
          }}>
            {activeChat?.messages.length === 0 && (
              <EmptyState suggestions={suggestions} onSelect={q => setInput(q)} />
            )}

            {activeChat?.messages.map((msg, i) => (
              <MessageBubble
                key={i}
                msg={msg}
                onSuggested={q => setInput(q)}
                isSpeaking={isSpeaking && speakingId === i}
                onSpeak={content => { setSpeakingId(i); speak(content); }}
                onStopSpeak={() => { stopSpeaking(); setSpeakingId(null); }}
              />
            ))}

            {loading && activeChat?.messages[activeChat.messages.length - 1]?.role !== "assistant" && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", animation: "slideUp 0.25s ease" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--gold-glow)", border: "1px solid var(--border-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="serif" style={{ fontSize: 12, color: "var(--gold)" }}>G</span>
                </div>
                <div style={{ padding: "10px 14px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "16px 16px 16px 4px" }}>
                  <div className="bars"><span/><span/><span/></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <InputBar
            value={input}
            onChange={e => setInput(e.target.value)}
            onSend={sendMessage}
            onKeyDown={handleKeyDown}
            onImageUpload={handleImageUpload}
            imagePreview={imagePreview}
            onClearImage={() => { setImagePreview(null); setImageFile(null); }}
            isListening={isListening}
            onStartListen={() => startListening(t => setInput(t))}
            onStopListen={stopListening}
            loading={loading}
          />
        </main>
      </div>


      {confirmDelete && (
  <div
    onClick={() => setConfirmDelete(null)}
    style={{
      position: "fixed", inset: 0,
      background: "rgba(13,12,10,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: "20px",
      animation: "fadeIn 0.2s ease",
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        background: "var(--bg-1)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "24px",
        width: "100%", maxWidth: 320,
        animation: "slideUp 0.2s ease",
      }}
    >
      <div className="serif-i" style={{ fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>
        Delete conversation?
      </div>
      <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20, lineHeight: 1.6 }}>
        This conversation will be permanently removed and cannot be recovered.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setConfirmDelete(null)}
          className="btn-ghost"
          style={{ flex: 1 }}
        >
          Cancel
        </button>
        <button
          onClick={() => { deleteChat(confirmDelete); setConfirmDelete(null); }}
          style={{
            flex: 1, padding: "10px",
            background: "#8B3030",
            border: "none", borderRadius: "var(--r)",
            color: "white", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 500,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#A33535"}
          onMouseLeave={e => e.currentTarget.style.background = "#8B3030"}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    
  );

  
}
