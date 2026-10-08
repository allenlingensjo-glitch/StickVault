// StickVault — client-side JS
// Owns: nav toggle, email form submission (multi-form support), micro-animations,
//       GA4 event tracking (form_start, form_submit, affiliate_click, product_view)

(function () {
  'use strict';

  // ---- GA4 event helper — no-op when gtag not loaded (consent not given) ----
  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  // ---- Product page view — fires product_view on /shop/:slug pages ----
  if (window.location.pathname.match(/^\/shop\/[^/]+$/)) {
    var productTitle = document.querySelector('h1.product-detail-title');
    var productCat = document.querySelector('.product-cat');
    trackEvent('product_view', {
      page_path: window.location.pathname,
      product_name: productTitle ? productTitle.textContent.trim() : '',
      product_category: productCat ? productCat.textContent.trim() : '',
    });
  }

  // ---- Affiliate link click tracking + referrer policy (QW) ----
  // Fires affiliate_click GA4 event. Sets referrerpolicy so UTMs survive the redirect hop.
  document.querySelectorAll('a[href^="/r/"]').forEach(function (a) {
    if (!a.getAttribute('referrerpolicy')) {
      a.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    }
    a.addEventListener('click', function () {
      var slug = (a.getAttribute('href') || '').replace(/^\/r\//, '');
      trackEvent('affiliate_click', {
        link_slug: slug,
        link_url: a.getAttribute('href'),
        page_path: window.location.pathname,
      });
    });
  });

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      links.classList.toggle('is-open');
    });
  }

  // ---- Email subscribe forms (handles multiple on one page) ----
  // Each form uses data-source and data-form-id attributes for tracking.
  // Message element id = "msg-" + data-form-id.
  // Legacy #email-form support retained for backward compat.
  // Guard against double-binding: skip forms already processed by a prior pass
  function bindEmailForm(form) {
    if (form.hasAttribute('data-email-form-bound')) { return; }
    form.setAttribute('data-email-form-bound', '1');

    var formId = form.getAttribute('data-form-id') || 'email-form';
    var source = form.getAttribute('data-source') || 'inline-form';
    var msgEl = document.getElementById('msg-' + formId)
               || form.parentElement.querySelector('.email-form-message')
               || document.getElementById('email-message');

    // GA4: form_start on first focus
    var formStarted = false;
    var emailInputEl = form.querySelector('input[name="email"]');
    if (emailInputEl) {
      emailInputEl.addEventListener('focus', function () {
        if (!formStarted) {
          formStarted = true;
          trackEvent('form_start', { form_id: formId, form_location: source });
        }
      }, { once: false });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[name="email"]');
      var email = emailInput ? emailInput.value : '';
      var submitBtn = form.querySelector('button[type="submit"]');

      // Basic validation
      if (!email || !email.includes('@')) {
        trackEvent('form_error', { form_id: formId, form_location: source, error: 'invalid_email' });
        if (msgEl) {
          msgEl.textContent = 'Enter a valid email address.';
          msgEl.style.display = 'block';
          msgEl.style.color = 'var(--cat-drums)';
        }
        return;
      }

      // Optimistic disable to prevent double submit
      if (submitBtn) { submitBtn.disabled = true; }

      fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: source }),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (msgEl) {
            msgEl.textContent = data.success
              ? "You're in the vault. Check your inbox."
              : (data.message || 'Something went wrong. Try again.');
            msgEl.style.display = 'block';
            msgEl.style.color = data.success ? 'var(--cat-routines)' : 'var(--cat-drums)';
          }
          if (data.success) {
            form.reset();
            // Swap button text to confirm
            if (submitBtn) { submitBtn.textContent = 'You\'re in ✓'; }
            trackEvent('form_submit', { form_id: formId, form_location: source, success: true });
            trackEvent('email_signup', { source: source });
            window.location.href = '/subscribe/success';
          } else {
            if (submitBtn) { submitBtn.disabled = false; }
            trackEvent('form_error', { form_id: formId, form_location: source, error: data.message || 'server_error' });
          }
        })
        .catch(function () {
          if (msgEl) {
            msgEl.textContent = 'Network error. Try again.';
            msgEl.style.display = 'block';
            msgEl.style.color = 'var(--cat-drums)';
          }
          if (submitBtn) { submitBtn.disabled = false; }
          trackEvent('form_error', { form_id: formId, form_location: source, error: 'network_error' });
        });
    });
  }

  // Bind lead magnet forms (data-form-id)
  document.querySelectorAll('.email-form--magnet').forEach(bindEmailForm);

  // Bind inline mid-post capture forms
  document.querySelectorAll('.email-form--inline').forEach(bindEmailForm);

  // Bind hero form
  document.querySelectorAll('.email-form--hero').forEach(bindEmailForm);

  // Bind legacy homepage form
  var legacyForm = document.getElementById('email-form');
  if (legacyForm) { bindEmailForm(legacyForm); }

  // ---- Inline capture injection — inserts after first paragraph in post body ----
  // The capture widget is pre-rendered server-side in a hidden slot, then moved into
  // the post content after the first </p> so it appears contextually after the intro.
  var captureSlot = document.getElementById('inline-capture-slot');
  var postBody = document.getElementById('post-content-body');
  if (captureSlot && postBody) {
    var firstP = postBody.querySelector('p');
    if (firstP && firstP.nextSibling !== null) {
      // Reveal the slot contents and insert after first paragraph
      captureSlot.style.display = '';
      postBody.insertBefore(captureSlot, firstP.nextSibling);
      // Re-bind form (it was already rendered server-side but moved in DOM)
      var movedForm = captureSlot.querySelector('.email-form--inline');
      if (movedForm) { bindEmailForm(movedForm); }
    } else if (firstP) {
      // Only one paragraph — append after it
      captureSlot.style.display = '';
      postBody.appendChild(captureSlot);
      var movedForm2 = captureSlot.querySelector('.email-form--inline');
      if (movedForm2) { bindEmailForm(movedForm2); }
    }
  }

  // ---- Outbound link tagging — adds data-link-type to external links in post body ----
  // Enables JS-based click tracking without requiring GA4 setup.
  // Skips links already tagged and same-origin links.
  var postContent = document.querySelector('.post-content');
  if (postContent) {
    var origin = window.location.origin;
    postContent.querySelectorAll('a[href]').forEach(function (a) {
      if (a.getAttribute('data-link-type')) { return; }
      var href = a.getAttribute('href');
      if (!href || href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:')) { return; }
      try {
        var url = new URL(href);
        if (url.origin === origin) { return; }
        a.setAttribute('data-link-type', 'external');
        if (!a.getAttribute('rel')) { a.setAttribute('rel', 'noopener noreferrer'); }
      } catch (_) {}
    });
  }

  // ---- Fade-in on scroll ----
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.post-card, .product-card, .trust-item, .magnet-block, .free-magnet-grid').forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
})();
