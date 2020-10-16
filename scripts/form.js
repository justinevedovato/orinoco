const $form = document.querySelector("form");
const $firstName = document.getElementById("first-name");
const $lastName = document.getElementById("last-name");
const $address = document.getElementById("address");
const $city = document.getElementById("city");
const $email = document.getElementById("email");
const $allInputs = document.querySelectorAll(".form-control");

let products = [];

for (let item in retrievedItems) {
  let order = {
    article: retrievedItems[item].id,
    quantity: retrievedItems[item].quantity,
  };
  products.push(order);
}

$form.addEventListener("submit", function (e) {
  // if (!$form.checkValidity()) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   //Récupére les données utilisateur
  // } else {
  let userInput = {
    firstname: $firstName.value,
    lastname: $lastName.value,
    address: $address.value,
    city: $city.value,
    email: $email.value,
  };

  e.preventDefault(); // à retirer ensuite pour aller sur la page de confirmation
  // console.log(JSON.stringify(userInput) + JSON.stringify(products));
  // }
});

// Vérifier que les champs ne contiennent pas de nombres
function checkDigits(e) {
  let regex = /^[\p{L}-]+$/iu;
  if (e.target.value.match(regex)) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  } else {
    e.target.classList.add("is-invalid");
  }
}

function checkAddress(e) {
  let regex = /^[\p{L}1-9,.-]+$/iu;
  if (e.target.value.match(regex)) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  } else {
    e.target.classList.add("is-invalid");
  }
}

function checkEmail(e) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (e.target.value.match(regex)) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  } else {
    e.target.classList.add("is-invalid");
  }
}

// Event Listeners
$firstName.addEventListener("change", checkDigits);
$lastName.addEventListener("change", checkDigits);
$address.addEventListener("change", checkAddress);
$city.addEventListener("change", checkAddress);
$email.addEventListener("change", checkEmail);
