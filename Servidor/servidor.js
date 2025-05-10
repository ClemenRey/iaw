/*Servidor en Express que se encargará de responder las peticiones del frontend*/


const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors()); // habilita todas las solicitudes desde cualquier origen


app.use(express.json());
 
let fechas = new Map(); 

/* Mapea fechas a un arreglo de horarios. Luego para cada componente del arreglo
tiene las canchsa disponibles*/

let reservas = new Map();

function horarioANumero(hora) {

  let retornar = "" ;

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
      case  "21:30" : {retornar = 9 ; break}
      
    }

    return retornar;

}

/*Endpoint que responde a la reserva de un turno*/ 
app.post('/reservar' , (req,res) => {

  dia = req.body.dia; // Dia seleccionado
  horarioString = req.body.horario; // Horario seleccionado --> Ahora es un String
  horarioArrreglo = horarioANumero(horarioString);
  cancha = req.body.cancha; // Cancha seleccionada
  nombreYapellido = req.body.nombreYapellido; // Nombre del dueño del turno
  dni = req.body.dni;
  telefono = req.body.telefono;

  //console.log("Nombre y apellido: " + nombreYapellido + "DNI: " + dni + "Telefono: " + telefono);
  

  //console.log("Cancha: " + cancha + "Horario: " + horario + "Dia: " + dia);
  console.log(fechas.get(dia)[2]);


  //TODO AGREGAR LOS DATOS A LA RESERVA
  
    if(fechas.has(dia)){
      if(fechas.get(dia)[horarioArrreglo][cancha]){ // Si la cancha seleccionada está disponible
        fechas.get(dia)[horarioArrreglo][cancha] = false; // La cancha ya no está disponible --> Esto me 

        let codigo = Math.floor(Math.random() * 1000); // Genero un código aleatorio para la reserva
        while(reservas.has(codigo)){ // Si el código ya existe, genero otro
          codigo = Math.floor(Math.random() * 1000);
        }
        //console.log("El codigo de reserva es: " + codigo); // no sacar porque sino sale undefined xdxd

        let dueño = {

          nombre : nombreYapellido,
          dni : dni,
          telefono : telefono

        }

        let reserva = {

          cancha: cancha, 
          dia: dia,
          horario: horarioString,
          dueño : dueño

         }; // Creo la reserva


        reservas.set(dni, reserva); // Agrego la reserva al mapa de reservas  

        res.json({ mensaje: "Reserva realizada con éxito" }); // Devuelvo el código de la reserva 
      }
    }
  }
/*Agregar la reserva al arreglo*/


);

app.post('/consultar_reserva' , (req ,res) => {

  //console.log("Entre a /consultar_reserva"); // ok
  //console.log("DNI QUE VINO POR POST EN /consultar_reserva" + req.body.dni); // ok

  const dni = req.body.dni;
  //console.log("DNI que vino en post: "+dni);
  //console.log("Reserva. nombre: " , reservas.get(dni).dueño);
  if (!reservas.has(dni)) {
    return res.status(404).json({ error: "No se encontró la reserva" });
  }
  res.json(reservas.get(dni));

});





/*Endopoint para traer los horarios disponibles de la cancha seleccionada*/
app.post('/canchas_disponibles' , (req,res) => {

    console.log("Entré a /canchas_disponibles desde modificar");
    dia = req.body.dia; // Dia seleccionado
    horarioString = req.body.horario; // Horario seleccionado
    horarioArrreglo = horarioANumero(horarioString);
    //console.log("Dia :" + dia + "Horario :" + horario);

    if (!dia || !horarioString) {
      return res.status(400).json({ error: "Faltan parámetros 'dia' o 'horario'" });
    }

    if(!fechas.has(dia)){ // Si el dia no existe en el mapa, lo seteo todo disponible
        //fechas.set(dia, new Array(10).fill(new Array(3).fill(true))); // Esto era el error, odas las componentes del array de horarios 
        // apunta al mismo array de canchas. Entonces si modifico el array de canchas, lo modifico para todos los horarios y no es lo que quería
        let horarios = Array.from({length : 10} , () => [true,true,true]);
        fechas.set(dia,horarios);


        res.json(fechas.get(dia)[horarioArrreglo]);
    }
    else{ // Si el dia existe, devuelvo el arreglo de la fecha seleccionada
        res.json(fechas.get(dia)[horarioArrreglo]); // Canchas disponibles a esa hora --> Acá me  get(dia)[horario],
        // el horario tiene que ser un nro del 0 al 10 y yo recibí un string representando el hs
    }

});


/*Endpoint para manejar la eliminación de una reserva. Recibo el código de la reserva que es el dni*/ 
app.post('/cancelar_reserva' , (req, res) => {

    /*Entrar al mapeo reservas y eliminar la entrada que tenga como clave el DNI recibido*/
    console.log("Entré a cancelar reserva");
    let clave = req.body.dni;
    
   if (reservas.delete(clave)) res.json({mensaje : "Su reserva ha sido cancelada con éxito"})

   else res.json({mensaje : "No se encontró la reserva"});

})




const PORT = process.env.PORT || 3001; // Esucha en puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 