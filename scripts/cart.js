// Formater le prix
function format(p) {
  let price = p / 100;
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
