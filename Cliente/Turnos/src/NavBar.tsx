// Navbar.jsx
import React from "react";

export default function Navbar({setVentanaElegida}) {






  return (
    <nav style={styles.nav}>
      <div style={styles.logo}></div>
      <ul style={styles.navLinks}>
        <li><button onClick={() => setVentanaElegida("reservar")}>Reservar</button></li>
        <li><button onClick={() => setVentanaElegida("consultar")}>Consultar</button></li>
        <li><button onClick={() => setVentanaElegida("modificar")}>Modificar</button></li>
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
