import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { content } from '../content/content';
import { ArticleViewer } from '../components/content/ArticleViewer';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import BottomNav from '../components/layout/BottomNav';
import '../pages/SingleArticlePage.css';

const SingleArticlePage: React.FC = () => {
  const { slug } = useParams();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const article = content.find(item => item.slug === slug);

  if (!article) {
    return <div>Artikel nicht gefunden.</div>;
  }

  return (
    <>
      <DashboardHeader
        title={article.title}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />

      <div className="single-article-wrapper">
        

        <div className="single-article-body">
          <p className="article-date">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <ArticleViewer slug={article.slug} />
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default SingleArticlePage;
