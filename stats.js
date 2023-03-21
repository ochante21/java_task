
let eventos;
let fecha_actual;
let eventos_pasados = [];
let eventos_recientes = [];

//asincronismo
const obtener_eventos = async () => {
  try {
    const repuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    let datos = await repuesta.json();
    fecha_actual = datos.currentDate;
    eventos = datos.events;
    filtrar_eventosFechas(eventos);
    //console.log(eventos_pasados);
    //console.log(eventos_recientes);
    //console.log(fecha_actual);
    pintar_tablas(eventos_pasados, contenedor_tablaPast);
    pintar_tablas(eventos_recientes,contenedor_tablaUpcoming);
    pintar_tablaGeneral();
    //estadisica_general(eventos_pasados);

  }
  catch (error) {
    console.log("error al cargar");
  }
}

//DOM
contenedor_estadisticaGeneral = document.getElementById('estadistica_general')
contenedor_tablaUpcoming = document.getElementById("tabla_upcoming");
contenedor_tablaPast = document.getElementById('tabla_past');
//console.log(contenedor_estadisticaGeneral);

//funciones
function filtrar_eventosFechas(eventos_array) {
  eventos_array.forEach(element => {
    if (element["date"] < fecha_actual) {
      eventos_pasados.push(element);
    }
    else if (element["date"] >= fecha_actual) {
      eventos_recientes.push(element);
    }
  });

}

function pintar_tablas(eventos_array, contenedor) {
  let tabla = ``;
  let array_informacion = calcular_ingresosAssistencia(eventos_array);
  array_informacion.forEach(element => {
    tabla += `
    <tr>
                <td>${element.category}</td>
                <td>${element.ingresos}</td>
                <td>${element.porcentaje_asistencia}%</td>
              </tr> 
    `;
  });
  contenedor.innerHTML = `
  <tr class='encabezado'>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of attendance</td>
              </tr>
  ` + tabla;
}

function calcular_ingresosAssistencia(eventos_array,) {
  let array_ingresos = [];
  let categories = categorias(eventos_array);
  categories.forEach(categoria => {
    let contador_ingresos = 0;
    let contador_asistencia = [];
    eventos_array.forEach(evento => {
      if (categoria == evento.category) {
        if (evento.date < fecha_actual) {
          let ingreso = evento.price * evento.assistance;
          let asistencia = (evento.assistance * 100 / evento.capacity)
          contador_ingresos += ingreso;
          contador_asistencia.push(asistencia);
        }
        else {
          let ingreso = evento.price * evento.estimate;
          let asistencia = (evento.estimate * 100 / evento.capacity)
          contador_ingresos += ingreso;
          contador_asistencia.push(asistencia);
        }

      }
    });
    //console.log(contador_asistencia);
    //console.log(contador_ingresos);
    let suma_porcentaje = contador_asistencia.reduce((anterior, actual) => anterior + actual, 0);
    let porcentaje_promedio = (suma_porcentaje / contador_asistencia.length).toFixed(2);
    //console.log(porcentaje_promedio);
    array_ingresos.push({ 'category': categoria, 'ingresos': contador_ingresos, 'porcentaje_asistencia': porcentaje_promedio });
  });
  //console.log(array_ingresos);
  return array_ingresos;
}

function categorias(eventos_array) {
  let filtrando = [];
  eventos_array.forEach(element => {
    filtrando.push(element["category"]);
  });
  let eventos_categorias = filtrando.filter((element, indice) => {
    if (filtrando.indexOf(element) === indice) { return true };
  });
  //console.log(eventos_categorias);
  return eventos_categorias;
}

function estadisica_general(eventos_array) {
  let mayor_asistencia = 0;
  let menor_asistencia = Infinity;
  let mayor_capacidad = 0;
  let array_estadistico=[{},{},{}];

  eventos_array.forEach(element => {
    let porcentaje_asis = (element.assistance * 100 / element.capacity);
    if (porcentaje_asis > mayor_asistencia) {
      mayor_asistencia = porcentaje_asis;
      array_estadistico[0]['name']=element.name;
      array_estadistico[0]['valor']=mayor_asistencia.toFixed(2);
    }
    if (porcentaje_asis < menor_asistencia) {
      menor_asistencia = porcentaje_asis;
      array_estadistico[1]['name']= element.name;
      array_estadistico[1]['valor']= menor_asistencia.toFixed(2);
    }
    if (element.capacity > mayor_capacidad) {
      mayor_capacidad = element.capacity;
      array_estadistico[2]['name']=element.name;
      array_estadistico[2]['valor']=mayor_capacidad;
    }
  });
  return array_estadistico
}
function pintar_tablaGeneral() {
  let general = estadisica_general(eventos_pasados);  
  contenedor_estadisticaGeneral.innerHTML = `
    <tr class='encabezado'>
      <td>Events with the highest percentage of attendance</td>
      <td>Events with the lowest percentage of attendance</td>
      <td>Events with larger capacity</td>
    </tr>
    <tr>
      <td>${general[0].name} &nbsp ${general[0].valor}%</td>
      <td>${general[1].name} &nbsp ${general[1].valor}%</td>
      <td>${general[2].name} &nbsp ${general[2].valor}</td>    
  `;

}

//llamar funciones
obtener_eventos();