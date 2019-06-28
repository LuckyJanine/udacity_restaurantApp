let cache_name = "v1";

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
                console.log("cache opened");
                return cache.addAll([
                    "/",
                    "/index.html",
                    "/restaurant.html",
                    "/css/styles.css",
                    "/js/main.js",
                    "/js/restaurant_info.js",
                    "/js/register.js",
                    "/data/restaurants.json",
                    "/img"
                ]).catch(function(err){
                    console.log("caches open failed: " + err);
                });
            })
    );
});

self.addEventListener('activate', function(event) {
//    console.log("activated");
  });

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {   
            if (response) {
                return response;
            }

            return fetch(event.request).then(function(response) {
                var response_clone = response.clone();
                if(response) {
                    return response;
                }

                caches.open(cache_name).then(function(cache) {
                    cache.put(event.request, response_clone);
                });
                return response;
                }
            );
        })
    );
});
  

self.addEventListener("message", function(event){
    if(event.data.action == "skipWaiting"){
        self.skipWaiting();
    }
})