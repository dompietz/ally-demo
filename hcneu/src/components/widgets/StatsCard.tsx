import React from 'react';
import './StatsCard.css';

type Props = {
  title: string;
  value: string;
};

const StatsCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;
