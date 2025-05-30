// src/components/dashboard/DashboardHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import AvatarDropdown from './AvatarDropdown';
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
}) => {
  const { username: contextUsername } = useAuth();
  const usernameToUse = propUsername || contextUsername || 'Nutzer';
  const navigate = useNavigate();

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

        <AvatarDropdown username={usernameToUse} onLogout={handleLogout} />
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
