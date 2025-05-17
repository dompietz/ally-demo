// src/pages/ContentLibraryPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import './DashboardPage.css'; // Reuse shared styles
import './ContentLibraryPage.css';

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
  return (
    <div className="content-library-wrapper">
      {/* Glowing background */}
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      {/* Header */}
      <motion.header
        className="content-library-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="content-library-header-inner">
          <h1>Deine Inhalte</h1>
          <p>Hier findest du Videos & Artikel, sortiert nach Themen, die dir helfen.</p>
        </div>
      </motion.header>

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
                <span className="topic-link">Mehr erfahren →</span>
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
