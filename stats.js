//asincronismo
let eventos;
let fecha_actual;
let eventos_pasados = [];
let eventos_recientes =[];

//asincronismo
const obtener_eventos = async () => {
  try {
    const repuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    let datos = await repuesta.json();
    fecha_actual = datos.currentDate;
    eventos = datos.events;
    filtrar_eventosFechas(eventos);
    console.log(eventos_pasados);
    console.log(eventos_recientes);
    console.log(fecha_actual);
    //console.log(eventos);
    // crear_cartas(eventos);
    // crear_checkboxes(eventos);
  }
  catch (error) {
    console.log("error al cargar");
  }
}

//funciones
function filtrar_eventosFechas(eventos_array) {
    eventos_array.forEach(element => {
        if (element["date"]< fecha_actual ){
            eventos_pasados.push(element);
        }
        else if(element["date"]>= fecha_actual){
            eventos_recientes.push(element);
        }        
    });
    
  }

function pintar_tablas(){

}

function calcular_ingresos(){

}

//llamar funciones
obtener_eventos();