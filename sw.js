const CACHE_NAME = 'nasra-vote-v8';
const ASSETS = [
  './',
  './index.html',
  './index.js',
  './student-primary.html',
  './student-primary.js',
  './student-secondary.html',
  './student-secondary.js',
  './headboy-primary.html',
  './headboy-primary.js',
  './headboy-secondary.html',
  './headboy-secondary.js',
  './headgirl-primary.html',
  './headgirl-primary.js',
  './headgirl-secondary.html',
  './headgirl-secondary.js',
  './deputyboy-primary.html',
  './deputyboy-primary.js',
  './deputyboy-secondary.html',
  './deputyboy-secondary.js',
  './deputygirl-primary.html',
  './deputygirl-primary.js',
  './deputygirl-secondary.html',
  './deputygirl-secondary.js',
  './confirm-primary.html',
  './confirm-primary.js',
  './confirm-secondary.html',
  './confirm-secondary.js',
  './success-primary.html',
  './success-primary.js',
  './success-secondary.html',
  './success-secondary.js',
  './admin-login.html',
  './admin-login.js',
  './admin-secondary.html',
  './admin-secondary.js',
  './dashboard-primary.html',
  './dashboard-primary.js',
  './dashboard-secondary.html',
  './dashboard-secondary.js',
  './teacher-hub.html',
  './teacher-hub.js',
  './teacher.html',
  './teacher.js',
  './about.html',
  './style.css',
  './supabase-init.js',
  './developer-credit.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Map assets to individual cache addition promises. This prevents a single failure
      // (like an offline state or missing file) from failing the entire service worker installation.
      return Promise.all(
        ASSETS.map((asset) => {
          return cache.add(asset).catch((err) => {
            console.warn(`[ServiceWorker] Failed to cache: ${asset}`, err);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
