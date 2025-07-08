/* ───────── Products ───────── */
const products = [
  {
    id: 'sf24-16',
    name: 'Bburago 1/18 Ferrari SF-24 #16',
    price: 14500,
    desc: 'Formula 1 Car Model of 2024 Ferrari SF24 Charles Leclerc (with Plex Case), 1:18 Scale, metal/plastic/rubber build with display base.',
    images: [
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-1.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-2.webp?fit=1600%2C1600&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/12/bburago-sf24-ferrari-charles-leclerc-3.webp?fit=1600%2C1600&ssl=1'
    ]
  },
  {
    id: 'mcl38-81',
    name: 'Limited Edition 1/8 McLaren MCL38 #81 – Monaco GP',
    price: 43550,
    desc: '1:8 Scale Limited Edition McLaren MCL38 Oscar Piastri Monaco GP Special. 1 of 99 made. Expertly engineered with Senna tribute livery.',
    images: [
      'https://www.f1authentics.com/cdn/shop/files/MCL38_Monaco_OP_unbrand_side_4000x2677_crop_center_jpg.webp?v=1733412532&width=1000',
      'https://www.f1authentics.com/cdn/shop/files/MCL38_Monaco_OP_unbrand_front_4000x2677_crop_center_jpg.webp?v=1733412531&width=500',
      'https://www.f1authentics.com/cdn/shop/files/MCL38_Monaco_OP_unbrand_overhead_4000x2677_crop_center_jpg.webp?v=1733412531&width=500'
    ]
  },
  {
    id: 'rb18-1',
    name: 'Red Bull 1/18 RB18 #1 Max Verstappen',
    price: 23000,
    desc: 'Red Bull Racing RB18 (Max Verstappen) 1:18 Die-cast Model with free rolling wheels and licensed realistic design.',
    images: [
      'https://krazycaterpillar.com/cdn/shop/files/Bburago-Red-Bull-2023-F1-_1-Max-Verstappen-RB19-1-18-Die-Cast-Scale-Model_1_1800x1800.jpg?v=1739447811',
      'https://krazycaterpillar.com/cdn/shop/files/Bburago-Red-Bull-2023-F1-_1-Max-Verstappen-RB19-1-18-Die-Cast-Scale-Model_2_1800x1800.jpg?v=1739447811',
      'https://krazycaterpillar.com/cdn/shop/files/Bburago-Red-Bull-2023-F1-_1-Max-Verstappen-RB19-1-18-Die-Cast-Scale-Model_3_1800x1800.jpg?v=1739447810'
    ]
  },
  {
    id: 'w14-44',
    name: 'Mercedes-AMG F1 W14 #44 Lewis Hamilton 1/24',
    price: 9500,
    desc: '1:24 Mercedes W14 Lewis Hamilton model with pilot figure. Authentic proportions and livery. Length: 22.5cm. Includes driver.',
    images: [
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/11/bburago-mercedes-amg-f1-lewis-hamilton-1.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/11/bburago-mercedes-amg-f1-lewis-hamilton-4.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/11/bburago-mercedes-amg-f1-lewis-hamilton-3.webp?fit=1080%2C1080&ssl=1'
    ]
  },
  {
    id: 'lego-w14',
    name: 'LEGO Technic Mercedes-AMG F1 W14',
    price: 19999,
    desc: 'LEGO Technic 42171 set for adults to build a Mercedes F1 W14. Includes steering, working pistons, differential & DRS wing.',
    images: [
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/06/L42171-1.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/06/L42171-2.webp?fit=1000%2C1000&ssl=1',
      'https://i0.wp.com/mayatoys.in/wp-content/uploads/2024/06/L42171-3.webp?fit=1000%2C1000&ssl=1'
    ]
  },
  {
    id: 'sf23-55',
    name: 'Ferrari SF-23 #55 Carlos Sainz 1/43',
    price: 7999,
    desc: 'Official Ferrari SF-23 Carlos Sainz 1:43 scale model. Detailed cockpit, authentic Santander livery, and display case included.',
    images: [
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'amr23-14',
    name: 'Aston Martin AMR23 #14 Alonso Edition',
    price: 12500,
    desc: 'Limited Edition Aston Martin AMR23 Fernando Alonso model. 1:18 scale with working suspension and steering. British Racing Green finish.',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'alpine-a523',
    name: 'Alpine A523 French GP Special 1/18',
    price: 16999,
    desc: 'Alpine A523 French GP special livery. Features unique pink accents, 1:18 scale precision model with opening DRS wing.',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=800&q=80'
    ]
  }
];


/* ───────── Elements ───────── */
const cartCount     = document.getElementById('cart-count');
const cartItemsEl   = document.getElementById('cart-items');
const cartFooter    = document.getElementById('cart-footer');
const cartTotalEl   = document.getElementById('cart-total');
const checkoutBtn   = document.getElementById('checkout-btn');

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

/* ───────── Cart Helpers ───────── */
function addToCart(id) {
  const found = cart.find(i => i.id === id);
  found ? found.qty++ : cart.push({ id, qty: 1 });
  persistCart();
  
  // Push dataLayer event for add to cart
  const product = products.find(p => p.id === id);
  if (window.dataLayer && product) {
    window.dataLayer.push({
      event: 'add_to_cart',
      item_name: product.name,
      item_id: product.id,
      price: product.price,
      quantity: 1
    });
  }
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
  
  if (!cartItemsEl) return; // Exit if cart elements don't exist (shop page)
  
  cartItemsEl.innerHTML = '';
  if (!cart.length) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    cartFooter.classList.add('hidden'); 
    return;
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

/* ───────── Checkout ───────── */
function handleCheckout() {
  if (!cart.length) {
    alert('Your cart is empty!');
    return;
  }
  
  // Calculate total for dataLayer
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  
  // Push checkout event to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'begin_checkout',
      cart_total: total,
      cart_items: cart.length
    });
  }
  
  // Redirect to checkout success page
  window.location.href = 'checkout-success.html';
}

/* ───────── Event Listeners ───────── */
// Only add featured grid listener if it exists (homepage)
const featuredGrid = document.getElementById('featured-grid');
if (featuredGrid) {
  featuredGrid.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) openModal(card.dataset.id);
  });
}

// Modal events
if (modalAddBtn) {
  modalAddBtn.addEventListener('click', () => {
    addToCart(currentProductId);
    closeModal();
  });
}

if (document.getElementById('modal-close')) {
  document.getElementById('modal-close').addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', e => { 
    if (e.target === modal) closeModal(); 
  });
}

// Carousel dots
if (carouselDots) {
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
}

// Cart events
if (cartItemsEl) {
  cartItemsEl.addEventListener('click', e => {
    const id = e.target.dataset.remove;
    if (id) removeFromCart(id);
  });
}

// Checkout button
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', handleCheckout);
}

// Navigation for cart toggle
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    const isHashLink = href && href.startsWith('#');

    if (isHashLink) {
      event.preventDefault();
    }
    
    // Push dataLayer event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'nav_link_click',
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    }

    // Only toggle sections on homepage
    const mainEl = document.querySelector('main');
    if (!mainEl || !document.getElementById('featured')) return;
    
    if (link.classList.contains('cart-link') && isHashLink) {
      document.getElementById('featured').classList.add('hidden');
      document.getElementById('cart').classList.remove('hidden');
    } else if (href === '#featured' || href === 'index.html') {
      document.getElementById('cart').classList.add('hidden');
      document.getElementById('featured').classList.remove('hidden');
    }
  });
});

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});