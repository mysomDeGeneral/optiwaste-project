//sw.js
const CACHE_NAME = 'optiwaste-cache-v1';
const urlsToCache = [
  '/',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              return response;
          }
        );
      })
  );
});


self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: '/icon.png',
      badge: '/badge.png',
      data: {
        requestId: data.requestId
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const requestId = event.notification.data.requestId;
  
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.includes('/collector/requests') && 'focus' in client)
                    return client.focus();
            }
            if (client.openWindow)
                client.openWindow('collector/requests');
        })
    );
  });
  