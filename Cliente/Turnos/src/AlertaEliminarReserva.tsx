


function AlertaEliminarReserva({ documento }) {


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


    });

}
    




return(
<div>
<p>Está seguro que quiere eliminar su reserva?</p>
<button onClick = {confirmarEliminacion}>Confimar</button>
<button>Cancelar</button>
</div>
)


}

export default AlertaEliminarReserva;