/**
 * Features component that showcases the signature features of The Aether Residences.
 * It displays a grid of feature cards, each with an icon, title, and description.
 * @returns {JSX.Element} The JSX for the features section.
 */
export default function Features() {
  return (
    <section id="features" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Signature Features</div>
      {/* Main heading for the features section */}
      <h2>Designed for those who rise above</h2>
      {/* Grid container for individual feature cards, with a scroll-reveal animation */}
      <div className="feature-grid reveal">
        {/* Feature item template: swap copy freely */}
        <article className="card">
          {/* Icon for the feature */}
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 20V4h12v16M10 20v-6h4v6" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            {/* Feature title */}
            <strong>G+24 Storey Vertical Oasis</strong>
            {/* Feature description */}
            <p className="muted">Tallest residential address in the New Tech Corridor.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>Curated Boutique Retail & Co‑Working Lounge</strong>
            <p className="muted">Activated ground floor designed by global architects.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 8c6-6 10 6 16 0" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>Biophilic Atrium Lobby</strong>
            <p className="muted">Living walls, ambient light & signature scent diffusion.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 20l8-16 8 16" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>Handcrafted Italian Marble</strong>
            <p className="muted">Custom bronze accents; every surface tells a story.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 20V4m10 0v16M7 8h10M7 16h10" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>4 Ultra‑Silent Schindler Elevators</strong>
            <p className="muted">AI destination dispatch for effortless flow.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 6-9 6-9-6 9-6zm-9 12l9 6 9-6" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>RFID Smart Service Lift</strong>
            <p className="muted">Seamless logistics for staff & deliveries.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#12151e" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>AI‑Powered Security</strong>
            <p className="muted">Facial recognition + drone perimeter monitoring.</p>
          </div>
        </article>
        <article className="card">
          <div className="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 20l6-16 6 16M8 14h8" stroke="#12151e" stroke-width="1.5"/></svg>
          </div>
          <div>
            <strong>Smart Fire Suppression</strong>
            <p className="muted">Real‑time IoT sensors & predictive safety.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
