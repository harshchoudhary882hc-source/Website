/**
 * About component that describes the philosophy and details of The Aether Residences.
 * It includes a narrative about innovation and serenity, and a slab with contact and address information.
 * @returns {JSX.Element} The JSX for the about section.
 */
export default function About() {
  return (
    <section id="about" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Our Philosophy</div>
      {/* Main content area for the about section, with a scroll-reveal animation */}
      <div className="about reveal">
        {/* Text content about the residences */}
        <div>
          <h2>Where innovation meets serenity</h2>
          <p>Crafted for tomorrow's leaders, The Aether Residences brings together quiet craftsmanship and intelligent design. Every arrival is a reset; every corridor, a calm breath. From biophilic lobbies to the Sky Terrace Wellness Deck, your home extends beyond walls into rituals of restoration.</p>
          <p className="muted">Residences are engineered with acoustic glazing, adaptive climate control, and low‑emission materials. Sustainability aligns with sophistication—without compromise.</p>
        </div>
        {/* Information slab with address, timings, RERA, and contact details */}
        <div className="slab">
          <div className="grid-2">
            {/* Address information */}
            <div>
              <strong>Address</strong>
              <p className="muted">New Tech Corridor, Sector 9<br/>City, State — 400000</p>
            </div>
            {/* Timings information */}
            <div>
              <strong>Timings</strong>
              <p className="muted">Daily 10:00–20:00 IST<br/>Private tours by appointment</p>
            </div>
            {/* RERA / Registration information */}
            <div>
              <strong>RERA / Registration</strong>
              <p className="muted">Placeholder ID — update with official details.</p>
            </div>
            {/* Contact information */}
            <div>
              <strong>Contact</strong>
              <p className="muted">+91 90XX‑XXX‑XXX<br/>hello@aetherresidences.example</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
