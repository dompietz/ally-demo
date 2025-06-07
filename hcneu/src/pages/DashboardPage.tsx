import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DashboardPage.css';

import { supabase } from '../lib/supabase';
import BottomNav from '../components/layout/BottomNav';
import OverviewCard from '../components/overview/OverviewCard';
import ContentTile from '../components/content/ContentTile';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GlowingBackground from '../components/layout/GlowingBackground';
import HeroSection from '../components/herosection/HeroSection';
import { content } from '../content/content';
import DataEntryForm from '../components/dataentry/DataEntryForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showEmailReminder, setShowEmailReminder] = useState(false);

  // NEW: Tracks which section’s overlay is open
  const [activeSection, setActiveSection] = useState<null | 'stuhlfrequenz' | 'symptome' | 'wohlbefinden'>(null);

  useEffect(() => {
    const checkEmailConfirmation = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && !session.user.confirmed_at) {
        setShowEmailReminder(true);
      }
    };
    checkEmailConfirmation();
  }, []);

  return (
    <div className="dashboard-container">
      <GlowingBackground />

      {showEmailReminder && (
        <motion.div
          className="email-reminder"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            Bitte bestätige deine E-Mail-Adresse über den Link, den wir dir geschickt haben.
          </p>
          <button onClick={() => setShowEmailReminder(false)}>Verstanden</button>
        </motion.div>
      )}

      <DashboardHeader
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      <HeroSection />

      <div className="dashboard-content">
        <motion.section
          className="overview-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overview-inner">
            <h2>Deine Übersicht</h2>
            <div className="overview-cards">
              <OverviewCard
                label="Stuhlfrequenz"
                title="Du hast innerhalb der letzten Woche Werte für 3 Tage angegeben"
                subtitle=""
                status="Positive Entwicklung im letzten Monat"
                onAdd={() => setActiveSection('stuhlfrequenz')}
              />
              <OverviewCard
                label="Symptome"
                title="Keine Daten"
                subtitle="Kein auffälligen Ereignisse"
                onAdd={() => setActiveSection('symptome')}
              />
              <OverviewCard
                label="Wohlbefinden"
                title="Steigend"
                subtitle="Positive Entwicklung letzte Woche"
                onAdd={() => setActiveSection('wohlbefinden')}
              />
            </div>
          </div>

          <button className="view-analyses-btn" onClick={() => navigate('/data')}>
            Alle Analysen ansehen
          </button>
        </motion.section>

        <motion.section
          className="content-section-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Deine heutigen Inhalte</h2>
          <div className="content-tiles">
            {content.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
              >
                <ContentTile item={item} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <BottomNav />

      {/* ✅ Only show DataEntryForm for “stuhlfrequenz” */}
      {activeSection === 'stuhlfrequenz' && (
        <DataEntryForm onClose={() => setActiveSection(null)} />
      )}
    </div>
  );
};

export default DashboardPage;
