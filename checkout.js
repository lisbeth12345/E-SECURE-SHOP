let cart = JSON.parse(localStorage.getItem('cart')) || [];


function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalItems;
}


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}


function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    document.getElementById('cart-total').innerText = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>Precio: $${item.price.toFixed(2)}</p>
        <p>Cantidad: ${item.qty}</p>
        <button class="btn remove-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

 
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cart-total').innerText = total.toFixed(2);


  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      saveCart();
      renderCart();
    });
  });
}


document.getElementById('clear-cart').addEventListener('click', () => {
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    cart = [];
    saveCart();
    renderCart();
  }
});


document.getElementById('checkout-btn').addEventListener('click', async () => {
  if(cart.length === 0){
    alert('El carrito está vacío.');
    return;
  }

  try {
    const response = await fetch('https://e-secure-shop-1.onrender.com/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cart })
    });

    if(!response.ok) throw new Error('No se pudo crear la sesión');

    const data = await response.json();
   
    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    alert('Error al crear la sesión de pago. Revisa que el backend esté corriendo.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});


