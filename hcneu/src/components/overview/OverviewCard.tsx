import React from 'react';
import './OverviewCard.css';

type Props = {
  label: string;
  title: string;
  subtitle: string;
  status?: string;
  statusIcon?: React.ReactNode;
  onAdd?: () => void;
};

const OverviewCard: React.FC<Props> = ({ label, title, status, statusIcon, onAdd }) => {
  return (
    <div className="overview-card">
      <div className="header-row">
        <div className="wellbeing-orb" />
        <p className="card-label">{label}</p>
    </div>
      
    <div className="card-content">
  <h3>{title}</h3>

  {status && (
    <div className="status-container">
      <strong>{status}</strong>
      {statusIcon && <span className="status-icon">{statusIcon}</span>}
    </div>
  )}
</div>

      <button className="add-button" onClick={onAdd}>
        Daten hinzufügen
      </button>
    </div>
  );
};

export default OverviewCard;
