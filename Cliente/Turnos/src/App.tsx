import { useState } from 'react'
import './App.css'
import PanelReserva from './PanelReserva'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PanelReserva></PanelReserva>
    </>
  )
}

export default App
