import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import './DashboardHeader.css';

interface DashboardHeaderProps {
  username?: string;
  title?: string;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username: propUsername,
  title,
  settingsOpen,
  setSettingsOpen,
}) => {
  const { username: contextUsername } = useAuth();
  const usernameToUse = propUsername || contextUsername || 'Nutzer';
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.warn('No active session – skipping logout.');
      navigate('/login');
      return;
    }

    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) {
      console.error('Logout failed:', error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <motion.header
      className="dashboard-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="dashboard-header-inner">
        <div className="welcome-text">
          <h1>{title ? title : `Guten Morgen ${usernameToUse}`}</h1>
        </div>

        <div className="profile-section" onMouseLeave={() => setDropdownOpen(false)}>
          <div
            className="profile-avatar-wrapper"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(usernameToUse)}`}
              alt="Profilbild"
              className="profile-avatar"
            />
            <span className="dropdown-arrow">▾</span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/settings')}>Einstellungen</button>
              <button onClick={() => alert('Hilfe öffnet bald!')}>Hilfe</button>
              <button onClick={handleLogout}>Abmelden</button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
