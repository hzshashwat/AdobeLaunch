/* shop.js - Handles shop page functionality with Adobe Launch tracking */

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
    else if (p.name.toLowerCase().includes('aston martin')) team = 'astonmartin';
    else if (p.name.toLowerCase().includes('alpine')) team = 'alpine';
    return { ...p, team };
  });

  // State
  let filteredProducts = [...productsWithTeams];

  // Track product impressions on page load
  function trackProductImpressions() {
    if (window.dataLayer && filteredProducts.length > 0) {
      const impressions = filteredProducts.slice(0, 20).map((p, index) => ({
        'id': p.id,
        'name': p.name,
        'category': 'F1 Model Cars',
        'brand': p.name.split(' ')[0],
        'price': p.price,
        'position': index + 1,
        'list': 'Shop Page'
      }));

      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        'event': 'product_impressions',
        'ecommerce': {
          'impressions': impressions
        }
      });
    }
  }

  // Render filtered products
  function renderFilteredProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      noResults.classList.remove('hidden');
      return;
    }
    
    noResults.classList.add('hidden');
    
    filteredProducts.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.id = p.id;
      card.dataset.position = index + 1;
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <p class="card-price">₹${p.price.toLocaleString()}</p>
        </div>`;
      grid.appendChild(card);
    });

    // Track impressions after rendering
    trackProductImpressions();
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

  // Search tracking with debounce
  let searchTimer;
  searchInput.addEventListener('input', (e) => {
    // First apply the filter
    filterAndSortProducts();
    
    // Then track the search
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (e.target.value.length > 2) { // Only track searches with 3+ characters
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'site_search',
            'search': {
              'term': e.target.value,
              'results': filteredProducts.length,
              'page': 'shop'
            }
          });
        }
      }
    }, 1000); // Wait 1 second after user stops typing
  });

  // Filter tracking
  filterSelect.addEventListener('change', (e) => {
    filterAndSortProducts();
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'filter_products',
        'filter': {
          'type': 'team',
          'value': e.target.value,
          'results': filteredProducts.length
        }
      });
    }
  });

  // Sort tracking
  sortSelect.addEventListener('change', (e) => {
    filterAndSortProducts();
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'sort_products',
        'sort': {
          'method': e.target.value,
          'results': filteredProducts.length
        }
      });
    }
  });

  // Handle product clicks with enhanced tracking
  document.getElementById('product-grid').addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) {
      const productId = card.dataset.id;
      const position = card.dataset.position;
      const product = productsWithTeams.find(p => p.id === productId);
      
      // Track product click
      if (window.dataLayer && product) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          'event': 'product_click',
          'ecommerce': {
            'click': {
              'actionField': {'list': 'Shop Page'},
              'products': [{
                'id': product.id,
                'name': product.name,
                'category': 'F1 Model Cars',
                'brand': product.name.split(' ')[0],
                'price': product.price,
                'position': parseInt(position)
              }]
            }
          }
        });
      }
      
      // Open modal (from app.js)
      openModal(productId);
    }
  });

  // Track page timing
  window.addEventListener('load', () => {
    if (window.dataLayer && window.performance) {
      const loadTime = Math.round(performance.now());
      window.dataLayer.push({
        'event': 'page_timing',
        'timing': {
          'page': 'shop',
          'loadTime': loadTime
        }
      });
    }
  });

  // Initial render
  renderFilteredProducts();
  updateCartUI();
});