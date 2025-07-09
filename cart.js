/* cart.js - Handles cart page specific functionality with Adobe Launch tracking */

// Cart page specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Make sure products are loaded
  if (typeof products === 'undefined') {
    console.error('Products not loaded');
    return;
  }
  
  // Track cart view
  function trackCartView() {
    const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
    
    if (window.dataLayer && cart.length > 0) {
      const cartProducts = [];
      let cartTotal = 0;
      
      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          cartTotal += product.price * item.qty;
          cartProducts.push({
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'quantity': item.qty,
            'category': 'F1 Model Cars'
          });
        }
      });
      
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        'event': 'view_cart',
        'ecommerce': {
          'value': cartTotal,
          'currency': 'INR',
          'items': cartProducts
        }
      });
    }
  }
  
  // Update cart page UI with animations and tracking
  function updateCartPageUI() {
    const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const cartItemsEl = document.getElementById('cart-items');
    
    if (cart.length === 0) {
      cartEmpty.classList.remove('hidden');
      cartContent.classList.add('hidden');
      
      // Track empty cart view
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'cart_empty',
          'cart': {
            'status': 'empty',
            'page': 'cart'
          }
        });
      }
    } else {
      cartEmpty.classList.add('hidden');
      cartContent.classList.remove('hidden');
      
      // Render cart items
      cartItemsEl.innerHTML = '';
      let total = 0;
      
      cart.forEach((item, index) => {
        const p = products.find(x => x.id === item.id);
        if (!p) {
          console.error('Product not found:', item.id);
          return;
        }
        
        total += p.price * item.qty;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.dataset.productId = p.id;
        row.dataset.position = index + 1;
        row.innerHTML = `
          <img src="${p.images[0]}" alt="${p.name}">
          <div class="cart-item-info">
            <h3>${p.name}</h3>
            <p class="unit-price">₹${p.price.toLocaleString()} each</p>
            <div class="quantity-controls">
              <button class="qty-btn" data-action="decrease" data-id="${p.id}">−</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${p.id}">+</button>
            </div>
            <p class="card-price">₹${(p.price * item.qty).toLocaleString()}</p>
          </div>
          <button class="remove-btn" data-remove="${p.id}" title="Remove from cart">
            <i class="fa-solid fa-trash"></i>
          </button>`;
        cartItemsEl.appendChild(row);
      });
      
      // Update totals
      const subtotalEl = document.getElementById('cart-subtotal');
      const totalEl = document.getElementById('cart-total');
      if (subtotalEl) {
        subtotalEl.textContent = `₹${total.toLocaleString()}`;
      }
      if (totalEl) {
        totalEl.textContent = `₹${total.toLocaleString()}`;
      }
      
      // Update cart count
      const cartCount = cart.reduce((n, i) => n + i.qty, 0);
      document.getElementById('cart-count').textContent = cartCount;
    }
  }
  
  // Handle quantity changes
  function updateQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item && product) {
      const oldQty = item.qty;
      
      if (action === 'increase') {
        item.qty++;
      } else if (action === 'decrease' && item.qty > 1) {
        item.qty--;
      }
      
      // Track quantity change
      if (window.dataLayer && oldQty !== item.qty) {
        const changeType = action === 'increase' ? 'add' : 'remove';
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          'event': 'cart_quantity_change',
          'ecommerce': {
            [changeType]: {
              'products': [{
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': 1,
                'category': 'F1 Model Cars'
              }]
            }
          }
        });
      }
      
      localStorage.setItem('carboncraft_cart', JSON.stringify(cart));
      updateCartPageUI();
    }
  }
  
  // Initialize cart page
  trackCartView();
  updateCartPageUI();
  
  // Handle checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Track checkout initiation from cart page
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'checkout_start',
          'checkout': {
            'source': 'cart_page',
            'items': JSON.parse(localStorage.getItem('carboncraft_cart') || '[]').length
          }
        });
      }
      
      // Call the global handleCheckout function from app.js
      if (typeof handleCheckout === 'function') {
        handleCheckout();
      }
    });
  }
  
  // Handle cart item interactions
  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', e => {
      // Handle remove button (click on button or icon)
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) {
        const id = removeBtn.dataset.remove;
        const cartItem = removeBtn.closest('.cart-item');
        const position = cartItem.dataset.position;
        
        // Track remove initiation
        const product = products.find(p => p.id === id);
        if (window.dataLayer && product) {
          window.dataLayer.push({
            'event': 'remove_from_cart_initiated',
            'product': {
              'id': product.id,
              'name': product.name,
              'position': parseInt(position)
            }
          });
        }
        
        // Add animation class
        cartItem.classList.add('removing');
        
        // Wait for animation then remove
        setTimeout(() => {
          // This will trigger the tracking in removeFromCart function
          if (typeof removeFromCart === 'function') {
            removeFromCart(id);
          } else {
            // Fallback if removeFromCart is not available
            let cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
            cart = cart.filter(i => i.id !== id);
            localStorage.setItem('carboncraft_cart', JSON.stringify(cart));
          }
          updateCartPageUI();
        }, 300);
      }
      
      // Handle quantity adjustment
      const qtyBtn = e.target.closest('[data-action]');
      if (qtyBtn) {
        const action = qtyBtn.dataset.action;
        const id = qtyBtn.dataset.id;
        updateQuantity(id, action);
      }
    });
  }
  
  // Track continue shopping clicks
  const continueShoppingLink = document.querySelector('.continue-shopping');
  if (continueShoppingLink) {
    continueShoppingLink.addEventListener('click', () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'continue_shopping',
          'navigation': {
            'from': 'cart_page',
            'to': 'shop_page'
          }
        });
      }
    });
  }
  
  // Track "Start Shopping" from empty cart
  const startShoppingBtn = document.querySelector('.cart-empty .btn');
  if (startShoppingBtn) {
    startShoppingBtn.addEventListener('click', () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'start_shopping',
          'navigation': {
            'from': 'empty_cart',
            'to': 'shop_page'
          }
        });
      }
    });
  }
  
  // Track page timing specifically for cart page
  window.addEventListener('load', () => {
    if (window.dataLayer && window.performance) {
      const loadTime = Math.round(performance.now());
      window.dataLayer.push({
        'event': 'cart_page_timing',
        'timing': {
          'page': 'cart',
          'loadTime': loadTime,
          'cartItems': JSON.parse(localStorage.getItem('carboncraft_cart') || '[]').length
        }
      });
    }
  });
});