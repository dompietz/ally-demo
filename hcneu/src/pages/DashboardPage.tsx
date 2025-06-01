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
import { content } from '../content/content'; // ✅ use your content

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showEmailReminder, setShowEmailReminder] = useState(false);

  // ✅ Check for email confirmation
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

      {/* ✅ Email reminder */}
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

      <HeroSection /> {/* ⬅️ Add this right here after the header */}

      <div className="dashboard-content">
        {/* ✅ Overview Section */}
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
          </div>

          <button className="view-analyses-btn" onClick={() => navigate('/data')}>
            Alle Analysen ansehen
          </button>
        </motion.section>

        {/* ✅ Content Section */}
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
    </div>
  );
};

export default DashboardPage;