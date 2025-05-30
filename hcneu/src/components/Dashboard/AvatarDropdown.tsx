import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './AvatarDropdown.css';

interface AvatarDropdownProps {
  username: string;
  onLogout: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ username, onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleBackdropClick = () => setOpen(false);
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="profile-section">
      <button
        className="profile-avatar-wrapper"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`}
          alt={`${username}'s Avatar`}
          className="profile-avatar"
        />
        <span className="dropdown-arrow">▾</span>
      </button>

      {open &&
        (isMobile ? (
          <div className="bottom-sheet-backdrop" onClick={handleBackdropClick}>
            <div className="bottom-sheet" onClick={stopPropagation}>
              <button onClick={() => handleNavigate('/settings')}>Einstellungen</button>
              <button onClick={() => alert('Hilfe öffnet bald!')}>Hilfe</button>
              <button onClick={onLogout}>Abmelden</button>
            </div>
          </div>
        ) : (
          <div className="dropdown-menu" onMouseLeave={() => setOpen(false)}>
            <button onClick={() => handleNavigate('/settings')}>Einstellungen</button>
            <button onClick={() => alert('Hilfe öffnet bald!')}>Hilfe</button>
            <div className="logout-divider" />
            <button onClick={onLogout}>Abmelden</button>
          </div>
        ))}
    </div>
  );
};

export default AvatarDropdown;
