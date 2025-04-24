import React, { useEffect, useState } from 'react';

const PanelReserva = () => {
  const [cancha, setCancha] = useState("");
  const [horario, setHorario] = useState("");

  const reservar = () => {
    alert(`Reserva realizada para ${cancha} a las ${horario}.`);
  };

  const eliminar = () => {
    alert('Reserva eliminada.');
  };

  const consultar = () => {
    alert('Consultando reserva...');
  };

  const irAStore = () => {
    window.location.href = '/store';
  };


  /*useEffect() para traer horarios disponibles de la cancha seleccionada. Se activa cuando cambia la cancha*/
  useEffect(() => {

            fetch('http://localhost:3001/horarios_disponibles' , {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify( {cancha})
            }).then(res => res.json())
            .then(data => {

                /*Pongo los horarios disponibles en la lista desplegable de horarios*/
                alert("Este es mi alert data "+data);

            })




  }, [cancha]);


  return (
    <div style={styles.container}>
      <h2>Reservar Cancha</h2>

      <label htmlFor="cancha" style={styles.label}>Seleccionar Cancha:</label>
      <select
        id="cancha"
        value={cancha}
        onChange={(e) => setCancha(e.target.value)} // Cuando cambia el seleccionado, se cambia el estado
        style={styles.select}
      >
        <option value="">-- Elige una cancha --</option>
        <option value="Cancha 1">Cancha 1</option>
        <option value="Cancha 2">Cancha 2</option>
        <option value="Cancha 3">Cancha 3</option>
      </select>

      <label htmlFor="horario" style={styles.label}>Seleccionar Horario:</label>
      <select
        id="horario"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Elige un horario --</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
      </select>

      <button onClick={reservar} style={styles.buttonPrimary}>Reservar</button>
      <button onClick={eliminar} style={{ ...styles.button, ...styles.buttonDanger }}>Eliminar Reserva</button>
      <button onClick={consultar} style={{ ...styles.button, ...styles.buttonSecondary }}>Consultar Reserva</button>
      <button onClick={irAStore} style={{ ...styles.button, ...styles.buttonStore }}>Ir al Store</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    margin: '10px 0 5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
  },
  buttonStore: {
    backgroundColor: '#28a745',
  },
};

export default PanelReserva;
