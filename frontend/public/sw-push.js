self.addEventListener('push', function(event) {
  console.log('Push event received');
  try {
    const data = event.data.json();
    console.log('Push data:', data);

    const options = {
      body: data.message,
      icon: '/icon-192x192.png',
      data: {
        requestId: data.requestId
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Error processing push event:', error);
  }
});


self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();

  const requestId = event.notification.data.requestId;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes('/collector/requests') && 'focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            requestId: requestId
          });
          return;
        }
      }
      if (clients.openWindow) {
        clients.openWindow('/collector/requests').then(windowClient => {
          windowClient.postMessage({
            type: 'NOTIFICATION_CLICKED',
            requestId: requestId
          });
        });
      }
    })
  );
});