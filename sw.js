const CACHE = 'lufast-v3';
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
  const url = new URL(e.request.url);

  // Bắt GET request có share params (từ share_target trong manifest)
  const hasShareParams = url.searchParams.has('text') || url.searchParams.has('url');
  if (e.request.method === 'GET' && hasShareParams) {
    e.respondWith((async () => {
      // Tìm window client đang mở để set cờ vào sessionStorage
      const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({ type: 'LUFAST_FRESH_SHARE' });
      }
      // Serve trang chính với params còn nguyên để JS xử lý
      const cached = await caches.match('/');
      return cached || fetch('/');
    })());
    return;
  }

  // Network first, fallback cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
