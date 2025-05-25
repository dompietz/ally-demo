// src/pages/ContentLibraryPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import './DashboardPage.css';
import './ContentLibraryPage.css';
import GlowingBackground from '../components/layout/GlowingBackground';

const categories = [
  'Erste Schritte',
  'Grundlagen CED',
  'Erste Hilfe',
  'Therapiemöglichkeiten',
  'Umgang mit Nebenwirkungen',
  'Umgang mit Symptomen',
  'Partnerschaft',
  'Ambulante Termine',
  'Stationäre Termine',
  'Ernährung',
  'Bewegung',
  'Achtsamkeit',
  'Umgang mit Stress'
];

const ContentLibraryPage: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="content-library-wrapper">
      {/* Glowing background */}
      <GlowingBackground />

      {/* Reusable Header */}
      <DashboardHeader
        title="Deine Inhalte"
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      {/* Main Content */}
      <div className="content-library-content">
        <motion.section
          className="topic-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Themenübersicht</h2>
          <div className="topic-grid">
            {categories.map((category, idx) => (
              <div key={idx} className="topic-tile">
                <p className="topic-title">{category}</p>
                <span className="topic-link">Ansehen →</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="overview-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Finde deine Ruhe</h2>
          <div className="breathing-promo">
            <h3>Geführte Atemübungen</h3>
            <p>Entspanne dich mit gezielten Atemübungen für deinen Alltag.</p>
            <button className="view-analyses-btn">Jetzt starten</button>
          </div>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
};

export default ContentLibraryPage;
