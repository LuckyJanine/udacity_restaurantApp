let cache_name = "v1";

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open("v1").then(function(cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/restaurant.html",
                "/css/styles.css",
                "/js/",
                "/data/restaurants.json",
                "/js/dbhelper.js",
                "/js/main.js",
                "/js/restaurant_info.js",
                "/js/register.js",
                "/img"
            ]).catch(function(err){
                console.log("caches open failed: " + err);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});