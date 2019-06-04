import push from './notifications/push';

window.onload = () => {
    push.initializeFirebase();
    push.askPermission().then(() => {
        push.handlePushMessage();

        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js');
            });
        }
    });
}
