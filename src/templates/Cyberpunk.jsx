import { useState } from "react";

function Cyberpunk({ profile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [imageError, setImageError] = useState({});

  const handleContact = async (event) => {
    event.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://codefolio-backend-txxm.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            username: profile.username,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send message"
        );
      }

      setStatus("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Contact error:", error);
      setStatus(
        error.message || "Unable to send message"
      );
    }
  };

  const getTechStack = (techStack) => {
    if (Array.isArray(techStack)) {
      return techStack;
    }

    if (typeof techStack === "string") {
      return techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  return (
    <div className="cyberpunk-template">

      {/* HERO */}
      <section className="cyber-hero">

        <div className="cyber-top-line">
          <span className="cyber-status">
            SYSTEM ONLINE
          </span>

          {profile.isPro && (
            <span className="pro-badge">
              PRO
            </span>
          )}
        </div>

        <div className="cyber-hero-content">

          <p className="cyber-label">
            &lt;DEVELOPER /&gt;
          </p>

          <h1>
            {profile.name || "YOUR NAME"}
          </h1>

          <p className="cyber-username">
            @{profile.username || "username"}
          </p>

          <p className="cyber-bio">
            {profile.bio ||
              "Building digital experiences with code."}
          </p>

          {/* SOCIAL LINKS */}
          <div className="cyber-socials">

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            )}

          </div>

        </div>

      </section>

      {/* SKILLS */}
      <section className="cyber-section">

        <div className="cyber-section-title">
          <span>01.</span>
          <h2>SKILLS</h2>
        </div>

        <div className="cyber-skills-grid">

          <div className="cyber-skill-card">

            <h3>FRONTEND</h3>

            <div className="cyber-skill-list">
              {(profile.frontendSkills || []).map(
                (skill, index) => (
                  <span
                    className="cyber-skill-tag"
                    key={`frontend-${index}`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

          <div className="cyber-skill-card">

            <h3>BACKEND</h3>

            <div className="cyber-skill-list">
              {(profile.backendSkills || []).map(
                (skill, index) => (
                  <span
                    className="cyber-skill-tag"
                    key={`backend-${index}`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

          <div className="cyber-skill-card">

            <h3>DEVOPS</h3>

            <div className="cyber-skill-list">
              {(profile.devopsSkills || []).map(
                (skill, index) => (
                  <span
                    className="cyber-skill-tag"
                    key={`devops-${index}`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

        </div>

      </section>

      {/* PROJECTS */}
      <section className="cyber-section">

        <div className="cyber-section-title">
          <span>02.</span>
          <h2>PROJECTS</h2>
        </div>

        <div className="cyber-projects">

          {(profile.projects || []).map(
            (project, index) => {

              const technologies =
                getTechStack(project.techStack);

              return (
                <article
                  className="cyber-project-card"
                  key={index}
                >

                  {/* SCREENSHOT */}
                  {project.screenshot &&
                    !imageError[index] && (
                      <img
                        className="cyber-project-image"
                        src={project.screenshot}
                        alt={`${project.title || "Project"} screenshot`}
                        loading="lazy"
                        onError={() =>
                          setImageError(
                            (previous) => ({
                              ...previous,
                              [index]: true,
                            })
                          )
                        }
                      />
                    )}

                  <div className="cyber-project-content">

                    <div className="cyber-project-number">
                      PROJECT_
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3>
                      {project.title ||
                        "UNTITLED PROJECT"}
                    </h3>

                    <p>
                      {project.description ||
                        "Project description"}
                    </p>

                    {/* TECH STACK */}
                    <div className="cyber-tech-stack">

                      {technologies.map(
                        (tech, techIndex) => (
                          <span
                            className="cyber-tech-tag"
                            key={techIndex}
                          >
                            {tech}
                          </span>
                        )
                      )}

                    </div>

                    {/* LINKS */}
                    <div className="cyber-project-links">

                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          [ GITHUB ]
                        </a>
                      )}

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          [ LIVE DEMO ]
                        </a>
                      )}

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>

      {/* CONTACT */}
      <section className="cyber-section cyber-contact-section">

        <div className="cyber-section-title">
          <span>03.</span>
          <h2>CONTACT</h2>
        </div>

        <div className="cyber-contact-wrapper">

          <div className="cyber-contact-info">

            <p className="cyber-label">
              &lt;LET'S_CONNECT /&gt;
            </p>

            <h3>
              HAVE A PROJECT?
            </h3>

            <p>
              Send a message and let's build
              something amazing together.
            </p>

          </div>

          <form
            className="cyber-contact-form"
            onSubmit={handleContact}
          >

            <input
              type="text"
              placeholder="YOUR NAME"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

            <textarea
              placeholder="YOUR MESSAGE"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              rows="6"
              required
            />

            <button type="submit">
              {status === "Sending..."
                ? "SENDING..."
                : "SEND MESSAGE →"}
            </button>

            {status && (
              <p className="cyber-contact-status">
                {status}
              </p>
            )}

          </form>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="cyber-footer">

        <p>
          CODEFOLIO //{" "}
          {profile.username || "DEVELOPER"}
        </p>

        <p>
          {profile.isPro
            ? "PRO MEMBER"
            : "DEVELOPER PORTFOLIO"}
        </p>

        <p>
          © {new Date().getFullYear()}{" "}
          {profile.name || "Developer"}
        </p>

      </footer>

    </div>
  );
}

export default Cyberpunk;


