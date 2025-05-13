import { useState } from "react";
import { useEffect } from "react";
import './index.css';
import AlertaEliminarReserva from "./AlertaEliminarReserva";

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
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [canchaDisponibles, setCanchaDisponibles] = useState([]);
  const [eliminar, setEliminar] = useState(false);


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
        setCancha(data.cancha); // Viene un 1 del back
        setModoEdicion(false);
        setMostrarMensaje(false);
      })
      .catch(() => {
        setReserva(null);
        setMostrarMensaje(true);
        setMensaje("No se encontró la reserva con el DNI ingresado.");
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
      .then((res) => {
         if (!res.ok) {throw new Error();} // Con esto salto al catch
        res.json();
      
      })
      .then((data) => {

        setMensaje("Reserva modificada con éxito.");
        setMostrarMensaje(true);
        setModoEdicion(false);
      })
      .catch(() => {
        setMensaje("La cancha no se encuentra disponible");
        setMostrarMensaje(true);
      });
  }

  return (
    <div className="contenedor-formulario">
      <h2>Modificar Reserva</h2>
      <div className="formulario">
        <div className="campo">
          <label className="label">Ingrese DNI:</label>
          <input
            type="text"
            className="input"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
      </div>
      <button onClick={buscarReserva} className="btn-confirmar btn"> Buscar Reserva </button>

      {mostrarMensaje && <div className="mensaje">{mensaje}</div>}

      {reserva && (
      <>
        <ul className="formulario">
          <li className="campo">
            <label>Nombre y apellido:</label>
            <input
              type="text"
              value={nombre}
              disabled={!modoEdicion}
              onChange={(e) => setNombre(e.target.value)}
            />
          </li>
          <li className="campo">
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              disabled={!modoEdicion}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </li>
          <li className="campo">
            <label>Fecha:</label>
            <input
              type="date"
              value={dia}
              disabled={!modoEdicion}
              onChange={(e) => setDia(e.target.value)}
            />
          </li>
          <li className="campo">
            <label>Horario:</label>
            <select
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
            <label>Cancha:</label>
            <select
              value= {cancha} 
              disabled={!modoEdicion} // Acá se activan los campos 
              onChange={(e) => {
              setCancha(e.target.value); //string
              console.log(canchaDisponibles);
              }}>

                {
                 modoEdicion ? (
                 canchaDisponibles.map((disponible, index) => (
                            disponible?<option key={index} value={index+1}>Cancha {index+1}</option> : null))) 
                            : 
                            (<option value={cancha}> Cancha {cancha}</option>)
                }
            </select>
          </li>

        </ul>
        <div className="botonera">
          {modoEdicion ? <button onClick={guardarCambios} className="btn-confirmar btn"> Guardar Cambios </button>
                      : <button onClick={()=>setModoEdicion(true)} className="btn-confirmar btn"> Modificar </button>}
          <button className="btn-denegar btn" onClick = {() => setEliminar(true)}> Eliminar reserva</button>
        </div>
      </>
    )}

    {eliminar && <AlertaEliminarReserva documento={dni} ></AlertaEliminarReserva>

    }

  </div>
  );
}

export default PanelModificar;
