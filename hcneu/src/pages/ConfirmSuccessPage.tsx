import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // adjust if needed
import './ConfirmSuccessPage.css';

const ConfirmSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        navigate('/questionnaire');
      } else {
        setChecking(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (checking) {
    return (
      <div className="confirm-success-wrapper">
        <div className="confirm-success-card">
          <p>Wir prüfen deinen Loginstatus …</p>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-success-wrapper">
      <div className="confirm-success-card">
        <h1>Bestätigt!</h1>
        <p>Deine E-Mail-Adresse wurde erfolgreich bestätigt.</p>
        <button
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Jetzt einloggen
        </button>
      </div>
    </div>
  );
};

export default ConfirmSuccessPage;
