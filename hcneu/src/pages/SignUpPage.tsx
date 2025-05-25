import React from 'react';
import MultiStepSignup from '../components/auth/MultiStepSignup';
import '../pages/SignUpPage.css'; // or wherever your CSS lives

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-content-wrapper">
        <div className="sign-up-tile">
          <div className="sign-up-content">
            <h1>Willkommen bei Ally</h1>
            <h2>Starte dein persönliches CED-Tagebuch</h2>

            <MultiStepSignup />

            <p className="login-link">
              Bereits registriert? <a href="/login">Hier anmelden</a>
            </p>
          </div>
          <img
            className="sign-up-image"
            src="https://images.unsplash.com/photo-1742314591445-bfacc47276e3?q=80&w=3616&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Onboarding visual"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
