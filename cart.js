// === Variables principales ===
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// === Guardar carrito en localStorage ===
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// === Actualizar contador de carrito (en el menú) ===
function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// === Renderizar carrito ===
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = (item.price * item.qty).toFixed(2);
    total += parseFloat(itemTotal);

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" 
           style="width:50px;height:50px;object-fit:cover;margin-right:10px;">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input">
      <span>$${itemTotal}</span>
      <button class="btn remove-btn" data-index="${index}">X</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
  saveCart();
  addListeners();
}

// === Listeners para inputs y botones ===
function addListeners() {
  // Cambiar cantidad
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      cart[index].qty = parseInt(e.target.value);
      saveCart();
      renderCart();
    });
  });

  // Eliminar producto
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

// === Vaciar carrito ===
const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCart();
  });
}

// === Inicializar ===
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();
});




