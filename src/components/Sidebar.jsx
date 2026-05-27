export default function Sidebar({ chats, activeChatId, onSelect, onNew, language, onClose, isMobile, onDelete }) {  const content = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              border: "1px solid var(--border-2)", background: "var(--bg-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* <span className="serif" style={{ fontSize: 13, color: "var(--gold)" }}>G</span> */}
              <img src="/logo.png" alt="Gallery Guide" style={{ width: 20, height: 20, objectFit: "contain" }} />
            </div>
            <span className="serif-i" style={{ fontSize: 15, color: "var(--ink)" }}>Gallery Guide</span>
          </div>
          {isMobile && (
            <button className="icon-btn" onClick={onClose} style={{ fontSize: 20, minWidth: 36, minHeight: 36 }}>×</button>
          )}
        </div>

        <button
          onClick={() => { onNew(); onClose?.(); }}
          style={{
            width: "100%", padding: "10px 10px",
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: "var(--r)", color: "var(--ink-2)",
            cursor: "pointer", fontSize: 13,
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'DM Sans', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ fontSize: 16, color: "var(--gold)" }}>+</span>
          New conversation
        </button>
      </div>

      {/* History */}
      {chats.length > 0 && (
        <div style={{ padding: "10px 14px 6px", fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          History
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: "0 6px" }}>
        {chats.map(chat => (
          <div key={chat.id} style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = "0"}
          >
            <div
              onClick={() => { onSelect(chat.id); onClose?.(); }}
              style={{
                flex: 1,
                padding: "10px 10px", margin: "1px 0",
                borderRadius: "var(--r)", cursor: "pointer",
                background: chat.id === activeChatId ? "var(--gold-glow)" : "transparent",
                border: `1px solid ${chat.id === activeChatId ? "var(--border)" : "transparent"}`,
                color: chat.id === activeChatId ? "var(--ink)" : "var(--ink-3)",
                fontSize: 13, whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {chat.title}
            </div>

            {/* Delete button */}
            <button
              className="del-btn icon-btn"
              onClick={e => { e.stopPropagation(); onDelete(chat.id); }}
              style={{
                opacity: 0,
                transition: "opacity 0.15s",
                fontSize: 14,
                padding: "4px 6px",
                minWidth: 28, minHeight: 28,
                flexShrink: 0,
                color: "red",
              }}
              title="Delete"
            >🗑</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", fontSize: 10, color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
        <span>Gallery Guide</span>
        <span style={{ padding: "1px 6px", border: "1px solid var(--border)", borderRadius: 4, fontSize: 9, textTransform: "uppercase", color: "var(--gold-dim)" }}>
          {language}
        </span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="drawer-overlay" onClick={onClose} />
        <div className="drawer">{content}</div>
      </>
    );
  }

  return <aside className="sidebar-desktop">{content}</aside>;
}
