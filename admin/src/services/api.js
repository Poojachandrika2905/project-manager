export const fetchProjects = async () => {
  const res = await fetch("http://localhost:5000/api/projects");
  return res.json();
};