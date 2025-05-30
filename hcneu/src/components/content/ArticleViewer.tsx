import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';



export const ArticleViewer = ({ slug }: { slug: string }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import(`../../content/articles/${slug}.md`)
      .then((res) => fetch(res.default).then((r) => r.text()))
      .then(setMarkdown)
      .catch(() => setMarkdown('Artikel konnte nicht geladen werden.'));
  }, [slug]);

  return (
    <div className="article-body">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

