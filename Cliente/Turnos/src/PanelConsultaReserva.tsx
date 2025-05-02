import { useState } from "react";

function PanelConsultaReserva() {

    const [dni, setDNI] = useState("");

    function consultar() {

        alert("Probando");
        
        fetch('http://localhost:3001/consultar_reserva' , {

            method : 'POST',
            headers: {'Content-type' : 'application/json'},
            body : JSON.stringify({

                dni : dni,

            })
           
        }).then(res => res.json())
        .then(data => {

                //Alert por ahora nomás
                alert(`Dueño de la reserva: ${data.dueño.nombre}`);
                alert(`Dia de la reserva: ${data.dia}`);
                alert(`Horario de la reserva: ${data.horario}`);
                alert(`Cancha reservada: ${data.cancha}`);
            
            
        }); 


    }

    return(

    <>   
    <div>
        <input onChange={(e) => setDNI(e.target.value)}></input>
        <button onClick = {consultar}>Consultar</button>
    </div>
    </>
    );

  

}

export default PanelConsultaReserva;