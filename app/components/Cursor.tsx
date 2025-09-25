"use client";

import { useEffect } from 'react';

/**
 * Cursor component that implements a custom animated cursor and a magnetic effect for interactive elements.
 * The custom cursor consists of a main dot and a follower circle, both responding to mouse movement.
 * Interactive elements (links, buttons, cards, gallery items) trigger hover effects on the cursor.
 * Elements with the 'magnetic' class will exhibit a slight magnetic pull towards the mouse.
 * @returns {JSX.Element} The JSX for the custom cursor elements.
 */
export default function Cursor() {
  useEffect(() => {
    // Get references to the cursor and cursor follower DOM elements
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;
    
    // Initialize mouse and follower positions
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    /**
     * Animates the cursor follower to smoothly trail the main cursor.
     * Uses requestAnimationFrame for optimized animation.
     */
    const animateFollower = () => {
      // Interpolate follower position towards mouse position for a smooth effect
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      // Apply the new position to the cursor follower
      if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
      }
      requestAnimationFrame(animateFollower); // Continue animation loop
    };

    // Event listener for mouse movement to update cursor position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Update the main cursor's position directly
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    });

    animateFollower(); // Start the follower animation

    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll('a, button, .card, .gallery-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('cursor-hover');
        if (cursorFollower) cursorFollower.classList.add('cursor-follower-hover');
      });
      el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('cursor-hover');
        if (cursorFollower) cursorFollower.classList.remove('cursor-follower-hover');
      });
    });

    // Magnetic Effect for specific elements
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect(); // Get element's size and position
        // Calculate relative mouse position within the element
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Apply a slight translation based on mouse position
        (el as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        (el as HTMLElement).style.transform = 'translate(0, 0)'; // Reset position on mouse leave
      });
    });

    // Cleanup function to remove all event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousemove', () => {});
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      magneticElements.forEach(el => {
        el.removeEventListener('mousemove', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
    </>
  );
}
