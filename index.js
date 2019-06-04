window.onload = () => {
    initializeFirebase();
    askPermission().then(() => {
        handlePushMessage();

        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            navigator.serviceWorker.register('service-worker.js');
        }
    });
}
    