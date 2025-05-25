import React, { useState } from 'react';
import { signUpWithEmail } from '../../lib/auth';
import './MultiStepSignup.css';

const MultiStepSignup: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!email.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSignup = async () => {
    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    try {
      await signUpWithEmail(email, password);
      window.location.href = '/check-email';
    } catch (err: any) {
      setError(err.message || 'Fehler beim Erstellen des Kontos');
    }
  };

  return (
    <div className="signup-wrapper">
      <h2 className="signup-title">Hier registrieren</h2>

      <div className="progress-root">
        <div
          className="progress-indicator"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div className="step-card">
          <label htmlFor="email">Gib deine E-Mail-Adresse ein</label>
          <input
            id="email"
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="signup-nav">
            <button className="nav-btn primary" onClick={handleNext}>Weiter</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-card">
          <label htmlFor="password">Erstelle ein Passwort (mind. 6 Zeichen)</label>
          <input
            id="password"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="signup-nav">
            <button className="nav-btn outline" onClick={() => setStep(1)}>Zurück</button>
            <button className="nav-btn primary" onClick={handleSignup}>Konto erstellen</button>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MultiStepSignup;
