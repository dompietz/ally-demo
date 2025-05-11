import "./DashboardPage.css";
import { Link } from "react-router-dom";
import { FiPlus, FiSettings } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <main className="dash-wrapper">
      {/* ───────── TOP BAR ───────── */}
      <header className="dash-top">
        <span className="dash-breadcrumb">Homescreen&nbsp;/&nbsp;Dashboard</span>
      </header>

      {/* ───────── GREETING ───────── */}
      <section className="dash-hero">
        <div>
          <h1>Guten&nbsp;Morgen<br />Sophie</h1>
          <p className="dash-day">Tag&nbsp;21&nbsp;von&nbsp;90</p>
        </div>

        <button className="profile-btn">
          <img
            src="https://placekitten.com/120/120"
            alt="Profilavatar"
          />
          <FiSettings />
          <span>Dein&nbsp;Profil</span>
        </button>
      </section>

      {/* ───────── MINI OVERVIEW ───────── */}
      <section className="dash-mini">
        <h2>Deine Übersicht</h2>

        <div className="mini-grid">
          {[
            {
              label: "Stuhlfrequenz",
              desc: "Ø 4&nbsp;täglich",
              colour: "#8ccab0"
            },
            {
              label: "Symptome",
              desc: "Keine auffälligen\nEreignisse",
              colour: "#ffbd59"
            },
            {
              label: "Wohlbefinden",
              desc: "Steigend",
              colour: "#9997ca"
            },
          ].map((kpi) => (
            <article key={kpi.label} className="kpi-card">
              <span className="kpi-circle" style={{ background: kpi.colour }}>
                <FiPlus />
              </span>
              <strong>{kpi.label}</strong>
              <small dangerouslySetInnerHTML={{ __html: kpi.desc }} />
            </article>
          ))}
        </div>

        <Link to="#" className="mini-cta">Alle Analysen anschauen</Link>
      </section>

      {/* ───────── DAILY ARTICLE ───────── */}
      <section className="dash-article">
        <h2>Kein&nbsp;Stress&nbsp;am&nbsp;Morgen</h2>

        <article className="article-card">
          <div className="article-copy">
            <p>
              Achtsamkeit bedeutet, bewusst und sorgfältig
              über&nbsp;Handlungen nachzudenken.
            </p>
            <div className="article-meta">
              <span>⏱&nbsp;2&nbsp;Minuten</span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60"
            alt="Wald"
          />
        </article>
      </section>

      {/* ───────── BOTTOM NAV (static) ───────── */}
      <nav className="dash-nav">
        {["home", "plus", "stats"].map((icon) => (
          <button key={icon} aria-label={icon} />
        ))}
      </nav>
    </main>
  );
}
