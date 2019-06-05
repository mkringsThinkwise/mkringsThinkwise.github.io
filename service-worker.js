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
        actions: payload.actions,
        badge: payload.badge,
        body: payload.notification.body,
        data: payload.data,
        dir: payload.dir,
        lang: payload.lang,
        tag: payload.tag,
        icon: payload.icon,
        image: payload.image,
        renotify: payload.renotify,
        requireInteraction: payload.requireInteraction,
        silent: payload.silent,
        timestamp: payload.timestamp,
        title: payload.title,
        vibrate: payload.vibrate
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  console.log(event);
  clients.openWindow('http://www.mozilla.org', '_blank');
});

const filesToCache = [
    '/',
    'index.html',
    'index.js',
    'notifications/config.js',
    'notifications/push.js',
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