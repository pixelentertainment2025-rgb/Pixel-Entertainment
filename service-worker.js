// service-worker.js

const CACHE_NAME = 'adsokoni-cache-v1';
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/icon.svg',
];

// On install, pre-cache the main app shell files.
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(APP_SHELL_URLS);
        })
        .then(() => {
            // Force the waiting service worker to become the active service worker.
            return self.skipWaiting();
        })
    );
});

// On activate, clean up old caches.
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    // This ensures that the service worker takes control of the page immediately.
    event.waitUntil(self.clients.claim());

    // Remove outdated caches to free up space.
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// On fetch, use a "stale-while-revalidate" strategy.
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // We only want to handle GET requests.
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            const cachedResponse = await cache.match(request);
            
            const fetchPromise = fetch(request).then((networkResponse) => {
                // If the fetch is successful, update the cache.
                if (networkResponse && networkResponse.status === 200) {
                    cache.put(request, networkResponse.clone());
                }
                return networkResponse;
            }).catch(error => {
                // The network request failed, probably because the user is offline.
                // The cached response has already been served if it exists.
                console.warn('Service Worker: Fetch failed.', request.url, error);
            });

            // Return the cached response if available, otherwise wait for the network response.
            // This is the "stale-while-revalidate" pattern.
            return cachedResponse || fetchPromise;
        })
    );
});


// This event listener is for real push notifications from a server.
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'AdSokoni', body: 'You have a new notification.' };
    const title = data.title;
    const options = {
        body: data.body,
        icon: '/icon.svg',
        badge: '/icon.svg',
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click: focus or open the app.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If a window for the app is already open, focus it.
            for (const client of clientList) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new window.
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
