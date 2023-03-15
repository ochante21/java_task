const eventos = data["events"];

const containerDetails = document.getElementById("container_cards")

const querySearch = window.location.search

const param = new URLSearchParams(querySearch).get("id")


const carta = eventos.find(lugar => lugar.id == param);

containerDetails.innerHTML= `
<div class="row g-0">
              <div class="col-md-4">
                <img src=${carta.image} class="img-fluid rounded-start img_card" alt="${carta.name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${carta.name}</h5>
                  <p class="card-text">${carta.description}</p>
                  <p class="card-text">Capacity: ${carta.capacity}</p>
                  <p class="card-text">Assistance: ${carta.assistance}</p>
                  <p class="card-text">Price: $${carta.price}</p>
                  <p class="card-text"><small class="text-muted">Place: ${carta.place}</small></p>
                </div>
              </div>
            </div>
`;

// "capacity":30000,
//         "assistance":25698,
//         "price":3