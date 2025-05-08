import { useState } from 'react'
import './App.css'
import PanelReserva from './PanelReserva'
import NavBar from './NavBar'
import PanelConsultaReserva from './PanelConsultaReserva'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      <div className="panel-container">
        <PanelReserva />
        <PanelConsultaReserva />
      </div>
    </>
  );
}

export default App
