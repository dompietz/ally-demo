import React from 'react';
import './BottomNav.css';
import { Home, Compass, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        onClick={() => navigate('/dashboard')}
      >
        <div className="nav-icon-circle">
          <Home size={24} />
        </div>
      </div>

      <div
        className={`nav-item ${location.pathname === '/content-library' ? 'active' : ''}`}
        onClick={() => navigate('/content-library')}
      >
        <div className="nav-icon-circle">
          <Compass size={24} />
        </div>
      </div>

      <div
  className={`nav-item ${location.pathname === '/data' ? 'active' : ''}`}
  onClick={() => navigate('/data')}
>
  <div className="nav-icon-circle">
    <BarChart3 size={24} />
  </div>
</div>
    </nav>
  );
};

export default BottomNav;

