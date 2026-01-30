import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("https://project-manager-u82x.onrender.com/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));

    fetch("https://project-manager-u82x.onrender.com/api/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  /* ================= ADMIN GATE ================= */
  const handleAdminClick = () => {
    const password = prompt("Enter Admin Password");

    if (password === "admin123") {
      navigate("/admin");
    } else {
      alert("Invalid Admin Password");
    }
  };

  /* ================= CONTACT ================= */
  const submitContact = async (e) => {
    e.preventDefault();

    await fetch("https://project-manager-u82x.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    alert("We will contact you soon!");
    setContact({ name: "", email: "", mobile: "", city: "" });
  };

  /* ================= SUBSCRIBE ================= */
  const subscribe = async (e) => {
    e.preventDefault();

    await fetch("https://project-manager-u82x.onrender.com/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="landing">
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">ProjectManager</div>

        <nav className="nav">
          <a href="#about">AboutUs</a>
          <a href="#projects">Projects</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>

          <button className="nav-btn" onClick={handleAdminClick}>
            Admin
          </button>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Build Faster. <span>Launch Smarter.</span>
          </h1>

          <p>
            A modern platform designed to help teams plan, build and deliver
            products efficiently.
          </p>

          <div className="hero-actions">
            <button
              className="secondary-outline"
              onClick={() =>
                document
                  .getElementById("projects")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-pdf" id="about">
        <div className="about-images">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            className="img img-left"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            className="img img-center"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            className="img img-right"
            alt=""
          />
        </div>

        <h2 className="section-title center">About Us</h2>
        <div className="underline"></div>

        <p className="about-desc">
          We help businesses grow using innovative digital solutions and a
          results-driven approach.
        </p>

        <button
          className="about-btn"
          onClick={() =>
            document
              .getElementById("projects")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Learn More
        </button>
      </section>

      {/* ================= WHY ================= */}
      <section className="why-section">
        <h2 className="section-title center">Why Choose Us?</h2>
        <div className="underline"></div>

        <div className="why-grid">
          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135673.png"
              alt=""
            />
            <h3>Potential ROI</h3>
            <p>Solutions that maximize return on investment.</p>
          </div>

          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
              alt=""
            />
            <h3>Design</h3>
            <p>User-centric and visually engaging designs.</p>
          </div>

          <div className="why-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077976.png"
              alt=""
            />
            <h3>Marketing</h3>
            <p>Strategies that reach the right audience.</p>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="section" id="projects">
        <h2 className="section-title">Our Projects</h2>

        <div className="marquee">
          <div className="marquee-track">
            {[...projects, ...projects].map((p, i) => (
              <div className="card" key={i}>
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <button className="secondary-btn">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLIENTS ================= */}
      <section className="section light" id="clients">
        <h2 className="section-title">Happy Clients</h2>

        <div className="marquee">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div className="card" key={i}>
                <img src={c.image} className="avatar" alt={c.name} />
                <h3>{c.name}</h3>
                <span>{c.designation}</span>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section contact-section" id="contact">
        <div className="contact-box">
          <h3>Get a Free Consultation</h3>

          <form onSubmit={submitContact}>
            <input
              placeholder="Full Name"
              value={contact.name}
              onChange={e =>
                setContact({ ...contact, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Email Address"
              value={contact.email}
              onChange={e =>
                setContact({ ...contact, email: e.target.value })
              }
              required
            />
            <input
              placeholder="Mobile Number"
              value={contact.mobile}
              onChange={e =>
                setContact({ ...contact, mobile: e.target.value })
              }
              required
            />
            <input
              placeholder="Area / City"
              value={contact.city}
              onChange={e =>
                setContact({ ...contact, city: e.target.value })
              }
              required
            />
            <button className="contact-btn">Get Quick Quote</button>
          </form>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter-bar">
        <div className="newsletter-inner">
          <span>Subscribe to our Newsletter</span>

          <form onSubmit={subscribe}>
            <input
              placeholder="Enter Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button>Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        © 2026 Project Management Platform
      </footer>
    </div>
  );
}

export default LandingPage;
