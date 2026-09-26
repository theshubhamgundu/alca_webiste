const CACHE_NAME = 'nutricrunch-image-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // We only want to cache GET requests for Cloudinary images
  if (event.request.method === 'GET' && url.hostname.includes('res.cloudinary.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Found in cache, return the cached image directly
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // Clone the response because it can only be consumed once
          const responseToCache = networkResponse.clone();

          // Open cache and store the cloned response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch((err) => {
          console.error('Service Worker fetch failed for:', url.href, err);
          // Return nothing if offline and not in cache
          return new Response();
        });
      })
    );
  }
});
