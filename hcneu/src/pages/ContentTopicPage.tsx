import { useParams, useNavigate } from 'react-router-dom';
import { content } from '../content/content';
import ContentTile from '../components/content/ContentTile';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import './ContentTopicPage.css';

const ContentTopicPage = () => {
  const { topic } = useParams(); // e.g. 'Ernährung'
  const navigate = useNavigate();
  const decodedTopic = decodeURIComponent(topic ?? '').toLowerCase();

  const filteredContent = content.filter(item =>
    item.categories.some(cat => cat.toLowerCase() === decodedTopic.toLowerCase())
  );

  return (
    <div className="content-topic-wrapper">
      <DashboardHeader
        title="Übersicht"
        settingsOpen={false}
        setSettingsOpen={() => {}}
      />
      <button className="back-button" onClick={() => navigate(-1)}>← Zurück</button>

      <h2 className="topic-title">{decodedTopic}</h2>

      {filteredContent.length === 0 ? (
    <p className="no-content">Keine Inhalte für dieses Thema.</p>
  ) : (
    <div className="content-tile-list">
      {filteredContent.map(item => (
        <ContentTile key={item.id} item={item} />
      ))}
    </div>
  )}
</div>
  );
};

export default ContentTopicPage;
