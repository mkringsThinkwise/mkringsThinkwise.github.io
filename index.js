let url = '';
let websitePushID = '';

window.onload = () => {
    let isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    if (isSafari) 
    {
        if ('safari' in window && 'pushNotification' in window.safari) {
            var permissionData = window.safari.pushNotification.permission(websitePushID);
            checkRemotePermission(permissionData);
        }
        window.safari.pushNotification.requestPermission();

    } else {
        initializeFirebase();
        askPermission().then(() => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('service-worker.js').then(registration => {
                    const messaging = firebase.messaging();
                    messaging.useServiceWorker(registration);
                    messaging.getToken().then(token => {
                        console.log('token: ', token);
                        //send token to server

                        handlePushMessage();
                    });
                });
            }
        });
    }
}

var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
        // This is a new web service URL and its validity is unknown.
        window.safari.pushNotification.requestPermission(
            url, // The web service URL.
            websitePushID,     // The Website Push ID.
            {}, // Data that you choose to send to your server to help you identify the user.
            checkRemotePermission         // The callback function.
        );
    }
    else if (permissionData.permission === 'denied') {
        // The user said no.
    }
    else if (permissionData.permission === 'granted') {
        // The web service URL is a valid push provider, and the user said yes.
        // permissionData.deviceToken is now available to use.
    }
};
