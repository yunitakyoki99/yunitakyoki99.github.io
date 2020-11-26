importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
const pesanConsoleBerhasil = () => console.log(`Workbox berhasil dimuat`);
const pesanConsoleGagal = () => console.log(`Workbox gagal dimuat`);
workbox ? pesanConsoleBerhasil() : pesanConsoleGagal();

workbox.precaching.precacheAndRoute([
  { url: "./", revision: '1' },
  { url: "./index.html", revision: '1' },
  { url: "./css/materialize.min.css", revision: '1' },
  { url: "./css/main.css", revision: '1' },
  { url: "./manifest.json", revision: '1' },
  { url: "./img/favicon.png", revision: '1' },
  { url: "./img/favicon-16x16.png", revision: '1' },
  { url: "./img/favicon-32x32.png", revision: '1' },
  { url: "./img/android-chrome-192x192.png", revision: '1' },
  { url: "./img/android-chrome-72x72.png", revision: '1' },
  { url: "./img/android-chrome-96x96.png", revision: '1' },
  { url: "./img/android-chrome-512x512.png", revision: '1' },
  { url: "./img/apple-touch-icon.png", revision: '1' },
  { url: "./img/apple-touch-icon-57x57.png", revision: '1' },
  { url: "./img/apple-touch-icon-60x60.png", revision: '1' },
  { url: "./nav.html", revision: '1' },
  { url: "./pages/standing.html", revision: '1' },
  { url: "./pages/match.html", revision: '1' },
  { url: "./pages/favorite.html", revision: '1' },
  { url: "./pages/teams.html", revision: '1' },
  { url: "./js/materialize.min.js", revision: '1' },
  { url: "./js/main.js", revision: '1' },
  { url: "./js/nav.js", revision: '1' },
  { url: "./register.js", revision: '1' },
  { url: "./js/api.js", revision: '1' },
  { url: "./js/db.js", revision: '1' },
  { url: "./js/idb.js", revision: '1' },
  ])
  
  workbox.routing.registerRoute(
    new RegExp("./js/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "js",
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp("./css/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "css",
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp("./pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages",
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp("./img/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "img",
    })
  );
  
  
  workbox.routing.registerRoute(
    new RegExp("./"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "depan",
    })
  );
  
  workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "https://api.football-data.org/",
    })
  );
  
  workbox.routing.registerRoute(
      /.*(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
          }),
          new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ]
      })
  );
 
 
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
 
  var options = {
    body: body,
    icon: "/img/android-chrome-512x512.png",
    vibration: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
 
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});