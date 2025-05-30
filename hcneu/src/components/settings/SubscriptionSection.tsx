import React from 'react';
import './SubscriptionSection.css';

const SubscriptionSection: React.FC = () => {
  return (
    <div className="settings-section">
      <h2>Abonnement</h2>
      <div className="subscription-details">
        Aktueller Plan: <strong>Monatlich</strong><br />
        Nächste Abrechnung: <strong>01.06.2025</strong>
      </div>
      <button className="cancel-btn">Abo kündigen</button>
    </div>
  );
};

export default SubscriptionSection;
