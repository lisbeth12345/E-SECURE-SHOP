const products = [
  { id: 'arroz', name: 'Arroz', price: 2.50, image: 'https://www.infoescola.com/wp-content/uploads/2010/11/arroz_255077296.jpg' },
  { id: 'azucar', name: 'Azúcar', price: 1.80, image: 'https://static.wixstatic.com/media/fa1793_8ed18d08493f4772840ec84528285798~mv2.png/v1/fill/w_420,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fa1793_8ed18d08493f4772840ec84528285798~mv2.png' },
  { id: 'aceite', name: 'Aceite', price: 3.20, image: 'https://tse4.mm.bing.net/th/id/OIP.Uf5nWF-SBBGvIY2thGYuKAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'leche', name: 'Leche', price: 1.50, image: 'https://www.gob.mx/cms/uploads/image/file/255683/img_leche.jpg' },
  { id: 'pan', name: 'Pan', price: 1.00, image: 'https://tse1.explicit.bing.net/th/id/OIP.f2-Um7udNaIEb4Bp3KNF3gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'huevos', name: 'Huevos', price: 2.20, image: 'https://tse1.explicit.bing.net/th/id/OIP.s_z9501Pi8zZiEoVS9M9OgHaGW?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'jabon', name: 'Jabón', price: 0.90, image: 'https://www.muyinteresante.com/wp-content/uploads/sites/5/2022/10/18/634ea3b86192e-e1738405154844.jpeg?w=800' },
  { id: 'pasta', name: 'Pasta', price: 1.30, image: 'https://m.media-amazon.com/images/I/61xlZWxRv+L.jpg' },
  { id: 'harina', name: 'Harina', price: 1.10, image: 'https://i.blogs.es/95d4c3/harina-trigo-tipos/1366_2000.jpg' },
  { id: 'arroz-integral', name: 'Arroz Integral', price: 2.80, image: 'https://www.dietas-sanas.es/wp-content/uploads/2022/09/El_arroz_integral-scaled.jpeg' }
];


const container = document.getElementById('products-container');
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h4>${product.name}</h4>
    <p class="price">$${product.price.toFixed(2)}</p>
    <button class="btn">Agregar al carrito</button>
  `;
  container.appendChild(card);

  
  card.querySelector('button').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({...product, qty: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} agregado al carrito!`);
  });
});
