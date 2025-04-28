import React, { useState } from 'react';
import { useEffect } from 'react';
import './FormularioReserva.css';


function FormularioReserva() {
    const [cancha, setCancha] = useState("");
    const [canchasDisponibles, setCanchaDisponibles] = useState([]);
    const [horario, setHorario] = useState("");
    const [dia, setDia] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [visilidadInputs, setVisibilidadInputs] = useState("hidden");
    const [visilidadConfirmar, setVisibilidadConfirmar] = useState("hidden");
    const [visibilidadCanchas, setVisibilidadCanchas] = useState("hidden");
    const [visibilidadReservar, setVisibilidadReservar] = useState("hidden");
    
    function consultarCanchas() {
        if(dia === "" || horario === ""){
            return
        }else{
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
                alert("Este es mi alert data " + data);

                })
            setVisibilidadCanchas("visible");
            setVisibilidadReservar("visible");
        }
    }
    function realizarReserva() {
        if (nombre === "" || dni === "" || telefono === "") {
            setVisibilidadInputs("visible");
            alert("Por favor complete todos los campos");
            return;
        }else{
            setVisibilidadConfirmar("visible");
        }
    }
    function confirmarReserva() {
        const url = new URL('http://localhost:3001/reservar');
        url.searchParams.append('dia', dia);
        url.searchParams.append('horario', horario);
        url.searchParams.append('cancha', cancha);
        let turno = Number(horario)+1
        let canchaSeleccionada = Number(cancha)+1
        fetch(url.toString() , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            //TODO: MOSTRAR CONFIRMACION DE RESERVA
            .then(data => {console.log(data)})
        

    }

    // Obtener la fecha actual en formato YYYY-MM-DD
    const obtenerFechaHoy = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <div className="contenedor-formulario">
            <div className="form-group">
                <label className="label">Fecha: </label>
                <input 
                    type="date"
                    value={dia}
                    min={obtenerFechaHoy()} // Establecer la fecha mínima como hoy
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
            <div className="form-group" id={visibilidadCanchas}>
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
            <div className="form-group" id={visilidadInputs}>
                <label >ingrese su nombre: </label>
                <input type="text" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}></input>
            </div>
            <div className="form-group" id={visilidadInputs}>
                <label>ingrese su DNI: </label>
                <input type="text" value={dni} onChange={(e)=>{setDni(e.target.value)}}></input>
            </div>
            <div className="form-group" id={visilidadInputs}>
                <label>ingrese su telefono: </label>
                <input type="text"value={telefono} onChange={(e)=>{setTelefono(e.target.value)}}></input>
            </div>
            <div className="form-group">
                <button
                    id={visibilidadReservar}
                    onClick={realizarReserva}    
                >Reservar</button>
                <button 
                    className="btn-confirmar"
                    id ={visilidadConfirmar}
                    onClick={confirmarReserva}
                > Confirmar reserva</button>
            </div>
        </div>
    );
}

export default FormularioReserva;