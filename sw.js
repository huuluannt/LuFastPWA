const CACHE_NAME = 'lufast-v1';
const urlsToCache = [
  '/',
  '/lufast2.html',
  '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(clients.claim());
});

// Fetch event
self.addEventListener('fetch', event => {
  // Handle share target
  if (event.request.method === 'POST' && event.request.url.includes('share')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const params = new URLSearchParams({
        title: formData.get('title') || '',
        text: formData.get('text') || '',
        url: formData.get('url') || ''
      });
      return Response.redirect('/?' + params.toString(), 303);
    })());
    return;
  }

  // Network first, then cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
