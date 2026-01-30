import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import DetailsModal from "./DetailsModal";

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="grid">
        {projects.map(project => (
          <div
            key={project._id}
            className="item-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="image-box">
              <img src={project.image} alt={project.title} />
            </div>

            <h3>{project.title}</h3>
            <span>{project.subtitle || "Project"}</span>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      <DetailsModal
        item={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}