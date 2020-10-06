const $itemPage = document.getElementById("item-page");

// Récupérer l'ID du produit depuis l'URL
const params = new URLSearchParams(document.location.search);
let id = params.get("id");

// Si aucun ID dans l'URL, envoi vers une éventuelle page d'erreur
if (!id) {
  document.location.href = "404.html";
}

// Récupérer l'item de l'API avec l'ID obtenue
fetch("http://localhost:3000/api/teddies/" + id)
  .then((response) => response.json())
  .then((item) => {
    $itemPage.innerHTML = `<div class="row">
          <img class="col-12 col-md-5" src="${item.imageUrl}" />
          <div class="col-12 col-md-7">
            <h1 class="mt-3 mt-md-1">${item.name}</h1>
            <p class="price h5 m-5">${format(item.price, thd, dec)}</p>
            <button class="cart btn btn-info">Ajouter au panier</button>
          </div>
        </div>
        <div class="row">
          <h2 class="col-12 mt-4 mb-2 text-left h3">Description</h2>
          <p class="text-justify p-3 mb-5">
            ${item.description}
          </p>
        </div>`;
  });
