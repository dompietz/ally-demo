import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Select from '@radix-ui/react-select';
import './SettingsPage.css';

import ProfileSection from '../components/settings/ProfileSection';
import ContentPreferencesSection from '../components/settings/ContentPreferencesSection'; // ✅ NEW

const categories = [
  { id: 'profil', label: 'Mein Profil' },
  { id: 'inhalte', label: 'Meine Inhalte' },
  { id: 'abo', label: 'Abonnement' },
  { id: 'barriere', label: 'Barrierefreiheit' },
];

const SettingsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('profil');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeCategory) {
      case 'profil':
        return <ProfileSection />;
      case 'inhalte':
        return <ContentPreferencesSection />; // ✅ modular inclusion
      case 'abo':
        return (
          <div className="settings-section">
            <h2>Abonnement</h2>
            <div className="subscription-details">
              Aktueller Plan: <strong>Monatlich</strong><br />
              Nächste Abrechnung: <strong>01.06.2025</strong>
            </div>
            <button className="cancel-btn">Abo kündigen</button>
          </div>
        );
      case 'barriere':
        return (
          <div className="settings-section">
            <h2>Barrierefreiheit</h2>
            <div className="accessibility-options">
              <label>
                Hohen Kontrast aktivieren
                <input type="checkbox" />
              </label>
              <label>
                Textgröße
                <select>
                  <option>Normal</option>
                  <option>Groß</option>
                  <option>Extra Groß</option>
                </select>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-inner">
        <aside className="settings-sidebar">
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← Zurück zum Dashboard
          </button>

          {/* Mobile Dropdown */}
          <div className="sidebar-dropdown">
            <Select.Root value={activeCategory} onValueChange={setActiveCategory}>
              <Select.Trigger className="select-trigger">
                <Select.Value placeholder="Kategorie wählen" />
              </Select.Trigger>
              <Select.Content className="select-content">
                <Select.Viewport>
                  {categories.map((cat) => (
                    <Select.Item key={cat.id} value={cat.id} className="select-item">
                      <Select.ItemText>{cat.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>

          {/* Desktop Sidebar Buttons */}
          <div className="sidebar-buttons">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`sidebar-button ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="settings-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
