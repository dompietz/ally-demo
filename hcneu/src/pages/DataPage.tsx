// src/pages/DataPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import './DashboardPage.css'; // Shared styles

const DataPage: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Gradient background */}
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      {/* Header with custom title */}
      <DashboardHeader
        title="Deine Daten"
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      {/* Main content placeholder */}
      <div className="dashboard-content">
        <motion.section
          className="overview-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Gesundheitsdaten Übersicht</h2>
          <p>
            Ein Platzhalter für Diagramme, Tabellen und Statistiken über deine bisherigen Einträge.
          </p>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
};

export default DataPage;
