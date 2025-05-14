// Navbar.jsx
import { useState } from "react";
import './index.css';
interface NavbarProps {
  setVentanaElegida: (ventana: string) => void;
}

export default function Navbar({ setVentanaElegida }: NavbarProps) {
  const [idBotones, setIdBotones] = useState(["selected","",""]);


  function seleccionarVentana(ventana : string, nroBoton : number){
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
