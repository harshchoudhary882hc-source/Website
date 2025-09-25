/**
 * VirtualTour component that provides a placeholder for an interactive 360° virtual tour.
 * It displays a preview area with a title, description, key features, and a button to launch the tour.
 * @returns {JSX.Element} The JSX for the virtual tour section.
 */
export default function VirtualTour() {
  // Placeholder function for opening the virtual tour
  const openVirtualTour = () => {
    alert('Virtual tour would open here. This would typically integrate with a 360° tour service like Matterport or similar.');
  };

  return (
    <section id="virtual-tour" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Virtual Experience</div>
      {/* Main heading for the virtual tour section */}
      <h2>Explore from anywhere</h2>
      {/* Container for the virtual tour preview, with a scroll-reveal animation */}
      <div className="virtual-tour-container reveal">
        <div className="tour-preview">
          <div className="tour-placeholder">
            {/* Icon representing a 360° tour */}
            <div className="tour-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>360° Virtual Tour</h3>
            <p>Experience The Aether Residences from the comfort of your home. Navigate through our spaces with interactive 360° views.</p>
            {/* List of features highlighted in the virtual tour */}
            <div className="tour-features">
              <span className="badge">🏠 Living Spaces</span>
              <span className="badge">🏊 Sky Terrace</span>
              <span className="badge">🏢 Lobby Area</span>
              <span className="badge">🚗 Parking</span>
            </div>
            {/* Button to start the virtual tour */}
            <button className="btn btn-primary" onClick={openVirtualTour}>Start Virtual Tour</button>
          </div>
        </div>
      </div>
    </section>
  );
}
