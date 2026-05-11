const CACHE = 'lufast-v2';
const PRECACHE = ['/', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Share target: GET request với params → trả về trang chính
  const url = new URL(e.request.url);
  if (e.request.method === 'GET' && (url.searchParams.has('text') || url.searchParams.has('url'))) {
    // Để client-side JS xử lý params, chỉ cần serve trang chính
    e.respondWith(caches.match('/').then(r => r || fetch('/')));
    return;
  }

  // Network first, fallback cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
