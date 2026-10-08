// StickVault analytics — lightweight in-house tracker.
// Owns: page_view, email_signup, product_click, internal_link_click events.
// Does NOT own: email form submission logic (that lives in main.js).
(function () {
  'use strict';

  // --- Session ID (tab-scoped, not persisted) ---
  var SESSION_ID = (function () {
    try {
      var k = 'sv_sid';
      var s = sessionStorage.getItem(k);
      if (!s) {
        s = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem(k, s);
      }
      return s;
    } catch (e) { return 'nostorage'; }
  })();

  // --- UTM parameter extraction ---
  function getUtmParams() {
    var params = {};
    var search = window.location.search;
    if (!search) return params;
    var pairs = search.slice(1).split('&');
    pairs.forEach(function (p) {
      var kv = p.split('=');
      var key = decodeURIComponent(kv[0] || '');
      var val = decodeURIComponent(kv[1] || '');
      if (key.slice(0, 4) === 'utm_') {
        params[key] = val;
      }
    });
    return params;
  }

  // Detect Pinterest referral from either referrer URL or utm_source.
  function isPinterestReferral() {
    var utm = getUtmParams();
    if (utm['utm_source'] && utm['utm_source'].toLowerCase().includes('pinterest')) return true;
    try {
      var ref = document.referrer;
      return ref && ref.includes('pinterest.com');
    } catch (e) { return false; }
  }

  // --- Core send function ---
  function send(eventType, eventData) {
    var payload = {
      eventType: eventType,
      eventData: eventData || {},
      pageUrl: window.location.href,
      referrer: document.referrer || null,
      sessionId: SESSION_ID,
    };

    // Use sendBeacon when available (safe on page unload), fall back to fetch.
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      var blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/event', blob);
    } else {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        keepalive: true,
      }).catch(function () { /* silent — analytics must not break the page */ });
    }
  }

  // --- 1. Page view ---
  (function trackPageView() {
    var utm = getUtmParams();
    var slug = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
    var data = {
      slug: slug,
      title: document.title,
      path: window.location.pathname,
      is_pinterest: isPinterestReferral(),
    };

    // Merge UTM params into event data
    Object.keys(utm).forEach(function (k) { data[k] = utm[k]; });

    send('page_view', data);
  })();

  // --- 2. Product clicks (card links + buy buttons) ---
  (function trackProductClicks() {
    function getProductMeta(el) {
      // Walk up the DOM to find product card or slug data attributes
      var node = el;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.productSlug) {
          return {
            product_slug: node.dataset.productSlug,
            product_title: node.dataset.productTitle || '',
          };
        }
        node = node.parentElement;
      }
      // Fallback: extract from URL if clicking a /shop/<slug> link
      var href = el.getAttribute('href') || '';
      var m = href.match(/\/shop\/([^/?#]+)/);
      if (m) return { product_slug: m[1], product_title: '' };
      return null;
    }

    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest('a, button');
      if (!el) return;

      var href = el.getAttribute('href') || '';
      var text = (el.textContent || '').trim().toLowerCase();

      // Product page links (card links)
      if (href.match(/\/shop\/[^/?#]+/)) {
        var meta = getProductMeta(el);
        if (meta) {
          send('product_click', Object.assign({ click_type: 'card' }, meta));
        }
        return;
      }

      // Buy / Stripe links — any outbound link from a product area
      var isStripe = href.includes('stripe.com') || href.includes('buy.stripe.com');
      var isBuyCTA = text.includes('buy') || text.includes('get the') || text.includes('grab the') || text.includes('access');
      if (isStripe || isBuyCTA) {
        var meta = getProductMeta(el);
        send('product_click', Object.assign(
          { click_type: isStripe ? 'buy' : 'cta', href: href },
          meta || {}
        ));
      }
    }, true /* capture — before navigation */);
  })();

  // --- 3. Internal link clicks (Recommended Next Read, cross-pillar nav) ---
  (function trackInternalLinks() {
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest('a');
      if (!el) return;
      var href = el.getAttribute('href') || '';
      // Only blog post-to-post links — skip nav, shop, external
      var isBlogInternal = href.match(/^\/blog\/[^/?#]+/);
      if (!isBlogInternal) return;
      // Check parent context
      var isNextRead = !!el.closest('.next-reads, .next-read-card, [data-next-read]');
      send('internal_link_click', {
        from_path: window.location.pathname,
        to_href: href,
        link_type: isNextRead ? 'recommended_next_read' : 'inline',
        link_text: (el.textContent || '').trim().slice(0, 120),
      });
    });
  })();

  // --- 4. Email signup events (fires alongside main.js form handler) ---
  // We listen to form submit and send an analytics event after the DOM submit event.
  // main.js handles the actual POST. We just record the intent.
  (function trackEmailSignups() {
    function bindSignupTracking(form) {
      var source = form.getAttribute('data-source') || 'inline-form';
      form.addEventListener('submit', function () {
        var emailInput = form.querySelector('input[name="email"]');
        send('email_signup', {
          source: source,
          page: window.location.pathname,
          has_email: !!(emailInput && emailInput.value),
          is_pinterest_traffic: isPinterestReferral(),
        });
      });
    }

    // Bind all magnet forms
    document.querySelectorAll('.email-form--magnet').forEach(bindSignupTracking);

    // Legacy homepage form
    var legacyForm = document.getElementById('email-form');
    if (legacyForm) { bindSignupTracking(legacyForm); }
  })();

})();
