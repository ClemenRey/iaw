import React from 'react';

function AlertaConsultaReserva({ reserva }) {

  if (reserva == null) return (

      <div>
        <h2 className="text-xl font-semibold text-red-600 mb-4">Reserva no encontrada</h2>
        <p className="text-gray-700">No se encontraron reservas para el DNI ingresado.</p>
        <p className="text-gray-700">Por favor, verifique el DNI o intente nuevamente.</p>
        <p className="text-gray-700">Si el problema persiste, comuníquese con el administrador.</p> 

      </div>



  )

  else

  

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-semibold text-green-600 mb-4">Reserva encontrada</h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-700">Nombre:</span> {reserva.dueño.nombre}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Fecha:</span> {reserva.dia}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Hora:</span> {reserva.horario}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Cancha:</span> {reserva.cancha}
        </div>
        
      </div>
    </div>
  );
}

export default AlertaConsultaReserva;