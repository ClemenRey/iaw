/*Servidor en Express que se encargará de responder las peticiones del frontend*/


const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors()); // habilita todas las solicitudes desde cualquier origen


app.use(express.json());
 
let fechas = new Map();
let reservas = new Map();

/*Endpoint que responde a la reserva de un turno*/ 
app.post('/reservar' , (req,res) => {
  dia = req.query.dia; // Dia seleccionado
  horario = req.query.horario; // Horario seleccionado 
  cancha = req.query.cancha; // Cancha seleccionada
  //TODO AGREGAR LOS DATOS A LA RESERVA
  if (!dia || !horario || !cancha) {
    return res.status(400).json({ error: "Faltan parámetros 'dia', 'horario' o 'cancha'" });
  }else{
    if(fechas.has(dia)){
      if(fechas.get(dia)[horario][cancha]){ // Si la cancha seleccionada está disponible
        fechas.get(dia)[horario][cancha] = false; // La cancha ya no está disponible
        let codigo = Math.floor(Math.random() * 1000); // Genero un código aleatorio para la reserva
        while(reservas.has(codigo)){ // Si el código ya existe, genero otro
          codigo = Math.floor(Math.random() * 1000);
        }
        console.log("el codigo es: " + codigo); // no sacar porque sino sale undefined xdxd
        let reserva = {cancha: cancha, 
                       dia: dia,
                       horario: horario}; // Creo la reserva
        reservas.set(codigo, reserva); // Agrego la reserva al mapa de reservas
        res.json({ mensaje: "Reserva realizada con éxito" 
                , codigo: codigo}); // Devuelvo el código de la reserva 
      }
    }
  }
/*Agregar la reserva al arreglo*/


});
//TODO hacer endpoint eliminar
app.post('/eliminar_reserva', (req, res) => {});


/*Endopoint para traer los horarios disponibles de la cancha seleccionada*/
app.get('/canchas_disponibles' , (req,res) => {
    dia = req.query.dia; // Dia seleccionado
    horario = req.query.horario; // Horario seleccionado
    if (!dia || !horario) {
      return res.status(400).json({ error: "Faltan parámetros 'dia' o 'horario'" });
    }
    if(!fechas.has(dia)){ // Si el dia no existe en el mapa, lo seteo todo disponible
        fechas.set(dia, new Array(10).fill(new Array(3).fill(true)));
        res.json(fechas.get(dia)[horario]);
    }
    else{ // Si el dia existe, devuelvo el arreglo de la fecha seleccionada
        res.json(fechas.get(dia)[horario]);
    }

});




const PORT = process.env.PORT || 3001; // Esucha en puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 