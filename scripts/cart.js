const $cartList = document.getElementById("cart-list");
const $total = document.getElementById("total");

// Formater le prix
function format(p) {
  let price = p / 100;
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

// Récupérer les articles depuis le Local Storage pour charger le panier
let retrievedItem = [];
retrievedItem = JSON.parse(localStorage.getItem("cart"));

// Calcule le nombre d'articles dans le panier:
let totalItems = retrievedItem.length - 1;

// Calcule le total du montant des articles du panier
let allPrices = [];
for (let i = 0; i < retrievedItem.length; i++) {
  allPrices.push(retrievedItem[i].price);
  totalPrices = allPrices.reduce((a, b) => a + b, 0);
}

$cartList.innerHTML = retrievedItem
  .map(
    (item) => `<div class="row m-1 ml-lg-5 mr-lg-5">
<figure class="img-thumbnail embed-responsive embed-responsive-1by1 col-1">
    <img
    class="embed-responsive-item"
    src="${item.image}"
  />
</figure>
<div class="col-9">
<p class="h5 card-title col-12 text-left">${item.name}</p>
<p class="card-title col-12 text-left">Quantité: ${item.amount}</p>
</div>
<p class="price col-2 text-right">${format(item.price)}</p>
</div>`
  )
  .join("");

$total.innerHTML = "Total: " + format(totalPrices);
