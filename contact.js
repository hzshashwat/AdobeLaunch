/* contact.js  – handles the Contact Us form & GA tracking */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');

  form.addEventListener('submit', e => {
    e.preventDefault();                        // ← remove when posting to a server

    /* ---- collect values ---- */
    const data = {
      name:       form.name.value.trim(),
      email:      form.email.value.trim(),
      age:        form.age.value || null,
      rating:     form.rating.value || null,
      purchases:  form.purchases.value || 0,
      feedback:   form.feedback.value.trim()
    };

    /* ---- send GA event ---- */
    /*  Make sure gtag() is defined (your gtag snippet is loaded in <head>) */
    if (typeof gtag === 'function') {
      gtag('event', 'contact_form_submit', {
        event_category: 'engagement',
        event_label:    'Contact Form',
        value:          data.rating || 0,             // numeric parameter GA4 likes
        age:            data.age,
        purchases:      data.purchases
        /* You can add more custom parameters in GA4 if you wish */
      });
    }

    /* ---- simple toast confirmation ---- */
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

    form.reset();
  });
});
