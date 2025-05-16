import { useEffect, useState } from 'react';

type RSSItem = {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
};

const useRSSFeed = (url: string) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.items) {
          const parsedItems: RSSItem[] = data.items.map((item: any) => {
            const imageUrl =
              item.enclosure?.link ||
              item.thumbnail ||
              item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1] || // extract from HTML if needed
              '';

            return {
              title: item.title,
              link: item.link,
              description: item.description,
              imageUrl,
            };
          });

          setItems(parsedItems);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, [url]);

  return { items, loading, error };
};

export default useRSSFeed;
