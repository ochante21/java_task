
//const eventos = data["events"];

//asincronismo
let eventos
const obtener_eventos = async () => {
  try {
    const repuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    let datos = await repuesta.json();
    eventos = datos.events;
    crear_cartas(eventos);
    crear_checkboxes(eventos);
    console.log(eventos);
  }
  catch (error) {
    console.log("error al cargar");
  }
}


//DOM
const contenedor_cartas = document.getElementById("contenedor_cartas");
const input = document.getElementsByClassName("input")[0];
const contenedor_checkboxes = document.getElementById("form_filtros");

//eventos
input.addEventListener("input", filtro_final);

contenedor_checkboxes.addEventListener("change", filtro_final);

//funciones
function filtro_final() {
  let array_filtrado_porTexto = filtrar_porTexto(eventos, input.value);
  let array_filtrado_porCheckbox = filtrar_porCategoria(array_filtrado_porTexto);
  crear_cartas(array_filtrado_porCheckbox);
}

function crear_cartas(eventos_array) {
  if (eventos_array.length == 0) {
    contenedor_cartas.innerHTML = `
    <h2 class="display-1 fw-bolder">No Hay Coincidencias</h2>
    `
    return
  }
  let cartas = ``;

  eventos_array.forEach(element => {
    cartas += `
        <div class="card cartas" style="width: 18rem;">
        <img src=${element["image"]} class="carta " alt="${element["name"]}">
        <div class="card-body">
          <h5 class="card-title">${element["name"]}</h5>
          <p class="card-text">${element["description"]}</p>

        </div>
        <div class="boton_precio card-body">
          <span>$ ${element["price"]} </span>
          <a href="./details.html?id=${element["_id"]}" class="btn btn-primary ">Ver mas</a>
        </div>
      </div>
      `;
    contenedor_cartas.innerHTML = cartas;
  });
}

function filtrar_porTexto(eventos_array, texto) {
  let array_filtrado = eventos_array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()));
  return array_filtrado;
}

function crear_checkboxes(eventos_array) {
  let checkboxs = ``;
  let filtrando = [];
  eventos_array.forEach(element => {
    filtrando.push(element["category"]);
  });
  let eventos_categorias = filtrando.filter((element, indice) => {
    if (filtrando.indexOf(element) === indice) { return true };
  });
  //console.log(eventos_categorias);
  eventos_categorias.forEach(element => {
    checkboxs += `
      <label class="label1">
           <input type="checkbox" value="${element}" class="checka" >
          ${element}
      </label>
    `;
  });
  contenedor_checkboxes.innerHTML = checkboxs;
}

function filtrar_porCategoria(eventos_array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let array_checkboxes = Array.from(checkboxes);
  let array_chekeados = array_checkboxes.filter(element => element.checked == true)
  //console.log(array_chekeados);
  if (array_chekeados.length == 0) {
    return eventos_array;
  }

  let array_valor = array_chekeados.map(element => element.value)
  //console.log(array_valor);
  let filtrado_categorias = eventos_array.filter(element => array_valor.includes(element.category))
  return filtrado_categorias;
}

//llamar funciones
obtener_eventos()
