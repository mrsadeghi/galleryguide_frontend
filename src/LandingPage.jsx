export default function LandingPage({ onEnterDemo, onContact }) {
    return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black:  #0A0906;
          --black2: #111009;
          --black3: #181510;
          --ink:    #F0EBE1;
          --ink2:   #B8B0A4;
          --ink3:   #6E6860;
          --gold:   #C9A96E;
          --gold2:  #8A6E42;
          --border: rgba(201,169,110,0.14);
          --border2:rgba(201,169,110,0.28);
        }

        .lp { font-family: 'Outfit', sans-serif; background: var(--black); color: var(--ink); overflow-x: hidden; }

        /* ── NAV ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(24px, 5vw, 80px);
          height: 64px;
          background: rgba(10,9,6,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .lp-nav-logo {
          display: flex; align-items: center; gap: 10px;
        }
        .lp-nav-mark {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant', serif; font-size: 16px; color: var(--gold);
        }
        .lp-nav-name {
          font-family: 'Cormorant', serif; font-style: italic;
          font-size: 20px; color: var(--ink);
        }
        .lp-nav-btn {
          padding: 8px 24px;
          border: 1px solid var(--border2); border-radius: 2px;
          background: transparent; color: var(--gold);
          font-family: 'Outfit', sans-serif; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .lp-nav-btn:hover { background: rgba(201,169,110,0.08); border-color: var(--gold); }

        /* ── HERO ── */
        .lp-hero {
          min-height: 100dvh;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 80px clamp(24px, 5vw, 80px) 60px;
          gap: 60px;
          position: relative;
        }
        .lp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        /* grid bg */
        .lp-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        .lp-hero-left { position: relative; z-index: 1; }
        .lp-eyebrow {
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .lp-eyebrow::before {
          content: ''; display: block;
          width: 24px; height: 1px; background: var(--gold);
        }
        .lp-h1 {
          font-family: 'Cormorant', serif; font-weight: 300;
          font-size: clamp(52px, 6vw, 88px);
          line-height: 1.0; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 28px;
        }
        .lp-h1 em { font-style: italic; color: var(--gold); }
        .lp-hero-sub {
          font-size: clamp(14px, 1.5vw, 16px); font-weight: 300;
          color: var(--ink2); line-height: 1.75;
          max-width: 420px; margin-bottom: 44px;
        }
        .lp-hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .lp-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 36px; border-radius: 2px;
          background: var(--gold); border: none;
          color: var(--black); font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.25s;
        }
        .lp-btn-primary:hover { background: #D4B47A; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,169,110,0.2); }
        .lp-btn-secondary {
          font-size: 13px; color: var(--ink3);
          background: none; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: color 0.2s; letter-spacing: 0.04em;
          text-decoration: underline; text-underline-offset: 4px;
          text-decoration-color: rgba(201,169,110,0.3);
        }
        .lp-btn-secondary:hover { color: var(--gold); }

        /* Hero chips */
        .lp-chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 36px; }
        .lp-chip {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border: 1px solid var(--border);
          border-radius: 20px; font-size: 11px; color: var(--ink3);
          letter-spacing: 0.05em;
        }
        .lp-chip-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(201,169,110,0.5); }

        /* Hero image */
        .lp-hero-right { position: relative; z-index: 1; }
        .lp-hero-img-wrap {
          position: relative; border-radius: 4px; overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.08);
          aspect-ratio: 4/5;
        }
        .lp-hero-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(0.9) saturate(0.85);
        }
        /* Overlay gradient on image */
        .lp-hero-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,9,6,0.6) 0%, transparent 50%);
        }
        /* Image caption */
        .lp-img-caption {
          position: absolute; bottom: 16px; left: 16px; right: 16px;
          z-index: 1; font-size: 11px; color: rgba(240,235,225,0.5);
          letter-spacing: 0.08em;
        }
        /* Floating badge */
        .lp-hero-badge {
          position: absolute; top: -16px; right: -16px;
          background: var(--black2); border: 1px solid var(--border2);
          border-radius: 4px; padding: 12px 16px;
          font-size: 12px; color: var(--ink2); line-height: 1.4;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          z-index: 2;
        }
        .lp-hero-badge strong { display: block; color: var(--gold); font-size: 22px; font-family: 'Cormorant', serif; font-weight: 400; }

        /* ── SECTION BASE ── */
        .lp-section {
          padding: clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px);
        }
        .lp-section-label {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .lp-section-label::after { content: ''; flex: 1; max-width: 40px; height: 1px; background: var(--gold); opacity: 0.4; }
        .lp-section-title {
          font-family: 'Cormorant', serif; font-weight: 300;
          font-size: clamp(36px, 5vw, 60px);
          line-height: 1.1; color: var(--ink);
          margin-bottom: 16px;
        }
        .lp-section-title em { font-style: italic; color: var(--gold); }
        .lp-section-sub {
          font-size: 15px; font-weight: 300; color: var(--ink2);
          line-height: 1.75; max-width: 520px; margin-bottom: 60px;
        }
        .lp-plan {
          background: var(--black2);
          padding: 44px 36px;
          position: relative;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
        }
        
        /* ── WHY BUY ── */
        .lp-why { background: var(--black2); }
        .lp-why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; margin-top: 60px;
        }
        .lp-why-card {
          padding: 40px 36px;
          background: var(--black3);
          border: 1px solid var(--border);
          transition: border-color 0.3s;
        }
        .lp-why-card:hover { border-color: var(--border2); }
        .lp-why-num {
          font-family: 'Cormorant', serif; font-size: 48px; font-weight: 300;
          color: rgba(201,169,110,0.15); line-height: 1;
          margin-bottom: 20px;
        }
        .lp-why-icon { font-size: 28px; margin-bottom: 16px; display: block; }
        .lp-why-title {
          font-family: 'Cormorant', serif; font-size: 22px; font-weight: 400;
          color: var(--ink); margin-bottom: 12px; line-height: 1.2;
        }
        .lp-why-desc {
          font-size: 14px; font-weight: 300; color: var(--ink2); line-height: 1.7;
        }

        /* ── QUOTE ── */
        .lp-quote {
          text-align: center; padding: clamp(60px, 8vw, 100px) clamp(24px, 10vw, 200px);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .lp-quote-mark {
          font-family: 'Cormorant', serif; font-size: 80px; color: var(--gold);
          opacity: 0.2; line-height: 0.6; margin-bottom: 24px; display: block;
        }
        .lp-quote-text {
          font-family: 'Cormorant', serif; font-style: italic;
          font-size: clamp(22px, 3vw, 34px); font-weight: 300;
          color: var(--ink); line-height: 1.4; margin-bottom: 24px;
        }
        .lp-quote-source { font-size: 12px; color: var(--ink3); letter-spacing: 0.1em; text-transform: uppercase; }

        /* ── PRICING ── */
        .lp-pricing { background: var(--black); }
        .lp-pricing-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px; overflow: hidden;
        }
        
        .lp-plan:hover { background: var(--black3); }
        .lp-plan-featured {
          background: var(--black3);
          border-top: 2px solid var(--gold);
        }
        .lp-plan-badge {
          position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
          background: var(--gold); color: var(--black);
          font-size: 9px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 3px 12px; border-radius: 0 0 4px 4px;
        }
        .lp-plan-name {
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 20px;
        }
        .lp-plan-price {
          font-family: 'Cormorant', serif; font-weight: 300;
          font-size: 52px; color: var(--ink); line-height: 1;
          margin-bottom: 4px;
        }
        .lp-plan-price span { font-size: 20px; }
        .lp-plan-period { font-size: 12px; color: var(--ink3); margin-bottom: 32px; }
        .lp-plan-divider { height: 1px; background: var(--border); margin-bottom: 28px; }
        .lp-plan-feature {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: var(--ink2); margin-bottom: 14px;
          line-height: 1.4;
        }
        .lp-plan-check { color: var(--gold); font-size: 14px; flex-shrink: 0; margin-top: 1px; }
        .lp-plan-btn {
          width: 100%; margin-top: 36px;
          margin-top: auto;
          padding: 12px; border-radius: 2px;
          font-family: 'Outfit', sans-serif; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .lp-plan-btn-outline {
          background: transparent; border: 1px solid var(--border2); color: var(--gold);
        }
        .lp-plan-btn-outline:hover { background: rgba(201,169,110,0.08); }
        .lp-plan-btn-solid {
          background: var(--gold); border: none; color: var(--black); font-weight: 500;
        }
        .lp-plan-btn-solid:hover { background: #D4B47A; }

        /* ── CTA BOTTOM ── */
        .lp-cta-section {
          text-align: center;
          padding: clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px);
          border-top: 1px solid var(--border);
        }
        .lp-cta-title {
          font-family: 'Cormorant', serif; font-weight: 300;
          font-size: clamp(36px, 5vw, 64px);
          color: var(--ink); margin-bottom: 20px; line-height: 1.1;
        }
        .lp-cta-title em { font-style: italic; color: var(--gold); }
        .lp-cta-sub { font-size: 15px; color: var(--ink2); margin-bottom: 40px; font-weight: 300; }

        /* ── FOOTER ── */
        .lp-footer {
          border-top: 1px solid var(--border);
          padding: 24px clamp(24px, 5vw, 80px);
          display: flex; justify-content: space-between; align-items: center;
          font-size: 11px; color: var(--ink3); letter-spacing: 0.06em;
          flex-wrap: wrap; gap: 12px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .lp-hero { grid-template-columns: 1fr; min-height: auto; padding-top: 100px; }
          .lp-hero-right { display: none; }
          .lp-why-grid { grid-template-columns: 1fr; }
          .lp-pricing-grid { grid-template-columns: 1fr; }
          .lp-plan-badge { display: none; }
        }
        @media (max-width: 600px) {
          .lp-why-grid { grid-template-columns: 1fr; gap: 1px; }
        }
      `}</style>

      <div className="lp">

        {/* NAV */}
        <nav className="lp-nav">
          <div className="lp-nav-logo">
            <div className="lp-nav-mark">G</div>
            <span className="lp-nav-name">Gallery Guide</span>
          </div>
          <button className="lp-nav-btn" onClick={onEnterDemo}>Try Demo →</button>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-left">
            <p className="lp-eyebrow">AI-Powered Museum Experience</p>
            <h1 className="lp-h1">
              Every painting<br />
              has a <em>story.</em><br />
              Now you can<br />
              <em>ask it.</em>
            </h1>
            <p className="lp-hero-sub">
              Gallery Guide is an AI companion for museum visitors. 
              Ask about any artwork in your own language — get instant, 
              engaging answers with images, key facts, and follow-up questions.
            </p>
            <div className="lp-hero-actions">
              <button className="lp-btn-primary" onClick={onEnterDemo}>
                Explore the Demo →
              </button>
              <button className="lp-btn-secondary" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                View pricing
              </button>
            </div>
            <div className="lp-chips">
              {["50+ languages", "No app download", "Voice & image input", "Works on any phone"].map((c, i) => (
                <div key={i} className="lp-chip">
                  <div className="lp-chip-dot" />{c}
                </div>
              ))}
            </div>
          </div>

          <div className="lp-hero-right">
            <div className="lp-hero-img-wrap">
              {/* Replace /museum-hero.jpg with your ChatGPT generated image */}
              <img
                src="/museum-hero.jpg"
                alt="Museum gallery"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1610 0%, #0f0d09 100%)';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  const span = document.createElement('span');
                  span.style.cssText = 'font-family: Cormorant, serif; font-style: italic; font-size: 28px; color: rgba(201,169,110,0.3);';
                  span.textContent = 'Gallery Guide';
                  e.target.parentElement.appendChild(span);
                }}
              />
              <div className="lp-img-caption">The Metropolitan Museum of Art, New York</div>
            </div>
            <div className="lp-hero-badge">
              <strong>405+</strong>
              Renaissance artworks<br />indexed & ready
            </div>
          </div>
        </section>

        {/* WHY BUY */}
        <section className="lp-section lp-why">
          <div className="lp-section-label">For Museum Directors</div>
          <h2 className="lp-section-title">Why your visitors<br /><em>deserve this</em></h2>
          <p className="lp-section-sub">
            Your collection has stories. Most visitors leave without hearing them — 
            because of language barriers, generic audio guides, or staff availability.
            Gallery Guide changes that.
          </p>

          <div className="lp-why-grid">
            {[
              {
                icon: "🌍",
                num: "01",
                title: "Speaks every visitor's language",
                desc: "50+ languages supported. A Japanese tourist, a French school group, an Arabic-speaking family — all get answers in their own language, instantly. No staff required."
              },
              {
                icon: "📱",
                num: "02",
                title: "Zero friction for visitors",
                desc: "No app to download. Visitors scan a QR code and start exploring. Works on any smartphone browser. Setup takes minutes, adoption is immediate."
              },
              {
                icon: "🎨",
                num: "03",
                title: "Your collection, your voice",
                desc: "Every answer comes from your own artwork data — not generic Wikipedia content. You control the narrative. Your curatorial voice, available 24/7."
              },
              {
                icon: "🖼",
                num: "04",
                title: "Image recognition included",
                desc: "Visitors photograph any artwork and instantly get information about it. No labels needed. Works even when signage is unclear or multilingual labels are missing."
              },
              {
                icon: "📊",
                num: "05",
                title: "Understand your visitors",
                desc: "See which artworks generate the most questions, which languages are most used, what visitors are curious about. Real data to improve your collection experience."
              },
              {
                icon: "⚡",
                num: "06",
                title: "Live in days, not months",
                desc: "Send us your artwork data — descriptions, images, historical notes. We index everything and deliver a working AI guide within 5 business days. No IT department needed."
              }
            ].map((item, i) => (
              <div key={i} className="lp-why-card">
                <div className="lp-why-num">{item.num}</div>
                <span className="lp-why-icon">{item.icon}</span>
                <h3 className="lp-why-title">{item.title}</h3>
                <p className="lp-why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <div className="lp-quote">
          <span className="lp-quote-mark">"</span>
          <p className="lp-quote-text">
            Museum visitors who engage deeply with artworks stay longer,
            return more often, and become advocates for your institution.
          </p>
          <p className="lp-quote-source">— Museum Engagement Research, 2024</p>
        </div>

        {/* PRICING */}
        <section className="lp-section lp-pricing" id="pricing">
          <div className="lp-section-label">Pricing</div>
          <h2 className="lp-section-title">Start free.<br /><em>Scale when ready.</em></h2>
          <p className="lp-section-sub">
            No credit card required to start. Pilot with your real collection — 
            completely free for 60 days.
          </p>

          <div className="lp-pricing-grid">

            {/* FREE */}
            <div className="lp-plan">
              <p className="lp-plan-name">Pilot</p>
              <div className="lp-plan-price">Free</div>
              <p className="lp-plan-period">60 days · No credit card</p>
              <div className="lp-plan-divider" />
              {[
                "Up to 40 artworks indexed",
                "Up to 10 visitor sessions/day",
                "All languages supported",
                "Text & voice input",
                "Email support",
              ].map((f, i) => (
                <div key={i} className="lp-plan-feature">
                  <span className="lp-plan-check">✦</span>{f}
                </div>
              ))}
              <button className="lp-plan-btn lp-plan-btn-outline" onClick={() => onContact("Pilot")}>
                Start Free Pilot
              </button>
            </div>

            {/* STARTER */}
            <div className="lp-plan lp-plan-featured">
              <div className="lp-plan-badge">Most Popular</div>
              <p className="lp-plan-name">Starter</p>
              <div className="lp-plan-price"><span>€</span>149</div>
              <p className="lp-plan-period">per month · billed monthly</p>
              <div className="lp-plan-divider" />
              {[
                "Up to 150 artworks indexed",
                "Unlimited visitor sessions",
                "All languages supported",
                "Text, voice & image input",
                "QR code for visitors",
                "Monthly usage report",
                "Priority email support",
              ].map((f, i) => (
                <div key={i} className="lp-plan-feature">
                  <span className="lp-plan-check">✦</span>{f}
                </div>
              ))}
              <button className="lp-plan-btn lp-plan-btn-solid" onClick={() => onContact("Starter")}>
                Get Started
              </button>
            </div>

            {/* MUSEUM */}
            <div className="lp-plan">
              <p className="lp-plan-name">Museum</p>
              <div className="lp-plan-price"><span>€</span>349</div>
              <p className="lp-plan-period">per month · billed monthly</p>
              <div className="lp-plan-divider" />
              {[
                "Unlimited artworks indexed",
                "Unlimited visitor sessions",
                "All languages supported",
                "Text, voice & image input",
                "Custom branding & colors",
                "Visitor analytics dashboard",
                "Dedicated onboarding call",
                "SLA & priority support",
              ].map((f, i) => (
                <div key={i} className="lp-plan-feature">
                  <span className="lp-plan-check">✦</span>{f}
                </div>
              ))}
              <button className="lp-plan-btn lp-plan-btn-outline" onClick={() => onContact("Museum")}>
                Contact Us
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink3)", marginTop: 32 }}>
            All plans include setup support. Enterprise pricing available for museum groups and chains.
          </p>
        </section>

        {/* CTA BOTTOM */}
        <section className="lp-cta-section">
          <h2 className="lp-cta-title">
            Ready to give your<br />
            visitors a <em>guide</em>?
          </h2>
          <p className="lp-cta-sub">Try the live demo — no signup required.</p>
          <button className="lp-btn-primary" onClick={onEnterDemo} style={{ fontSize: 14, padding: "16px 48px" }}>
            Explore the Demo →
          </button>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span>© 2025 Gallery Guide · All rights reserved</span>
          <span>Built in Siena, Italy 🇮🇹</span>
          <span style={{ color: "var(--gold)", opacity: 0.6 }}>galleryguide.online</span>
        </footer>
      </div>
    </>
  );
}
