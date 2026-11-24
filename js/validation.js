// VitaWave - custom form validation: checkout form (#11) and contact form (#15).
// Carlo: validation code

// ---------- Helpers used by both forms ----------

// Red border and a message under the field
function showError(input, message) {
  input.classList.add("is-invalid");
  document.getElementById(input.id + "-error").textContent = message;
}

function clearError(input) {
  input.classList.remove("is-invalid");
  document.getElementById(input.id + "-error").textContent = "";
}

// true if the text only has the numbers 0 to 9
function isOnlyDigits(text) {
  if (text.length === 0) {
    return false;
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] < "0" || text[i] > "9") {
      return false;
    }
  }
  return true;
}

function isLetter(character) {
  return character >= "A" && character <= "Z";
}

// Simple email check: something@something.something
function isValidEmail(email) {
  const at = email.indexOf("@");
  const dot = email.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < email.length - 1 && email.indexOf(" ") === -1;
}

// Irish Eircode: 3 characters for the area + 4 characters, for example D02 X285.
// The area is a letter and two numbers (D6W is the only one with a letter at the end).
function isValidEircode(eircode) {
  const code = eircode.replace(" ", "").toUpperCase();

  if (code.length !== 7) {
    return false;
  }

  const area = code.substring(0, 3);
  const unique = code.substring(3);

  if (area !== "D6W") {
    if (!isLetter(area[0]) || !isOnlyDigits(area.substring(1))) {
      return false;
    }
  }

  for (let i = 0; i < unique.length; i++) {
    if (!isLetter(unique[i]) && !isOnlyDigits(unique[i])) {
      return false;
    }
  }
  return true;
}

// Expiry date in MM/YY format, and not in the past
function isValidExpiry(expiry) {
  if (expiry.length !== 5 || expiry[2] !== "/") {
    return false;
  }

  const monthText = expiry.substring(0, 2);
  const yearText = expiry.substring(3);
  if (!isOnlyDigits(monthText) || !isOnlyDigits(yearText)) {
    return false;
  }

  const month = parseInt(monthText);
  const year = 2000 + parseInt(yearText);
  if (month < 1 || month > 12) {
    return false;
  }

  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;

  if (year < thisYear || (year === thisYear && month < thisMonth)) {
    return false;
  }
  return true;
}

// ---------- Checkout form on the basket page (#11) ----------

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm !== null) {
  checkoutForm.addEventListener("submit", function (event) {
    // Stop the page from reloading, this is a demo
    event.preventDefault();

    const success = document.getElementById("checkout-success");
    success.classList.add("d-none");

    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const eircode = document.getElementById("eircode");
    const cardNumber = document.getElementById("card-number");
    const expiry = document.getElementById("expiry");
    const cvv = document.getElementById("cvv");

    let isValid = true;

    if (fullName.value.trim().length < 2) {
      showError(fullName, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(fullName);
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email, for example name@example.ie.");
      isValid = false;
    } else {
      clearError(email);
    }

    if (address.value.trim().length < 5) {
      showError(address, "Please enter your delivery address.");
      isValid = false;
    } else {
      clearError(address);
    }

    if (!isValidEircode(eircode.value.trim())) {
      showError(eircode, "Please enter a valid Eircode, for example D02 X285.");
      isValid = false;
    } else {
      clearError(eircode);
    }

    if (!isOnlyDigits(cardNumber.value.split(" ").join("")) || cardNumber.value.split(" ").join("").length !== 16) {
      showError(cardNumber, "The card number must have 16 digits.");
      isValid = false;
    } else {
      clearError(cardNumber);
    }

    if (!isValidExpiry(expiry.value.trim())) {
      showError(expiry, "Please enter a valid date (MM/YY) that is not in the past.");
      isValid = false;
    } else {
      clearError(expiry);
    }

    if (!isOnlyDigits(cvv.value) || cvv.value.length !== 3) {
      showError(cvv, "The CVV must have 3 digits.");
      isValid = false;
    } else {
      clearError(cvv);
    }

    // You can't place an order with an empty basket
    const emptyWarning = document.getElementById("checkout-empty");
    if (getBasket().length === 0) {
      emptyWarning.classList.remove("d-none");
      isValid = false;
    } else {
      emptyWarning.classList.add("d-none");
    }

    if (isValid) {
      success.classList.remove("d-none");
      checkoutForm.reset();

      // Demo order done: empty the basket
      localStorage.removeItem("vitawave-basket");
      updateBasketCount();
      showBasket();
    }
  });
}

// ---------- Contact form on the Help page (#15) ----------
// Goes here once the form HTML from #14 is ready.
