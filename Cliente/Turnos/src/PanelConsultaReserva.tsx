import { useState } from "react";

import AlertaConsultaReserva from './AlertaConsultaReserva'



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
    <div>
        <label>Ingrese su DNI</label>
        <input onChange={(e) => setDNI(e.target.value)}></input>
        <button onClick = {consultar}>Consultar</button>
    </div>

        
    {

    consulto && <AlertaConsultaReserva reserva = {datos}></AlertaConsultaReserva>

    }
    </>
    
    );

  

}

export default PanelConsultaReserva;