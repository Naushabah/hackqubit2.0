import { Link } from "react-router-dom";
import OfflineBadge from "../components/OfflineBadge.jsx";

const features = [
  { title: "Learn", text: "Understand topics with simple explanations and examples." },
  { title: "Practice", text: "Use quizzes to check what you remember." },
  { title: "Improve", text: "Track weak areas as the app grows." },
  { title: "Offline", text: "Prepared for a local model that runs on the device." }
];

export default function Home() {
  return (
    <>
      <section className="hero section">
        <div className="hero-content">
          <p className="eyebrow">Offline-first learning</p>
          <h1>Your Personal AI Teacher</h1>
          <p className="hero-copy">
            PathshalaAI is being built as an offline AI tutor for students. This React frontend
            preserves the tutor experience before the local model is connected.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <Link className="button primary-button" to="/tutor">
              Start Learning
            </Link>
            <Link className="button secondary-button" to="/quiz">
              Take a Quiz
            </Link>
          </div>
        </div>

        <aside className="hero-card" aria-label="Tutor preview">
          <div className="card-heading">
            <span className="summary-badge">Curriculum Mode: ON</span>
            <OfflineBadge compact />
          </div>
          <h2>Ask PathshalaAI</h2>
          <div className="mini-chat">
            <p className="mini-message tutor">Namaste! Choose a class and ask a chapter question.</p>
            <p className="mini-message user">Explain photosynthesis simply.</p>
            <p className="mini-message tutor">
              Demo response: A full local answer will appear after the on-device model is connected.
            </p>
          </div>
        </aside>
      </section>

      <section className="features section" aria-labelledby="features-title">
        <div className="section-heading">
          <p className="eyebrow">Learning tools</p>
          <h2 id="features-title">Built for steady school practice</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.title[0]}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
