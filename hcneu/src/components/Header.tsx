import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((x) => !x);

  return (
    <header className="header">
      <div className="header__inner">
        {/* ─── Logo now links to “/” ─── */}
        <div className="header__logo">
          <Link to="/">
            <img
              src="https://health-covery.com/wp-content/uploads/2025/05/ALLYlogonobg1311.png"
              alt="Ally Logo"
            />
          </Link>
        </div>

        {/* desktop nav */}
        <nav className="header__nav--desktop">
          <a href="#about">Über Ally</a>
          <a href="#faq">FAQ</a>
          <Link to="/signup" className="nav-button filled">
            Sign Up
          </Link>
          <Link to="/login" className="nav-button outline">
            Log In
          </Link>
        </nav>

        {/* hamburger toggle */}
        <button
          className={`header__hamburger${isOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* full-screen mobile overlay */}
      <div className={`header__mobile-menu${isOpen ? " is-open" : ""}`}>
        {/* close button inside the overlay */}
        <button
          className="header__close"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          ×
        </button>

        <nav className="header__nav--mobile">
          <a onClick={toggleMenu} href="#about">Über Ally</a>
          <a onClick={toggleMenu} href="#faq">FAQ</a>
          <Link onClick={toggleMenu} to="/signup" className="nav-button filled">
            Sign Up
          </Link>
          <Link onClick={toggleMenu} to="/login" className="nav-button outline">
            Log In
          </Link>
        </nav>
      </div>
    </header>
  );
}
