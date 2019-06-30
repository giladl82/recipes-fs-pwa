/* eslint-disable no-restricted-globals */

const preCacheFiles = ['/', '/index.html', '/login', '/offline.html', '/manifest.json'];
const staticCacheDestinations = ['image', 'script', 'style', 'manifest'];
const PRE_CACHE_KEY = 'preCache_v1';
const STATIC_CACHE_KEY = 'staticCache_v2';

self.addEventListener('install', event => {
  console.log('[Service worker] Installed', event);
  event.waitUntil(
    caches.open(PRE_CACHE_KEY).then(cache => {
      cache.addAll(preCacheFiles);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service worker] Activated', event);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== PRE_CACHE_KEY && key !== STATIC_CACHE_KEY) {
            return caches.delete(key);
          }

          return null;
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  console.log('[Service worker] Fetching:', event.request);

  if (staticCacheDestinations.includes(event.request.destination)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(res => {
            return caches.open(STATIC_CACHE_KEY).then(cache => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      })
    );
  } else if (preCacheFiles.includes(event.request.url.replace(self.origin, ''))) {
    console.log('CACHE ONLY');
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          return caches.open(STATIC_CACHE_KEY).then(cache => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        })
        .catch(error => {
          console.error(error);
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        })
    );
  }
});
