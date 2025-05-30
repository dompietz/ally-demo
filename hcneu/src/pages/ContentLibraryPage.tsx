import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ add navigation
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
  'Ernaehrung',
  'Bewegung',
  'Achtsamkeit',
  'Stress'
];

const ContentLibraryPage: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ add this

  return (
    <div className="content-library-wrapper">
      <GlowingBackground />

      <DashboardHeader
        title="Deine Inhalte"
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      <div className="content-library-main">
        <motion.section
          className="content-library-topic-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="content-library-section-title">Themenübersicht</h2>
          <div className="content-library-topic-grid">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="content-library-topic-tile"
                onClick={() =>
                  navigate(`/contentlibrary/${encodeURIComponent(category)}`)
                }
              >
                <p className="content-library-topic-title">{category}</p>
                <span className="content-library-topic-link">Ansehen →</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="content-library-breathing-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="content-library-section-title">Finde deine Ruhe</h2>
          <div className="content-library-breathing-promo">
            <h3>Geführte Atemübungen</h3>
            <p>Entspanne dich mit gezielten Atemübungen für deinen Alltag.</p>
            <button className="content-library-start-button">Jetzt starten</button>
          </div>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
};

export default ContentLibraryPage;
