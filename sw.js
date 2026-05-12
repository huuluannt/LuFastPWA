const CACHE = 'lufast-v6';
const PRECACHE = ['/', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Không bắt gì đặc biệt, serve bình thường
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
