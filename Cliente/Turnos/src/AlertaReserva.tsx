

 function AlertaReserva({ mensaje, exito, onClose }) {
    return (
      <div
        className="contenedor-formulario alerta-reserva"
        style={{
          borderColor: exito ? "green" : "red",
          backgroundColor: exito ? "#e6ffe6" : "#ffe6e6",
          color: exito ? "green" : "red",
        }}
      >
        <p>{mensaje}</p>
        <button className="btn-confirmar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  }

  export default AlertaReserva;
  