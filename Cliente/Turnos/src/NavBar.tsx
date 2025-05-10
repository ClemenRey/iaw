// Navbar.jsx
import React from "react";
import './index.css';
export default function Navbar({setVentanaElegida}) {
  return (
    <nav>
      <ul>
        <li><button onClick={() => setVentanaElegida("reservar")}>Reservar</button></li>
        <li><button onClick={() => setVentanaElegida("consultar")}>Consultar</button></li>
        <li><button onClick={() => setVentanaElegida("modificar")}>Modificar</button></li>
      </ul>
    </nav>
  );
}
