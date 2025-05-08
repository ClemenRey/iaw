import React, { useState } from 'react';
import { useEffect } from 'react';
import './FormularioReserva.css';
import  AlertaReserva from './AlertaReserva';
import PanelConsultaReserva from './PanelConsultaReserva';



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
    const [canchaDeshabilitado , setCanchaDeshabilitado] = useState(false);
    const [fechaDeshabilitada , setFechaDeshabilitada] = useState(false);
    const [horarioDeshabilitado, setHorarioDeshabilitado] = useState(false);
    const [nombreYapellidoDeshabilitado, setNombreYApellidoDeshabilitado] = useState(false);
    const [dniDeshabilitado, setDNIdeshabilitado] = useState(false);
    const [telefonoDeshabilitado , setTelefonoDeshabilitado] = useState(false);
    const [consultarReserva , setConsultarReserva] = useState(false);
    const[dniCancelar , setDNICancelar] = useState("");
   

    const [visilidadConfirmar, setVisibilidadConfirmar] = useState("hidden");
    const [visibilidadCanchas, setVisibilidadCanchas] = useState("hidden");
    const [visibilidadReservar, setVisibilidadReservar] = useState("hidden");
    


   
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

    function cancelarReserva() {

        /*Recuperar el dni de por ahí y mandarlo al back*/
        fetch('http://localhost:3001/cancelar_reserva' , {

            method : 'POST',
            headers: {'Content-type' : 'application/json'},
            body : JSON.stringify({

                dni : dniCancelar
            })
        
        }).then(res => res.json())
        .then(data => {

            alert(data.mensaje);

        })
  
  
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

        fetch('http://localhost:3001/reservar' , {
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
            if (!res.ok) {throw new Error("Error en la reserva")}
            return data;    
        
        })
            //TODO: MOSTRAR CONFIRMACION DE RESERVA
            .then(data => {
                
                console.log(data); //Reserva realizada con éxito
                
                setMensaje(`${data.mensaje}.Puede consultar su reserva haciendo click en Consultar mi reserva`);
                setExito(true);
                setMostrarAlerta(true);
                //Resetear los campos y deshabilitar el botón de confirmar
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
                    disabled = {fechaDeshabilitada}
                    min={obtenerFechaHoy()} // Establecer la fecha mínima como hoy
                    onChange={
                        
                        (e) => {
                        setDia(e.target.value); 
                        if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") setBotonDeshabilitado(false);

                    
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="horario" className="label">Horario:</label>
                <select 
                    id="horario" 
                    value={horario}
                    disabled = {horarioDeshabilitado}
                    onChange={(e) => {

                        setHorario(e.target.value);
                        if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") setBotonDeshabilitado(false);

                    
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
            </div>
           
            <div className="form-group">
                <label htmlFor="cancha" className="label" >Seleccionar Cancha:</label>
                <select id="cancha"
                        value={cancha}
                        disabled = {canchaDeshabilitado}
                        onChange={

                            (e) => {

                                setCancha(e.target.value);
                                if (dia != "" && horario != "" && e.target.value != "" && nombre != "" && dni != "" && telefono != "") setBotonDeshabilitado(false);

                            }}>
                    <option value="">Seleccionar cancha</option>
                    {canchasDisponibles.map((disponible, index) => (
                        disponible?<option key={index} value={index}>Cancha {index+1}</option>:null
                    ))}
                    
                </select>
            </div>
            <label id ="aclaracion">*Las canchas que aparecen son aquellas disponibles para la hora y fecha elegidas</label>
            <div className="label" /*id={visilidadInputs}*/>
                <label >Nombre y apellido: </label>
                <input type="text" value={nombre} disabled = {nombreYapellidoDeshabilitado} onChange={
                    
                    (e)=>{
                        setNombre(e.target.value);
                        if (e.target.value != "" && horario != "" && cancha != "" && dni != "" && telefono != "") setBotonDeshabilitado(false); 
                    
                    }
                    
                    }></input>
            </div>
            <div className="label" /*id={visilidadInputs}*/>
                <label>DNI: </label>
                <input type="text" value={dni} disabled ={dniDeshabilitado} onChange={
                    
                    (e)=>{
                        
                        setDni(e.target.value);
                        if (e.target.value != "" && horario != "" && cancha != "" && nombre != "" && telefono != "") setBotonDeshabilitado(false); 
                    
                    }
                    
                    }></input>
            </div>
            <div className="label" /*id={visilidadInputs}*/>
                <label>Teléfono: </label>
                <input type="text"value={telefono} disabled = {telefonoDeshabilitado} onChange={

                    (e)=>{

                        setTelefono(e.target.value);
                        if (e.target.value != "" && horario != "" && cancha != "" && dni != "" && nombre != "") setBotonDeshabilitado(false); 
                    
                    }
                    
                    }></input>
            </div>
            <div className="label">
            
            </div>
            <button 

                    disabled = {botonDeshabilitado}
                    className="btn-confirmar"
                    onClick={confirmarReserva}
                > Confirmar reserva</button>


            <button className = "btn-confirmar" onClick = {()=> setConsultarReserva(true)}>Ver mi reserva</button>
            <button className="btn-confirmar" onClick = {cancelarReserva}>Cancelar reserva</button>  
            <input type = "text" onChange={(e) => setDNICancelar(e.target.value)}></input>
        </div>
                   


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


            }
        }   

        />  }

        {
            consultarReserva && <PanelConsultaReserva></PanelConsultaReserva>
        }
        
        </>
                     
    );
}

export default FormularioReserva;