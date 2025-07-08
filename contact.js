/* contact.js – handles the Contact Us form, pushes an event for GTM/GA4 */
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');

  // Update cart count from localStorage
  const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;

  form.addEventListener('submit', e => {
    e.preventDefault();            // ← remove when you post to a backend

    /* -------- collect values -------- */
    const payload = {
      name:       form.name.value.trim(),
      email:      form.email.value.trim(),
      age:        form.age.value || null,      // number (string for now)
      rating:     form.rating.value || null,   // 1-5
      purchases:  +form.purchases.value || 0,  // number
      feedback:   form.feedback.value.trim()
    };

    /* -------- send to GTM -------- */
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event:            'contact_form_submit',
      contact_name:     payload.name,
      contact_email:    payload.email,
      contact_age:      payload.age,
      contact_rating:   payload.rating,
      contact_purchases:payload.purchases,
      contact_feedback: payload.feedback     // only if you really need it
    });

    /* -------- OPTIONAL: direct gtag() path --------
    if (typeof gtag === 'function') {
      gtag('event', 'contact_form_submit', {
        age:       payload.age,
        rating:    payload.rating,
        purchases: payload.purchases
      });
    }
    ------------------------------------------------ */

    /* -------- UI niceties -------- */
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    form.reset();
  });

  // Add dataLayer push for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'nav_link_click',
          link_text: link.textContent.trim(),
          link_url: link.href
        });
      }
    });
  });
});