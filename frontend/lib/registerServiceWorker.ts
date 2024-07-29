export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw-push.js');
        console.log('Push Notification Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.error('Push Notification Service Worker registration failed:', error);
      }
    });
  }
}