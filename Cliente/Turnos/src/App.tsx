import { useState } from 'react'
import './index.css'
import FormularioReserva from './FormularioReserva'
import NavBar from './NavBar'
import PanelConsultaReserva from './PanelConsultaReserva'
import PanelModificar from './PanelModificar'
function App() {

  const [ventanaElegida, setVentanaElegida] = useState("reservar");

  const panelElegido = () => {

    switch(ventanaElegida) {

        case "reservar" : return <FormularioReserva></FormularioReserva>;
        case "consultar" : return <PanelConsultaReserva></PanelConsultaReserva>;
        case "modificar" : return <PanelModificar></PanelModificar>
    }


  }

  return (
    <div className='contenedor-general'>
      <NavBar setVentanaElegida={setVentanaElegida}/>

      <div className="contenedor-formulario">
        {panelElegido()}
      </div>
    </div>
  );
}

export default App
