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
    let colors = "";
    item.colors.forEach((color) => {
      // colors += `<li style="background:${color}" alt="${color}"></li>`;
      colors += `<li class="dropdown-item">${color}</li>`;
    });

    $itemPage.innerHTML = `<div class="row">
          <img class="col-12 col-md-5" src="${item.imageUrl}" />
          <div class="col-12 col-md-7">
            <h1 class="mt-3 mt-md-1">${item.name}</h1>
            <p class="price h5 m-5">${format(item.price)}</p>
            <div class="dropdown m-5 colors-list">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="option-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Couleur
                </button>
                <ul class="dropdown-menu">${colors}</ul>
            </div>
            <button class="cart btn btn-info">Ajouter au panier</button>
          </div>
        </div>
        <div class="row">
          <h2 class="col-12 mt-4 mb-2 text-left h3">Description</h2>
          <p class="text-justify p-3 mb-5">
            ${item.description}
          </p>
        </div>`;

    // Ajouter la classe "selected" quand on selectionne une couleur, et déselectionne quand on choisit une autre couleur, ou qu'on re-clique sur la couleur en question pour le déselectionner

    const $colorElements = document.querySelectorAll(".colors-list li");
    const $optionBtn = document.getElementById("option-btn");

    $colorElements.forEach(($colorEl) => {
      $colorEl.addEventListener("click", (e) => {
        const isSelected = e.target.classList.contains("active"); // vérifie les elements qui ont été selectionnés

        $colorElements.forEach((el) => el.classList.remove("active")); // desélectionne tout ce qui a été auparavant selectionné pour ne selectionner qu'un seul item à chaque fois

        if (!isSelected) {
          e.target.classList.add("active"); // Ajoute la classe 'selected' sur l'élément choisi, s'il n'a pas été selected avant
        }
        $optionBtn.innerText = $colorEl.innerText + " "; // Affiche la couleur choisie dans le bouton
      });
    });
  });
