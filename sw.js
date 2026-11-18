// Service worker: приложението се отваря и без мрежа (показва последния вид),
// а при мрежа винаги взима най-новата версия на страницата.
const CACHE = 'kotel-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './apple-touch-icon.png', 'https://unpkg.com/mqtt@5.10.1/dist/mqtt.min.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Облачната услуга (вход, данни) - никога от кеша
  if (url.hostname.endsWith('workers.dev')) return;
  // Страницата: първо от мрежата, при липса - от кеша
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put('./index.html', copy));
      return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  // Иконки, скриптове: първо от кеша
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
