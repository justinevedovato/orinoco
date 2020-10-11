const $cartBtn = document.getElementById("cart-btn");
const $itemCard = document.getElementById("item-card");
const $addToCartBtn = document.getElementById("add-to-cart");

// Récupérer les items depuis l'API et les intégrer au DOM
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((itemsArray) => {
    $itemCard.innerHTML = itemsArray
      .map(
        (
          item
        ) => `<a class="card col-12 col-md-6 col-lg-4" href="/pages/product.html?id=${
          item._id
        }">
      <figure class="embed-responsive embed-responsive-4by3">
          <img
          class="card-img-top embed-responsive-item"
          src="${item.imageUrl}"
        />
      </figure>
    <div class="card-body">
    <h3 class="card-title">${item.name}</h3>
    <p class="price">${format(item.price)}</p>
      <!-- <button class="cart btn btn-info" id="add-to-cart">Ajouter au panier</button> -->
    </div>
  </a>`
      )
      .join("");
  });
