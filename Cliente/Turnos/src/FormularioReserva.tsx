import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import  AlertaReserva from './AlertaReserva';


function FormularioReserva() {

    const [cancha, setCancha] = useState("");
    const [canchasDisponibles, setCanchaDisponibles] = useState([]);
    const [horario, setHorario] = useState("");
    const [dia, setDia] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mostrarAlerta , setMostrarAlerta] = useState(false);
    const [mensaje , setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const [botonDeshabilitado , setBotonDeshabilitado] = useState(true);
    const [canchaDeshabilitado , setCanchaDeshabilitado] = useState(false);
    const [fechaDeshabilitada , setFechaDeshabilitada] = useState(false);
    const [horarioDeshabilitado, setHorarioDeshabilitado] = useState(false);
    const [nombreYapellidoDeshabilitado, setNombreYApellidoDeshabilitado] = useState(false);
    const [dniDeshabilitado, setDNIdeshabilitado] = useState(false);
    const [telefonoDeshabilitado , setTelefonoDeshabilitado] = useState(false);

    useEffect (() => {
            if (dia != "" && horario != "") {

            fetch(`/canchas_disponibles` , {
                method : 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    dia : dia,
                    horario : horario
                  }),
            }).then(res => res.json())
            .then(data => {
                setCanchaDisponibles(data);
            }); // Me convierte a objeto de JavaScript la respuesta

        }

    } , [dia, horario]);
    function confirmarReserva() {
        fetch(`/reservar` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                dia : dia,
                horario : horario,
                cancha : cancha,
                nombreYapellido : nombre,
                dni : dni,
                telefono : telefono,

              })
        }).then(res => {

            const data = res.json();
            if (!res.ok) {throw new Error("Error");}
            return data;    
        
        })
            
            .then(data => {
                      
                setMensaje(`${data.mensaje}.`);
                setExito(true);
                setMostrarAlerta(true);
                setDia("");
                setHorario("");
                setCancha("");
                setBotonDeshabilitado(true);
                setCanchaDeshabilitado(true);
                setFechaDeshabilitada(true);
                setHorarioDeshabilitado(true);
                setNombreYApellidoDeshabilitado(true);
                setDNIdeshabilitado(true);
                setTelefonoDeshabilitado(true);
            })
            .catch(() => {
                
                setMensaje("Solo se permite una reserva por DNI");
                setExito(false);
                setMostrarAlerta(true);
            });
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
        <>
        <div className="contenedor-formulario">
            <h2>Reservar Cancha</h2>
            <ul className='formulario'>
                <li className='campo'>
                    <label className="label" htmlFor="fecha">Fecha: </label>
                    <input 
                        id='fecha'
                        type="date"
                        value={dia}
                        disabled = {fechaDeshabilitada}
                        min={obtenerFechaHoy()} // Establecer la fecha mínima como hoy
                        onChange={
                            (e) => {
                            setDia(e.target.value); 
                            if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") {
                                setBotonDeshabilitado(false)};
                            }
                        }
                    />
                </li>
                <li className='campo'>
                    <label htmlFor="horario" className="label">Horario:</label>
                    <select 
                        id="horario" 
                        value={horario}
                        disabled = {horarioDeshabilitado}
                        onChange={(e) => {
                            setHorario(e.target.value);
                            if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") {
                                setBotonDeshabilitado(false)
                            };
                        }}
                    >
                        <option value="">Seleccionar horario</option>
                        <option value="9:00"> Turno 1 - 9:00</option>
                        <option value="10:30">Turno 2 - 10:30</option>
                        <option value="12:00">Turno 3 - 12:00</option>
                        <option value="13:30">Turno 4 - 13:30</option>
                        <option value="15:00">Turno 5 - 15:00</option>
                        <option value="16.30">Turno 6 - 16:30</option>
                        <option value="18:00">Turno 7 - 18:00</option>
                        <option value="19:30">Turno 8 - 19:30</option>
                        <option value="21:00">Turno 9 - 21:00</option>
                        <option value="22:30">Turno 10 - 22:30</option>
                    </select> 
                </li>
                <li className='campo'>
                    <label htmlFor="cancha" className="label" >Seleccionar Cancha:</label>
                    <select id="cancha"
                            value={cancha}
                            disabled = {canchaDeshabilitado}
                            onChange={
                                (e) => {
                                    setCancha(e.target.value);
                                    if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") {
                                        setBotonDeshabilitado(false);
                                    }
                                }}
                        >
                        <option value="">Seleccionar cancha</option>
                        {canchasDisponibles.map((disponible, index) => (
                            disponible?<option key={index} value={index+1}>Cancha {index+1}</option>:null
                        ))}
                    </select>    
                </li>
                <li><label id ="aclaracion">*Las canchas que aparecen son aquellas disponibles para la hora y fecha elegidas</label></li>
                <li className='campo'>
                    <label htmlFor='nombre'>Nombre y apellido: </label>
                    <input id='nombre' type="text" value={nombre} disabled = {nombreYapellidoDeshabilitado} onChange={
                        (e)=>{
                            setNombre(e.target.value);
                            if (e.target.value != "" && horario != "" && cancha != "" && dni != "" && telefono != "") {
                                setBotonDeshabilitado(false)}; 
                        
                        }    
                    }
                    >
                    </input>
                </li>
                <li className='campo'>
                    <label htmlFor="dni">DNI:</label> 
                    <input
                        id="dni"
                        type="text" 
                        value={dni} 
                        disabled ={dniDeshabilitado} 
                        onChange={
                            (e)=>{
                                
                                setDni(e.target.value);
                                if (e.target.value != "" && horario != "" && cancha != "" && nombre != "" && telefono != ""){
                                    setBotonDeshabilitado(false)}; 
                            }
                        }
                    ></input>
                </li>
                <li className='campo'>
                    <label htmlFor='telefono'>Teléfono: </label>
                    <input 
                        id='telefono'
                        type="text"
                        value={telefono} 
                        disabled = {telefonoDeshabilitado} 
                        onChange={
                            (e)=>{

                                setTelefono(e.target.value);
                                if (e.target.value != "" && horario != "" && cancha != "" && dni != "" && nombre != "") setBotonDeshabilitado(false); 
                            
                            }
                        }
                    ></input>   
                </li>
            </ul>
            <button 
                disabled = {botonDeshabilitado}
                className="btn-confirmar btn"
                onClick={confirmarReserva}
            > 
                Confirmar reserva
            </button>
            { mostrarAlerta && <AlertaReserva
                mensaje={mensaje}
                exito={exito}
                onClose={
                    () => {
                        setMostrarAlerta(false)
                        setFechaDeshabilitada(false);
                        setHorarioDeshabilitado(false);
                        setCanchaDeshabilitado(false);
                        setNombreYApellidoDeshabilitado(false);
                        setDNIdeshabilitado(false);
                        setTelefonoDeshabilitado(false);
                        setNombre("");
                        setDni("");
                        setTelefono(""); 
                    }
                }   
                />  
            }
        </div>
                   
        </>
                     
    );
}

export default FormularioReserva;