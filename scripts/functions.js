// Fonctions réutilisées dans plusieurs pages du site

// Formate le prix en euros
function format(p) {
  let price = p / 100;
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
