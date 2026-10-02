import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Minimalist from "../templates/Minimalist";
import Cyberpunk from "../templates/Cyberpunk";

function Builder() {
const navigate = useNavigate();

const {
register,
handleSubmit,
watch,
formState: { errors },
} = useForm({
defaultValues: {
username: "",
name: "",
bio: "",
github: "",
linkedin: "",
resumeUrl: "",
frontendSkills: "",
backendSkills: "",
devopsSkills: "",
templateId: "minimalist",
projects: [
{
title: "",
description: "",
techStack: "",
repoLink: "",
liveLink: "",
screenshot: "",
},
],
},
});

const [saving, setSaving] = useState(false);

const formData = watch();

const [projects, setProjects] = useState(
formData.projects || [
{
title: "",
description: "",
techStack: "",
repoLink: "",
liveLink: "",
screenshot: "",
},
]
);

const convertToArray = (value = "") => {
return value
.split(",")
.map((item) => item.trim())
.filter((item) => item !== "");
};

const addProject = () => {
setProjects((currentProjects) => [
...currentProjects,
{
title: "",
description: "",
techStack: "",
repoLink: "",
liveLink: "",
screenshot: "",
},
]);
};

const removeProject = (index) => {
setProjects((currentProjects) =>
currentProjects.filter(
(_, projectIndex) => projectIndex !== index
)
);
};

const updateProject = (index, field, value) => {
setProjects((currentProjects) => {
const updatedProjects = [...currentProjects];

 
  updatedProjects[index] = {
    ...updatedProjects[index],
    [field]: value,
  };

  return updatedProjects;
});
 

};

const createProfileData = (data) => {
return {
username: data.username.trim(),
name: data.name.trim(),
bio: data.bio.trim(),

 
  github: data.github.trim(),
  linkedin: data.linkedin.trim(),
  resumeUrl: data.resumeUrl.trim(),

  skills: {
    frontend: convertToArray(data.frontendSkills),
    backend: convertToArray(data.backendSkills),
    devops: convertToArray(data.devopsSkills),
  },

  projects: projects.map((project) => ({
    title: project.title.trim(),
    description: project.description.trim(),

    techStack: convertToArray(project.techStack),

    repoLink: project.repoLink.trim(),
    liveLink: project.liveLink.trim(),
    screenshot: project.screenshot.trim(),
  })),

  templateId: data.templateId,
};
 

};

/* =========================
LIVE PREVIEW
========================= */

const previewProfile = {
username: formData.username || "username",
name: formData.name || "Your Name",
bio: formData.bio || "Your developer bio",

 
github: formData.github || "",
linkedin: formData.linkedin || "",
resumeUrl: formData.resumeUrl || "",

skills: {
  frontend: convertToArray(formData.frontendSkills),
  backend: convertToArray(formData.backendSkills),
  devops: convertToArray(formData.devopsSkills),
},

projects: projects.map((project) => ({
  ...project,
  techStack: convertToArray(project.techStack),
})),

templateId: formData.templateId || "minimalist",
 

};

const PreviewTemplate =
formData.templateId === "cyberpunk"
? Cyberpunk
: Minimalist;

/* =========================
SAVE
========================= */

const onSubmit = async (data) => {
setSaving(true);

 
try {
  const profile = createProfileData(data);

  console.log("Sending profile:", profile);

  const response = await fetch(
    "http://https://codefolio-backend-txxm.onrender.com/api/profile",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(profile),
    }
  );

  const result = await response.json();

  console.log("Server response:", result);

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to save portfolio."
    );
  }

  alert("Portfolio saved successfully!");

  navigate("/" + data.username.trim());

} catch (error) {
  console.error("Save error:", error);

  alert(
    error.message ||
      "Cannot connect to the backend."
  );

} finally {
  setSaving(false);
}
 

};

return ( <div className="builder">

 
  <h1>Build Your Portfolio</h1>

  <form onSubmit={handleSubmit(onSubmit)}>

    {/* =========================
        PROFILE
    ========================= */}

    <h2>Profile</h2>

    <input
      type="text"
      placeholder="Username (example: nilesh)"
      {...register("username", {
        required: "Username is required",
      })}
    />

    {errors.username && (
      <p className="form-error">
        {errors.username.message}
      </p>
    )}

    <br />
    <br />

    <input
      type="text"
      placeholder="Your Name"
      {...register("name", {
        required: "Name is required",
      })}
    />

    {errors.name && (
      <p className="form-error">
        {errors.name.message}
      </p>
    )}

    <br />
    <br />

    <textarea
      placeholder="Your Bio"
      {...register("bio")}
    />

    <br />
    <br />

    <input
      type="text"
      placeholder="GitHub URL"
      {...register("github")}
    />

    <br />
    <br />

    <input
      type="text"
      placeholder="LinkedIn URL"
      {...register("linkedin")}
    />

    <br />
    <br />

    <input
      type="text"
      placeholder="Resume URL"
      {...register("resumeUrl")}
    />


    {/* =========================
        SKILLS
    ========================= */}

    <h2>Skills</h2>

    <input
      type="text"
      placeholder="Frontend: React, HTML, CSS, JavaScript"
      {...register("frontendSkills")}
    />

    <br />
    <br />

    <input
      type="text"
      placeholder="Backend: Node.js, Express, MongoDB"
      {...register("backendSkills")}
    />

    <br />
    <br />

    <input
      type="text"
      placeholder="DevOps: Git, GitHub, Docker"
      {...register("devopsSkills")}
    />


    {/* =========================
        TEMPLATE
    ========================= */}

    <h2>Choose Template</h2>

    <select {...register("templateId")}>

      <option value="minimalist">
        Minimalist
      </option>

      <option value="cyberpunk">
        Cyberpunk
      </option>

    </select>


    {/* =========================
        PROJECTS
    ========================= */}

    <h2>Projects</h2>

    {projects.map((project, index) => (

      <div
        className="project-form"
        key={index}
      >

        <h3>
          Project {index + 1}
        </h3>

        <input
          type="text"
          placeholder="Project Name"
          value={project.title}
          onChange={(e) =>
            updateProject(
              index,
              "title",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Project Description"
          value={project.description}
          onChange={(e) =>
            updateProject(
              index,
              "description",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Tech Stack: React, Node.js, MongoDB"
          value={project.techStack}
          onChange={(e) =>
            updateProject(
              index,
              "techStack",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="GitHub Project Link"
          value={project.repoLink}
          onChange={(e) =>
            updateProject(
              index,
              "repoLink",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Live Demo Link"
          value={project.liveLink}
          onChange={(e) =>
            updateProject(
              index,
              "liveLink",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Project Screenshot URL"
          value={project.screenshot}
          onChange={(e) =>
            updateProject(
              index,
              "screenshot",
              e.target.value
            )
          }
        />

        {projects.length > 1 && (
          <>
            <br />
            <br />

            <button
              type="button"
              onClick={() =>
                removeProject(index)
              }
            >
              Remove Project
            </button>
          </>
        )}

        <hr />

      </div>

    ))}


    {/* ADD PROJECT */}

    <button
      type="button"
      onClick={addProject}
    >
      + Add Project
    </button>

    <br />
    <br />


    {/* SAVE */}

    <button
      type="submit"
      disabled={saving}
    >
      {saving
        ? "Saving..."
        : "Save Portfolio"}
    </button>

  </form>


  {/* =========================
      LIVE PREVIEW
  ========================= */}

  <div className="live-preview">

    <h2>Live Preview</h2>

    <PreviewTemplate
      profile={previewProfile}
    />

  </div>

</div>
 

);
}

export default Builder;
