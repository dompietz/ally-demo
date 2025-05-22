// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import './DashboardPage.css';

import BottomNav from '../components/layout/BottomNav';
import OverviewCard from '../components/overview/OverviewCard';
import ContentTile from '../components/content/ContentTile';
import useRSSFeed from '../components/hooks/useRSSFeed';
import DashboardHeader from '../components/Dashboard/DashboardHeader'; // Path adjusted

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error } = useRSSFeed('https://www.tagesschau.de/xml/rss2');

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [username, setUsername] = useState<string>('Nutzer');
  const [showEmailReminder, setShowEmailReminder] = useState(false);

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // 🔐 Email confirmation check
        if (!session.user.confirmed_at) {
          setShowEmailReminder(true);
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.warn("No full_name in profile, falling back to email");
          setUsername(session.user.email ?? 'Nutzer');
        } else if (profile?.full_name) {
          setUsername(profile.full_name);
        } else {
          setUsername(session.user.email ?? 'Nutzer');
        }
      }
    };

    fetchProfileName();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Glowing Background */}
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      {/* ⛔️ Email confirmation reminder */}
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

      {/* Dashboard Header (extracted component) */}
      <DashboardHeader
        username={username}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      {/* Content Section */}
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
