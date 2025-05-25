import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./LogInPage.css"; // Reuse existing styles

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError("Fehler beim Zurücksetzen: " + error.message);
    } else {
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Neues Passwort setzen</h1>
        {!success ? (
          <>
            <input
              type="password"
              placeholder="Neues Passwort"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleResetPassword}>Passwort zurücksetzen</button>
          </>
        ) : (
          <p>Dein Passwort wurde erfolgreich geändert. Du wirst weitergeleitet …</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
