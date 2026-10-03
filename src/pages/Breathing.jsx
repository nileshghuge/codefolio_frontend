import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Breathing() {
  const [phase, setPhase] = useState("Ready");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        const currentSecond = prev + 1;

        if (phase === "Inhale" && currentSecond >= 4) {
          setPhase("Hold");
          return 0;
        }

        if (phase === "Hold" && currentSecond >= 7) {
          setPhase("Exhale");
          return 0;
        }

        if (phase === "Exhale" && currentSecond >= 8) {
          setPhase("Inhale");
          return 0;
        }

        return currentSecond;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, phase]);

  const startBreathing = () => {
    setPhase("Inhale");
    setSeconds(0);
    setRunning(true);
  };

  const stopBreathing = () => {
    setRunning(false);
    setPhase("Ready");
    setSeconds(0);
  };

  return (
    <div className="breathing-page">
      <Navbar />

      <main className="breathing-container">

        <div className="breathing-header">
          <p className="tagline">TAKE A MOMENT</p>

          <h1>Breathing Assistant</h1>

          <p>
            Slow down, breathe deeply, and give yourself
            a moment to reset.
          </p>
        </div>

        <div
          className={`breathing-circle ${
            running ? "breathing-active" : ""
          }`}
        >
          <div>
            <span>{phase}</span>

            {running && (
              <strong>{seconds}</strong>
            )}
          </div>
        </div>

        <div className="breathing-instruction">
          <h2>4 - 7 - 8 Breathing</h2>

          <p>
            Inhale for 4 seconds → Hold for 7 seconds →
            Exhale for 8 seconds
          </p>
        </div>

        <div className="breathing-buttons">
          {!running ? (
            <button
              onClick={startBreathing}
              className="primary-btn"
            >
              Start Breathing
            </button>
          ) : (
            <button
              onClick={stopBreathing}
              className="secondary-btn"
            >
              Stop
            </button>
          )}
        </div>

        <div className="breathing-note">
          🫁 Follow the circle and focus on slow,
          comfortable breathing.
        </div>

        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Back to Dashboard
        </Link>

      </main>
    </div>
  );
}

export default Breathing;

