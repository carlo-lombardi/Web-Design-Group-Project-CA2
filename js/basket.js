// VitaWave - shopping basket saved in localStorage (#7) and the basket page (#10).
// Carlo: basket code

// Read the basket from localStorage. If there is nothing saved yet, start with an empty list.
function getBasket() {
  const saved = localStorage.getItem("vitawave-basket");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

// Save the basket in localStorage as text
function saveBasket(basket) {
  localStorage.setItem("vitawave-basket", JSON.stringify(basket));
}

// Show the number of items on the basket icon in the navbar
function updateBasketCount() {
  const basket = getBasket();
  let count = 0;
  for (let i = 0; i < basket.length; i++) {
    count = count + basket[i].quantity;
  }
  document.getElementById("basket-count").textContent = count;
}

// Add one product. If it is already in the basket, add 1 to its quantity.
function addToBasket(id, name, price) {
  const basket = getBasket();
  let found = false;

  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === id) {
      basket[i].quantity = basket[i].quantity + 1;
      found = true;
    }
  }

  if (found === false) {
    basket.push({ id: id, name: name, price: price, quantity: 1 });
  }

  saveBasket(basket);
  updateBasketCount();
}

// Every "Add to basket" button on the page
const addButtons = document.querySelectorAll(".add-to-basket");

for (let i = 0; i < addButtons.length; i++) {
  const button = addButtons[i];

  button.addEventListener("click", function () {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    addToBasket(id, name, price);

    // Short feedback so the user knows it worked
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bi bi-check-lg"></i> Added';
    button.disabled = true;
    setTimeout(function () {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 1200);
  });
}

// Show the right number when any page loads
updateBasketCount();
