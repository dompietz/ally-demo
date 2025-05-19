import React from 'react';
import { useNavigate } from 'react-router-dom'; // ← Add this
import { motion } from 'framer-motion';
import './DashboardPage.css';
import BottomNav from '../components/layout/BottomNav';
import OverviewCard from '../components/overview/OverviewCard';
import ContentTile from '../components/content/ContentTile';
import useRSSFeed from '../components/hooks/useRSSFeed';
import { useState } from 'react';

const DashboardPage: React.FC = () => {
  const { items, loading, error } = useRSSFeed('https://www.tagesschau.de/xml/rss2');
  const navigate = useNavigate();
  // Add state for settings dropdown
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Animated conic gradient orb */}
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
            <h1>Guten Morgen William</h1>
            <p>Mit Ally bist du stets informiert über deinen Verlauf und hast alle Werte auf einen Blick.</p>
          </div>
          <div className="profile-section">
            <div className="profile-avatar-wrapper">
              <img
                src="https://ui-avatars.com/api/?name=William+Doe"
                alt="Profilbild"
                className="profile-avatar"
              />
              <div className="settings-mobile">
                <button
                  className="settings-icon-btn"
                  aria-label="Einstellungen öffnen"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>
                {settingsOpen && (
                  <button 
                    className="settings-text-btn"
                    onClick={() => navigate('/settings')}
                  >
                    Einstellungen
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content wrapper */}
      <div className="dashboard-content">
        <motion.section
          className="overview-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Deine Übersicht</h2>
          <div className="overview-cards">
            <OverviewCard
              label="Stuhlgang"
              title="ø 4 Stuhlgänge täglich"
              subtitle="2 schmerzhaft"
              onAdd={() => console.log("Add Stuhlgang")}
            />
            <OverviewCard
              label="Symptome"
              title="Keine Daten"
              subtitle="Kein auffälligen Ereignisse"
              onAdd={() => console.log("Add Symptome")}
            />
            <OverviewCard
              label="Wohlbefinden"
              title="Steigend"
              subtitle="Positive Entwicklung letzte Woche"
              onAdd={() => console.log("Add Wohlbefinden")}
            />
          </div>
          <button className="view-analyses-btn">Alle Analysen ansehen</button>
        </motion.section>

        <motion.section
          className="content-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Deine heutigen Inhalte</h2>
          <div className="content-tiles">
            {loading && <p>Inhalte werden geladen...</p>}
            {error && <p>Fehler beim Laden der Inhalte.</p>}
            {items.slice(0, 3).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
              >
                <ContentTile
                  title={item.title}
                  description={item.description || 'Kein Beschreibungstext'}
                  imageUrl={item.imageUrl || `https://source.unsplash.com/random/300x200?sig=${idx}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
