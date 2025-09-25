"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Gallery component that displays a collection of images with filtering and a lightbox feature.
 * Users can filter images by category and view them in a full-screen lightbox with navigation.
 * @returns {JSX.Element} The JSX for the gallery section.
 */
export default function Gallery() {
  // State for the currently active filter category (e.g., 'all', 'exterior', 'interior', 'amenities')
  const [filter, setFilter] = useState('all');
  // State to control the visibility of the lightbox modal
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // State to store the details of the currently viewed image in the lightbox
  const [currentImage, setCurrentImage] = useState({
    src: '',
    alt: '',
    index: 0,
  });

  // Array of gallery image data, including source, alt text, and category
  const galleryItems = [
    { src: "https://picsum.photos/id/1015/800/600", alt: "Twilight skyline view from upper floors", category: "exterior" },
    { src: "https://picsum.photos/id/249/800/600", alt: "Handcrafted Italian marble lobby with bronze accents", category: "interior" },
    { src: "https://picsum.photos/id/257/800/600", alt: "Infinity pool on Sky Terrace at sunset", category: "amenities" },
    { src: "https://picsum.photos/id/261/800/600", alt: "Residence living area with floor‑to‑ceiling windows", category: "interior" },
    { src: "https://picsum.photos/id/263/800/600", alt: "Ground‑floor co‑working lounge with boutique retail", category: "amenities" },
    { src: "https://picsum.photos/id/270/800/600", alt: "Meditation pavilion with ambient lighting", category: "amenities" },
  ];

  // Filter gallery items based on the current filter state
  const filteredItems = galleryItems.filter(item => filter === 'all' || item.category === filter);

  /**
   * Opens the lightbox with the specified image.
   * @param {string} imgSrc - The source URL of the image to display.
   * @param {string} imgAlt - The alt text for the image.
   * @param {number} index - The index of the image in the `galleryItems` array.
   */
  const openLightbox = (imgSrc: string, imgAlt: string, index: number) => {
    setCurrentImage({ src: imgSrc, alt: imgAlt, index: index }); // Set current image details
    setLightboxOpen(true); // Open the lightbox
    document.body.style.overflow = 'hidden'; // Prevent body scrolling when lightbox is open
  };

  /**
   * Closes the lightbox and re-enables body scrolling.
   */
  const closeLightbox = () => {
    setLightboxOpen(false); // Close the lightbox
    document.body.style.overflow = 'auto'; // Restore body scrolling
  };

  /**
   * Navigates to the previous or next image in the gallery within the lightbox.
   * @param {'prev' | 'next'} direction - The direction to navigate (previous or next).
   */
  const navigateLightbox = (direction: 'prev' | 'next') => {
    let newIndex = currentImage.index;
    if (direction === 'next') {
      newIndex = (currentImage.index + 1) % galleryItems.length; // Loop to the beginning if at the end
    } else {
      newIndex = (currentImage.index - 1 + galleryItems.length) % galleryItems.length; // Loop to the end if at the beginning
    }
    const newImage = galleryItems[newIndex]; // Get the new image data
    setCurrentImage({ src: newImage.src, alt: newImage.alt, index: newIndex }); // Update current image in state
  };

  // Effect to handle keyboard events (e.g., Escape key to close lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    // Add or remove keydown listener based on lightbox state
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    // Cleanup function to remove event listener on component unmount or lightbox state change
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, galleryItems.length]); // Re-run effect if lightboxOpen or galleryItems length changes

  return (
    <section id="gallery" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Gallery</div>
      {/* Main heading for the gallery section */}
      <h2>Textures, light, and quiet confidence</h2>
      {/* Filter buttons for the gallery */}
      <div className="gallery-filters">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'exterior' ? 'active' : ''}`} onClick={() => setFilter('exterior')}>Exterior</button>
        <button className={`filter-btn ${filter === 'interior' ? 'active' : ''}`} onClick={() => setFilter('interior')}>Interior</button>
        <button className={`filter-btn ${filter === 'amenities' ? 'active' : ''}`} onClick={() => setFilter('amenities')}>Amenities</button>
      </div>
      {/* Image grid for the gallery, with a scroll-reveal animation and ARIA live region for accessibility */}
      <div className="gallery reveal" aria-live="polite">
        {/* Map through filtered items and render each as an Image component */}
        {filteredItems.map((item, index) => (
          <div className="gallery-item" data-category={item.category} key={index}>
            <Image
              loading="lazy"
              src={item.src}
              alt={item.alt}
              width={800} // Specify appropriate width for image optimization
              height={600} // Specify appropriate height for image optimization
              onClick={() => openLightbox(item.src, item.alt, index)} // Open lightbox on image click
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal: Conditionally rendered when lightboxOpen is true */}
      {lightboxOpen && (
        <div id="lightbox" className="lightbox open" onClick={closeLightbox}> {/* Close lightbox on overlay click */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing lightbox when clicking image content */}
            <button className="lightbox-close" onClick={closeLightbox}>×</button> {/* Close button for lightbox */}
            <Image id="lightbox-image" src={currentImage.src} alt={currentImage.alt} width={800} height={600} /> {/* Display current image */}
            {/* Navigation buttons for previous and next images */}
            <div className="lightbox-nav">
              <button onClick={() => navigateLightbox('prev')} className="lightbox-prev">‹</button>
              <button onClick={() => navigateLightbox('next')} className="lightbox-next">›</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
