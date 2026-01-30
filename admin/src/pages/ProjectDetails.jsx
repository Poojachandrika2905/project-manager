import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LandingPage.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data));
  }, [id]);

  if (!project) {
    return <div className="section">Loading...</div>;
  }

  return (
    <div className="section">
      <button className="secondary-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="details-card">
        <img src={project.image} alt={project.name} />
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>
    </div>
  );
}

export default ProjectDetails;
