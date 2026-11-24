// VitaWave - Black Friday products, filter and sort (#9).
// Carlo: filter and sort code

const grid = document.getElementById("product-grid");
const products = document.querySelectorAll(".product-col");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sort-select");

let currentFilter = "all";

// Show only the products of the chosen category and update the counter
function showProducts() {
  let shown = 0;

  for (let i = 0; i < products.length; i++) {
    const category = products[i].getAttribute("data-category");

    if (currentFilter === "all" || category === currentFilter) {
      products[i].classList.remove("d-none");
      shown = shown + 1;
    } else {
      products[i].classList.add("d-none");
    }
  }

  if (shown === 1) {
    document.getElementById("deal-count").textContent = "Showing 1 deal";
  } else {
    document.getElementById("deal-count").textContent = "Showing " + shown + " deals";
  }

  // Message when nothing matches
  const noResults = document.getElementById("no-results");
  if (shown === 0) {
    noResults.classList.remove("d-none");
  } else {
    noResults.classList.add("d-none");
  }
}

// Put the cards in a new order. "Featured" keeps the order of the HTML.
function sortProducts() {
  const list = Array.from(products);
  const option = sortSelect.value;

  if (option === "price-low") {
    list.sort(function (a, b) {
      return parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price"));
    });
  } else if (option === "price-high") {
    list.sort(function (a, b) {
      return parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price"));
    });
  } else if (option === "discount") {
    list.sort(function (a, b) {
      return parseInt(b.getAttribute("data-discount")) - parseInt(a.getAttribute("data-discount"));
    });
  }

  // appendChild moves each card to the end, so they end up in the new order
  for (let i = 0; i < list.length; i++) {
    grid.appendChild(list[i]);
  }
}

// Category buttons
for (let i = 0; i < filterButtons.length; i++) {
  const button = filterButtons[i];

  button.addEventListener("click", function () {
    currentFilter = button.getAttribute("data-filter");

    // Highlight the button that was clicked
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("btn-primary");
      filterButtons[j].classList.add("btn-outline-primary");
    }
    button.classList.remove("btn-outline-primary");
    button.classList.add("btn-primary");

    showProducts();
  });
}

// Sort dropdown
sortSelect.addEventListener("change", sortProducts);
