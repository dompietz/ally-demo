import React from 'react';
import './BottomNav.css';
import { Home, BarChart3, Compass } from 'lucide-react'; // or use your own icons

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <div className="nav-item active">
        <Home size={24} />
      </div>
      <div className="nav-item">
        <Compass size={24} />
      </div>
      <div className="nav-item">
        <BarChart3 size={24} />
      </div>
    </nav>
  );
};

export default BottomNav;
