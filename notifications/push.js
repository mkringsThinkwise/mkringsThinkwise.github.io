const initializeFirebase = () => {
    firebase.initializeApp({
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

        var notificationTitle = payload.data.title;
        var notificationOptions = {
            //actions are only supported from the service worker
            //actions: payload.notification.actions,
            badge: payload.data.badge,
            body: payload.data.body,
            dir: payload.data.dir,
            lang: payload.data.lang,
            tag: payload.data.tag,
            icon: payload.data.icon,
            image: payload.data.image,
            renotify: payload.data.renotify,
            requireInteraction: payload.data.requireInteraction,
            silent: payload.data.silent,
            timestamp: payload.data.timestamp,
            title: payload.data.title,
            vibrate: payload.data.vibrate
        };

        var notification = new Notification(notificationTitle, notificationOptions);

        notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            console.log(event);
            window.open('http://www.mozilla.org', '_blank');
        }
    });
};
