import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../lib/profile";
import { useAuth } from "../../context/AuthContext";
import "./ProfileSection.css";

export default function ProfileSection() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    diagnosis: "Morbus Crohn",
    diagnosis_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;

    getProfile()
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Fehler beim Laden des Profils");
        console.error(err);
      });
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Lade dein Profil …</p>;

  return (
    <div className="settings-section">
      <h2>Mein Profil</h2>

      <div className="profile-banner">
        🎉 Du nutzt Ally seit <strong>4 Monaten</strong>!<br />
        🔥 Streak: <strong>86 Tage in Folge</strong>
      </div>

      <div className="profile-field">
        <label>Name</label>
        <input
          type="text"
          value={form.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
        />
      </div>

      <div className="profile-field">
        <label>Diagnose</label>
        <select
          value={form.diagnosis}
          onChange={(e) => handleChange("diagnosis", e.target.value)}
        >
          <option value="Morbus Crohn">Morbus Crohn</option>
          <option value="Colitis Ulcerosa">Colitis Ulcerosa</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Diagnosedatum</label>
        <input
          type="date"
          value={form.diagnosis_date}
          onChange={(e) => handleChange("diagnosis_date", e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Speichern…" : "Änderungen speichern"}
      </button>

      {success && <p className="success-message">Erfolgreich gespeichert!</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
