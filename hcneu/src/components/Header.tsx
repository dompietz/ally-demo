import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsOpen((x) => !x);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: null, threshold: 0 }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__inner">
        <Link className="header__logo" to="/">
          <picture>
            <source
              srcSet="https://health-covery.com/wp-content/uploads/2025/05/ALLYlogonobg1311.png"
              media="(max-width: 800px)"
            />
            <img
              src={
                scrolled
                  ? "https://health-covery.com/wp-content/uploads/2025/05/ALLYlogonobg1311.png"
                  : "https://health-covery.com/wp-content/uploads/2025/05/ALLYlogo-white.webp"
              }
              alt="Ally Logo"
            />
          </picture>
        </Link>

        <nav className="header__nav--desktop">
          <a href="#about">Über Ally</a>
          <a href="#faq">FAQ</a>
          <Link to="/signup" className="nav-button filled">Sign Up</Link>
          <Link to="/login" className="nav-button outline">Log In</Link>
        </nav>

        <button
          className={`header__hamburger ${isOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`header__mobile-menu ${isOpen ? "is-open" : ""}`}>
        <button className="header__close" onClick={toggleMenu}>×</button>
        <nav className="header__nav--mobile">
          <a href="#about" onClick={toggleMenu}>Über Ally</a>
          <a href="#faq" onClick={toggleMenu}>FAQ</a>
          <Link to="/signup" className="nav-button filled" onClick={toggleMenu}>Sign Up</Link>
          <Link to="/login" className="nav-button outline" onClick={toggleMenu}>Log In</Link>
        </nav>
      </div>
    </header>
  );
}
