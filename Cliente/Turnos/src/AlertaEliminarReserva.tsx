
const API_URL = process.env.REACT_APP_API_URL;

interface AlertaEliminarReservaProps {
    documento: string;
    mostrarReserva: () => void;
    accionCancelar: () => void;
}

function AlertaEliminarReserva({ documento, mostrarReserva, accionCancelar }: AlertaEliminarReservaProps) {


function confirmarEliminacion() {

    fetch(`${API_URL}/eliminar_reserva`, {

        method : 'POST',
        headers: { "Content-type": "application/json" },
        body : JSON.stringify({

            dni : documento,

        })

    }).then (res => res.json())
    .then(data => {

        mostrarReserva();
       
    });

}
    




return(
<div className="contenedor-alerta">
    <p>Está seguro que quiere eliminar su reserva?</p>
    <div className="botonera">
    <button className="btn btn-confirmar" onClick = {confirmarEliminacion}>Confimar</button>
    <button className="btn btn-denegar" onClick = {accionCancelar}>Cancelar</button>
    </div>
</div>
)


}

export default AlertaEliminarReserva;