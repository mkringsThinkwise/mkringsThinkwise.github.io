window.onload = () => {
    initializeFirebase();
    askPermission().then(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then(registration => {
                const messaging = firebase.messaging();
                messaging.useServiceWorker(registration);

                messaging.getToken().then(token => {
                    console.log('token: ', token);
                    //send token to server
                });

                handlePushMessage();
            });
        }
    });
}

Notification.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    console.log(event);
    window.open('http://www.mozilla.org', '_blank');
}

window.addEventListener('yes', (event) => {
    console.log("from yes: " + event);
});

window.addEventListener('no', (event) => {
    console.log("from no: " + event);
});