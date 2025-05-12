import { useState } from "react";
import { useEffect } from "react";
import './index.css';
function PanelModificar() {
  const [dni, setDni] = useState("");
  const [reserva, setReserva] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dia, setDia] = useState(""); 
  const [horario, setHorario] = useState("");
  const [cancha, setCancha] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [canchaDisponibles, setCanchaDisponibles] = useState([]);


    useEffect (() => {
    
                
                if (dia != "" && horario != "") {
    
                fetch('http://localhost:3001/canchas_disponibles' , {
    
                    method : 'POST',
                    headers: {'Content-type' : 'application/json'},
                    body: JSON.stringify({
                        dia : dia,
                        horario : horario
                      }),
    
    
                }).then(res => res.json())
                .then(data => {
    
                    console.log("Canchas disponibles: ", data);   
                    setCanchaDisponibles(data);
                
                    
                }); // Me convierte a objeto de JavaScript la respuesta
    
            }
    
        } , [dia, horario]);
    






  function buscarReserva() {
    fetch("http://localhost:3001/consultar_reserva", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ dni }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró la reserva");
        return res.json();
      })
      .then((data) => {
        setReserva(data);
        setNombre(data.dueño.nombre);
        setTelefono(data.dueño.telefono);
        setDia(data.dia);
        setHorario(data.horario);
        setCancha(data.cancha);
        setModoEdicion(false);
        setMostrarMensaje(false);
      })
      .catch(() => {
        setReserva(null);
        setMostrarMensaje(true);
        setMensaje("No se encontró la reserva con el DNI ingresado.");
        setExito(false);
      });
  }

  function guardarCambios() {
    fetch("http://localhost:3001/modificar_reserva", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        dni,
        nombre,
        telefono,
        dia,
        horario,
        cancha,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.mensaje || "Reserva modificada con éxito.");
        setMostrarMensaje(true);
        setModoEdicion(false);
        setExito(true);
      })
      .catch(() => {
        setMensaje("No se pudo modificar la reserva.");
        setMostrarMensaje(true);
      });
  }

  return (
    <div className="contenedor-formulario">
      <h2>Modificar Reserva</h2>
      <div className="formulario">
        <div className="campo">
          <label htmlFor="dni">Ingrese su DNI:</label>
          <input
            id="dni"
            type="text"
            className="input"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
      </div>
      <button onClick={buscarReserva} className="btn-confirmar btn"> Buscar Reserva </button>

      

      {reserva && (
      <>
        <ul className="formulario">
          <li className="campo">
            <label htmlFor="nombre">Nombre y apellido:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              disabled={!modoEdicion}
              onChange={(e) => setNombre(e.target.value)}
            />
          </li>
          <li className="campo">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              id="telefono"
              type="text"
              value={telefono}
              disabled={!modoEdicion}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </li>
          <li className="campo">
            <label htmlFor="fecha">Fecha:</label>
            <input
              id="fecha"
              type="date"
              value={dia}
              disabled={!modoEdicion}
              onChange={(e) => setDia(e.target.value)}
            />
          </li>
          <li className="campo">
            <label htmlFor="horario">Horario:</label>
            <select
              id="horario"
              value={horario}
              disabled={!modoEdicion}
              onChange={(e) => setHorario(e.target.value)}
            >
            <option value="">Seleccionar horario</option>
            <option value="9:00">Turno 1 - 9:00</option>
            <option value="10:30">Turno 2 - 10:30</option>
            <option value="12:00">Turno 3 - 12:00</option>
            <option value="13:30">Turno 4 - 13:30</option>
            <option value="15:00">Turno 5 - 15:00</option>
            <option value="16:30">Turno 6 - 16:30</option>
            <option value="18:00">Turno 7 - 18:00</option>
            <option value="19:30">Turno 8 - 19:30</option>
            <option value="21:00">Turno 9 - 21:00</option>
            <option value="22:30">Turno 10 - 22:30</option>
            </select>
          </li>
          <li className="campo">
            <label htmlFor="cancha">Cancha:</label>
            <select
              id="cancha"
              value={cancha}
              disabled={!modoEdicion}
              onChange={(e) => setCancha(e.target.value)}>
            <option value="">Seleccionar cancha</option>
            {canchaDisponibles.map((disponible, index) => (
                disponible?<option key={index} value={index}>Cancha {index+1}</option>:null
                ))
            }
            </select>
          </li>

        </ul>
        <div className="botonera">
          {modoEdicion ? <button onClick={guardarCambios} className="btn-confirmar btn"> Guardar Cambios </button>
                      : <button onClick={()=>setModoEdicion(true)} className="btn-confirmar btn"> Modificar </button>}
          <button className="btn-denegar btn"> Eliminar </button>
        </div>
        {mostrarMensaje && <div className="contenedor-alerta" id={exito? "exito" : "error"}>{mensaje}</div>}
      </>
    )}
  </div>
  );
}

export default PanelModificar;
