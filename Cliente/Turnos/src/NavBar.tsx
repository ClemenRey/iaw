// Navbar.jsx
import React from "react";
import { useState } from "react";
import './index.css';
export default function Navbar({setVentanaElegida}) {
  const [idBotones, setIdBotones] = useState(["selected","",""]);
  function seleccionarVentana(ventana, nroBoton){
    setVentanaElegida(ventana);
    let aux = ["","",""];
    aux[nroBoton] = "selected";
    setIdBotones(aux);
  }
  return (
    <nav>
      <ul>
        <li><button className="btn-nav" id={idBotones[0]} onClick={()=>seleccionarVentana("reservar", 0)}>Reservar</button></li>
        <li><button className="btn-nav" id={idBotones[1]} onClick={()=>seleccionarVentana("consultar", 1)}>Consultar</button></li>
        <li><button className="btn-nav" id={idBotones[2]} onClick={()=>seleccionarVentana("modificar", 2)}>Modificar</button></li>
      </ul>
    </nav>
  );
}
