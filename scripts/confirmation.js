const $confirm = document.getElementById("confirm");

let orderInfos = localStorage.getItem("orderInfos");
let orderID = JSON.parse(orderInfos).orderId;
let products = JSON.parse(orderInfos).products;

// Calcule le prix total des articles achetés
let totalPrice = 0;
for (let product in products) {
  let item = products[product];
  totalPrice += item.price;
}

$confirm.innerHTML = `
  <h1 class="col-12 text-center h4 mt-3 mb-5">Merci de votre commande !</h1>
  <p>Votre commande d'un montant de 
    <span>${format(totalPrice)}</span>
   a bien été validée !</p>
  <p>Nous vous remercions de votre achat.</p>
  <p>Votre numéro de commande est le : <br> <span>${orderID}</span>
  <p>Veillez à conserver ces informations.</p>
  <p>A bientôt sur notre boutique !</p>
`;

// Vide le panier après la validation de la commande
localStorage.removeItem("cart");
