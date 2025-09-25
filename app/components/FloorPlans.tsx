"use client";

import { useState } from 'react';
import Link from 'next/link';

/**
 * FloorPlans component that displays different floor plans with a tabbed interface.
 * Users can switch between 1 BHK, 2 BHK, and 3 BHK plans to view details like carpet area, facing, and highlights.
 * It uses React's useState hook to manage the active tab.
 * @returns {JSX.Element} The JSX for the floor plans section.
 */
export default function FloorPlans() {
  // State to manage the currently active tab (e.g., '1bhk', '2bhk', '3bhk')
  const [activeTab, setActiveTab] = useState('1bhk');

  return (
    <section id="plans" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Floor Plans</div>
      {/* Main heading for the floor plans section */}
      <h2>Spaces tuned to your rhythm</h2>
      {/* Tab buttons for switching between different BHK types */}
      <div className="tabs" role="tablist" aria-label="Floor plan types">
        <button className={`tab ${activeTab === '1bhk' ? 'active' : ''}`} role="tab" aria-selected={activeTab === '1bhk'} aria-controls="plan1" id="tab1" onClick={() => setActiveTab('1bhk')}>1 BHK</button>
        <button className={`tab ${activeTab === '2bhk' ? 'active' : ''}`} role="tab" aria-selected={activeTab === '2bhk'} aria-controls="plan2" id="tab2" onClick={() => setActiveTab('2bhk')}>2 BHK</button>
        <button className={`tab ${activeTab === '3bhk' ? 'active' : ''}`} role="tab" aria-selected={activeTab === '3bhk'} aria-controls="plan3" id="tab3" onClick={() => setActiveTab('3bhk')}>3 BHK</button>
      </div>
      {/* 1 BHK Floor Plan Details: Conditionally displayed based on activeTab */}
      <div id="plan1" className={`plan ${activeTab === '1bhk' ? 'active' : ''}`} role="tabpanel" aria-labelledby="tab1">
        <table>
          <thead><tr><th>Type</th><th>Carpet Area</th><th>Facing</th><th>Highlights</th></tr></thead>
          <tbody>
            <tr><td>1 BHK A1</td><td>48 m²</td><td>East</td><td>Corner layout, balcony, acoustic glazing</td></tr>
            <tr><td>1 BHK A2</td><td>51 m²</td><td>West</td><td>Work‑from‑home niche, walk‑in wardrobe</td></tr>
          </tbody>
        </table>
        {/* Links to download sample plans */}
        <p className="helper">Download sample plan: <Link className="btn" href="#">A1 PDF</Link> <Link className="btn" href="#">A2 PDF</Link></p>
      </div>
      {/* 2 BHK Floor Plan Details: Conditionally displayed based on activeTab */}
      <div id="plan2" className={`plan ${activeTab === '2bhk' ? 'active' : ''}`} role="tabpanel" aria-labelledby="tab2">
        <table>
          <thead><tr><th>Type</th><th>Carpet Area</th><th>Facing</th><th>Highlights</th></tr></thead>
          <tbody>
            <tr><td>2 BHK B1</td><td>78 m²</td><td>North</td><td>Dual balconies, island kitchen</td></tr>
            <tr><td>2 BHK B2</td><td>84 m²</td><td>South</td><td>Master ensuite, utility deck</td></tr>
          </tbody>
        </table>
        <p className="helper">Download sample plan: <Link className="btn" href="#">B1 PDF</Link> <Link className="btn" href="#">B2 PDF</Link></p>
      </div>
      {/* 3 BHK Floor Plan Details: Conditionally displayed based on activeTab */}
      <div id="plan3" className={`plan ${activeTab === '3bhk' ? 'active' : ''}`} role="tabpanel" aria-labelledby="tab3">
        <table>
          <thead><tr><th>Type</th><th>Carpet Area</th><th>Facing</th><th>Highlights</th></tr></thead>
          <tbody>
            <tr><td>3 BHK C1</td><td>112 m²</td><td>South‑West</td><td>Private study, panoramic glazing</td></tr>
            <tr><td>3 BHK C2</td><td>126 m²</td><td>North‑East</td><td>Corner suite, bathtub, walk‑in pantry</td></tr>
          </tbody>
        </table>
        <p className="helper">Download sample plan: <Link className="btn" href="#">C1 PDF</Link> <Link className="btn" href="#">C2 PDF</Link></p>
      </div>
    </section>
  );
}
