import { useState } from "react";

import AlertaConsultaReserva from './AlertaConsultaReserva'
import './index.css';


function PanelConsultaReserva() {

    const [dni, setDNI] = useState("");
    const [consulto, setConsulto] = useState(false);
    const [datos, setDatos] = useState(null);

    function consultar() {

        
        setDatos(null)
        fetch(`/consultar_reserva` , {

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

                setDatos(data);
                setConsulto(true);
            
        }).catch(

            (() => {     

                setConsulto(true);
                
            })


        ); 


    }

    return(

    <>   
    <div className="contenedor-formulario">
        <h2>Consulta de reserva</h2>
        <div className="formulario">
            <div className="campo">
                <label htmlFor="dni">Ingrese su DNI:</label>
                <input id='dni' onChange={(e) => setDNI(e.target.value)}></input>
            </div>
        </div>
        <button className="btn-confirmar btn" onClick = {consultar}>Buscar Reserva</button>
        {consulto && <AlertaConsultaReserva reserva = {datos}></AlertaConsultaReserva>}
    </div>
    </>
    
    );

  

}

export default PanelConsultaReserva;