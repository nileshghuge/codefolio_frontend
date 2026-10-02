import { useState } from "react";

function Minimalist({ profile }) {
  const [imageError, setImageError] = useState({});

  const showImage = (index) => {
    return !imageError[index];
  };

  return (
    <div className="minimalist-template">

      {/* HERO SECTION */}
      <section className="minimalist-hero">

        <div className="minimalist-badge-row">
          <span className="minimalist-status">
            ● AVAILABLE
          </span>

          {profile.isPro && (
            <span className="pro-badge">
              PRO
            </span>
          )}
        </div>

        <h1>
          {profile.name || "Your Name"}
        </h1>

        <p className="minimalist-username">
          @{profile.username || "username"}
        </p>

        <p className="minimalist-bio">
          {profile.bio || "Developer Portfolio"}
        </p>

        {/* SOCIAL LINKS */}
        <div className="minimalist-socials">

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
      </section>


      {/* SKILLS SECTION */}
      <section className="minimalist-section">

        <h2>Skills</h2>

        <div className="skills-grid">

          <div className="skill-category">
            <h3>Frontend</h3>

            <div className="skill-list">
              {(profile.frontendSkills || []).map(
                (skill, index) => (
                  <span
                    className="skill-tag"
                    key={`frontend-${index}`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>


          <div className="skill-category">
            <h3>Backend</h3>

            <div className="skill-list">
              {(profile.backendSkills || []).map(
                (skill, index) => (
                  <span
                    className="skill-tag"
                    key={`backend-${index}`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>


          <div className="skill-category">
            <h3>DevOps</h3>

            <div className="skill-list">
              {(profile.devopsSkills || []).map(
                (skill, index) => (
                  <span
                    className="skill-tag"
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


      {/* PROJECTS SECTION */}
      <section className="minimalist-section">

        <h2>Projects</h2>

        <div className="projects-grid">

          {(profile.projects || []).map(
            (project, index) => (
              <article
                className="project-card"
                key={index}
              >

                {/* PROJECT SCREENSHOT */}
                {project.screenshot &&
                  showImage(index) ? (
                    <img
                      className="project-image"
                      src={project.screenshot}
                      alt={`${project.title || "Project"} screenshot`}
                      loading="lazy"
                      onError={() =>
                        setImageError((previous) => ({
                          ...previous,
                          [index]: true,
                        }))
                      }
                    />
                  ) : null}


                {/* PROJECT CONTENT */}
                <div className="project-content">

                  <h3>
                    {project.title || "Untitled Project"}
                  </h3>

                  <p>
                    {project.description ||
                      "Project description"}
                  </p>


                  {/* TECH STACK */}
                  <div className="tech-stack">

                    {(Array.isArray(project.techStack)
                      ? project.techStack
                      : typeof project.techStack === "string"
                      ? project.techStack
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      : []
                    ).map((tech, techIndex) => (
                      <span
                        className="tech-tag"
                        key={techIndex}
                      >
                        {tech}
                      </span>
                    ))}

                  </div>


                  {/* PROJECT LINKS */}
                  <div className="project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub →
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo →
                      </a>
                    )}

                  </div>

                </div>

              </article>
            )
          )}

        </div>

      </section>


      {/* FOOTER */}
      <footer className="minimalist-footer">

        <p>
          Built with CodeFolio
          {profile.isPro && " • PRO"}
        </p>

        <p>
          © {new Date().getFullYear()}{" "}
          {profile.name || "Developer"}
        </p>

      </footer>

    </div>
  );
}

export default Minimalist;
 
