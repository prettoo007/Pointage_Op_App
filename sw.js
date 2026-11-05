const CACHE_NAME = "horaire-shell-v2"; // bump volontaire : force le nettoyage de l'ancien cache figé
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Les données doivent toujours être fraîches : on ne met jamais en cache l'API GitHub
  if (url.hostname === "api.github.com") return;

  const isDocument = event.request.mode === "navigate" || url.pathname.endsWith("index.html") || url.pathname.endsWith("/");

  if (isDocument) {
    // Page principale : toujours réseau en premier, pour ne jamais servir une version périmée.
    // Le cache ne sert qu'en secours si le réseau est indisponible (mode hors-ligne).
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Fichiers statiques (icônes, manifest...) : cache en premier, avec rafraîchissement en arrière-plan.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res.ok && event.request.method === "GET") {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
