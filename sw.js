// Service Worker for Puck Academy PWA
// v2: Network-first strategy — always fetch fresh content, cache as fallback for offline
const CACHE_NAME = 'puck-academy-v2';

// Core assets to pre-cache for offline fallback
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/training.html',
  '/styles/main.css',
  '/js/storage.js',
  '/js/analytics.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600&display=swap'
];

// Install event - cache core assets for offline fallback
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching core assets for offline fallback');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up ALL old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - NETWORK FIRST, fall back to cache only when offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Skip analytics and external API requests entirely
  const url = event.request.url;
  if (url.includes('google-analytics') || url.includes('googletagmanager') ||
      url.includes('supabase') || url.includes('/functions/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Got a fresh response — update the cache with it
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — try cache as offline fallback
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // No cache either — return offline fallback for HTML pages
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/training.html');
          }
        });
      })
  );
});
