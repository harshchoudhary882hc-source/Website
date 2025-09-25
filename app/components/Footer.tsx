"use client";

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Footer component for the Aether Residences website.
 * It displays copyright information, brand details, and essential navigation links.
 * The current year in the copyright notice is dynamically updated using a useEffect hook.
 * @returns {JSX.Element} The JSX for the footer section.
 */
export default function Footer() {
  // Effect hook to dynamically update the current year in the copyright notice
  useEffect(() => {
    const yearSpan = document.getElementById('year'); // Get the span element by its ID
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString(); // Set the text content to the current year
    }
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <footer>
      <div className="container" style={{display:'flex', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap'}}>
        {/* Brand information and copyright */}
        <div>
          <div className="brand"><span className="logo"></span><span>Aether Residences</span></div>
          <p className="muted">© <span id="year"></span> Aether Living Pvt. Ltd. All rights reserved.</p>
        </div>
        {/* Navigation links for privacy, terms, and enquiry */}
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <Link href="#" className="muted">Privacy</Link>
          <Link href="#" className="muted">Terms</Link>
          <Link href="#contact" className="btn">Enquire</Link>
        </div>
      </div>
    </footer>
  );
}
