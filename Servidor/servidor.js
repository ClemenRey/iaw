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

/*Endpoint que responde a la reserva de un turno*/ 
app.post('/reservar' , (req,res) => {

  dia = req.body.dia; // Dia seleccionado
  horario = req.body.horario; // Horario seleccionado 
  cancha = req.body.cancha; // Cancha seleccionada

  console.log("Cancha: " + cancha + "Horario: " + horario + "Dia: " + dia);
  console.log(fechas.get(dia)[2]);


  //TODO AGREGAR LOS DATOS A LA RESERVA
  
    if(fechas.has(dia)){
      if(fechas.get(dia)[horario][cancha]){ // Si la cancha seleccionada está disponible
        fechas.get(dia)[horario][cancha] = false; // La cancha ya no está disponible --> Esto me 

        let codigo = Math.floor(Math.random() * 1000); // Genero un código aleatorio para la reserva
        while(reservas.has(codigo)){ // Si el código ya existe, genero otro
          codigo = Math.floor(Math.random() * 1000);
        }
        console.log("El codigo de reserva es: " + codigo); // no sacar porque sino sale undefined xdxd
        let reserva = {cancha: cancha, 
                       dia: dia,
                       horario: horario}; // Creo la reserva
        reservas.set(codigo, reserva); // Agrego la reserva al mapa de reservas


        //Imprimir el mapeo para chequear

    


        /*for (const [fecha, horarios] of fechas.entries()) { // Para cada entrada de mi mapeo , osea cada fecha
          console.log(`📅 Fecha: ${fecha}`);
        
          for (const [hora, disponibilidad] of Object.entries(horarios)) {
            // Filtramos las canchas disponibles (valor === 1)
            const canchasDisponibles = disponibilidad
              .map((estado, index) => (estado === 1 ? index + 1 : null))
              .filter((num) => num !== null);
        
            console.log(`  🕒 Horario: ${hora}`);
            console.log(`    🟢 Canchas disponibles: ${canchasDisponibles.join(", ") || "ninguna"}`);
          }
        }*/
        

        res.json({ mensaje: "Reserva realizada con éxito" 
                , codigo: codigo}); // Devuelvo el código de la reserva 
      }
    }
  }
/*Agregar la reserva al arreglo*/


);
//TODO hacer endpoint eliminar
app.post('/eliminar_reserva', (req, res) => {});


/*Endopoint para traer los horarios disponibles de la cancha seleccionada*/
app.post('/canchas_disponibles' , (req,res) => {

    console.log("Entré a /canchas_disponibles");
    dia = req.body.dia; // Dia seleccionado
    horario = req.body.horario; // Horario seleccionado
    console.log("Dia :" + dia + "Horario :" + horario);

    if (!dia || !horario) {
      return res.status(400).json({ error: "Faltan parámetros 'dia' o 'horario'" });
    }

    if(!fechas.has(dia)){ // Si el dia no existe en el mapa, lo seteo todo disponible
        //fechas.set(dia, new Array(10).fill(new Array(3).fill(true))); // Esto era el error, odas las componentes del array de horarios 
        // apunta al mismo array de canchas. Entonces si modifico el array de canchas, lo modifico para todos los horarios y no es lo que quería
        let horarios = Array.from({length : 10} , () => [true,true,true]);
        fechas.set(dia,horarios);


        res.json(fechas.get(dia)[horario]);
    }
    else{ // Si el dia existe, devuelvo el arreglo de la fecha seleccionada
        res.json(fechas.get(dia)[horario]); // Canchas disponibles a esa hora
    }

});




const PORT = process.env.PORT || 3001; // Esucha en puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 