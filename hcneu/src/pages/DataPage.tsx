// src/pages/DataPage.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../components/layout/BottomNav';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import GlowingBackground from '../components/layout/GlowingBackground';
import './DataPage.css'; // Newly split styles
import Tile from '../components/layout/Tile';
import '../components/widgets/TableWidget.css';
import { fetchStoolFrequency, type StoolFrequencyEntry } from '../lib/stoolFrequency';

const DataPage: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [entries, setEntries] = useState<StoolFrequencyEntry[]>([]);

  useEffect(() => {
    fetchStoolFrequency()
      .then(setEntries)
      .catch((err) => console.error('Fetch error', err));
  }, []);

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
          <h2>Stuhlfrequenz</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Anzahl</th>
                <th>Tageszeiten</th>
                <th>Eigenschaften</th>
                <th>Notizen</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.count}</td>
                  <td>{e.times_of_day.join(', ')}</td>
                  <td>{e.properties.join(', ')}</td>
                  <td>{e.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tile>
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
