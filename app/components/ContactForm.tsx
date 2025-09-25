"use client";

import { useState } from 'react';

/**
 * ContactForm component for booking private tours at The Aether Residences.
 * This component includes a form for users to submit their details and preferred appointment times.
 * It uses React's useState hook to manage form input values and handles submission to an API endpoint.
 * @returns {JSX.Element} The JSX for the contact form section.
 */
export default function ContactForm() {
  // State to store form data, initialized with empty strings
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: '',
  });

  /**
   * Handles changes to form input fields.
   * Updates the corresponding state with the new input value.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData(prev => ({ ...prev, [name]: value })); // Update the specific form field in state
  };

  /**
   * Handles the form submission asynchronously.
   * Prevents default form submission, sends data to the `/api/lead` endpoint,
   * and provides user feedback based on the API response.
   * @param {React.FormEvent} e - The form submission event object.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      // Send form data to the API endpoint
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      if (response.ok) {
        alert('Thanks for your inquiry! Our concierge team will reach out within 24 hours.');
        // Reset form data after successful submission
        setFormData({ name: '', phone: '', email: '', date: '', time: '', message: '' });
      } else {
        const errorData = await response.json(); // Parse error response from API
        alert(`Failed to submit form: ${errorData.error || 'Unknown error'}`); // Display error message
      }
    } catch (error) {
      console.error('Form submission error:', error); // Log client-side error
      alert('An error occurred. Please try again later.'); // Display generic error to user
    }
  };

  return (
    <section id="contact" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Private Viewings</div>
      {/* Call to action and contact form container, with a scroll-reveal animation */}
      <div className="cta reveal">
        {/* Text content encouraging tour bookings */}
        <div>
          <h2>Book a private tour</h2>
          <p>Tell us a little about yourself and preferred date/time. Our concierge team will reach out within 24 hours.</p>
          <ul className="muted">
            <li>• Zero‑pressure walkthroughs</li>
            <li>• On‑site parking & welcome lounge</li>
            <li>• Weekday sunrise & weekend sunset slots</li>
          </ul>
        </div>
        {/* Contact Form for tour appointments */}
        {/* Netlify Forms ready (free) - data-netlify="true" and netlify-honeypot="bot-field" are for Netlify's form handling */}
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" /> {/* Required for Netlify forms */}
          <p className="sr-only"><label>Don't fill this out if you're human: <input name="bot-field" /></label></p> {/* Honeypot for spam prevention */}
          {/* Full Name Input */}
          <div>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" required placeholder="Your name" autoComplete="name" value={formData.name} onChange={handleChange} />
          </div>
          {/* Phone Number Input */}
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" required pattern="^[0-9]{10}$" placeholder="10‑digit mobile" inputMode="numeric" value={formData.phone} onChange={handleChange} />
            <div className="helper">Format: 10 digits, no spaces</div>
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="name@example.com" autoComplete="email" value={formData.email} onChange={handleChange} />
          </div>
          {/* Preferred Date and Time Inputs (grid layout) */}
          <div className="grid-2">
            <div>
              <label htmlFor="date">Preferred Date</label>
              <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="time">Preferred Time</label>
              <input id="time" name="time" type="time" value={formData.time} onChange={handleChange} />
            </div>
          </div>
          {/* Message Textarea */}
          <div>
            <label htmlFor="message">Anything we should know?</label>
            <textarea id="message" name="message" rows={4} placeholder="Tell us about your ideal home..." value={formData.message} onChange={handleChange}></textarea>
          </div>
          {/* Submit Button */}
          <button className="btn btn-primary" type="submit">Request Appointment</button>
        </form>
      </div>
    </section>
  );
}
