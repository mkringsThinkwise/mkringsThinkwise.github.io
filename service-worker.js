importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: "520264413792"
});

// This event listener needs to be defined before "const messaging = firebase.messaging();".
// Otherwise the event listener will not be called when clicking the notificaiton itself, only when pressing the buttons.
self.addEventListener('notificationclick', function(event) {
  self.console.log('[Service Worker] Notification click Received. \n' + event);

  event.notification.close(); // Android needs explicit close.

  console.log({event: event.notification});

  event.waitUntil( new Promise(function(resolve, reject) {
    switch(event.action) {
      case 'yes':
        self.console.log('YES');
        self.console.log(JSON.stringify({event: event.notification}));
        break;
      case 'no':
        self.console.log('NO');
        self.console.log(JSON.stringify({event: event.notification}));
        break;
      default:
        self.console.log('NONE');
        self.console.log(JSON.stringify({event: event.notification}));
    }
    resolve();
  }));
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

self.addEventListener('notificationclose', function(event) {
  event.waitUntil( new Promise(function(resolve, reject) {
    self.console.log('CLOSE');
    self.console.log(JSON.stringify({event: event.notification}));
    resolve();
  }));
});

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