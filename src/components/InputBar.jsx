import { useRef } from "react";

export default function InputBar({ value, onChange, onSend, onKeyDown, onImageUpload, imagePreview, onClearImage, isListening, onStartListen, onStopListen, loading }) {
  const fileRef = useRef(null);

  return (
    <div style={{
      padding: "8px 12px",
      paddingBottom: `calc(8px + var(--safe-bottom))`,
      borderTop: "1px solid var(--border)",
      background: "var(--bg-0)",
    }}>
      {/* Image preview */}
      {imagePreview && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <img src={imagePreview} alt="preview"
            style={{ height: 48, borderRadius: 6, border: "1px solid var(--border)", objectFit: "cover" }} />
          <button className="icon-btn" onClick={onClearImage} style={{ fontSize: 20 }}>×</button>
        </div>
      )}

      <div style={{
        display: "flex", alignItems: "flex-end", gap: 6,
        background: "var(--bg-1)",
        border: "1px solid var(--border)",
        borderRadius: 16, padding: "6px 8px",
      }}>
        {/* Voice */}
        <button className="icon-btn" onClick={isListening ? onStopListen : onStartListen}
          style={{ color: isListening ? "var(--gold)" : undefined, fontSize: 18 }}
          title="Voice">🎤</button>

        {/* Image */}
        <button className="icon-btn" onClick={() => fileRef.current?.click()} style={{ fontSize: 18 }} title="Image">🖼</button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onImageUpload} />

        {/* Textarea */}
        <textarea
          className="input-field"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Ask about any artwork…"
          rows={1}
          style={{ maxHeight: 100, overflowY: "auto", fontSize: 15 }}
        />

        {/* Send */}
        <button
          className="btn-gold"
          onClick={onSend}
          disabled={loading || (!value.trim() && !imagePreview)}
          style={{ padding: "8px 14px", fontSize: 14, borderRadius: 12, flexShrink: 0 }}
        >
          {loading ? <div className="bars"><span/><span/><span/></div> : "→"}
        </button>
      </div>
    </div>
  );
}
