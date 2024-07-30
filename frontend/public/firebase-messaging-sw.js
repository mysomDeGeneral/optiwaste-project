
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBNbrAFOHaAvvjZzfi3BE92RQ-MaftAcgM",
  authDomain: "optiwaste-19300.firebaseapp.com",
  projectId: "optiwaste-19300",
  storageBucket: "optiwaste-19300.appspot.com",
  messagingSenderId: "1007165989012",
  appId: "1:1007165989012:web:46d17e7306554fc3251481",
  measurementId: "G-168DKTZ6V9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});