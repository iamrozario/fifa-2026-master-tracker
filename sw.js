const CACHE_NAME = 'fifa-2026-v1';
const ASSETS = [
  './',
  './index.html',
  './tournament-engine.js',
  './manifest.json',
  './Light_Logo.png',
  './Dark_Logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
