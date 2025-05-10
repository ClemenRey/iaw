import { useState } from "react";
import { useEffect } from "react";

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
      })
      .catch(() => {
        setMensaje("No se pudo modificar la reserva.");
        setMostrarMensaje(true);
      });
  }

  return (
    <div className="contenedor-formulario">
      <div className="form-group">
        <label className="label">Ingrese DNI:</label>
        <input
          type="text"
          className="input"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <button onClick={buscarReserva} className="btn-confirmar">
          Buscar Reserva
        </button>
      </div>

      {mostrarMensaje && <div className="mensaje">{mensaje}</div>}

      {reserva && (
        <div className="formulario-reserva">
          <div className="form-group">
            <label>Nombre y apellido:</label>
            <input
              type="text"
              value={nombre}
              disabled={!modoEdicion}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              disabled={!modoEdicion}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              value={dia}
              disabled={!modoEdicion}
              onChange={(e) => setDia(e.target.value)}
            />
          </div>
          <div className="form-group">
          <div className="form-group">
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
</div>

          </div>
          <div className="form-group">
            <label>Cancha:</label>
            <select
              value={cancha}
              disabled={!modoEdicion}
              onChange={(e) => setCancha(e.target.value)}>
            <option value="">Seleccionar cancha</option>
                    {canchaDisponibles.map((disponible, index) => (
                        disponible?<option key={index} value={index}>Cancha {index+1}</option>:null
                    ))}
                    




              </select>
          </div>

          {!modoEdicion ? (
            <button onClick={() => setModoEdicion(true)} className="btn-confirmar">
              Modificar
            </button>
          ) : (
            <button onClick={guardarCambios} className="btn-confirmar">
              Guardar Cambios
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PanelModificar;
