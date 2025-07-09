/* contact.js – handles the Contact Us form with enhanced Adobe Launch tracking */
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');

  // Update cart count from localStorage
  const cart = JSON.parse(localStorage.getItem('carboncraft_cart') || '[]');
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;

  // Track form field interactions
  let formInteractions = {
    startTime: null,
    fieldsFocused: new Set(),
    fieldsCompleted: new Set()
  };

  // Track form start
  form.addEventListener('focusin', (e) => {
    if (!formInteractions.startTime) {
      formInteractions.startTime = Date.now();
      
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'form_start',
          'form': {
            'name': 'contact_form',
            'type': 'contact'
          }
        });
      }
    }
    
    // Track field focus
    if (e.target.name) {
      formInteractions.fieldsFocused.add(e.target.name);
    }
  });

  // Track field completion
  form.addEventListener('change', (e) => {
    if (e.target.name && e.target.value.trim()) {
      formInteractions.fieldsCompleted.add(e.target.name);
    }
  });

  // Handle form submission
  form.addEventListener('submit', e => {
    e.preventDefault(); // Remove when you post to a backend

    // Calculate form completion time
    const completionTime = formInteractions.startTime ? 
      Math.round((Date.now() - formInteractions.startTime) / 1000) : 0;

    /* -------- collect values -------- */
    const payload = {
      name:       form.name.value.trim(),
      email:      form.email.value.trim(),
      age:        form.age.value || null,
      rating:     form.rating.value || null,
      purchases:  +form.purchases.value || 0,
      feedback:   form.feedback.value.trim()
    };

    /* -------- Enhanced tracking for Adobe Launch -------- */
    window.dataLayer = window.dataLayer || [];
    
    // Clear any previous form data
    dataLayer.push({ form: null });
    
    // Push enhanced form submission event
    dataLayer.push({
      event: 'contact_form_submit',
      form: {
        'name': 'contact_form',
        'type': 'contact',
        'completionTime': completionTime,
        'fieldsInteracted': formInteractions.fieldsFocused.size,
        'fieldsCompleted': formInteractions.fieldsCompleted.size
      },
      contact: {
        'name': payload.name,
        'email': payload.email,
        'age': payload.age ? parseInt(payload.age) : null,
        'rating': payload.rating ? parseInt(payload.rating) : null,
        'purchases': payload.purchases,
        'hasMessage': payload.feedback.length > 0,
        'messageLength': payload.feedback.length
      }
    });

    // Track rating as a separate event if provided
    if (payload.rating) {
      dataLayer.push({
        'event': 'user_rating',
        'rating': {
          'value': parseInt(payload.rating),
          'max': 5,
          'source': 'contact_form'
        }
      });
    }

    /* -------- UI feedback -------- */
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    
    // Reset form and tracking
    form.reset();
    formInteractions = {
      startTime: null,
      fieldsFocused: new Set(),
      fieldsCompleted: new Set()
    };

    // Log success for debugging
    console.log('Form submitted successfully', {
      completionTime: completionTime + 's',
      fieldsInteracted: formInteractions.fieldsFocused.size
    });
  });

  // Add dataLayer push for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'navigation_click',
          navigation: {
            'text': link.textContent.trim(),
            'url': link.href,
            'type': 'header'
          }
        });
      }
    });
  });

  // Track social link clicks
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (event) => {
      const platform = link.querySelector('i').className.includes('facebook') ? 'facebook' :
                      link.querySelector('i').className.includes('twitter') ? 'twitter' :
                      link.querySelector('i').className.includes('instagram') ? 'instagram' :
                      link.querySelector('i').className.includes('youtube') ? 'youtube' : 'unknown';
      
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'social_click',
          'social': {
            'platform': platform,
            'action': 'follow',
            'location': 'contact_page'
          }
        });
      }
    });
  });

  // Track contact method clicks (phone, email)
  document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', (event) => {
      const icon = item.querySelector('i');
      let contactMethod = 'unknown';
      
      if (icon.classList.contains('fa-phone')) contactMethod = 'phone';
      else if (icon.classList.contains('fa-envelope')) contactMethod = 'email';
      else if (icon.classList.contains('fa-location-dot')) contactMethod = 'location';
      
      if (window.dataLayer && contactMethod !== 'unknown') {
        window.dataLayer.push({
          'event': 'contact_method_click',
          'contact': {
            'method': contactMethod,
            'page': 'contact'
          }
        });
      }
    });
  });
});