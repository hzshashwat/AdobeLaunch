/* ───────── Products ───────── */
const products = [
  {
    id: 'sf24-16',
    name: 'Bburago 1/18 Ferrari SF-24 #16',
    price: 14500,
    desc: 'Formula-1 Ferrari SF-24 (Charles Leclerc) die-cast 1:18.',
    images: [
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-1.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-2.webp?fit=1000%2C1000&ssl=1'
    ]
  },
  {
    id: 'sf24-55',
    name: 'Bburago 1/18 Ferrari SF-24 #55',
    price: 14500,
    desc: 'Formula-1 Ferrari SF-24 (Carlos Sainz) die-cast 1:18.',
    images: [
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-1.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-2.webp?fit=1000%2C1000&ssl=1'
    ]
  },
  {
    id: 'rb19-1',
    name: 'Minichamps 1/18 Red Bull RB19 #1',
    price: 14999,
    desc: 'Oracle Red Bull Racing RB19 (Max Verstappen) die-cast 1:18.',
    images: [
      'https://images.unsplash.com/photo-1558981033-ffe230b5f0cc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558981403-ef13db88ad12?auto=format&fit=crop&w=1000&q=80'
    ]
  }
];

/* ───────── Elements ───────── */
const productGrid   = document.getElementById('product-grid');
const cartCount     = document.getElementById('cart-count');
const cartItemsEl   = document.getElementById('cart-items');
const cartFooter    = document.getElementById('cart-footer');
const cartTotalEl   = document.getElementById('cart-total');

const modal         = document.getElementById('modal');
const modalImg      = document.getElementById('modal-img');
const modalTitle    = document.getElementById('modal-title');
const modalDesc     = document.getElementById('modal-desc');
const modalPrice    = document.getElementById('modal-price');
const modalAddBtn   = document.getElementById('modal-add-btn');
const carouselDots  = document.getElementById('carousel-dots');

/* ───────── State ───────── */
let cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
let currentProductId = null;
let currentIndex = 0;
let carouselTimer;

/* ───────── Init ───────── */
renderProducts();
updateCartUI();

/* ───────── Render Functions ───────── */
function renderProducts() {
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-price">₹${p.price.toLocaleString()}</p>
      </div>`;
    productGrid.appendChild(card);
  });
}

/* ───────── Cart Helpers ───────── */
function addToCart(id) {
  const found = cart.find(i => i.id === id);
  found ? found.qty++ : cart.push({ id, qty: 1 });
  persistCart();
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  persistCart();
}
function persistCart() {
  localStorage.setItem('carboncraft_cart', JSON.stringify(cart));
  updateCartUI();
}
function updateCartUI() {
  cartCount.textContent = cart.reduce((n, i) => n + i.qty, 0);
  cartItemsEl.innerHTML = '';
  if (!cart.length) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    cartFooter.classList.add('hidden'); return;
  }
  cartFooter.classList.remove('hidden');

  let total = 0;
  cart.forEach(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return;
    total += p.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="cart-item-info">
        <h3>${p.name}</h3>
        <p>Qty: ${item.qty}</p>
        <p class="card-price">₹${p.price.toLocaleString()}</p>
      </div>
      <button class="btn" data-remove="${p.id}">&times;</button>`;
    cartItemsEl.appendChild(row);
  });
  cartTotalEl.textContent = `₹${total.toLocaleString()}`;
}

/* ───────── Modal & Carousel ───────── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentProductId = id;
  currentIndex = 0;

  modalTitle.textContent = p.name;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = `₹${p.price.toLocaleString()}`;
  modalImg.src = p.images[currentIndex];

  buildDots(p.images.length);
  highlightDot(currentIndex);

  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % p.images.length;
    updateCarouselImage(p.images);
  }, 4000);

  modal.classList.remove('hidden');
}
function closeModal() {
  modal.classList.add('hidden');
  clearInterval(carouselTimer);
}
function buildDots(count) {
  carouselDots.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const btn = document.createElement('button');
    btn.dataset.index = i;
    carouselDots.appendChild(btn);
  }
}
function highlightDot(i) {
  [...carouselDots.children].forEach(d => d.classList.toggle('active', +d.dataset.index === i));
}
function updateCarouselImage(imgArr) {
  modalImg.src = imgArr[currentIndex];
  highlightDot(currentIndex);
}

/* ───────── Event Listeners ───────── */
productGrid.addEventListener('click', e => {
  const card = e.target.closest('.product-card');
  if (card) openModal(card.dataset.id);
});

modalAddBtn.addEventListener('click', () => {
  addToCart(currentProductId);
  closeModal();
});
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

carouselDots.addEventListener('click', e => {
  if (!e.target.dataset.index) return;
  const p = products.find(x => x.id === currentProductId);
  if (!p) return;
  currentIndex = +e.target.dataset.index;
  updateCarouselImage(p.images);
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % p.images.length;
    updateCarouselImage(p.images);
  }, 4000);
});

cartItemsEl.addEventListener('click', e => {
  const id = e.target.dataset.remove;
  if (id) removeFromCart(id);
});

/* Home-page tab switcher (Shop ↔ Cart) */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (!document.querySelector('main')) return; // ignore on about/contact
    document.querySelectorAll('main .section').forEach(s => s.classList.add('hidden'));
    (link.classList.contains('cart-link') ? document.getElementById('cart') : document.getElementById('shop'))
      .classList.remove('hidden');
  });
});
