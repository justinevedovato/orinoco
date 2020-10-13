const $itemPage = document.getElementById("item-page");

// Récupérer l'ID du produit depuis l'URL
const params = new URLSearchParams(document.location.search);
let id = params.get("id");

// Récupérer l'item de l'API avec l'ID obtenue
fetch("http://localhost:3000/api/teddies/" + id)
  .then((response) => response.json())
  .then((item) => {
    let colors = "";
    item.colors.forEach((color) => {
      // récupère toutes les options de couleur de chaque article
      colors += `<li class="dropdown-item">${color}</li>`;
    });

    $itemPage.innerHTML = `<div class="row">
          <img class="img-responsive product-img col-12 col-md-6" src="${
            item.imageUrl
          }" />
          <div class="col-12 col-md-6">
            <h1 class="mt-3 mt-md-1">${item.name}</h1>
            <p class="price h5 m-5">${format(item.price)}</p>
            <div class="dropdown m-5 colors-list">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="option-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Couleur
                </button>
                <ul class="dropdown-menu">${colors}</ul>
            </div>
            <button class="cart btn btn-info" id="add-to-cart">Ajouter au panier</button>
            <p class="small m-3" id="message"></p>
          </div>
        </div>
        <div class="row">
          <h2 class="col-12 mt-4 mb-2 text-left h3">Description</h2>
          <p class="text-justify p-3 mb-5">
            ${item.description}
          </p>
        </div>`;

    // Si aucun ID dans l'URL, envoi vers une éventuelle page d'erreur
    if (!item._id) {
      // document.location.href = "404.html";
      $itemPage.innerHTML = `<div class="text-center m-2">
  <p class="display-4">404</p>
  <p class="h3">La page que vous recherchez n'existe pas!</p>
  <a href="../index.html"
    ><button class="btn btn-info m-3">Retour à l'accueil</button></a
  >
</div>`;
    }
    // CHOIX DE L'OPTION
    // Ajouter la classe "selected" quand on selectionne une couleur, et déselectionne quand on choisit une autre couleur, ou qu'on re-clique sur la couleur en question pour le déselectionner
    const $colorElements = document.querySelectorAll(".colors-list li");
    const $optionBtn = document.getElementById("option-btn");

    $colorElements.forEach(($colorElement) => {
      $colorElement.addEventListener("click", (e) => {
        const isSelected = e.target.classList.contains("active"); // vérifie les elements qui ont été selectionnés

        $colorElements.forEach((el) => el.classList.remove("active")); // desélectionne tout ce qui a été auparavant selectionné pour ne selectionner qu'un seul item à chaque fois

        if (!isSelected) {
          e.target.classList.add("active"); // Ajoute la classe 'selected' sur l'élément choisi, s'il n'a pas été selected avant
        }
        $optionBtn.innerText = $colorElement.innerText + " ";
      });
    });

    const $addToCartBtn = document.getElementById("add-to-cart");
    const $msg = document.getElementById("message");

    // LOCAL STORAGE
    let cart = {}; // Démarre avec un object vide
    let retrievedItem = localStorage.getItem("cart");

    // Vérifie si le Local Storage comporte des items, si oui, les ajoute à l'array "cart":
    if (retrievedItem !== null) {
      cart = JSON.parse(retrievedItem);
    }

    // Crée le produit, l'ajoute à l'array "cart" et sauvegarde l'array dans le Local Storage:
    function addToCart() {
      let product = {
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.imageUrl,
        quantity: 1,
      };

      // Vérifier si l'article est déjà dans le panier:
      if (cart[item._id]) {
        cart[item._id].quantity++; // Itérer la quantité si l'article est déjà dans le panier
      } else {
        cart[item._id] = product; // Ajouter l'article au local storage
      }

      // Sauvegarder le panier au localstorage
      localStorage.setItem("cart", JSON.stringify(cart));
      $msg.innerHTML = "L'article a bien été ajouté au panier";
    }

    // Event Listeners
    $addToCartBtn.addEventListener("click", addToCart);
  });
