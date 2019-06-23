let cache_name = "v1";

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(cache_name)
            .then(function(cache) {
                console.log("cache opened");
                return cache.addAll([
                    "/index.html",
                    "/restaurant.html",
                    "/css/styles.css",
                    "/js/dbhelper.js",
                    "/js/main.js",
                    "/js/restaurant_info.js",
                ]).catch(function(err){
                    console.log("caches open failed: " + err);
                });
            })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
            console.log("cache fetched");
            return response || fetch(event.request);
        })
    );
});