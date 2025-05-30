import React, { useEffect, useState } from 'react';
import './AccessibilitySection.css';

const AccessibilitySection: React.FC = () => {
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large' | 'x-large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [grayscaleMode, setGrayscaleMode] = useState(false);
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans-serif'>('sans-serif');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [descriptiveLabels, setDescriptiveLabels] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [transcriptsEnabled, setTranscriptsEnabled] = useState(false);
  const [monoAudio, setMonoAudio] = useState(false);
  const [extendedSession, setExtendedSession] = useState(false);

  useEffect(() => {
    const root = document.body;
    root.setAttribute('data-text-size', textSize);
    root.setAttribute('data-font-style', fontStyle);

    highContrast ? root.classList.add('high-contrast') : root.classList.remove('high-contrast');
    dyslexiaMode ? root.classList.add('dyslexia-mode') : root.classList.remove('dyslexia-mode');
    grayscaleMode ? root.classList.add('grayscale-mode') : root.classList.remove('grayscale-mode');
    reducedMotion ? root.classList.add('reduced-motion') : root.classList.remove('reduced-motion');
    screenReaderMode ? root.classList.add('screen-reader-mode') : root.classList.remove('screen-reader-mode');
  }, [textSize, fontStyle, highContrast, dyslexiaMode, grayscaleMode, reducedMotion, screenReaderMode]);

  return (
    <div className="settings-section">
      <h2>Barrierefreiheit</h2>
      <div className="accessibility-options">
        <label>
          Textgröße
          <select value={textSize} onChange={(e) => setTextSize(e.target.value as any)}>
            <option value="small">Klein</option>
            <option value="medium">Mittel</option>
            <option value="large">Groß</option>
            <option value="x-large">Extra Groß</option>
          </select>
        </label>

        <label>
          <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
          Hohen Kontrast aktivieren
        </label>

        <label>
          <input type="checkbox" checked={dyslexiaMode} onChange={(e) => setDyslexiaMode(e.target.checked)} />
          Dyslexie-freundliche Farben und Schrift
        </label>

        <label>
          <input type="checkbox" checked={grayscaleMode} onChange={(e) => setGrayscaleMode(e.target.checked)} />
          Graustufenmodus für Farbenblindheit
        </label>

        <label>
          Schriftart
          <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value as any)}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
          </select>
        </label>

        <label>
          <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} />
          Animationen reduzieren
        </label>

        <label>
          <input type="checkbox" checked={screenReaderMode} onChange={(e) => setScreenReaderMode(e.target.checked)} />
          Screen Reader Modus aktivieren
        </label>

        <label>
          <input type="checkbox" checked={descriptiveLabels} onChange={(e) => setDescriptiveLabels(e.target.checked)} />
          Beschreibung in Buttons aktivieren
        </label>

        <label>
          <input type="checkbox" checked={captionsEnabled} onChange={(e) => setCaptionsEnabled(e.target.checked)} />
          Untertitel standardmäßig aktivieren
        </label>

        <label>
          <input type="checkbox" checked={transcriptsEnabled} onChange={(e) => setTranscriptsEnabled(e.target.checked)} />
          Transkripte für Videos aktivieren
        </label>

        <label>
          <input type="checkbox" checked={monoAudio} onChange={(e) => setMonoAudio(e.target.checked)} />
          Mono-Audio (einseitiges Hören)
        </label>

        <label>
          <input type="checkbox" checked={extendedSession} onChange={(e) => setExtendedSession(e.target.checked)} />
          Längere Sessiondauer aktivieren
        </label>
      </div>
    </div>
  );
};

export default AccessibilitySection;
