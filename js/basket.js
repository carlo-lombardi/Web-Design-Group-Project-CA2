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

// ---------- Basket page (#10) ----------

// Extra details for the basket page: category and price before the discount
const productInfo = {
  "vitamin-c": { category: "Immunity", oldPrice: 27.00 },
  "zinc-c": { category: "Immunity", oldPrice: 18.50 },
  "elderberry": { category: "Immunity", oldPrice: 19.99 },
  "vitamin-b12": { category: "Energy", oldPrice: 20.00 },
  "b-complex": { category: "Energy", oldPrice: 25.00 },
  "iron-c": { category: "Energy", oldPrice: 20.00 },
  "vitamin-d3": { category: "Bones & Muscles", oldPrice: 25.00 },
  "calcium-d3": { category: "Bones & Muscles", oldPrice: 22.00 },
  "magnesium": { category: "Bones & Muscles", oldPrice: 27.70 },
  "mens-multi": { category: "Multivitamins", oldPrice: 30.00 },
  "womens-multi": { category: "Multivitamins", oldPrice: 30.00 },
  "kids-multi": { category: "Multivitamins", oldPrice: 22.00 }
};

const FREE_DELIVERY_FROM = 40;
const DELIVERY_COST = 4.99;

// 16.2 -> "€16.20"
function formatPrice(amount) {
  return "€" + amount.toFixed(2);
}

// Add or take away 1. If the quantity gets to 0, the product is removed.
function changeQuantity(id, change) {
  const basket = getBasket();
  const newBasket = [];

  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === id) {
      basket[i].quantity = basket[i].quantity + change;
    }
    if (basket[i].quantity > 0) {
      newBasket.push(basket[i]);
    }
  }

  saveBasket(newBasket);
  updateBasketCount();
  showBasket();
}

function removeFromBasket(id) {
  const basket = getBasket();
  const newBasket = [];

  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id !== id) {
      newBasket.push(basket[i]);
    }
  }

  saveBasket(newBasket);
  updateBasketCount();
  showBasket();
}

// Draw the basket list and the order summary
function showBasket() {
  const itemsBox = document.getElementById("basket-items");

  // This only runs on the basket page
  if (itemsBox === null) {
    return;
  }

  const basket = getBasket();
  let originalSubtotal = 0;
  let itemsTotal = 0;
  let html = "";

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const info = productInfo[item.id];

    originalSubtotal = originalSubtotal + info.oldPrice * item.quantity;
    itemsTotal = itemsTotal + item.price * item.quantity;

    html = html +
      '<div class="basket-row">' +
        '<div class="basket-thumb"><i class="bi bi-capsule"></i></div>' +
        '<div class="flex-grow-1">' +
          '<span class="tag-category">' + info.category + '</span>' +
          '<h3 class="h6 mt-2 mb-1">' + item.name + '</h3>' +
          '<span class="price">' + formatPrice(item.price) + '</span> ' +
          '<del class="text-muted-vw small">' + formatPrice(info.oldPrice) + '</del>' +
        '</div>' +
        '<div class="text-end">' +
          '<div class="btn-group btn-group-sm" role="group" aria-label="Quantity">' +
            '<button class="btn btn-outline-primary" onclick="changeQuantity(\'' + item.id + '\', -1)">-</button>' +
            '<span class="btn btn-outline-primary disabled">' + item.quantity + '</span>' +
            '<button class="btn btn-outline-primary" onclick="changeQuantity(\'' + item.id + '\', 1)">+</button>' +
          '</div>' +
          '<button class="btn btn-link btn-sm text-danger d-block ms-auto" onclick="removeFromBasket(\'' + item.id + '\')">' +
            '<i class="bi bi-trash"></i> Remove' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  itemsBox.innerHTML = html;

  // Show the "empty basket" message only when there is nothing in it
  const emptyBox = document.getElementById("basket-empty");
  if (basket.length === 0) {
    emptyBox.classList.remove("d-none");
  } else {
    emptyBox.classList.add("d-none");
  }

  // Delivery is free over €40 (and there is nothing to deliver if the basket is empty)
  let delivery = DELIVERY_COST;
  if (itemsTotal >= FREE_DELIVERY_FROM || basket.length === 0) {
    delivery = 0;
  }

  document.getElementById("summary-subtotal").textContent = formatPrice(originalSubtotal);
  document.getElementById("summary-savings").textContent = "-" + formatPrice(originalSubtotal - itemsTotal);
  if (delivery === 0 && basket.length > 0) {
    document.getElementById("summary-delivery").textContent = "FREE";
  } else {
    document.getElementById("summary-delivery").textContent = formatPrice(delivery);
  }
  document.getElementById("summary-total").textContent = formatPrice(itemsTotal + delivery);
}

// Show the right number when any page loads, and the list on the basket page
updateBasketCount();
showBasket();
