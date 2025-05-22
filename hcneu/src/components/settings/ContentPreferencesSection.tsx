import { useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../../lib/preferences";
import "./ContentPreferencesSection.css";

const allTopics = [
  "Ernährung",
  "Stress",
  "Medikamente",
  "Schlaf",
  "Bewegung",
  "Schub-Vorbeugung",
  "Rezepte",
  "Alltagstipps",
  "Reisen",
  "Studien",
];

export default function ContentPreferencesSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPreferences()
      .then((prefs) => {
        setSelected(prefs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Fehler beim Laden der Inhalte");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences(selected);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Lade Inhalte …</p>;

  return (
    <div className="settings-section">
  <div className="content-header">
    <h2>Meine Inhalte</h2>
    <p>Du kannst deine Interessensgebiete neu wählen:</p>
  </div>

  <div className="topic-tags">
    {allTopics.map((tag) => (
      <div
        key={tag}
        className={`topic-tag ${selected.includes(tag) ? "selected" : ""}`}
        onClick={() => toggleTag(tag)}
      >
        {tag}
      </div>
    ))}
  </div>

  <button className="primary-btn" onClick={handleSave} disabled={saving}>
    {saving ? "Speichern…" : "Änderungen speichern"}
  </button>

  {success && <p className="success-message">Erfolgreich gespeichert!</p>}
  {error && <p className="error-message">{error}</p>}
</div>
  );
}

