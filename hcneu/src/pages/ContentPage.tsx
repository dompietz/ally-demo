import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { content } from '../content/content';
import { ArticleViewer } from '../components/content/ArticleViewer';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import './ContentPage.css';

export const ContentPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false); // ✅ add this

  const item = content.find((c) => c.slug === slug);

  if (!item) {
    return <div className="content-page">Inhalt nicht gefunden.</div>;
  }

  return (
    <div className="content-page">
      <DashboardHeader
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
      <div className="content-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Zurück
        </button>
        <h1 className="content-title">{item.title}</h1>
        <p className="content-description">{item.description}</p>
        <ArticleViewer slug={slug!} />
      </div>
    </div>
  );
};
