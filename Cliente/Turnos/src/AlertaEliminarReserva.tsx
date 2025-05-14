


function AlertaEliminarReserva({ documento , mostrarReserva }) {


function confirmarEliminacion() {

    fetch("http://localhost:3001/eliminar_reserva", {

        method : 'POST',
        headers: { "Content-type": "application/json" },
        body : JSON.stringify({

            dni : documento,

        })

    }).then (res => res.json())
    .then(data => {

        alert(data.mensaje);
        mostrarReserva();
        


    });

}
    




return(
<div className="contenedor-alerta">
    <p>Está seguro que quiere eliminar su reserva?</p>
    <div>
    <button className="btn btn-confirmar" onClick = {confirmarEliminacion}>Confimar</button>
    <button className="btn btn-denegar">Cancelar</button>
    </div>
</div>
)


}

export default AlertaEliminarReserva;