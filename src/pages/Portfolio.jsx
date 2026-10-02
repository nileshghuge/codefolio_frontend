import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Minimalist from "../templates/Minimalist";
import Cyberpunk from "../templates/Cyberpunk";

function Portfolio() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const url = username
          ? `https://codefolio-backend-txxm.onrender.com/api/profile/${username}`
          : "https://codefolio-backend-txxm.onrender.com/api/profile";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Portfolio not found");
        }

        const data = await response.json();

        if (!data || !data.username) {
          throw new Error("Portfolio not found");
        }

        setProfile(data);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setError(err.message || "Failed to fetch portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="portfolio">
        <div className="portfolio-container">
          <h2>Loading portfolio...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio">
        <div className="portfolio-container">
          <h2>Portfolio not found</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const templateMap = {
    minimalist: Minimalist,
    cyberpunk: Cyberpunk,
  };

  const PortfolioLayout =
    templateMap[profile.templateId] || Minimalist;

  return (
    <>
      <Helmet>
        <title>{profile.name} | CodeFolio</title>

        <meta
          name="description"
          content={profile.bio || "Developer Portfolio"}
        />
      </Helmet>

      <div className="portfolio">
        <div className="portfolio-container">
          <PortfolioLayout profile={profile} />
        </div>
      </div>
    </>
  );
}

export default Portfolio;