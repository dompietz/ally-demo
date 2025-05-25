// src/pages/DataPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GlowingBackground from '../components/layout/GlowingBackground';
import './DataPage.css'; // Newly split styles

const DataPage: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="data-page-wrapper">
      <div className="glow-wrapper">
        <GlowingBackground />
      </div>

      <DashboardHeader
        title="Deine Daten"
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      <div className="data-content">
        <motion.section
          className="data-overview-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Gesundheitsdaten Übersicht</h2>
          <p>Ein Platzhalter für Diagramme, Tabellen und Statistiken über deine bisherigen Einträge.</p>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
};

export default DataPage;
