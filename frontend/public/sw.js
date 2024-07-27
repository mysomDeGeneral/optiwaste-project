//sw.js
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
            if (clients.openWindow)
                clients.openWindow('collector/requests');
        })
    );
  });
  