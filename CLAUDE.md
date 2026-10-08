# StickVault

## What this app does
StickVault is a lifestyle content vault and digital product shop. It publishes deep-dive blog posts across five categories (Drums, Collecting, Side Hustles, Routines, Hidden Gems) and sells digital guides/templates via Stripe direct checkout links.

## Stack
Node.js + Express + EJS templates + PostgreSQL (Neon) + deployed on Render

## Directory map
- `server.js` — entry point, middleware wiring, route mounts (~210 lines); includes apex→www redirect, in-memory page cache, Cache-Control headers
- `middleware/` — `helmet-config.js` (CSP + security headers), `admin-auth.js` (token-based admin auth + login/logout routes), `rate-limit.js` (per-endpoint rate limiters), `page-views.js` (server-side page view tracking middleware)
- `routes/` — Express Router modules: `pages.js` (home, about, /free, subscribe, /admin/analytics, /admin/subscribers), `blog.js`, `shop.js`, `pins.js` (pin generation API + startup auto-trigger), `seo.js`, `pinterest.js` (/api/pinterest-map funnel reference), `pinterest-queue.js` (/admin/pinterest-queue + /api/pinterest-queue approval review), `analytics.js` (POST /api/analytics/event, GET /api/analytics/summary), `admin.js` (GET /api/admin/analytics, GET /api/admin/subscribers/export CSV), `pinterest-pins.js` (/admin/pinterest-pins dashboard, /api/pinterest-pins/generate, /api/pinterest-pins/status), `pinterest-dashboard.js` (GET /api/admin/pinterest-dashboard, PATCH /api/admin/pinterest-pins/:id), `pinterest-posting-guide.js` (/admin/pinterest-posting-guide — manual posting package: gallery, copy, 2-week schedule, board setup), `legal.js` (/privacy-policy, /terms-of-service, /affiliate-disclosure, /cookie-policy), `affiliate.js` (/r/:slug branded redirects, /admin/links CRUD, /api/affiliate/* CRUD, /api/admin/check-links broken-link audit), `referrals.js` (/admin/referrals dashboard, /api/admin/referrals/export CSV)
- `db/` — named query functions per entity: `index.js` (Pool), `blog.js`, `products.js`, `subscribers.js`, `pins.js` (pin_image reads/writes), `analytics.js` (event inserts + aggregation queries), `page-views.js` (page view tracking + analytics aggregation), `pinterest-pins.js` (AI marketing pin records), `affiliate-links.js` (affiliate_links CRUD + click tracking), `referrals.js` (affiliate_orders aggregations: monthly, by category, top links)
- `data/` — static data files: `pinterest-keywords.js` (keyword clusters by category, 5 pillars × primary/secondary/long-tail); `pinterest-approval-queue.js` (Batch A + B: 20 pins staged for review, status: pending_approval)
- `scripts/generate-pins.js` — standalone CLI for pin regeneration (node scripts/generate-pins.js [--force] [--slug=x])
- `migrations/` — timestamped migration files (run via `npm run migrate` on deploy)
- `views/` — EJS templates; `partials/head.ejs`, `partials/nav.ejs`, `partials/footer.ejs` are included by each page
- `views/partials/email-capture-collector.ejs` — lead magnet partial (Grading Prep Checklist; collecting category)
- `views/partials/email-capture-operator.ejs` — lead magnet partial (Operator's Daily Playbook; routines/hidden-gems/side-hustles categories)
- `views/partials/email-capture-drums.ejs` — lead magnet partial (Drummer's Practice Blueprint; drums category)
- `views/partials/email-capture-inline.ejs` — compact mid-post capture widget; injected after first paragraph via JS; category-aware (drums/collecting/operator offer)
- `views/partials/ftc-disclosure.ejs` — FTC affiliate disclosure callout (included on blog posts + product pages)
- `views/blog/` — `index.ejs` (listing + filter), `post.ejs` (full post + category-aware email capture)
- `views/shop/` — `index.ejs` (product grid + collector capture), `product.ejs` (detail + operator capture), `success.ejs`
- `views/free.ejs` — dedicated lead magnet landing page at /free (both magnets)
- `public/css/theme.css` — full design system (dark vault aesthetic, CSS custom properties)
- `public/js/main.js` — nav toggle, multi-form email AJAX with source tracking, scroll fade-in
- `lib/landing-context.js` — CSS loader + analytics snippet builder (shared utility)

## Database
- `users` — core template table for subscription sync (managed by platform)
- `blog_posts` — slug, title, category, body (HTML), excerpt, pinterest_description, read_time_minutes, pin_image (self-hosted PNG URL, nullable — populated on startup)
- `products` — slug, title, description, long_description, price_cents, stripe_url, features (text[]), category, vault_sections (jsonb), use_cases (text[]), outcomes (text[]), for_whom (text)
- `email_subscribers` — email, source, created_at
- `analytics_events` — event_type, event_data (JSONB), page_url, referrer, user_agent, session_id, created_at; raw event log for all tracking
- `page_views` — path, referrer, user_agent, created_at; server-side page view tracking (skip /admin, /api, /health, static assets); indexed on created_at for time-range queries
- `pinterest_pins` — pin_number, headline, pillar, r2_url, status (pending/generating/done/failed), prompt, posting_status, notes, published_date, scheduled_date, description, destination_url, utm_url, board, keywords, cta_angle, funnel_pillar; AI-generated marketing pins with posting workflow
- `affiliate_links` — slug (branded /r/ path), label, program, target_url, commission_rate, link_type, pillar, is_active, click_count, last_checked_at, last_status; branded redirect + FTC compliance
- `affiliate_orders` — click_id, link_id, order_id, program, order_date, amount_usd, commission_usd, status (pending/approved/paid/removed), category, description; Amazon Associates commission events joined to affiliate_links

## External integrations
- **Stripe** — payment links created via Polsia MCP; four live product links embedded directly in DB seed
- **Polsia Analytics** — beacon pixel via `POLSIA_ANALYTICS_SLUG` env var
- **Pin images** — self-hosted at `/pins/{slug}.png`; rendered server-side via sharp Pango text engine + SVG background composite; no external CDN
- **DALL-E 3 / OpenAI proxy** — generates 30 branded Pinterest marketing pins (1024×1792) stored in R2; admin at /admin/pinterest-pins

## Recent changes
- 2026-06-22: Fix crawl paths — `SITE_URL` fallback now uses `RENDER_EXTERNAL_URL` or `stickvault.polsia.app`. All sitemap entries, canonical URLs, og:image, schema.org markup (Article, BreadcrumbList, Organization, SiteNavigationElement) pointed to unconfigured `www.stickvault.com`. Startup migration updated 38 `blog_posts.pin_image` URLs to the correct domain. Changed: `routes/seo.js`, `routes/blog.js`, `routes/pins.js`, `server.js`, `views/partials/head.ejs`.
- 2026-06-16: Vault highlights premium content tier — `.vault-highlights` block added to top 4 highest-traffic blog posts (grading-service-comparison, reading-drum-sheet-music, ebay-listing-optimization, setting-up-first-home-practice-space). Gold-bordered upgrade block with icon header, contextual item cards (tools, guides, affiliate links), and dual CTA. CSS in `public/css/theme.css`, HTML injected via REPLACE into blog_posts body column.
- 2026-06-13: /admin/referrals dashboard — affiliate clicks, orders, and commissions from Amazon Associates; `affiliate_orders` table (order_id, click_id, link_id, date, amount_usd, commission_usd, status, category); monthly commission bar chart, category breakdown, top links table, full order list; CSV export via `/api/admin/referrals/export`; `db/referrals.js`, `routes/referrals.js`, `views/admin/referrals.ejs`.
- 2026-06-09: /admin/subscribers page — sortable table (email, source, created_at) with source counts at top; CSV export via `/api/admin/subscribers/export`; dark vault aesthetic matching StickVault brand; protected by existing admin token auth; `db/subscribers.js` (getAllSubscribers, getSubscriberCounts), `routes/pages.js` + `routes/admin.js`.
- 2026-06-08: Email capture system Phase 1 — `/subscribe/success` page (success message + PDF download); `POST /subscribe` returns `already_subscribed: true` on duplicate; GA4 `email_signup` event fires on all form submits; source values standardized (homepage, free_page, blog_footer); `email_subscriptions` table migration (UNIQUE email constraint, ON CONFLICT handling); `views/subscribe/success.ejs`; `scripts/generate-pdf.js` generates Drummer's Practice Toolkit asset.
- 2026-05-28: Pinterest dashboard API — added `published_date` + `scheduled_date` columns to `pinterest_pins`; new `GET /api/admin/pinterest-dashboard` (all pins joined with blog post data + affiliate link status, filterable by status/category/sort) and `PATCH /api/admin/pinterest-pins/:id` (update posting_status/notes/dates); `routes/pinterest-dashboard.js`, `db/pinterest-pins.js` (getDashboardPins, updatePinPostingData).
- 2026-05-24: Server-side page view tracking — `page_views` table (path, referrer, user_agent, created_at); `pageViewMiddleware` in `middleware/page-views.js` (fire-and-forget, skips /admin, /api, /health, static assets); `db/page-views.js` with `getAnalytics()` aggregation; new `GET /api/admin/analytics` JSON endpoint (auth-protected); referrer categorization (pinterest, google, facebook, direct, other); email subscriber count included in analytics response.
- 2026-05-22: Server-side page caching — added in-memory Map cache in server.js with TTL (blog posts 5 min, listings 2 min, homepage 1 min); X-Cache: HIT/MISS debug header; POST /api/admin/clear-cache endpoint (admin-protected); upgraded CSS/JS Cache-Control to `immutable, max-age=31536000`; updated blog/shop Cache-Control to include `max-age=300, s-maxage=3600`.
- 2026-05-17: Amazon Associates monetization — activated inline affiliate links across 7 high-intent posts (affordable-collector-tools, grading-service-comparison, ebay-listing-optimization, drum-practice-routine, hidden-gem-drum-gear, stick-control, vinyl-collection). Tag: stickvault0f-20. Added 13 new affiliate_links rows (photo gear, drum gear, vinyl gear), upgraded 11 existing rows from search URLs to ASIN-based direct product links. New CSS: .affiliate-link (dashed gold underline + pill CTA), .affiliate-gear-block (multi-product grid). All clicks track via existing /r/:slug redirect infrastructure.
- 2026-05-17: Apex domain routing fix — stickvault.com subpaths (/blog/..., /shop/...) were returning 404 because GoDaddy forwarding only redirects root path. Added Express middleware to 301 redirect stickvault.com → www.stickvault.com with full path preserved. DNS A record for stickvault.com needs to point to 216.24.57.1 (Render) instead of GoDaddy forwarding.
- 2026-05-16: Pinterest posting guide — /admin/pinterest-posting-guide (auth-protected); all 30 pins with copy-ready title/description/UTM URL per pin, organized by pillar; 2-week posting schedule with optimal ET posting times; 6 board setup guide with copy-pasteable names + descriptions; step-by-step quick-start guide (Business account, Rich Pins, claim site, daily 15-min routine).
- 2026-05-16: Pre-launch audit fixes — favicon.ico (32px, dark vault #0d0d0d + gold #d4af37 SV monogram); removed duplicate noindex meta tag from head.ejs; fixed broken blog link in shop.js COLLECTOR_KIT_FEATURED_IN (removed "-to-avoid" suffix); fixed pin SVG hardcoded URL (stickvault.polsia.app → stickvault.com); drums category now maps to Drummer's Practice Blueprint lead magnet (new partial); side-hustles category now maps to Operator's Daily Playbook.
