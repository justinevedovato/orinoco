const $cartList = document.getElementById("cart-list");
const $total = document.getElementById("total");
const $quantity = document.getElementById("quantity");

// Formater le prix
function format(p) {
  let price = p / 100;
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

// Récupérer les articles depuis le Local Storage pour charger le panier
let retrievedItems = JSON.parse(localStorage.getItem("cart"));

// Calcule le nombre d'articles dans le panier:
let totalItems = Object.values(retrievedItems).reduce(
  (a, b) => a + b.quantity,
  0
);

// Calcule le total du montant des articles du panier:
let totalPrice = 0;
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

// Merge les articles identiques et itère la quantité:
for (let id in retrievedItems) {
  let product = retrievedItems[id];
  totalPrice += product.price * product.quantity;
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
    <p class="h5"> Total: ${format(totalPrice)}</p>
    <p class="h6 m-0">(${totalItems} articles)
  `;

// Supprime un article du panier (array "cart") et update localstorage
const $removeBtns = document.querySelectorAll(".remove-btn");

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
