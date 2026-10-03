import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("mindwell-dark-mode") === "true"
  );

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem(
      "mindwell-dark-mode",
      darkMode
    );
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MindWell
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {loggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/breathing">Breathe</Link>
          </>
        )}

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {loggedIn ? (
          <button
            className="login-btn"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

