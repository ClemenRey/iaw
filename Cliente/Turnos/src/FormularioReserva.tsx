import React, { useState } from 'react';
import { useEffect } from 'react';


function FormularioReserva() {
    const [cancha, setCancha] = useState("");
    const [canchasDisponibles, setCanchaDisponibles] = useState([]);
    const [horario, setHorario] = useState("");
    const [dia, setDia] = useState("");
    
    function consultarCanchas() {
        const url = new URL('http://localhost:3001/canchas_disponibles');
        url.searchParams.append('dia', dia);
        url.searchParams.append('horario', horario);
        fetch(url.toString() , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {

             setCanchaDisponibles(data);
             alert("Este es mi alert data "+data);

        })
    }
    function realizarReserva() {
        const url = new URL('http://localhost:3001/reservar');
        url.searchParams.append('dia', dia);
        url.searchParams.append('horario', horario);
        url.searchParams.append('cancha', cancha);
        let turno = Number(horario)+1
        let canchaSeleccionada = Number(cancha)+1
        if(window.confirm("¿Estas seguro que quieres reservar la cancha " + canchaSeleccionada + " el dia " + dia + " en el turno " + turno + "?")){
            fetch(url.toString() , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(data => {
                    if(data.codigo){
                        alert("Reserva realizada con exito para la cancha " + cancha 
                        + " el dia " + dia + 
                        " a las " + horario + 
                        " para cancelar la reserva guarde el siguiente codigo: "+ data.codigo)
                    }

                })
        }
    }
    return (
        <div className="contenedor-formulario">
            <div className="form-group">
                <label className="label">Fecha: </label>
                <input 
                    type="date"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="horario" className="label">Seleccionar Horario:</label>
                <select 
                    id="horario" 
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                >
                    <option value="">-- Elige un horario --</option>
                    <option value="0">turno 1 - 9:00</option>
                    <option value="1">turno 2 - 10:30</option>
                    <option value="2">turno 3 - 12:00</option>
                    <option value="3">turno 4 - 13:30</option>
                    <option value="4">turno 5 - 15:00</option>
                    <option value="5">turno 6 - 16:30</option>
                    <option value="6">turno 7 - 18:00</option>
                    <option value="7">turno 8 - 19:30</option>
                    <option value="8">turno 9 - 21:00</option>
                    <option value="9">turno 10 - 22:30</option>
                </select>
            </div>
            <div className='form-group'>
                <button onClick={consultarCanchas}>Consultar</button>
            </div>
            <div className="form-group">
                <label htmlFor="cancha" className="label">Seleccionar Cancha:</label>
                <select id="cancha"
                        value={cancha}
                        onChange={(e) => setCancha(e.target.value)}>
                    <option value="">-- Elige una cancha --</option>
                    {canchasDisponibles.map((disponible, index) => (
                        disponible?<option key={index} value={index}>cancha {index+1}</option>:null
                    ))}
                    
                </select>
            </div>
            <div className="form-group">
                <button 
                    onClick={realizarReserva}    
                >Reservar</button>
            </div>
        </div>
    );
}

export default FormularioReserva;