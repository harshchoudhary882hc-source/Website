"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero"; // Import the Hero component
import Features from "./components/Features"; // Import the Features component
import About from "./components/About"; // Import the About component
import VirtualTour from "./components/VirtualTour"; // Import the VirtualTour component
import Gallery from "./components/Gallery"; // Import the Gallery component
import PricingCalculator from "./components/PricingCalculator"; // Import the PricingCalculator component
import FloorPlans from "./components/FloorPlans"; // Import the FloorPlans component
import ContactForm from "./components/ContactForm"; // Import the ContactForm component
import Chatbot from "./components/Chatbot"; // Import the Chatbot component

/**
 * Home component that renders the main content of the landing page.
 * It includes various sections of the website and handles the lead modal functionality.
 * @returns {JSX.Element} The main landing page content.
 */
export default function Home() {
  // State to control the visibility of the lead generation modal
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Effect to show the lead modal after a delay (e.g., 2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setShowLeadModal(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect for the hero section background.
  // This effect makes the background image scroll at a different speed than the foreground content.
  useEffect(() => {
    let ticking = false; // Flag to throttle scroll events

    // Function to update the parallax effect on scroll
    function updateOnScroll() {
      const scrolled = window.pageYOffset; // Get current scroll position
      const heroMedia = document.querySelector('.hero-media') as HTMLElement; // Select the hero media element
      if (heroMedia) {
        heroMedia.style.transform = `translateY(${scrolled * 0.5}px)`; // Apply translateY transformation
      }
      ticking = false; // Reset ticking flag
    }

    // Request animation frame to optimize scroll handling
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', requestTick);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Scroll-reveal effect for elements with the 'reveal' class.
  // This effect makes elements fade in and slide up as they enter the viewport.
  useEffect(() => {
    // Create an IntersectionObserver if supported by the browser
    const io = ('IntersectionObserver' in window)
      ? new IntersectionObserver((entries) => {
          // Loop through observed entries
          entries.forEach(e => { 
            if (e.isIntersecting) { // If element is in viewport
              e.target.classList.add('show'); // Add 'show' class to trigger animation
              io.unobserve(e.target); // Stop observing once animation is triggered
            } 
          });
        }, { threshold: .15 })
      : null; // Fallback to null if IntersectionObserver is not supported

    // Observe all elements with the 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => io && io.observe(el));

    // Cleanup function to unobserve elements on component unmount
    return () => {
      document.querySelectorAll('.reveal').forEach(el => io && io.unobserve(el));
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0B0F" }}>
      {/* Hero section of the landing page */}
      <Hero />
      {/* Features section, displaying key highlights */}
      <Features />
      {/* About Us section, detailing the philosophy and contact information */}
      <About />
      {/* Virtual Tour section, offering an interactive experience */}
      <VirtualTour />
      {/* Image gallery section with filters and a lightbox */}
      <Gallery />
      {/* Pricing calculator for different unit types and floor levels */}
      <PricingCalculator />
      {/* Floor plans section, showcasing various layouts */}
      <FloorPlans />
      {/* Contact form for private tour bookings */}
      <ContactForm />
      {/* Chatbot for interactive assistance */}
      <Chatbot />

      {/* Lead Generation Modal: Appears after a delay to capture user information */}
      {showLeadModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "grid", placeItems: "center", zIndex: 10000 }}>
          <div style={{ background: "#1A1D24", border: "1px solid #2A2D35", borderRadius: 16, width: "min(520px, 92vw)", padding: 24, color: "#FAF9F6", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Get Floor Plans & Pricing</h2>
              <button aria-label="Close" onClick={() => setShowLeadModal(false)} style={{ background: "transparent", border: 0, color: "#FAF9F6", fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            <p style={{ marginTop: 0, color: "#cbd0dd" }}>Share your details and our concierge will reach out within 24 hours.</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData.entries());

              try {
                const response = await fetch('/api/lead', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  alert("Thanks! We'll be in touch shortly.");
                  setShowLeadModal(false);
                  form.reset(); // Reset form fields on successful submission
                } else {
                  const errorData = await response.json();
                  alert(`Failed to submit form: ${errorData.error || 'Unknown error'}`);
                }
              } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again later.');
              }
            }} style={{ display: "grid", gap: 12 }}>
              <div>
                <label htmlFor="lead_name" style={{ fontSize: 14, color: "#c7ccda" }}>Full Name</label>
                <input id="lead_name" name="name" required placeholder="Your name" style={{ width: "100%", padding: "12px 14px", background: "#0f121a", border: "1px solid #2A2D35", color: "#FAF9F6", borderRadius: 10 }} />
              </div>
              <div>
                <label htmlFor="lead_phone" style={{ fontSize: 14, color: "#c7ccda" }}>Phone</label>
                <input id="lead_phone" name="phone" required pattern="^[0-9]{10}$" placeholder="10‑digit mobile" style={{ width: "100%", padding: "12px 14px", background: "#0f121a", border: "1px solid #2A2D35", color: "#FAF9F6", borderRadius: 10 }} />
              </div>
              <div>
                <label htmlFor="lead_email" style={{ fontSize: 14, color: "#c7ccda" }}>Email</label>
                <input id="lead_email" name="email" type="email" required placeholder="name@example.com" style={{ width: "100%", padding: "12px 14px", background: "#0f121a", border: "1px solid #2A2D35", color: "#FAF9F6", borderRadius: 10 }} />
              </div>
              <button type="submit" style={{ padding: "12px 16px", borderRadius: 999, background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)", color: "#0A0B0F", fontWeight: 700, border: 0, cursor: "pointer" }}>Get Details</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
