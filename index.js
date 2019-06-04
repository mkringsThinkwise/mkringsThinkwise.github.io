window.onload = () => {
    initializeFirebase();
    askPermission().then(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then(registration => {
                const messaging = firebase.messaging();
                messaging.useServiceWorker(registration);

                const token = await messaging.getToken();
                console.log('token: ', token);
                //send token to server

                handlePushMessage();
            });
        }
    });
}
    