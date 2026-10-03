import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [journals, setJournals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://mindwell-backend-rdph.onrender.com/api/journal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJournals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exportData = () => {
    if (journals.length === 0) {
      setMessage("No journal data available to export.");
      return;
    }

    const exportData = {
      exportedAt: new Date().toISOString(),
      totalEntries: journals.length,
      journals: journals.map((journal) => ({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        energy: journal.energy,
        emotion: journal.emotion,
        createdAt: journal.createdAt,
      })),
    };

    const jsonData = JSON.stringify(exportData, null, 2);

    const blob = new Blob([jsonData], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "mindwell-my-data.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage("Your data has been exported successfully.");
  };

  const latestJournal = journals[0];

  const averageMood =
    journals.length > 0
      ? (
          journals.reduce(
            (sum, journal) =>
              sum + Number(journal.mood || 0),
            0
          ) / journals.length
        ).toFixed(1)
      : "—";

  const averageEnergy =
    journals.length > 0
      ? (
          journals.reduce(
            (sum, journal) =>
              sum + Number(journal.energy || 0),
            0
          ) / journals.length
        ).toFixed(1)
      : "—";

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="tagline">YOUR WELLNESS SPACE</p>

            <h1>Welcome to MindWell 👋</h1>

            <p>
              Take a moment for yourself. How are you feeling today?
            </p>
          </div>

          <Link to="/journal" className="primary-btn">
            + New Journal Entry
          </Link>
        </div>

        <section className="dashboard-grid">
          <div className="dashboard-card mood-card">
            <div className="dashboard-icon">😊</div>

            <h2>Average Mood</h2>

            <p className="big-number">
              {averageMood}
            </p>

            <span>Out of 10</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">⚡</div>

            <h2>Average Energy</h2>

            <p className="big-number">
              {averageEnergy}
            </p>

            <span>Out of 10</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📝</div>

            <h2>Journal Entries</h2>

            <p className="big-number">
              {journals.length}
            </p>

            <span>Total entries</span>
          </div>
        </section>

        <section className="dashboard-actions">
          <h2>Take care of yourself</h2>

          <div className="action-grid">
            <Link to="/journal" className="action-card">
              <span>📝</span>

              <div>
                <h3>Write in your journal</h3>

                <p>
                  Express your thoughts and feelings.
                </p>
              </div>
            </Link>

            <Link to="/analytics" className="action-card">
              <span>📊</span>

              <div>
                <h3>View your insights</h3>

                <p>
                  Understand your mood patterns.
                </p>
              </div>
            </Link>

            <Link to="/breathing" className="action-card">
              <span>🫁</span>

              <div>
                <h3>Take a breathing break</h3>

                <p>
                  Slow down and relax for a moment.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="export-section">
          <div className="export-card">
            <div>
              <p className="tagline">YOUR DATA</p>

              <h2>Export Your Data</h2>

              <p>
                Download your journal information as a JSON
                file for your personal records.
              </p>
            </div>

            <button
              onClick={exportData}
              className="primary-btn"
            >
              📥 Export My Data
            </button>
          </div>

          {message && (
            <p className="export-message">
              {message}
            </p>
          )}
        </section>

        {latestJournal && (
          <section className="latest-entry">
            <p className="tagline">LATEST REFLECTION</p>

            <h2>{latestJournal.title}</h2>

            <p>
              {new Date(
                latestJournal.createdAt
              ).toLocaleString()}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;