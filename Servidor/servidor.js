/*Servidor en Express que se encargará de responder las peticiones del frontend*/


const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors()); 


app.use(express.json());
 
let fechas = new Map(); 

/* Mapea fechas a un arreglo de horarios. Luego para cada componente del arreglo
tiene las canchsa disponibles*/

let reservas = new Map();

function horarioANumero(hora) {

  let retornar;

    switch(hora) {

      case "9:00" : {retornar = 0; break}
      case "10:30" : {retornar = 1 ; break}
      case "12:00" : {retornar = 2 ; break}
      case "13:30" : {retornar = 3 ; break}
      case "15:00" : {retornar = 4 ; break}
      case "16:30" : {retornar = 5 ; break}
      case "18:00" : {retornar = 6 ; break}
      case "19:30" : {retornar = 7 ; break}
      case "21:00" : {retornar = 8 ; break}     
      case  "22:30" : {retornar = 9 ; break}
      
    }

    return retornar;

}

/*Endpoint que responde a la reserva de un turno*/ 
app.post('/reservar' , (req,res) => {


  dia = req.body.dia; 
  horarioString = req.body.horario; 
  horarioArrreglo = horarioANumero(horarioString);
  cancha = parseInt(req.body.cancha,10); 
  nombreYapellido = req.body.nombreYapellido; 
  dni = req.body.dni;
  telefono = req.body.telefono;

  if (reservas.has(dni)) {

     return res.status(400).json({mensaje : "Solo se permite una sola reserva por DNI"});
  }
  
  
  
    if(fechas.has(dia)){

      if (fechas.get(dia)[horarioArrreglo][cancha-1])
        { // Si la cancha seleccionada está disponible
          fechas.get(dia)[horarioArrreglo][cancha-1] = false; // La cancha ya no está disponible 
          let codigo = Math.floor(Math.random() * 1000); // Genero un código aleatorio para la reserva
          while(reservas.has(codigo)){ // Si el código ya existe, genero otro

          codigo = Math.floor(Math.random() * 1000);

        }
        
        let dueño = {

          nombre : nombreYapellido,
          dni : dni,
          telefono : telefono

        }

        let reserva = {

          cancha: cancha,  // el mismo que vino del front
          dia: dia,
          horario: horarioString,
          dueño : dueño

         }; // Creo la reserva


        reservas.set(dni, reserva); // Agrego la reserva al mapa de reservas  

        res.json({ mensaje: "Reserva realizada con éxito" }); // Devuelvo el código de la reserva 
      }
    }
  }



);

app.post('/consultar_reserva' , (req ,res) => {

  const dni = req.body.dni;
  if (!reservas.has(dni)) {
    return res.status(404).json({ error: "No se encontró la reserva" });
  }
  res.json(reservas.get(dni));

});

app.post('/modificar_reserva' , (req ,res) => {
 
  /*Recupero los datos de la reserva modificada*/ 
  dni = req.body.dni;
  nombre = req.body.nombre;
  telefono = req.body.telefono; 

  /*Primero recupero la antigua reserva con el dni*/ 
  reserva = reservas.get(dni); 

  reservas.delete(dni);

  fechas.get(reserva.dia)[horarioANumero(reserva.horario)][reserva.cancha] = true; // La cancha vuelve a estar disponible
 

  /*Actualizo los valores de la reserva con los que vienen nuevos*/ 
  reserva.dueño.nombre = nombre;
  reserva.dueño.telefono = telefono;


  /*Saco la fecha reservada anteriormente para poder reescribir*/
  
  reservas.set(dni, reserva);  // actualizo mapeo de reservas  
  res.json(reservas.get(dni)); // devuelvo la reserva

  });


/*Endopoint para traer los horarios disponibles de la cancha seleccionada*/
app.post('/canchas_disponibles', (req, res) => {
  const dia = req.body.dia;
  const horarioString = req.body.horario;
  const horarioArreglo = horarioANumero(horarioString);

  if (!dia || !horarioString) {
    return res.status(400).json({ error: "Faltan parámetros 'dia' o 'horario'" });
  }

  if (horarioArreglo === undefined || horarioArreglo < 0 || horarioArreglo >= 10) {
    return res.status(400).json({ error: "Horario inválido" });
  }

  if (!fechas.has(dia)) {
    const horarios = Array.from({ length: 10 }, () => [true, true, true]);
    fechas.set(dia, horarios);
  }

  const respuesta = fechas.get(dia)[horarioArreglo];

  if (!respuesta) {
    return res.status(500).json({ error: "No se pudo obtener la disponibilidad" });
  }

  return res.json(respuesta); // siempre devuelve algo
});




/*Endpoint para eliminar una reserva*/
app.post('/eliminar_reserva' , (req, res) => {
  
let dni = req.body.dni;   
let reserva = reservas.get(dni); // Resguardo la reserva, tengo que actualizar el mapeo de fechas

fechas.get(reserva.dia)[horarioANumero(reserva.horario)][reserva.cancha-1] = true; // La cancha vuelve a estar disponible ese día a esa hora

reservas.delete(dni); //Elimino finalmente la reserva
res.json({mensaje : "Reserva eliminada con éxito"});

}) 




const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 