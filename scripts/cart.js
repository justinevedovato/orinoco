// Formater le prix
let thd = " "; // l'espace des mille
let dec = ","; // la virgule des décimales
// Ce sont des variables, pour changer plus facilement dans le cas où on change de langue
function format(price, thd, dec) {
  let re = /^(?:(\d+)(\d{2})|(\d{1,2}))$/; // regex qui matche n'importe quel nombre et le divise en deux groupes, il isole les deux derniers chiffres (qui iront après la virgule)
  if ((m = price.toString().match(re)) !== null) {
    if (m[3]) {
      // Dans le cas où le prix fait 3 chiffres ou moins:
      return m[3].length == 1
        ? "0" + dec + "0" + m[3] + " €" // si 1, ça donnera 0,01€
        : "0" + dec + m[3] + " €"; // Si 11, et ça donnera 0,11€
    } else {
      // Si c'est 4 chiffres ou plus:
      return (
        m[1].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + thd) + dec + m[2] + " €"
      ); // regex qui détecte un chiffre tous les 3 chiffres pour pouvoir insérer les séparateurs des mille
    }
  }
}
