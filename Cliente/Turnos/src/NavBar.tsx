// Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MiApp</div>
      <ul style={styles.navLinks}>
        <li><a href="#acerca">Acerca de</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#0077cc",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  }
};
