const CACHE_NAME = 'nasra-vote-v9';

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
  './developer-credit.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset =>
          cache.add(asset).catch(err =>
            console.warn('[ServiceWorker] Cache failed:', asset, err)
          )
        )
      )
    )
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});


