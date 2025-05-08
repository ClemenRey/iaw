import React from 'react';

function AlertaConsultaReserva({ reserva }) {
  if (!reserva) return null;

  

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