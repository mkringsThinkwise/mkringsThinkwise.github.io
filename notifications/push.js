const initializeFirebase = () => {
    firebase.initializeApp({
        // taken from your project settings --> cloud messaging
        messagingSenderId: messagingSenderId 
    });
}

const askPermission = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        return;
    } catch (error) {
        console.error(error);
    }
}

const handlePushMessage = () => {
    const messaging = firebase.messaging();
    messaging.onMessage(function (payload) {
        console.log('Message received. ', payload);

        var notificationTitle = payload.notification.title;
        var notificationOptions = {
            //actions are only supported from the service worker
            //actions: payload.notification.actions,
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

        var notification = new Notification(notificationTitle, notificationOptions);

        notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            console.log(event);
            window.open('http://www.mozilla.org', '_blank');
        }
    });
};
