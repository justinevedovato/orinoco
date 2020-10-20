const $form = document.querySelector("form");
const $firstName = document.getElementById("first-name");
const $lastName = document.getElementById("last-name");
const $address = document.getElementById("address");
const $city = document.getElementById("city");
const $email = document.getElementById("email");
const $allInputs = document.querySelectorAll(".form-control");

let productsID = [];
let order = "";

for (let item in retrievedItems) {
  order = retrievedItems[item].id;
  productsID.push(order);
}

// Envoi du formulaire
function submitForm(e) {
  for (let input of $allInputs) {
    if (input.classList.contains("is-invalid")) {
      e.preventDefault(); // Bloque l'envoi si un des champs est invalide
    }
  }
  // Crée la fiche contact
  let userInput = {
    firstName: $firstName.value,
    lastName: $lastName.value,
    address: $address.value,
    city: $city.value,
    email: $email.value,
  };
  // POST le tableau de données vers le serveur

  let orderInfos = {
    contact: userInput,
    products: productsID,
  };

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: userInput,
      products: productsID,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Valide (ou non) chaque champ de formulaire
function validField(el, regex) {
  if (el.value.match(regex)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
  }
}

// Regex pour les différents champs de formulaire
const onlyLetters = /^[\p{L} -]+$/iu;
const checkAddress = /^[\p{L}1-9, .-]+$/iu;
const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Event Listeners
$firstName.addEventListener("change", (e) => validField(e.target, onlyLetters));
$lastName.addEventListener("change", (e) => validField(e.target, onlyLetters));
$address.addEventListener("change", (e) => validField(e.target, checkAddress));
$city.addEventListener("change", (e) => validField(e.target, checkAddress));
$email.addEventListener("change", (e) => validField(e.target, checkEmail));

$form.addEventListener("submit", (e) => {
  submitForm();
  e.preventDefault(); // Juste le temps des tests
});
