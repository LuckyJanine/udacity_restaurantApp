//to tell browser where the service work js lives
if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/sw.js").then(function(registration){
            //successfull
            console.log("ServiceWorker registration successful with scope: ", registration.scope);
        }, function(err){
            //failed
            console.log("ServiceWorker registration failed: ", err);
        });
    });
}