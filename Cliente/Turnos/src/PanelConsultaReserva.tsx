import { useState } from "react";

import AlertaConsultaReserva from './AlertaConsultaReserva'
import './index.css';

function PanelConsultaReserva() {

    const [dni, setDNI] = useState("");
    const [consulto, setConsulto] = useState(false);
    const [datos, setDatos] = useState(null);

    function consultar() {

        //alert("Probando");
        
        fetch('http://localhost:3001/consultar_reserva' , {

            method : 'POST',
            headers: {'Content-type' : 'application/json'},
            body : JSON.stringify({

                dni : dni,

            })
           
        }).then( (res) =>{
            if (!res.ok) {throw new Error('Network response was not ok');}
            return res.json();
        }
        
        )
        .then((data) => {

                //Alert por ahora nomás
                setDatos(data);
                setConsulto(true);
                /*alert(`Dueño de la reserva: ${data.dueño.nombre}`);
                alert(`Dia de la reserva: ${data.dia}`);
                alert(`Horario de la reserva: ${data.horario}`);
                alert(`Cancha reservada: ${data.cancha}`);*/

            
            
        }).catch(

            (() => {            
                alert("No se encontró la reserva con el DNI ingresado");
                setConsulto(true);
                //Acá 
            })


        ); 


    }

    return(

    <>   
    <div className="contenedor-formulario">
        <h2>Consulta de reserva</h2>
        <div className="formulario">
            <div className="campo">
                <label>Ingrese su DNI</label>
                <input onChange={(e) => setDNI(e.target.value)}></input>
            </div>
        </div>
        <button className="btn-confirmar" onClick = {consultar}>Consultar</button>
        {consulto && <AlertaConsultaReserva reserva = {datos}></AlertaConsultaReserva>}
    </div>
    </>
    
    );

  

}

export default PanelConsultaReserva;