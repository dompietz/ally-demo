// src/components/layout/tile.tsx
import type { ReactNode } from 'react';

type TileProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Tile({ children, className = '', onClick }: TileProps) {
  return (
    <div className={`tile-base ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
