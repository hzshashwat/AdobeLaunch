/* shop.js - Handles shop page functionality */

// Wait for DOM and products to be available
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('search-input');
  const filterSelect = document.getElementById('filter-select');
  const sortSelect = document.getElementById('sort-select');
  const noResults = document.getElementById('no-results');

  // Check if products array exists
  if (typeof products === 'undefined') {
    console.error('Products not loaded');
    return;
  }

  // Add team property to products
  const productsWithTeams = products.map(p => {
    let team = 'other';
    if (p.name.toLowerCase().includes('ferrari')) team = 'ferrari';
    else if (p.name.toLowerCase().includes('mclaren')) team = 'mclaren';
    else if (p.name.toLowerCase().includes('red bull')) team = 'redbull';
    else if (p.name.toLowerCase().includes('mercedes')) team = 'mercedes';
    return { ...p, team };
  });

  // State
  let filteredProducts = [...productsWithTeams];

  // Render filtered products
  function renderFilteredProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      noResults.classList.remove('hidden');
      return;
    }
    
    noResults.classList.add('hidden');
    
    filteredProducts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.id = p.id;
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <p class="card-price">₹${p.price.toLocaleString()}</p>
        </div>`;
      grid.appendChild(card);
    });
  }

  // Filter and sort products
  function filterAndSortProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const teamFilter = filterSelect.value;
    const sortOption = sortSelect.value;
    
    // Start with all products
    filteredProducts = [...productsWithTeams];
    
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.desc.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply team filter
    if (teamFilter !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.team === teamFilter);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // 'featured' is default order
    }
    
    renderFilteredProducts();
  }

  // Event listeners
  searchInput.addEventListener('input', filterAndSortProducts);
  filterSelect.addEventListener('change', filterAndSortProducts);
  sortSelect.addEventListener('change', filterAndSortProducts);

  // Handle product clicks
  document.getElementById('product-grid').addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) {
      openModal(card.dataset.id);
    }
  });

  // Handle cart toggle on shop page
  document.querySelector('.cart-link').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('shop').classList.add('hidden');
    document.getElementById('cart').classList.remove('hidden');
  });

  // Add back to shop link if not exists
  const cartSection = document.getElementById('cart');
  if (cartSection && !document.querySelector('.back-to-shop')) {
    const backLink = document.createElement('a');
    backLink.href = '#shop';
    backLink.className = 'back-to-shop';
    backLink.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to Shop';
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('cart').classList.add('hidden');
      document.getElementById('shop').classList.remove('hidden');
    });
    cartSection.insertBefore(backLink, cartSection.firstChild.nextSibling);
  }

  // Handle cart item removal
  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', e => {
      const id = e.target.dataset.remove;
      if (id) {
        let cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('carboncraft_cart', JSON.stringify(cart));
        updateCartUI();
      }
    });
  }

  // Add checkout button listener
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
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
    });
  }

  // Initial render
  renderFilteredProducts();
  updateCartUI();
});