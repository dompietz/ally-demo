// src/components/LandingPage.tsx
// import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./LandingPage.css";
import Header from "../components/layout/Header";

const LandingPage = () => {
  const { scrollY } = useScroll();
  const lineY = useTransform(scrollY, [0, 400], [0, 120]);

  return (
    <div className="landing-container">
      {/* ───── sentinel (1 px tall, invisible) ───── */}
      <div id="top-sentinel" style={{ height: 1 }} />

      {/* ───────── HEADER ───────── */}
      <Header />
      
      {/* ───────── HERO ───────── */}
      <motion.section
  className="hero"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  {/* background layers */}
  <img
    className="hero-bg"
    src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1374"
    alt="Picture of green forest"
  />
  <div className="hero-overlay" />

  <motion.img
    className="hero-line"
    src="https://health-covery.com/wp-content/uploads/2025/05/doodle_scribble_lines-1.png"
    alt=""
    role="presentation"
    style={{ y: lineY }}
  />

  <div className="hero-inner">
    {/* phone mock-up – ABOVE the card, centered */}
    <motion.img
      className="card-phone"
      src="https://health-covery.com/wp-content/uploads/2025/05/mockup-start-page-1.png"
      alt="Ally-App Mock-up"
      loading="lazy"
      initial={{ rotate: -14, scale: 0.9, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
        delay: 0.6,
      }}
    />

    {/* hero-card underneath the phone */}
    <motion.div
      className="hero-card"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="card-content">
        <h1>Dein&nbsp;Alltagsbegleiter&nbsp;für&nbsp;CED</h1>
        <p>
          Mit Ally bist du stets informiert über deinen Verlauf – alle
          Werte auf einen Blick.
        </p>
        <button className="primary">Jetzt loslegen</button>
      </div>
    </motion.div>
  </div>
</motion.section>

{/* ───────── INTRO SECTION ───────── */}
<section className="intro">
  <div className="intro-inner">
    {/* copywriting – left column */}
    <div className="intro-text">
      <h2>Willkommen&nbsp;bei&nbsp;Ally</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    {/* image – right column */}
    <div className="intro-img-wrapper">
      <img
        src="https://health-covery.com/wp-content/uploads/2025/05/Picture-intro.png"
        alt="Hände, die Verbundenheit symbolisieren"
        loading="lazy"
      />
    </div>
  </div>
</section>

      {/* ───────── FEATURES ───────── */}
      <section className="features">
  {[
    {
      title: "Überblick über Wohlbefinden",
      description: "Tracke Symptome, Ernährung, Stresslevel uvm.",
      image: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1374",
    },
    {
      title: "Deine persönliche Bibliothek",
      description: "Erhalte Artikel, Tipps und Übungen – auf dich abgestimmt.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1374",
    },
    {
      title: "Export für Arzttermine",
      description: "Exportiere deine Daten als PDF und behalte den Überblick.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1374",
    },
  ].map((tile, idx) => (
    <div key={idx} className="feature-tile image">
      <img src={tile.image} alt={tile.title} />
      <div className="content">
        <h3>{tile.title}</h3>
        <p>{tile.description}</p>
      </div>
    </div>
  ))}
</section>


      {/* ───────── PRICING ───────── */}
      <section className="pricing">
        <h2>Transparente Preisstruktur</h2>
        <div className="pricing-content">
          <div className="pricing-features">
            <h3>Ally als Webanwendung</h3>
            <ul>
              <li>Individualisierte Inhaltsbibliothek</li>
              <li>Dateneingabe</li>
              <li>Datenexport als PDF für Arzttermine</li>
              <li>Inklusive WC&nbsp;Finder&nbsp;Plus Version</li>
              <li>Coming Soon: Score&nbsp;Analyse</li>
              <li>Coming Soon: Mobilapp</li>
              <li>Unterstütze die Weiterentwicklung</li>
            </ul>
          </div>
          <div className="pricing-tiles">
            <div className="pricing-tile">
              <h4>Monatlich</h4>
              <p>4,99&nbsp;€ / Monat</p>
              <button>Jetzt loslegen</button>
              <span>30&nbsp;Tage Geld zurück</span>
            </div>
            <div className="pricing-tile">
              <h4>Jährlich</h4>
              <p>49&nbsp;€ / Jahr</p>
              <button>Jetzt loslegen</button>
              <span>30&nbsp;Tage Geld zurück</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
{/* ───────── FAQ ───────── */}
<section id="faq" className="faq">
  <h2>Häufig gestellte Fragen</h2>

  <details className="faq-item">
    <summary>Wie funktioniert Ally?</summary>
    <div className="faq-body">
      <p>
        Ally sammelt deine Eingaben zu Symptomen, Wohlbefinden und Lebensstil
        und erstellt daraus Trends, die dir helfen, Muster zu erkennen. Die
        Informationen bleiben auf europäischen Servern und sind nach DSGVO
        geschützt.
      </p>
    </div>
  </details>

  <details className="faq-item">
    <summary>Kann ich Ally kostenlos testen?</summary>
    <div className="faq-body">
      <p>
        Ja, du kannst Ally 30&nbsp;Tage lang unverbindlich testen. Innerhalb
        dieser Zeit kannst du jederzeit kündigen und es fallen keine Kosten an.
      </p>
    </div>
  </details>

  <details className="faq-item">
    <summary>Ist Ally auch als Mobile-App verfügbar?</summary>
    <div className="faq-body">
      <p>
        Eine native iOS- und Android-App ist in Entwicklung und wird in der
        zweiten Jahreshälfte&nbsp;2025 veröffentlicht. Bis dahin kannst du die
        Web-App auf dem Smartphone wie gewohnt über den Browser nutzen.
      </p>
    </div>
  </details>

  <details className="faq-item">
    <summary>Wer steht hinter Ally?</summary>
    <div className="faq-body">
      <p>
        Ally ist ein Produkt der HealthCovery&nbsp;GmbH, einem interdisziplinären
        Team aus Ärzt*innen, Entwickler*innen und Patient*innenvertreter*innen.
      </p>
    </div>
  </details>
</section>


      {/* ───────── FOOTER ───────── */}
      <footer className="landing-footer">
        <div className="footer-left">
          <img
            src="https://health-covery.com/wp-content/uploads/2025/02/allylogo1.webp"
            alt="Ally Logo"
          />
          <p>
            Ein Angebot der{" "}
            <a href="https://health-covery.com">HealthCovery&nbsp;GmbH</a>
          </p>
        </div>
        <div className="footer-columns">
          <div>
            <h4>Menu</h4>
            <p>
              Startseite<br />
              Über&nbsp;Ally<br />
              Inhalte<br />
              Mission<br />
              Preis
            </p>
          </div>
          <div>
            <h4>Support</h4>
            <p>
              FAQ<br />
              Für&nbsp;Behandler<br />
              Kontakt
            </p>
          </div>
          <div>
            <h4>Rechtliches</h4>
            <p>
              Impressum<br />
              Datenschutz<br />
              Widerrufserklärung
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
