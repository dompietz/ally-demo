import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Select from '@radix-ui/react-select';
import './SettingsPage.css';

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
        return (
          <div className="settings-section">
            <h2>Mein Profil</h2>
            <div className="profile-banner">
              🎉 Du nutzt Ally seit <strong>4 Monaten</strong>!<br />🔥 Streak: <strong>86 Tage in Folge</strong>
            </div>
            <div className="profile-field">
              <label>Name</label>
              <input type="text" defaultValue="William Doe" />
            </div>
          </div>
        );
      case 'inhalte':
        return (
          <div className="settings-section">
            <h2>Meine Inhalte</h2>
            <p>Du kannst deine Interessensgebiete neu wählen:</p>
            <div className="topic-tags">
              {["Ernährung", "Stress", "Medikamente", "Schlaf"].map((tag) => (
                <div key={tag} className="topic-tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        );
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
