import { useState } from 'react'
import './App.css'
import PanelReserva from './PanelReserva'
import NavBar from './NavBar'
import PanelConsultaReserva from './PanelConsultaReserva'
import PanelModificar from './PanelModificar'
function App() {

  const [count, setCount] = useState(0);
  const [ventanaElegida, setVentanaElegida] = useState("reservar");

  const panelElegido = () => {

    switch(ventanaElegida) {

        case "reservar" : return <PanelReserva></PanelReserva>;
        case "consultar" : return <PanelConsultaReserva></PanelConsultaReserva>;
        case "modificar" : return <PanelModificar></PanelModificar>
    }


  }

  return (
    <>
      <NavBar setVentanaElegida={setVentanaElegida}/>

      <div className="panel-container">
        {panelElegido()}
       
      </div>
    </>
  );
}

export default App
