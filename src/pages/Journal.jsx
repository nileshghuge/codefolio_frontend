import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Journal() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: 5,
    energy: 5,
    emotion: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://mindwell-backend-rdph.onrender.com/api/journal",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Your journal entry has been saved 🔒");

      setFormData({
        title: "",
        content: "",
        mood: 5,
        energy: 5,
        emotion: "",
      });

      fetchJournals();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to save journal entry."
      );
    }
  };

  const deleteJournal = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://mindwell-backend-rdph.onrender.com/api/journal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJournals(
        journals.filter((journal) => journal._id !== id)
      );

      setMessage("Journal entry deleted.");
    } catch (error) {
      setMessage("Unable to delete journal entry.");
    }
  };

  return (
    <div className="journal-page">
      <Navbar />

      <main className="journal-container">
        <div className="journal-header">
          <p className="tagline">PRIVATE JOURNAL</p>

          <h1>How are you feeling today?</h1>

          <p>
            Take a few minutes to reflect on your thoughts and feelings.
          </p>
        </div>

        <form className="journal-form" onSubmit={handleSubmit}>
          <label>Entry Title</label>

          <input
            type="text"
            name="title"
            placeholder="Give your entry a title..."
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Your Thoughts</label>

          <textarea
            name="content"
            placeholder="Write whatever is on your mind..."
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />

          <div className="journal-row">
            <div>
              <label>Mood</label>

              <div className="range-value">
                {formData.mood} / 10
              </div>

              <input
                type="range"
                name="mood"
                min="1"
                max="10"
                value={formData.mood}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Energy</label>

              <div className="range-value">
                {formData.energy} / 10
              </div>

              <input
                type="range"
                name="energy"
                min="1"
                max="10"
                value={formData.energy}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Emotion</label>

          <select
            name="emotion"
            value={formData.emotion}
            onChange={handleChange}
          >
            <option value="">Select an emotion</option>
            <option value="Happy">Happy</option>
            <option value="Calm">Calm</option>
            <option value="Excited">Excited</option>
            <option value="Grateful">Grateful</option>
            <option value="Sad">Sad</option>
            <option value="Angry">Angry</option>
            <option value="Anxious">Anxious</option>
            <option value="Tired">Tired</option>
            <option value="Stressed">Stressed</option>
          </select>

          <div className="journal-privacy">
            🔒 Your journal content is encrypted before being stored.
          </div>

          <button
            type="submit"
            className="primary-btn journal-button"
          >
            Save Journal Entry
          </button>

          {message && (
            <p className="journal-message">{message}</p>
          )}
        </form>

        {/* JOURNAL HISTORY */}

        <section className="journal-history">
          <div className="history-header">
            <p className="tagline">YOUR REFLECTIONS</p>
            <h2>Previous Journal Entries</h2>
          </div>

          {journals.length === 0 ? (
            <div className="empty-history">
              <p>No journal entries yet.</p>
            </div>
          ) : (
            <div className="journal-list">
              {journals.map((journal) => (
                <div
                  className="journal-history-card"
                  key={journal._id}
                >
                  <div className="history-card-top">
                    <div>
                      <h3>{journal.title}</h3>

                      <small>
                        {new Date(
                          journal.createdAt
                        ).toLocaleString()}
                      </small>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteJournal(journal._id)
                      }
                    >
                      Delete
                    </button>
                  </div>

                  <p className="history-content">
                    {journal.content}
                  </p>

                  <div className="history-details">
                    <span>
                      😊 Mood: {journal.mood}/10
                    </span>

                    <span>
                      ⚡ Energy: {journal.energy}/10
                    </span>

                    {journal.emotion && (
                      <span>
                        💭 {journal.emotion}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </main>
    </div>
  );
}

export default Journal;