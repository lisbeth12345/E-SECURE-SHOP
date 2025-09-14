let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = (item.price * item.qty).toFixed(2);
    total += parseFloat(itemTotal);

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="50">
        <strong>${item.name}</strong> - 
        $${item.price.toFixed(2)} x ${item.qty} = 
        <b>$${itemTotal}</b>
        <button class="remove-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
  saveCart();
  addListeners();
}

function addListeners() {
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCart();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    alert("Redirigiendo a pasarela de pago...");
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
