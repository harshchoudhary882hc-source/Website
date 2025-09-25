import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google"; // Using Google Fonts
import "./globals.css";
import Header from "./components/Header"; // Import the Header component
import Cursor from "./components/Cursor"; // Import the Cursor component
import Particles from "./components/Particles"; // Import the Particles component
import Footer from "./components/Footer"; // Import the Footer component
import JsonLdSchema from "./components/JsonLdSchema"; // Import the JsonLdSchema component

// Define Playfair Display font with specific weights and subsets
const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair-display", // Custom CSS variable for Playfair Display
  display: "swap", // Optimize font loading
});

// Define Montserrat font with specific weights and subsets
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat", // Custom CSS variable for Montserrat
  display: "swap", // Optimize font loading
});

/**
 * Metadata for the Aether Residences website.
 * This includes SEO title, description, keywords, author, robots, Open Graph, and Twitter card information.
 */
export const metadata: Metadata = {
  title: "The Aether Residences — Elegance Elevated",
  description: "The Aether Residences — a G+24 sky‑high sanctuary in the New Tech Corridor. Handcrafted finishes, AI‑powered security, and a signature Sky Terrace Wellness Deck.",
  keywords: ["luxury apartments", "residential property", "New Tech Corridor", "premium living", "sky terrace", "infinity pool", "AI security"],
  authors: [{ name: "Aether Living Pvt. Ltd." }],
  robots: "index, follow",
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://aetherresidences.com/",
    title: "The Aether Residences — Elegance Elevated",
    description: "A G+24 sky‑high sanctuary in the New Tech Corridor. Handcrafted finishes, AI‑powered security, and a signature Sky Terrace Wellness Deck.",
    images: [{ url: "https://aetherresidences.com/og-image.jpg" }],
  },
  // Twitter
  twitter: {
    card: "summary_large_image",
    url: "https://aetherresidences.com/",
    title: "The Aether Residences — Elegance Elevated",
    description: "A G+24 sky‑high sanctuary in the New Tech Corridor. Handcrafted finishes, AI‑powered security, and a signature Sky Terrace Wellness Deck.",
    images: [{ url: "https://aetherresidences.com/og-image.jpg" }],
  },
};

/**
 * JSON-LD schema data for the Organization.
 * This provides structured data to search engines for better indexing and rich snippets.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Aether Residences",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://www.instagram.com/",
    "https://www.facebook.com/"
  ]
};

/**
 * RootLayout component that wraps the entire application.
 * It sets up the HTML structure, global styles, font definitions, and integrates core components like Header, Footer, Cursor, Particles, and JSON-LD schema.
 * @param {Readonly<{ children: React.ReactNode }>} { children } - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${montserrat.variable} antialiased`}>
        {/* Accessible Skip Link for keyboard navigation */}
        <a className="sr-only" href="#main">Skip to content</a>

        {/* Custom cursor, visible throughout the site. Its logic is handled in components/Cursor.tsx */}
        <Cursor />

        {/* Floating background particles for visual enhancement. Logic in components/Particles.tsx */}
        <Particles />

        {/* Main site header with navigation. Component in components/Header.tsx */}
        <Header />
        <main id="main">
          {children}
        </main>
        {/* Main site footer. Component in components/Footer.tsx */}
        <Footer />
        {/* JSON-LD structured data for SEO. Component in components/JsonLdSchema.tsx */}
        <JsonLdSchema schema={organizationSchema} />
      </body>
    </html>
  );
}
