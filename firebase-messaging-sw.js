importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

console.log('wrong');

firebase.initializeApp({
    messagingSenderId: "520264413792"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = payload.notification.title;
    var notificationOptions = {
        // actions: payload.actions,
        actions: [
            {action: 'like', title: 'Like'},
            {action: 'reply', title: 'Reply'}],
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

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
