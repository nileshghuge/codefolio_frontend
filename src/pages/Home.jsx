import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero">
        <div className="hero-content">
          <p className="tagline">YOUR PRIVATE SPACE FOR WELLNESS</p>

          <h1>
            Understand your mind.
            <br />
            <span>Care for yourself.</span>
          </h1>

          <p className="hero-text">
            MindWell helps you reflect, track your mood, and build healthier
            daily habits in a calm and private space.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Start Journaling
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-icon">🧘</div>
          <h2>How are you feeling today?</h2>
          <p>Take a moment to check in with yourself.</p>

          <div className="mood-options">
            <span>😔</span>
            <span>😐</span>
            <span>🙂</span>
            <span>😊</span>
            <span>😄</span>
          </div>

          <div className="privacy-note">
            🔒 Your thoughts stay private
          </div>
        </div>
      </main>

      <section className="features">
        <div className="feature">
          <div>📝</div>
          <h3>Private Journal</h3>
          <p>
            Write your thoughts and reflections in your personal journal.
          </p>
        </div>

        <div className="feature">
          <div>📊</div>
          <h3>Mood Insights</h3>
          <p>
            Understand your emotional patterns with simple visual analytics.
          </p>
        </div>

        <div className="feature">
          <div>🫁</div>
          <h3>Breathing Assistant</h3>
          <p>
            Slow down and relax with guided breathing exercises.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;