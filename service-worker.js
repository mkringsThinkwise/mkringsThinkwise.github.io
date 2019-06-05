importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "520264413792"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = payload.notification.title;
    var notificationOptions = {
        actions: payload.notification.actions,
        badge: payload.notification.badge,
        body: payload.notification.body,
        dir: payload.notification.dir,
        lang: payload.notification.lang,
        tag: payload.notification.tag,
        icon: payload.notification.icon,
        image: payload.notification.image,
        renotify: payload.notification.renotify,
        requireInteraction: payload.notification.requireInteraction,
        silent: payload.notification.silent,
        timestamp: payload.notification.timestamp,
        title: payload.notification.title,
        vibrate: payload.notification.vibrate
    };

    const notifPromise = self.registration.showNotification(notificationTitle, notificationOptions);
    event.waitUntil(notifPromise);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil( 
    console.log('[Service Worker] Notification click Received.')
);

const filesToCache = [
    '/',
    'index.html',
    'index.js',
    'manifest.json',
    'favicon.ico',
    'notifications/config.js',
    'notifications/push.js',
    'icons/logo.png',
    'icons/splash.png'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });


self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO - Add fetched files to the cache

    }).catch(error => {

      // TODO - Respond with custom offline page

    })
  );
});