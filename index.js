window.onload = () => {
    initializeFirebase();
    askPermission().then(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then(registration => {
                messaging.useServiceWorker(registration)
                handlePushMessage();
            });
        }
    });
}
    