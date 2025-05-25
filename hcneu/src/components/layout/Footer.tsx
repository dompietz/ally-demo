// src/components/layout/Footer.tsx
import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img
            src="https://health-covery.com/wp-content/uploads/2025/02/allylogo1.webp"
            alt="Ally Logo"
            className="footer-logo"
          />
          <p className="footer-credits">
            Ein Angebot der{" "}
            <a href="https://health-covery.com" target="_blank" rel="noopener noreferrer">
              HealthCovery&nbsp;GmbH
            </a>
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Menu</h4>
            <ul>
              <li>Startseite</li>
              <li>Über&nbsp;Ally</li>
              <li>Inhalte</li>
              <li>Mission</li>
              <li>Preis</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>FAQ</li>
              <li>Für&nbsp;Behandler</li>
              <li>Kontakt</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Rechtliches</h4>
            <ul>
              <li>Impressum</li>
              <li>Datenschutz</li>
              <li>Widerrufserklärung</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
