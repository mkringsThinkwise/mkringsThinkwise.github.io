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

        var notification = new Notification(notificationTitle, notificationOptions);
        
        notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            console.log(event);
            window.open('http://www.mozilla.org', '_blank');
        }
    });
};
