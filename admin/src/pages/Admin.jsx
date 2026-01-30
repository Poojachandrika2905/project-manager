import React, { useEffect, useState } from "react";

function Admin() {
  /* ================= STATES ================= */

  // Project
  const [pImage, setPImage] = useState("");
  const [pName, setPName] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);

  // Client
  const [cImage, setCImage] = useState("");
  const [cName, setCName] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cDesignation, setCDesignation] = useState("");
  const [editClientId, setEditClientId] = useState(null);

  // Lists
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  /* ================= FETCH ================= */

  const fetchAll = async () => {
    const p = await fetch("http://localhost:5000/api/projects").then(r => r.json());
    const c = await fetch("http://localhost:5000/api/clients").then(r => r.json());
    const ct = await fetch("http://localhost:5000/api/contact").then(r => r.json());
    const s = await fetch("http://localhost:5000/api/subscribe").then(r => r.json());

    setProjects(p || []);
    setClients(c || []);
    setContacts(ct || []);
    setSubscribers(s || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ================= PROJECT ================= */

  const saveProject = async (e) => {
    e.preventDefault();

    const url = editProjectId
      ? `http://localhost:5000/api/projects/${editProjectId}`
      : "http://localhost:5000/api/projects";

    const method = editProjectId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: pImage, name: pName, description: pDescription }),
    });

    setPImage("");
    setPName("");
    setPDescription("");
    setEditProjectId(null);
    fetchAll();
  };

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, { method: "DELETE" });
    fetchAll();
  };

  /* ================= CLIENT ================= */

  const saveClient = async (e) => {
    e.preventDefault();

    const url = editClientId
      ? `http://localhost:5000/api/clients/${editClientId}`
      : "http://localhost:5000/api/clients";

    const method = editClientId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: cImage,
        name: cName,
        description: cDescription,
        designation: cDesignation,
      }),
    });

    setCImage("");
    setCName("");
    setCDescription("");
    setCDesignation("");
    setEditClientId(null);
    fetchAll();
  };

  const deleteClient = async (id) => {
    await fetch(`http://localhost:5000/api/clients/${id}`, { method: "DELETE" });
    fetchAll();
  };

  /* ================= UI ================= */

  return (
    <div className="app">
      <h1 className="title">Admin Panel</h1>

      {/* PROJECT FORM */}
      <div className="card">
        <h2>{editProjectId ? "Edit Project" : "Add Project"}</h2>
        <form onSubmit={saveProject}>
          <input placeholder="Image URL" value={pImage} onChange={e => setPImage(e.target.value)} />
          <input placeholder="Project Name" value={pName} onChange={e => setPName(e.target.value)} />
          <textarea placeholder="Description" value={pDescription} onChange={e => setPDescription(e.target.value)} />
          <button className="btn-primary">Save Project</button>
        </form>
      </div>

      <h2 className="section-title">Projects</h2>
      <div className="grid">
        {projects.map(p => (
          <div className="item-card" key={p._id}>
            <img src={p.image} className="project-full-image" alt="" />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <button onClick={() => {
              setPImage(p.image);
              setPName(p.name);
              setPDescription(p.description);
              setEditProjectId(p._id);
            }}>Edit</button>
            <button className="btn-danger" onClick={() => deleteProject(p._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* CLIENT FORM */}
      <div className="card">
        <h2>{editClientId ? "Edit Client" : "Add Client"}</h2>
        <form onSubmit={saveClient}>
          <input placeholder="Image URL" value={cImage} onChange={e => setCImage(e.target.value)} />
          <input placeholder="Client Name" value={cName} onChange={e => setCName(e.target.value)} />
          <textarea placeholder="Description" value={cDescription} onChange={e => setCDescription(e.target.value)} />
          <input placeholder="Designation" value={cDesignation} onChange={e => setCDesignation(e.target.value)} />
          <button className="btn-secondary">Save Client</button>
        </form>
      </div>

      <h2 className="section-title">Clients</h2>
      <div className="grid">
        {clients
          .filter(c => c.designation)   // ✅ CLIENTS ONLY
          .map(c => (
            <div className="item-card" key={c._id}>
              <div className="image-box"><img src={c.image} alt="" /></div>
              <h3>{c.name}</h3>
              <span>{c.designation}</span>
              <p>{c.description}</p>
              <button onClick={() => {
                setCImage(c.image);
                setCName(c.name);
                setCDescription(c.description);
                setCDesignation(c.designation);
                setEditClientId(c._id);
              }}>Edit</button>
              <button className="btn-danger" onClick={() => deleteClient(c._id)}>Delete</button>
            </div>
          ))}
      </div>

      {/* CONTACTS – VIEW ONLY */}
      <h2 className="section-title">Contact Form Submissions</h2>
      <div className="card">
        {contacts
          .filter(c => c.email && c.mobile && c.city)   // ✅ CONTACTS ONLY
          .map(c => (
            <p key={c._id}>
              <strong>{c.name}</strong> | {c.email} | {c.mobile} | {c.city}
            </p>
          ))}
      </div>

      {/* SUBSCRIBERS – VIEW ONLY */}
      <h2 className="section-title">Subscribed Emails</h2>
      <div className="card">
        {subscribers
          .filter(s => s.email)   // ✅ SUBSCRIBERS ONLY
          .map(s => (
            <p key={s._id}>{s.email}</p>
          ))}
      </div>
    </div>
  );
}

export default Admin;
