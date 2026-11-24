// Service worker: приложението се отваря и без мрежа (показва последния вид),
// а при мрежа винаги взима най-новата версия на страницата.
const CACHE = 'kotel-v3';
const SHELL = ['./', './index.html', './i18n.js', './faults.js', './manifest.webmanifest', './icon-192.png',
  './icon-512.png', './apple-touch-icon.png', 'https://unpkg.com/mqtt@5.10.1/dist/mqtt.min.js'];

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
  // Нашите скриптове (преводи, кодове за грешка): първо от мрежата, за да идват промените
  if (url.origin === self.location.origin && url.pathname.endsWith('.js')) {
    e.respondWith(fetch(req).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return r;
    }).catch(() => caches.match(req)));
    return;
  }
  // Иконки, външната библиотека: първо от кеша
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});

// --- Известия от облачната услуга (Web Push) ---
self.addEventListener('push', (e) => {
  let m = {};
  try { m = e.data ? e.data.json() : {}; } catch { m = { title: 'Котел', body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(m.title || 'Котел', {
    body: m.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: (m.device || 'kotel') + ':' + (m.title || ''),
    renotify: true,
    data: { url: './' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  }));
});
