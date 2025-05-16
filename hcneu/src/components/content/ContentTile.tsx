import React from 'react';
import './ContentTile.css';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
};

const ContentTile: React.FC<Props> = ({ title, description, imageUrl }) => {
  return (
    <div className="content-tile">
      <img src={imageUrl} alt={title} className="tile-image" />
      <div className="tile-body">
        <h4>{title}</h4>
        <p>{description}</p>
        <button className="tile-button">Ansehen</button>
      </div>
    </div>
  );
};

export default ContentTile;
