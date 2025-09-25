import Link from 'next/link';

/**
 * Header component for the Aether Residences website.
 * This component includes the brand logo, site title, and main navigation links.
 * @returns {JSX.Element} The header element of the application.
 */
export default function Header() {
  return (
    <header>
      <div className="container nav">
        {/* Brand logo and title, linking to the home section */}
        <Link className="brand" href="#" aria-label="The Aether Residences Home">
          <span className="logo" aria-hidden="true"></span>
          <span>Aether Residences</span>
        </Link>
        {/* Main navigation links */}
        <nav className="links" aria-label="Main">
          <Link href="#features">Features</Link>
          <Link href="#about">About</Link>
          <Link href="#virtual-tour">Virtual Tour</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#plans">Floor Plans</Link>
          <Link href="#contact" className="btn btn-primary">Book a Viewing</Link>
        </nav>
      </div>
    </header>
  );
}
