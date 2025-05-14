

 function AlertaReserva({ mensaje, exito, onClose }: { mensaje: string; exito: boolean; onClose: () => void }) {
    return (
      <div className="contenedor-alerta" id={exito ? "exito" : "error"}>
        <p id={exito ? "exito" : "error"}>{mensaje}</p>
        <button className="btn" onClick={onClose}>Cerrar</button>
      </div>
    );
  }

  export default AlertaReserva;
  