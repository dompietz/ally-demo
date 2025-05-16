// src/pages/DashboardPage.tsx
import React from 'react';
import './DashboardPage.css';
import BottomNav from '../components/layout/BottomNav';
import OverviewCard from '../components/overview/OverviewCard';
import ContentTile from '../components/content/ContentTile';
import useRSSFeed from '../components/hooks/useRSSFeed';

const DashboardPage: React.FC = () => {
  const { items, loading, error } = useRSSFeed('https://www.tagesschau.de/xml/rss2');

  return (
    <div className="dashboard-container">
      {/* Animated conic gradient orb */}
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      <div className="dashboard-content">
      <header className="dashboard-header">
  <div className="welcome-text">
    <h1>Guten Morgen William</h1>
    <p>Mit Ally bist du stets informiert über deinen Verlauf und hast alle Werte auf einen Blick.</p>
  </div>
  <div className="profile-section">
    <img src="https://ui-avatars.com/api/?name=William+Doe" alt="Profilbild" className="profile-avatar" />
    <div className="profile-info">
      <p className="profile-name">William</p>
      <p className="profile-role">Nutzer</p>
    </div>
  </div>
</header>

        <section className="overview-section-box">
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
      onAdd={() => console.log("Add Wasser")}
    />
    <OverviewCard
      label="Wohlbefinden"
      title="Steigend"
      subtitle="Positive Entwicklung letzte Woche"
      onAdd={() => console.log("Add Schlaf")}
    />
  </div>
  <button className="view-analyses-btn">Alle Analysen ansehen</button>
</section>


        <section className="content-section-box">
          <h2>Deine heutigen Inhalte</h2>
          <div className="content-tiles">
            {loading && <p>Inhalte werden geladen...</p>}
            {error && <p>Fehler beim Laden der Inhalte.</p>}
            {items.slice(0, 3).map((item, idx) => (
              <ContentTile
                key={idx}
                title={item.title}
                description={item.description || 'Kein Beschreibungstext'}
                imageUrl={item.imageUrl || `https://source.unsplash.com/random/300x200?sig=${idx}`}
              />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
