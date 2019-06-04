importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

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
        const token = await messaging.getToken();
        console.log('token: ', token);
        
        //send token to server

        return token;
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
        new Notification(notificationTitle, notificationOptions);
    });
};
