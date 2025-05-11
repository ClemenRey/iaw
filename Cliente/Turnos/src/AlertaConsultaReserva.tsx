
function AlertaConsultaReserva({ reserva }) {

  if (reserva == null) return (

      <div className='contenedor-alerta' id="error">
        <h2 className="titulo-alerta">Reserva no encontrada</h2>
        <p>No se encontraron reservas para el DNI ingresado.
        <br />
        Por favor, verifique el DNI o intente nuevamente.
        <br />
        Si el problema persiste, comuníquese con el administrador.</p> 

      </div>



  )

  else

  

  return (
    <div className="contenedor-alerta" id="exito">
      <h2 className="titulo-alerta">Reserva encontrada</h2>
      <p>
        Nombre: {reserva.dueño.nombre}
        <br />
        Fecha: {reserva.dia}
        <br />
        Hora: {reserva.horario}
        <br />
        Cancha: {reserva.cancha}
      </p>
    </div>
  );
}

export default AlertaConsultaReserva;