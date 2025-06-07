// src/pages/DataPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GlowingBackground from '../components/layout/GlowingBackground';
import './DataPage.css'; // Newly split styles
import Tile from '../components/layout/Tile';

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


      <div className="data-content">
      <Tile className="Tile">
        <h2>Deine Übersicht</h2>
        <p>Hier Ampelsystem einbauen</p>
      </Tile>
      </div>

      <div className="data-content">
      <Tile className="Tile">
        <h2>Tagebuch</h2>
        <p>Hier Kalender und Freitextfelder</p>
      </Tile>
      </div>

      <div className="data-content">
      <Tile className="Tile">
        <h2>Alles auf einen Blick</h2>
        <p>Absprung zu Datenübersicht</p>
      </Tile>
      </div>

      <div className="data-content">
      <Tile className="Tile">
        <h2>Ally Weiterempfehlen</h2>
        <p>Empfiehl Ally weiter und erhalte jeweils 2 kostenlose Monate.</p>
      </Tile>
      </div>

      <BottomNav />
    </div>
  );
};

export default DataPage;
