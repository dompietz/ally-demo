// src/pages/LogInPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./LogInPage.css";

const LogInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Login fehlgeschlagen: " + error.message);
    } else {
      setError(null);
      navigate("/dashboard");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Bitte gib zuerst deine E-Mail-Adresse ein.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError("Fehler beim Senden der E-Mail: " + error.message);
    } else {
      setError(null);
      alert("Eine E-Mail zum Zurücksetzen deines Passworts wurde gesendet.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src="https://health-covery.com/wp-content/uploads/2025/02/allylogo1.webp"
          alt="Ally Logo"
          className="login-logo"
        />
        <h1>Willkommen zurück</h1>
        <p>Logge dich in deinen Ally-Account ein</p>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="forgot-password" onClick={handleForgotPassword}>
          Passwort vergessen?
        </p>

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogin}>Einloggen</button>
        <p className="signup-link">
          Noch keinen Account? <a href="/signup">Jetzt registrieren</a>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
