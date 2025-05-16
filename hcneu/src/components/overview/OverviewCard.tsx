import React from 'react';
import './OverviewCard.css';

type Props = {
  label: string;      // New field
  title: string;
  subtitle: string;
  onAdd?: () => void; // Optional callback for "+"
};

const OverviewCard: React.FC<Props> = ({ label, title, subtitle, onAdd }) => {
  return (
    <div className="overview-card">
      <div className="wellbeing-orb"></div>

      <p className="card-label">{label}</p>
      
      <h3>{title}</h3>
      <p>{subtitle}</p>

      <button className="add-button" onClick={onAdd}>
        +
      </button>
    </div>
  );
};

export default OverviewCard;
