/* cart.js - Handles cart page specific functionality */

// Cart page specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Make sure products are loaded
  if (typeof products === 'undefined') {
    console.error('Products not loaded');
    return;
  }
  
  updateCartPageUI();
  
  // Handle checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
  
  // Handle cart item removal
  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-remove]');
      if (btn) {
        const id = btn.dataset.remove;
        let cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('carboncraft_cart', JSON.stringify(cart));
        updateCartPageUI();
      }
    });
  }
});

function updateCartPageUI() {
  const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
  const cartEmpty = document.getElementById('cart-empty');
  const cartContent = document.getElementById('cart-content');
  const cartItemsEl = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartContent.classList.add('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    cartContent.classList.remove('hidden');
    
    // Render cart items
    cartItemsEl.innerHTML = '';
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