const $cartBtn = document.getElementById("cart-btn");
const $itemCard = document.getElementById("item-card");

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
    </div>
  </a>`
      )
      .join("");
  })
  // Dans le cas où l'API est inaccessible:
  .catch((error) => {
    console.error(error);
    $itemCard.innerHTML = `
      <div class="text-center m-2 col-12 bg-light p-4">
        <p class="h3 mb-3">404</p>
        <p class="h5">Notre collection est pour le moment indisponible, merci de réessayer ultérieurement.</p>
        <p class="h5">Veuillez nous excuser pour la gêne occasionnée.</p>
      </div>
    `;
  });
