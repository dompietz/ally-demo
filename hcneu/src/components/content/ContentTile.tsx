import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from '../layout/Tile'; // update path if needed
import './ContentTile.css';

type Props = {
  item: {
    id: string;
    slug: string;
    type: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    contentUrl: string;
    categories: string[];
    publishedAt: string;
  };
};

const ContentTile: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.slug) {
      navigate(`/content/${item.slug}`);
    }
  };

  return (
    <Tile className="content-tile" onClick={handleClick}>
    <img
    src={item.thumbnailUrl || 'https://source.unsplash.com/random/300x200?fallback'}
    alt={item.title}
    className="tile-image"
    />
    <div className="tile-inner">
    <h4>{item.title}</h4>
    <p>{item.description}</p>
    <button className="tile-button">Ansehen</button>
    </div>
    </Tile>
  );
};

export default ContentTile;
