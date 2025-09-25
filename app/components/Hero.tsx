import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    function revealText() {
      const textElements = document.querySelectorAll('h1, h2, .lead');
      textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        el.classList.add('text-reveal');
        
        if (text) {
          text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            (span as HTMLElement).style.animationDelay = (index * 0.05) + 's';
            el.appendChild(span);
          });
        }
      });
    }

    // Initialize text reveal on load
    window.addEventListener('load', revealText);

    return () => {
      window.removeEventListener('load', revealText);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        {/* The background image is handled by CSS, but if it were a direct image, it would be here. */}
      </div>
      <div className="container hero-wrap">
        <span className="eyebrow">Elegance Elevated</span>
        <h1>LUXURY ISN'T JUST SEEN. <br/>IT'S FELT IN THE STILLNESS BETWEEN STREETS.</h1>
        <div className="divider" role="presentation"></div>
        <p className="lead">At The Aether Residences, we don't build towers—we sculpt silence. Above the buzz of innovation, find your calm. A G+24 vertical oasis for pioneers who demand excellence in every detail.</p>
        <div className="hero-cta">
          <Link className="btn btn-primary magnetic" href="#contact">Schedule a Private Tour</Link>
          <Link className="btn magnetic" href="#plans">See Floor Plans</Link>
        </div>
        <div style={{marginTop:'1rem'}} className="badge" aria-label="Signature amenity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M12 4v16" stroke="#d4b56a" stroke-width="1.5"/></svg>
          Sky Terrace Wellness Deck • Infinity Pool • Sunset Yoga
        </div>
      </div>
    </section>
  );
}
