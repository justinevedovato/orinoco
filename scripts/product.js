const $itemPage = document.getElementById("item-page");

// Récupérer l'ID du produit depuis l'URL
const params = new URLSearchParams(document.location.search);
let id = params.get("id");

// Si aucun ID dans l'URL, envoi vers une éventuelle page d'erreur
if (!id) {
  document.location.href = "404.html";
}

// Récupérer l'item de l'API avec l'ID obtenue
fetch("http://localhost:3000/api/cameras").then((response) => response.json());
