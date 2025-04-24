/*Servidor en Express que se encargará de responder las peticiones del frontend*/


const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors()); // habilita todas las solicitudes desde cualquier origen


app.use(express.json());

/*Arreglos de 10 lugares, cada lugar representa un turno posible. Durante el día hay 10 turnos
Turno 1 --> 8 - 9:30 
Turno 2 --> 9:30 - 10
etc
*/ 
let cancha_1 = new Array(10).fill(0);
let cancha_2 = new Array(10).fill(0);
let cancha_3 = new Array(10).fill(0);



/*Endpoint que responde a la reserva de un turno*/ 
app.post('/reservar' , (req,rest) => {

/*Agregar la reserva al arreglo*/


});


/*Endopoint para traer los horarios disponibles de la cancha seleccionada*/
app.post('/horarios_disponibles' , (req,res) => {

    console.log("Entré a horarios_disponibles");
    const cancha = req.body.cancha; // Obtengo la cancha como un string
    res.json(cancha_1); // Devuelvo el arreglo booleano de la cancha 1
    


});




const PORT = process.env.PORT || 3001; // Esucha en puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 