// src/components/layout/GlowingBackground.tsx
import React from 'react';
import './GlowingBackground.css';

const GlowingBackground: React.FC = () => {
  return (
    <div className="glowing-background">
      <div className="blurred-gradient" />
      <div className="grainy-overlay" />
    </div>
  );
};

export default GlowingBackground;

