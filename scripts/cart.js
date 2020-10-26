const $cartList = document.getElementById("cart-list");
const $total = document.getElementById("total");
const $quantity = document.getElementById("quantity");

// Récupère les articles depuis le Local Storage pour charger le panier
let retrievedItems = JSON.parse(localStorage.getItem("cart"));

// Affiche un message d'erreur si aucun article au panier, ou si tous les articles sont supprimés
if (!retrievedItems) {
  $cartList.innerHTML = `
  <div class='bg-light p-5'>
    <p>Vous n'avez pas d'articles dans le panier</p>
    <a href="../index.html">
      <button class='btn btn-info mt-3'>Retour à l'accueil</button>
    </a>
  </div>
  `;
} else if (JSON.stringify(retrievedItems) == "{}") {
  localStorage.removeItem("cart");
  location.reload();
}

// Calcule le nombre d'articles dans le panier:
let totalItems = Object.values(retrievedItems).reduce(
  (a, b) => a + b.quantity,
  0
);

let totalPrice = 0;

// Affiche l'entête du tableau du panier
let productHTML = `
  <div class="row mx-1 mx-xl-5">
    <div class=" col-2 col-md-1"></div>
    <div class="col-6 col-md-5">
      <p class="text-left pl-3 bg-light rounded"> Nom du produit </p>
    </div>
    <div class="col-2 col-md-3 d-none d-md-block">
      <p class=" text-right pr-3 bg-light rounded"> Prix à l'unité </p>
    </div>
    <div class="col-3 col-md-2">
      <p class="text-right pr-3 bg-light rounded"> Prix total </p>
    </div>
    <span class="col-1"></span>
  </div>`;

// Affiche chaque article du panier
for (let id in retrievedItems) {
  let product = retrievedItems[id];
  totalPrice += product.price * product.quantity; // Calcule montant total
  productHTML += `
    <div class="row mx-1 mx-xl-5">
    <figure class="embed-responsive embed-responsive-1by1 col-2 col-md-1">
      <a href="/pages/product.html?id=${product.id}">
        <img
        class="img-fluid img-thumbnail embed-responsive-item "
        src="${product.image}"
        />
      </a>
    </figure>
    <div class="col-6 col-md-5">
      <p class="h5 card-title col-12 text-left my-2">${product.name}</p>
      <p class="card-title col-12 text-left">Quantité: ${product.quantity}</p>
    </div>
    <div class="col-2 col-md-3 d-none d-md-block">
      <p class="price text-right mt-3 pr-3">${format(product.price)} </p>
    </div>
    <div class=" col-3 col-md-2">
      <p class="price pr-3 text-right mt-3">${format(
        product.price * product.quantity
      )} </p>
        </div>
      <span class="col-1 pt-1">
      <i class="fas fa-trash-alt remove-btn mt-3" data-id="${product.id}"></i>
      </span>
    </div>`;
}

$cartList.innerHTML = productHTML;

$total.innerHTML = `
  <div class="d-flex flex-row-reverse p-4 bg-light rounded">
    <p class="h5 col-4 m-0" id="total">Total: ${format(totalPrice)}</p>
    <p class="h6 m-0">(${totalItems} articles)
  </div>
  `;

// Supprime un article du panier (array "cart") et update localstorage
const $removeBtns = document.querySelectorAll(".remove-btn");

// Gestion de la quantité des articles, mais ne sera pas envoyée au serveur
function removeItem(e) {
  let product = retrievedItems[e.target.dataset.id]; // Récuperer l'ID du produit ciblé
  product.quantity--;
  if (!product.quantity) {
    delete retrievedItems[e.target.dataset.id];
  }
  localStorage.setItem("cart", JSON.stringify(retrievedItems));
  location.reload(); // refresh la page
}

$removeBtns.forEach(($button) => $button.addEventListener("click", removeItem));
