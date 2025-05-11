import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up-page">
      {/* ——— Logo ——— */}
      <header className="sign-up-logo-header">
        <Link to="/">
          <img
            src="https://health-covery.com/wp-content/uploads/2025/02/allylogo1.webp"
            alt="Ally Logo"
          />
        </Link>
      </header>

      {/* ——— Centered tile ——— */}
      <div className="sign-up-content-wrapper">
        <div className="sign-up-tile">
          {/* LEFT: copy & form */}
          <div className="sign-up-content">
            <h1>Willkommen bei Ally</h1>
            <h2>Melde dich an</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Deine E-Mail"
                  required
                  aria-label="E-Mail-Adresse"
                />
              </div>

              <div className="sign-up-buttons">
                <button type="submit" className="sign-up-btn">
                  Sign Up
                </button>
                <button type="button" className="insurance-code-btn">
                  Code deiner Krankenkasse?
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: image */}
          <img
            className="sign-up-image"
            src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1374&auto=format&fit=crop"
            alt="Waldszene"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
