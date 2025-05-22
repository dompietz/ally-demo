import React from 'react';
import './CheckEmailPage.css';

const CheckEmailPage: React.FC = () => {
  return (
    <div className="check-email-wrapper">
      <div className="check-email-card">
        <h1>Fast geschafft!</h1>
        <p>Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Adresse, um fortzufahren.</p>
        <p className="subtext">Du kannst das Fenster schließen, nachdem du den Link angeklickt hast.</p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
