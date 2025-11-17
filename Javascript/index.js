// ---- Load Navbar ----
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;
  });

// ---------------- CART SYSTEM -----------------

// Load cart from localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

// Add item
function addToCart(itemName, itemPrice, itemImage) {
  let cart = loadCart();

  let existing = cart.find((i) => i.name === itemName);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: itemName,
      price: Number(itemPrice),
      image: itemImage,
      qty: 1,
    });
  }

  saveCart(cart);
  alert(itemName + " added to cart!");
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-cartbtn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");

      const itemName = card.querySelector("h5").innerText;
      const itemPrice = card
        .querySelector(".price-btn")
        .innerText.replace("$", "");
      const itemImage = card.querySelector("img").src;

      addToCart(itemName, itemPrice, itemImage);
    });
  });
});

// Function to handle "New in Town" item add to cart
document.addEventListener("DOMContentLoaded", () => {
  const newItemBtn = document.querySelector(".newintownprice button");

  if (newItemBtn) {
    newItemBtn.addEventListener("click", () => {
      const newItem = newItemBtn.closest(".newintown");

      const itemName = newItem.querySelector("h2").innerText;
      const itemPrice = newItem
        .querySelector(".newintownprice h1")
        .innerText.replace("$", "");
      const itemImage = newItem.querySelector("img").src;

      addToCart(itemName, itemPrice, itemImage); // Reuse the same function from menu.js
    });
  }
});
