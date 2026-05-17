import { useState } from "react";
import ReactMarkdown from "react-markdown";

function ImageModal({ src, title, artist, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(13,12,10,0.94)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: "16px",
      animation: "fadeIn 0.2s ease",
    }}>
      <img
        src={src} alt={title}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "100%", maxHeight: "70dvh", objectFit: "contain", borderRadius: 8, boxShadow: "0 24px 60px rgba(0,0,0,0.8)" }}
      />
      <div style={{ marginTop: 14, textAlign: "center", padding: "0 16px" }}>
        <div className="serif-i" style={{ fontSize: 18, color: "var(--ink)" }}>{title}</div>
        {artist && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{artist}</div>}
      </div>
      <button onClick={onClose} style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(255,255,255,0.1)", border: "none",
        borderRadius: "50%", width: 40, height: 40,
        color: "var(--ink-2)", fontSize: 22, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>×</button>
    </div>
  );
}

function AssistantContent({ content, sources, hasArtwork, onSuggested, onImageClick }) {
  const wowRx    = content.match(/\*{0,2}Wow:?\*{0,2}\s*(.+)/i);
  const factsRx  = content.match(/\*{0,2}Facts:?\*{0,2}([\s\S]*?)(?=\*{0,2}Curious|$)/i);
  const curRx = content.match(/\*{0,2}(Curious|Curieux|Neugierig|Curioso|気になる|好奇心)\??:?\*{0,2}\s*(.+)/i);

  let text = content, wow = null, facts = [], suggestion = null;

  if (curRx)   { suggestion = curRx[2].trim();   text = text.replace(/\*{0,2}Curious\??:?\*{0,2}[\s\S]*$/, "").trim(); }
  if (factsRx) { facts = factsRx[1].split("\n").map(f => f.trim()).filter(Boolean); text = text.replace(/\*{0,2}Facts:?\*{0,2}[\s\S]*?(?=\*{0,2}Curious|$)/i, "").trim(); }
  if (wowRx)   { wow = wowRx[1].trim(); text = text.replace(/\*{0,2}Wow:?\*{0,2}[\s\S]*?(?=\*{0,2}Facts|\*{0,2}Curious|$)/i, "").trim(); }

  const primary    = sources?.[0];
  const showImage  = hasArtwork && primary?.image_url;
  const showRelated = hasArtwork && wow && facts.length > 0 && sources?.filter(s => s.image_url).length > 1;

  return (
    <div>
      {/* Primary image */}
      {showImage && (
        <div style={{ marginBottom: 12 }}>
          <img
            src={primary.image_url} alt={primary.title}
            onClick={() => onImageClick(primary)}
            style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: "var(--r)", display: "block", cursor: "zoom-in", border: "1px solid var(--border)" }}
            onError={e => e.target.parentElement.style.display = "none"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 5, gap: 8 }}>
            <span className="serif-i" style={{ fontSize: 13, color: "var(--ink)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {primary.title}
            </span>
            <span style={{ fontSize: 10, color: "var(--ink-3)", flexShrink: 0 }}>
              {primary.artist}{primary.year ? ` · ${primary.year}` : ""}
            </span>
          </div>
        </div>
      )}

      {/* Text */}
      <ReactMarkdown components={{
        p: ({ children }) => <p style={{ margin: "0 0 8px", lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14 }}>{children}</p>,
        strong: ({ children }) => <strong style={{ color: "var(--gold)", fontWeight: 500 }}>{children}</strong>,
      }}>{text}</ReactMarkdown>

      {/* Wow */}
      {wow && (
        <div style={{ margin: "10px 0", padding: "10px 12px", background: "rgba(201,169,110,0.06)", borderRadius: "var(--r)", borderLeft: "2px solid var(--gold)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
          <span style={{ color: "var(--gold)", fontWeight: 500, marginRight: 6 }}>✦</span>{wow}
        </div>
      )}

      {/* Facts */}
      {facts.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
          {facts.map((f, i) => <span key={i} className="chip">{f}</span>)}
        </div>
      )}

      {/* Related works */}
      {showRelated && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Related Works</div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {sources.slice(1).filter(s => s.image_url).map((s, i) => (
              <div key={i}
                onClick={() => onSuggested(`Tell me about ${s.title}${s.artist ? ` by ${s.artist}` : ""}`)}
                style={{ width: 100, flexShrink: 0, background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden", cursor: "pointer" }}
              >
                <img src={s.image_url} alt={s.title} style={{ width: "100%", height: 70, objectFit: "cover", display: "block" }} onError={e => e.target.style.display = "none"} />
                <div style={{ padding: "4px 6px" }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
                  <div style={{ fontSize: 9, color: "var(--ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestion */}
      {suggestion && (
        <button onClick={() => onSuggested(suggestion)} style={{
          marginTop: 10, width: "100%", padding: "10px 12px",
          background: "transparent", border: "1px dashed var(--border-2)",
          borderRadius: "var(--r)", color: "var(--gold-dim)",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, textAlign: "left", lineHeight: 1.4,
          WebkitTapHighlightColor: "transparent",
        }}>
          <span style={{ marginRight: 6, opacity: 0.7 }}>💡</span>{suggestion}
        </button>
      )}
    </div>
  );
}

export default function MessageBubble({ msg, onSuggested, isSpeaking, onSpeak, onStopSpeak }) {
  const [modal, setModal] = useState(null);
  const isUser = msg.role === "user";

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 6, alignItems: "flex-end",
        animation: "slideUp 0.25s ease",
      }}>
        {!isUser && (
          <button className="icon-btn" onClick={() => isSpeaking ? onStopSpeak() : onSpeak(msg.content)}
            style={{ marginBottom: 2, flexShrink: 0, fontSize: 15, minWidth: 34, minHeight: 34, padding: 6 }}>
            {isSpeaking ? "⏹" : "🔊"}
          </button>
        )}

        <div style={{
          maxWidth: isUser ? "78%" : "82%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? "var(--user-bg)" : "var(--bg-1)",
          border: `1px solid ${isUser ? "rgba(255,255,255,0.05)" : "var(--border)"}`,
          fontSize: 14, lineHeight: 1.65, color: "var(--ink)",
          wordBreak: "break-word",
        }}>
          {isUser && msg.image && (
            <img src={msg.image} alt="uploaded"
              onClick={() => setModal({ image_url: msg.image, title: "Uploaded image" })}
              style={{ maxWidth: "100%", borderRadius: 6, marginBottom: 6, display: "block", cursor: "pointer" }} />
          )}
          {isUser ? (
            <span>{msg.content}</span>
          ) : (
            <AssistantContent
              content={msg.content}
              sources={msg.sources}
              hasArtwork={msg.hasArtwork}
              onSuggested={onSuggested}
              onImageClick={s => setModal(s)}
            />
          )}
        </div>
      </div>

      {modal && <ImageModal src={modal.image_url} title={modal.title} artist={modal.artist} onClose={() => setModal(null)} />}
    </>
  );
}
