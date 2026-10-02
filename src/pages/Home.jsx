import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <nav className="navbar">
        <h2>CodeFolio</h2>

        <button onClick={() => navigate("/builder")}>
          Create Portfolio
        </button>
      </nav>

      <section className="hero">
        <h1>
          Build Your
          <br />
          Developer Portfolio
        </h1>

        <p>
          Create a professional portfolio, showcase your skills,
          and share your projects with the world.
        </p>

        <button
          className="hero-button"
          onClick={() => navigate("/builder")}
        >
          Start Building →
        </button>
      </section>
    </div>
  );
}

export default Home;