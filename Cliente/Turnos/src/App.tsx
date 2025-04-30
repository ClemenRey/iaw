import { useState } from 'react'
import './App.css'
import PanelReserva from './PanelReserva'
import NavBar from './NavBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
      
     <PanelReserva></PanelReserva>
    </>
  )
}

export default App
