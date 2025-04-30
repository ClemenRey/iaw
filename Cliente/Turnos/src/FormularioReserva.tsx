import React, { useState } from 'react';
import { useEffect } from 'react';
import './FormularioReserva.css';
import  AlertaReserva from './AlertaReserva';


function FormularioReserva() {

    const [cancha, setCancha] = useState("");
    const [canchasDisponibles, setCanchaDisponibles] = useState([]);
    const [horario, setHorario] = useState("");
    const [dia, setDia] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [visilidadInputs, setVisibilidadInputs] = useState("hidden");
    const [mostrarAlerta , setMostrarAlerta] = useState(false);
    const [mensaje , setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const [botonDeshabilitado , setBotonDeshabilitado] = useState(true);
   

    const [visilidadConfirmar, setVisibilidadConfirmar] = useState("hidden");
    const [visibilidadCanchas, setVisibilidadCanchas] = useState("hidden");
    const [visibilidadReservar, setVisibilidadReservar] = useState("hidden");
    

   
   
    /*useEffect(() => {

        alert("Entré a useEffect de botón confirmar")    
        if (dia != "" && horario != "" && cancha != "") setFormularioValido(true);

    } , [dia,horario,cancha]);*/
   
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


                setCanchaDisponibles(data);
                setVisibilidadCanchas("visible");
                setVisibilidadReservar("visible");
                
            }); // Me convierte a objeto de JavaScript la respuesta

        }

    } , [dia, horario]);





    /*function consultarCanchas() {
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
    }*/


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

        fetch('http://localhost:3001/reservar' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                dia : dia,
                horario : horario,
                cancha : cancha
              })
        }).then(res => {

            const data = res.json();
            if (!res.ok) {throw new Error("Error en la reserva")}
            return data;    
        
        })
            //TODO: MOSTRAR CONFIRMACION DE RESERVA
            .then(data => {
                
                console.log(data); //Reserva realizada con éxito
                
                setMensaje(`${data.mensaje}. Su código de reserva es  ${data.codigo} . Puede consultar su reserva haciendo click en Consultar mi reserva`);
                setExito(true);
                setMostrarAlerta(true);
                //Resetear los campos y deshabilitar el botón de confirmar
                setDia("");
                setHorario("");
                setCancha("");
                setBotonDeshabilitado(true);

            })
            .catch(() => {

                setMensaje(`No pudo realizarse la reserva. Complete todos los campos`);
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
            <div className="form-group">
                <label className="label">Fecha: </label>
                <input 
                    type="date"
                    value={dia}
                    min={obtenerFechaHoy()} // Establecer la fecha mínima como hoy
                    onChange={
                        
                        (e) => {
                        setDia(e.target.value); 
                        if (e.target.value != "" && horario != "" && cancha != "") setBotonDeshabilitado(false); 
                    
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="horario" className="label">Horario:</label>
                <select 
                    id="horario" 
                    value={horario}
                    onChange={(e) => {

                        setHorario(e.target.value);
                        if (dia != "" && e.target.value != "" && cancha != "") setBotonDeshabilitado(false); 
                    
                    }}
                >
                    <option value="">Seleccionar horario</option>
                    <option value="0">Turno 1 - 9:00</option>
                    <option value="1">Turno 2 - 10:30</option>
                    <option value="2">Turno 3 - 12:00</option>
                    <option value="3">Turno 4 - 13:30</option>
                    <option value="4">Turno 5 - 15:00</option>T                    <option value="5">Turno 6 - 16:30</option>
                    <option value="6">Turno 7 - 18:00</option>
                    <option value="7">Turno 8 - 19:30</option>
                    <option value="8">Turno 9 - 21:00</option>
                    <option value="9">Turno 10 - 22:30</option>
                </select>
            </div>
           
            <div className="form-group">
                <label htmlFor="cancha" className="label">Seleccionar Cancha:</label>
                <select id="cancha"
                        value={cancha}
                        onChange={

                            (e) => {

                                setCancha(e.target.value);
                                if (dia != "" && horario != "" && e.target.value != "") setBotonDeshabilitado(false);

                            }}>
                    <option value="">Seleccionar cancha</option>
                    {canchasDisponibles.map((disponible, index) => (
                        disponible?<option key={index} value={index}>Cancha {index+1}</option>:null
                    ))}
                    
                </select>
            </div>
            <label id ="aclaracion">*Las canchas que aparecen son aquellas disponibles para la hora y fecha elegidas</label>
            <div className="form-group" id={visilidadInputs}>
                <label >Ingrese su nombre: </label>
                <input type="text" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}></input>
            </div>
            <div className="form-group" id={visilidadInputs}>
                <label>Ingrese su DNI: </label>
                <input type="text" value={dni} onChange={(e)=>{setDni(e.target.value)}}></input>
            </div>
            <div className="form-group" id={visilidadInputs}>
                <label>Ingrese su telefono: </label>
                <input type="text"value={telefono} onChange={(e)=>{setTelefono(e.target.value)}}></input>
            </div>
            <div className="form-group">
            
            </div>
            <button 

                    disabled = {botonDeshabilitado}
                    className="btn-confirmar"
                    onClick={confirmarReserva}
                > Confirmar reserva</button>
        </div>

        { mostrarAlerta && <AlertaReserva
        mensaje={mensaje}
        exito={exito}
        onClose={() => setMostrarAlerta(false)}   

        />  }
        
        </>
                     
    );
}

export default FormularioReserva;