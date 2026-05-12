const CACHE = 'lufast-v5';
const SHARE_CACHE = 'lufast-share-inbox';
const PRECACHE = ['/', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k !== SHARE_CACHE).map(k => caches.delete(k))
      ))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const hasShare = url.searchParams.has('text') || url.searchParams.has('url');

  if (e.request.method === 'GET' && hasShare) {
    e.respondWith((async () => {
      // Lưu share data + referrer vào inbox
      const shareData = {
        title:    url.searchParams.get('title') || '',
        text:     url.searchParams.get('text')  || '',
        url:      url.searchParams.get('url')   || '',
        referrer: e.request.referrer || '',        // ← lưu referrer ở đây
        ts:       Date.now()
      };
      const inbox = await caches.open(SHARE_CACHE);
      await inbox.put(
        '/share-inbox',
        new Response(JSON.stringify(shareData), {
          headers: { 'Content-Type': 'application/json' }
        })
      );
      return Response.redirect('/', 302);
    })());
    return;
  }

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
