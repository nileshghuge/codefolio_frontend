import { useEffect } from "react";

function Minimalist({ profile }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".mf-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mf-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const skills = profile?.skills || {};

  const projects = profile?.projects || [];

  return (
    <div className="mf-portfolio">

      {/* Animated background */}
      <div className="mf-background">
        <div className="mf-orb mf-orb-one"></div>
        <div className="mf-orb mf-orb-two"></div>
        <div className="mf-grid"></div>
      </div>

      {/* Navbar */}
      <nav className="mf-navbar">
        <a href="#home" className="mf-logo">
          <span>&lt;/&gt;</span>
          CodeFolio
        </a>

        <div className="mf-nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="mf-hero">

        <div className="mf-hero-content">

          <div className="mf-status">
            <span></span>
            Available for opportunities
          </div>

          <p className="mf-eyebrow">
            HELLO, I'M
          </p>

          <h1>
            {profile?.name || "Your Name"}
          </h1>

          <h2>
            Full Stack Developer
          </h2>

          <p className="mf-bio">
            {profile?.bio ||
              "I build modern, scalable and user-friendly web applications."}
          </p>

          <div className="mf-actions">

            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="mf-primary-btn"
              >
                GitHub <span>↗</span>
              </a>
            )}

            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mf-secondary-btn"
              >
                LinkedIn <span>↗</span>
              </a>
            )}

            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mf-secondary-btn"
              >
                Resume <span>↓</span>
              </a>
            )}

          </div>

        </div>

        <div className="mf-hero-card">

          <div className="mf-code-window">

            <div className="mf-window-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="mf-code">
              <p>
                <span className="code-purple">const</span>{" "}
                developer = {"{"}
              </p>

              <p>
                &nbsp;&nbsp;name:{" "}
                <span className="code-green">
                  "{profile?.name || "Developer"}"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;role:{" "}
                <span className="code-green">
                  "Full Stack Developer"
                </span>,
              </p>

              <p>
                &nbsp;&nbsp;passion:{" "}
                <span className="code-green">
                  "Building"
                </span>
              </p>

              <p>
                {"}"};
              </p>

              <p className="code-cursor">
                _
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* About */}
      <section id="about" className="mf-section mf-reveal">

        <div className="mf-section-label">
          01 — ABOUT
        </div>

        <div className="mf-about-content">

          <h2>
            Turning ideas into
            <span> digital experiences.</span>
          </h2>

          <p>
            {profile?.bio ||
              "I'm a developer passionate about creating clean, modern and meaningful digital experiences."}
          </p>

        </div>

      </section>

      {/* Skills */}
      <section id="skills" className="mf-section mf-reveal">

        <div className="mf-section-label">
          02 — SKILLS
        </div>

        <div className="mf-skills-grid">

          <SkillGroup
            title="Frontend"
            items={skills.frontend}
          />

          <SkillGroup
            title="Backend"
            items={skills.backend}
          />

          <SkillGroup
            title="DevOps"
            items={skills.devops}
          />

        </div>

      </section>

      {/* Projects */}
      <section id="projects" className="mf-section mf-reveal">

        <div className="mf-section-label">
          03 — PROJECTS
        </div>

        <div className="mf-projects">

          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article
                className="mf-project-card"
                key={index}
              >

                <div className="mf-project-number">
                  0{index + 1}
                </div>

                <div className="mf-project-content">

                  <h3>
                    {project.title || "Project"}
                  </h3>

                  <p>
                    {project.description ||
                      "A modern web project built with passion and technology."}
                  </p>

                  <div className="mf-tech-stack">

                    {project.techStack?.map(
                      (tech, techIndex) => (
                        <span key={techIndex}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>

                  <div className="mf-project-links">

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                  </div>

                </div>

              </article>
            ))
          ) : (
            <div className="mf-empty">
              Projects will appear here.
            </div>
          )}

        </div>

      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mf-contact mf-reveal"
      >

        <div className="mf-section-label">
          04 — CONTACT
        </div>

        <div className="mf-contact-content">

          <p className="mf-contact-small">
            HAVE A PROJECT IN MIND?
          </p>

          <h2>
            Let's build something
            <span> great.</span>
          </h2>

          <p>
            Feel free to reach out if you'd like to
            work together or simply connect.
          </p>

          <a
            href={`mailto:${profile?.email || ""}`}
            className="mf-contact-btn"
          >
            Get in touch →
          </a>

        </div>

      </section>

      {/* Footer */}
      <footer className="mf-footer">

        <div>
          © {new Date().getFullYear()}{" "}
          {profile?.name || "Developer"}
        </div>

        <div>
          Built with <strong>CodeFolio</strong>
        </div>

      </footer>

    </div>
  );
}


/* Skill Group */

function SkillGroup({ title, items }) {
  return (
    <div className="mf-skill-group">

      <h3>{title}</h3>

      <div className="mf-skill-list">

        {items?.length > 0 ? (
          items.map((skill, index) => (
            <span key={index}>
              {skill}
            </span>
          ))
        ) : (
          <span>No skills added</span>
        )}

      </div>

    </div>
  );
}

export default Minimalist;