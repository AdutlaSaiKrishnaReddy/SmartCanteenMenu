fetch("./navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;
  });

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function loadCart() {
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    let rowTotal = item.price * item.qty;
    grandTotal += rowTotal;

    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>

        <td class="qty-buttons">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
        </td>

        <td>$${rowTotal}</td>

        <td>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalAmount").innerText = `Total: $${grandTotal}`;
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function increaseQty(index) {
  cart[index].qty++;
  loadCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  loadCart();
}

function proceedCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  localStorage.removeItem("cartItems");

  document.body.innerHTML = `
    <div class="success-screen">
      <h1>Thank You for Ordering! 🎉</h1>
      <p>Your food is being prepared.</p>
      <a href="index.html" class="back-btn">Back to home page</a>
    </div>
  `;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
}

loadCart();
