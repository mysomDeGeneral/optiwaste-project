  self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: '/icon-192x192.png',
      // badge: '/badge.png',
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
          if (client.url.includes('/collector/requests') && 'focus' in client) {
            client.focus();
            // Send a message to the client
            client.postMessage({
              type: 'NOTIFICATION_CLICKED',
              requestId: requestId
            });
            return;
          }
        }
        if (client.openWindow) {
          client.openWindow('/collector/requests').then(windowClient => {
            // Wait for the new window to load and then send the message
            windowClient.postMessage({
              type: 'NOTIFICATION_CLICKED',
              requestId: requestId
            });
          });
        }
      })
    );
  });
  

