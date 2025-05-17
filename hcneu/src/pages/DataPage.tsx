// src/pages/DataPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import './DashboardPage.css'; // For shared header styles

const DataPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Gradient background */}
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      {/* Full-width header */}
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="dashboard-header-inner">
          <div className="welcome-text">
            <h1>Deine Daten</h1>
            <p>Hier findest du eine Übersicht deiner Eingaben und kannst deine Gesundheitsdaten verwalten.</p>
          </div>
          <div className="profile-section">
            <div className="profile-avatar-wrapper">
              <img
                src="https://ui-avatars.com/api/?name=William+Doe"
                alt="Profilbild"
                className="profile-avatar"
              />
              <button className="settings-text-btn" aria-label="Einstellungen öffnen">
                Einstellungen
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content placeholder */}
      <div className="dashboard-content">
        <motion.section
          className="overview-section-box"
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
