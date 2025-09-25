"use client";

import { useEffect } from 'react';

/**
 * Particles component that creates and animates floating particles in the background.
 * These particles add a subtle visual effect to the website.
 * @returns {JSX.Element} The JSX for the particles container.
 */
export default function Particles() {
  useEffect(() => {
    /**
     * Creates a single particle element, applies random positioning and animation delays,
     * and appends it to the particles container. The particle is automatically removed after its animation.
     */
    function createParticle() {
      const particle = document.createElement('div'); // Create a new div element for the particle
      particle.className = 'particle'; // Assign the 'particle' CSS class
      particle.style.left = Math.random() * window.innerWidth + 'px'; // Random horizontal position
      particle.style.animationDelay = Math.random() * 6 + 's'; // Random animation delay
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Random animation duration
      document.getElementById('particles-container')?.appendChild(particle); // Append to the container
      
      // Remove the particle from the DOM after its animation duration
      setTimeout(() => {
        particle.remove();
      }, 6000); // Assumes animation-duration + delay won't exceed 6s
    }

    // Create particles at a regular interval
    const particleInterval = setInterval(createParticle, 200);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(particleInterval);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  return (
    <div id="particles-container"></div> // The container for floating particles
  );
}
