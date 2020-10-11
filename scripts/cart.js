const $cartList = document.getElementById("cart-list");

// Formater le prix
function format(p) {
  let price = p / 100;
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

// Récupérer les articles depuis le Local Storage pour charger le panier
