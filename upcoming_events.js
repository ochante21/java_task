
let eventos = data["events"];
let eventos_recientes = [];
let eventos_pasados = [];


// eventos.forEach(event => {
//     console.log(`nombre del evento : ${event["name"]}`);
// });

function crear_cartas(eventos, id_contenedor) {
  let body = ``;
  let update_cart = document.getElementById(id_contenedor)
  eventos.forEach(element => {
    body += `
        <div class="card cartas" style="width: 18rem;">
        <img src=${element["image"]} class="carta " alt="jugador1">
        <div class="card-body">
          <h5 class="card-title">${element["name"]}</h5>
          <p class="card-text">${element["description"]}</p>

        </div>
        <div class="boton_precio card-body">
          <span>$ ${element["price"]} </span>
          <a href="#" class="btn btn-primary ">Ver mas</a>
        </div>
      </div>
      `;
    update_cart.innerHTML = body;
  });
}

function filtrar_eventos(event) {
  event.forEach(element => {
    if (element["date"] < "2021-12-12") {
      eventos_pasados.push(element);
    }
    else if (element["date"] >= "2021-12-12") {
      eventos_recientes.push(element);
    }
  });
}


filtrar_eventos(eventos);

crear_cartas(eventos_recientes,"eventos_actuales");

